import Navbar from 'react-bootstrap/Navbar';
import FormControl from 'react-bootstrap/FormControl';
import Form from 'react-bootstrap/Form';
import ListGroup from 'react-bootstrap/ListGroup';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import useState from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserCircle} from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare, faUser } from '@fortawesome/free-regular-svg-icons';

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

// Needed in order to keep track of the active state
function ManagerFilters(props) {

    const [tasks, setTasks] = useState(props.tasks);

    // Implement all the task filters
    const allFilter = () => {
        return setTasks(props.tasks);
    }
    
    const importantFilter = () => {
         
    }

    return (
        undefined
    );
}


// Needed to interact with filters
function TaskList(props) {
    // pass the task as property
    return (<ListGroup as="ul" variant="flush">
        {props.tasks.map( t => <ReactTask key={t.id} description={t.description} urgent={t.isUrgent} private={t.isPrivate} deadline={t.deadline}/>)}
    </ListGroup>);
}

function ReactTask(props){
    let groupItemClass = "gx-0 mx-0 d-flex todo-item";

    if (props.isUrgent)
        groupItemClass += " important";

    return (
        <ListGroup.Item as={Row} className={groupItemClass}>
            <Form.Group controlId="1" as={Col} xs={6} className="gx-0">
            <Form.Check type="checkbox" label={props.description}/>
            </Form.Group>

            <Col as="span" xs={1}>
                {props.isPrivate && <FontAwesomeIcon icon={faUser} /> /* Conditionally render an element*/} 
            </Col>

            <Col as="span" xs={5} className="date">
                {props.deadline !== undefined && props.deadline}
            </Col>
        </ListGroup.Item>
    );
}

export {ManagerNavbar, TaskList};