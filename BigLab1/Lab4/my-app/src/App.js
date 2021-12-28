import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col'; 
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import ListGroup from 'react-bootstrap/ListGroup'

// Fontawesome: see https://fontawesome.com/v5.15/how-to-use/on-the-web/using-with/react
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { library } from '@fortawesome/fontawesome-svg-core'
import { faUserCircle, faUser} from '@fortawesome/free-solid-svg-icons';

library.add(faUserCircle, faUser);



// This is a React Component
function App() {

  // Returns a React Element. JSX syntax
  return (
    <div className="App">
      <Navbar bg='success' className='d-flex justify-content-between px-2'>
        <Navbar.Brand href='#'><span> ToDo Manager</span></Navbar.Brand>
        
      <Form className="d-flex">
        <FormControl
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"
        />
      </Form>
      
      <a class="text-light" href="https://www.francescomontagna.com" target="_blank" rel='noreferrer'><FontAwesomeIcon icon={faUserCircle} size='lg'/></a>

      </Navbar>

      <Container fluid>

        <Row>
          

          <Col as='aside' md={3}>
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>
              Cras justo odio
            </ListGroup.Item>
            <ListGroup.Item as="li">Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item as="li" disabled>
              Morbi leo risus
            </ListGroup.Item>
            <ListGroup.Item as="li">Porta ac consectetur ac</ListGroup.Item>
          </ListGroup>
            {/* <ul class="list-unstyled list-group list-group-flush">
              <li id="all" class="aside-navbar-el list-group-item"><a class="text-secondary" href="#top">All</a></li>
              <li id="important" class="aside-navbar-el list-group-item"><a class="text-secondary" href="#top">Important</a></li>
              <li id="today" class="aside-navbar-el list-group-item"><a class="text-secondary" href="#top">Today</a></li>
              <li id="next-week" class="aside-navbar-el list-group-item"><a class="text-secondary" href="#top">Next 7 Days</a></li>
              <li id="private" class="aside-navbar-el list-group-item"><a class="text-secondary" href="#top">Private</a></li>
            </ul> */}
          </Col>

          <Col as='main'>
            <p>
              This is the main section
            </p>
          </Col>

        </Row>

      </Container>

    </div>
  );
}

// Needed to make it importable (index.js)
export default App;
