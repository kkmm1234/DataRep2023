import './App.css';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './components/content';
import CreateLocation from './components/createLocation';
import EditLocation from './components/editLocation';
import MyTravel from './components/mytravel';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';


function App() {
  return (
    <BrowserRouter>
    <div className="App">
       <Navbar bg="light" data-bs-theme="light">
        <Container>
          <Navbar.Brand href="/">Travel&Track</Navbar.Brand>
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <Nav.Link href="/createLocation">CreateLocation</Nav.Link>
            <Nav.Link href="/myTravel">myTravel</Nav.Link>
          </Nav>
        </Container>
      </Navbar>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/myTravel' element={<MyTravel></MyTravel>}></Route>
        <Route path='/createLocation' element={<CreateLocation></CreateLocation>}></Route>
        <Route path='/edit/:id' element={<EditLocation></EditLocation>}></Route>
      </Routes>
    </div>
    </BrowserRouter>
  );
}

export default App;
