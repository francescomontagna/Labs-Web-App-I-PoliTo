`
Exercise 01 and 02 together in one single file. 
Exercise 01 already load data from a database differently from what suggested by the text of the laboratory.
`

'use strict';

const sqlite = require('sqlite3');
const dayjs = require('dayjs');

function formatDate(date) {
    // date: dayjs object
    if (date.isValid())
        return date.format("MMMM DD");
    
    return "NULL";
}

function Task(id, description, isUrgent, isPrivate, deadline) {
    this.id = id;
    this.description = description;
    this.isUrgent = true;
    this.isPrivate = true;
    this.deadline = deadline; // dayjs object

    if (isUrgent == 0){
        this.isUrgent = false;
    }

    if (isPrivate == 0){
        this.isPrivate = false;
    }

    this.toString = () => (description + ` - Urgent: ${this.isUrgent}, Private: ${this.isPrivate}, Deadline: ${formatDate(this.deadline)}`);
}

function TaskList(){
    this.tasks = [];

    this.addTask = (task) => {this.tasks.push(task)};

    this.toString = () => (this.tasks.map((task) => task.toString())).join('\n');

    this.sortAndPrint = () => {
        this.tasks.sort((task1, task2) => {
            if (!task1.deadline.isValid() || task1.deadline.isAfter(task2.deadline))
                return 1;
            return -1;
        });

        return this.toString();
    };

    this.filterAndPrint = () => {
        return this.tasks.filter((task) => task.isUrgent).toString();
    };
}

function getAll() {
    const db = new sqlite.Database('tasks.sqlite', (err) => {if(err) throw err});
    const myTasks = new TaskList();

    // Asynchronous code
    return new Promise((resolve, reject) => {
        const sql = "SELECT * FROM tasks";
        db.all(sql, (err, rows) => {
            if(err){
                reject(err);
            } else {
                for (let row of rows) {
                    myTasks.addTask(new Task(
                        row.id, row.description, row.urgent, row.private, dayjs(row.deadline)
                    ));
                }
                resolve(myTasks);
            }
        })
    });
}

function getByDeadline(deadline) {
    // Load and print records after a given deadline
    const db = new sqlite.Database('tasks.sqlite', (err) => {if(err) throw err});
    const myTasks = new TaskList();

    // Asynchronous code
    return new Promise((resolve, reject) => {

        // Parametric query
        const sql = `
        SELECT *
        FROM tasks
        WHERE deadline > ?
        `;

        // Alphabetic comparison of date: https://stackoverflow.com/questions/10876105/how-to-compare-two-dates-in-sqlite
        db.all(sql, [deadline.format("YYYY-MM-DDTHH:mm:ss.SSSZ[Z]")], (err, rows) => {
            if(err){
                reject(err);
            } else {
                for (let row of rows) {
                    myTasks.addTask(new Task(
                        row.id, row.description, row.urgent, row.private, dayjs(row.deadline)
                    ));
                }
                resolve(myTasks);
            }
        })
    });
}

function getBySubject(word) {
    // Load and print records after a given deadline
    const db = new sqlite.Database('tasks.sqlite', (err) => {if(err) throw err});
    const myTasks = new TaskList();

    // Asynchronous code
    return new Promise((resolve, reject) => {

        // Parametric query
        const sql = `
        SELECT *
        FROM tasks
        WHERE description LIKE ?
        `;

        // Alphabetic comparison of date: https://stackoverflow.com/questions/10876105/how-to-compare-two-dates-in-sqlite
        db.all(sql, ['%' + word + '%'], (err, rows) => {
            if(err){
                reject(err);
            } else {
                for (let row of rows) {
                    myTasks.addTask(new Task(
                        row.id, row.description, row.urgent, row.private, dayjs(row.deadline)
                    ));
                }
                resolve(myTasks);
            }
        })
    });
}

async function main() {
    // const myTasks = await getByDeadline(dayjs("2021-03-10"));
    // const myTasks = await getByDeadline(dayjs("2021-03-10"));
    const myTasks = await getBySubject("laundry");
    console.log(myTasks.toString());
}

main();