import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import { useState } from 'react';

// Fontawesome: see https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle, faUser} from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare } from '@fortawesome/free-regular-svg-icons';

import dayjs from 'dayjs';


function ManagerNavbar(props) {
    return (
        <Navbar variant="dark" className='d-flex justify-content-between px-2 navbar-custom'>
        <Navbar.Brand href='#'> <FontAwesomeIcon icon={faCheckSquare}/> <span> ToDo Manager</span></Navbar.Brand>
        
        <Form className="d-flex">
          <FormControl
            type="search"
            placeholder="Search"
            className="me-2"
            aria-label="Search"
          />
        </Form>
        
        <a className="text-light" href="https://www.francescomontagna.com" target="_blank" rel='noreferrer'><FontAwesomeIcon icon={faUserCircle} size='lg'/></a>

      </Navbar>
    );
}


function MainComponent(props) {
    const [tasks, setTasks] = useState(props.tasks);
    const [header, setHeader] = useState("All");

    return(
        <Row className='vheight-100'>
            <Col as='aside' className='pt-2' md={3}>
            <ManagerFilters tasks={props.tasks} setTasks={setTasks} header={header} setHeader={setHeader} />
            </Col>

            <Col as='main' sm={9}>
                <h1 className="pt-1 filter-heading d-flex justify-content-left">{header}</h1>
                <TaskList tasks={tasks}/>
            </Col>
        </Row>
    );
}

// Needed in order to keep track of the active state
function ManagerFilters(props) {

    // Implement all the task filters
    const allFilter = () => {
        props.setTasks(props.tasks);
        props.setHeader("All");
    }
    
    const importantFilter = () => {
         props.setTasks(() => props.tasks.filter(t => t.isUrgent));
         props.setHeader("Important");
    }

    const privateFilter = () => {
        props.setTasks(() => props.tasks.filter(t => t.isPrivate));
        props.setHeader("Private");
    }

    const todayFilter = () => {
        // TODO Fix
        const now = dayjs();
        props.setTasks(
            props.tasks.filter(
                task => task.hasDeadline ? task.deadline.date() === now.date() && task.deadline.month() === now.month() && task.deadline.year() === now.year() : false
            )
        );

        props.setHeader("Today");
    }

    const nextWeekFilter = () => {

    }

    return (
        <ListGroup variant="flush" defaultActiveKey="#all">
            <ListGroup.Item action href="#all" className="text-secondary" onClick={() => allFilter()}>All</ListGroup.Item>
            <ListGroup.Item action href="#important" className="text-secondary" onClick={() => importantFilter()}>Important</ListGroup.Item>
            <ListGroup.Item action href="#today" className="text-secondary" onClick={() => todayFilter()}>Today</ListGroup.Item>
            <ListGroup.Item action href="#next-week" className="text-secondary" onClick={() => nextWeekFilter()}>Next 7 Days</ListGroup.Item>
            <ListGroup.Item action href="#private" className="text-secondary" onClick={() => privateFilter()}>Private</ListGroup.Item>
        </ListGroup>
    );
}


// Needed to interact with filters
function TaskList(props) {
    return (<ListGroup as="ul" variant="flush">
        {props.tasks.map( t => <ReactTask key={t.id} description={t.description} urgent={t.isUrgent} private={t.isPrivate} deadline={t.deadline}/>)}
    </ListGroup>);
}

function ReactTask(props){
    let groupItemClass = "gx-0 mx-0 d-flex todo-item";

    if (props.urgent)
        groupItemClass += " important";

    return (
        <ListGroup.Item as={Row} className={groupItemClass}>
            <Form.Group controlId="1" as={Col} xs={6} className="gx-0">
            <Form.Check type="checkbox" label={props.description}/>
            </Form.Group>

            <Col as="span" xs={1}>
                {props.private && <FontAwesomeIcon icon={faUser} /> /* Conditionally render an element*/} 
            </Col>

            <Col as="span" xs={5} className="date">
                {props.deadline !== undefined && props.deadline}
            </Col>
        </ListGroup.Item>
    );
}

export {ManagerNavbar, MainComponent};