import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup';

import dayjs from 'dayjs';

// Fontawesome: see https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserCircle, faUser} from '@fortawesome/free-solid-svg-icons';
import { faCheckSquare} from '@fortawesome/free-regular-svg-icons';

library.add(faUserCircle, faUser, faCheckSquare);



// This is a React Component
function App() {

  // Returns a React Element. JSX syntax
  return (
    <div className="App">
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

      <Container fluid>

        <Row className='vheight-100'>
          <Col as='aside' className='pt-2' md={3}>
            <ListGroup variant="flush" defaultActiveKey="#all">
              <ListGroup.Item action href="#all" className="text-secondary">All</ListGroup.Item>
              <ListGroup.Item action href="#important" className="text-secondary">Important</ListGroup.Item>
              <ListGroup.Item action href="#today" className="text-secondary">Today</ListGroup.Item>
              <ListGroup.Item action href="#next-week" className="text-secondary">Next 7 Days</ListGroup.Item>
              <ListGroup.Item action href="#private" className="text-secondary">Private</ListGroup.Item>
            </ListGroup>
          </Col>

          <Col as='main' sm={9}>
            <h1 className="pt-1 filter-heading d-flex justify-content-left">All</h1>

              <ListGroup as="ul" variant="flush">

                <ListGroup.Item as={Row} className="gx-0 mx-0 d-flex todo-item important">
                  <Form.Group controlId="1" as={Col} xs={6} className="gx-0">
                    <Form.Check type="checkbox" label="Complete Lab 4"/>
                  </Form.Group>

                  <Col as="span" xs={1}>
                    <FontAwesomeIcon icon={faUser} />
                  </Col>

                  <Col as="span" xs={5} className="date">
                    {dayjs('2022-01-25').format('DD MMM YYYY')}
                  </Col>
                </ListGroup.Item>



                <ListGroup.Item as={Row} className="gx-0 mx-0 d-flex todo-item">
                  <Form.Group controlId="2" as={Col} xs={6}>
                    <Form.Check type="checkbox" label="Buy some groceries" />
                  </Form.Group>

                  <Col as="span" xs={1}>
                  </Col>

                  <Col as="span" xs={5} className="date">
                  {dayjs('2022-01-10').format('DD MMM YYYY')}
                  </Col>
                </ListGroup.Item>

                <ListGroup.Item as={Row} className="gx-0 mx-0 d-flex todo-item">
                  <Form.Group controlId="1" as={Col} xs={6}>
                    <Form.Check type="checkbox" label="Read a good book!" />
                  </Form.Group>

                  <Col as="span" xs={1}>
                  </Col>

                  <Col as="span" xs={5} className="date">
                  {dayjs('2022-02-25').format('DD MMM YYYY')}
                  </Col>
                </ListGroup.Item>

                <ListGroup.Item as={Row} className="gx-0 mx-0 d-flex todo-item">
                  <Form.Group controlId="1" as={Col} xs={6}>
                    <Form.Check type="checkbox" label="Watch Mr. Robot" />
                  </Form.Group>

                  <Col as="span" xs={1}>
                    <FontAwesomeIcon icon={faUser} />
                  </Col>

                  <Col as="span" xs={5} className="date">
                    
                  </Col>
                </ListGroup.Item>

              </ListGroup>

          </Col>

        </Row>

      </Container>

    </div>
  );
}

// Needed to make it importable (index.js)
export default App;
