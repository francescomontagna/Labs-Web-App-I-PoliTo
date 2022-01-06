import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Container from 'react-bootstrap/Container';

import dayjs from 'dayjs';

import { ManagerNavbar, MainComponent} from './ManagerComponents';
import { Task } from './Task';


const tasks = [
  new Task(1, 'Complete Lab 4', 1, 1, dayjs('01/25/2022').format('DD MMM YYYY')),
  new Task(2, 'Buy some groceries', 0, 0, dayjs('01/06/2022').format('DD MMM YYYY')),
  new Task(3, 'Read a good book!', 0, 0, dayjs('02/25/2022').format('DD MMM YYYY')),
  new Task(4, 'Watch Mr. Robot', 0, 1, undefined)
]


function App() {

  return (
    <div className="App">
      
      <ManagerNavbar />

      <Container fluid>
        <MainComponent tasks={tasks}/>
      </Container>

    </div>
  );
}

export default App;
