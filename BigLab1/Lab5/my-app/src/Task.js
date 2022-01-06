
function Task(id, description, isUrgent=true, isPrivate=true, deadline=undefined) {
    this.id = id;
    this.description = description;
    this.isUrgent = isUrgent;
    this.isPrivate = isPrivate;
    this.deadline = deadline; // dayjs object


    if (isUrgent === 0){
        this.isUrgent = false;
    }

    if (isPrivate === 0){
        this.isPrivate = false;
    }

}

export { Task };