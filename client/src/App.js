import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Weather from './weather'; 
import WaterUsage from './waterusage';
import CropRot from './crop_rot';
import image from './image.png';
import image2 from './WhatsApp Image 2024-09-13 at 19.56.39_2f6acfdf.jpg';
import image1 from './WhatsApp Image 2024-09-13 at 20.00.13_26673f34.jpg'
import './App.css';

function App() {
  const cards = [
    {
      title: 'Weather Data',
      text: 'View real-time weather updates to optimize crop predictions, ensuring precise planning and improved yield outcomes for your farm.',
      image: image,
      path: '/weather',
    },
    {
      title: 'Water analysis',
      text: 'Water analysis in agriculture is crucial for assessing quality and nutrient content, helping farmers optimize irrigation, improve soil health, and enhance crop yields.',
      image: image2,
      path: '/waterusage',
    },
    {
      title: 'Crop Rotations',
      text: 'Crop rotation is the practice of alternating different crops in the same field across seasons to improve soil health, reduce pests, and enhance crop yield.',
      image: image1,
      path: '/crop_rot',
    },
    {
      title: 'Card',
      text: 'This is a card with a very long text that will wrap to multiple lines.',
      image: 'https://via.placeholder.com/416x280?text=Card',
      path: '/',
    },
    {
      title: 'Card',
      text: 'This is a card with a very long text that will wrap to multiple lines.',
      image: 'https://via.placeholder.com/416x280?text=Card',
      path: '/',
    },
    {
      title: 'Card',
      text: 'This is a card with a very long text that will wrap to multiple lines.',
      image: 'https://via.placeholder.com/416x280?text=Card',
      path: '/',
    },
    {
      title: 'Card',
      text: 'This is a card with a very long text that will wrap to multiple lines.',
      image: 'https://via.placeholder.com/416x280?text=Card',
      path: '/',
    },
  ];

  return (
    <Router>
      <Navbar expand="lg" className="bg-body-tertiary">
        <Container fluid>
          <Navbar.Brand style={{fontSize:'100px',background:'linear-gradient(40deg, rgba(100,255,150,1) 0%, rgba(60,205,215,1) 100%)',WebkitBackgroundClip: 'text',WebkitTextFillColor: 'transparent'}}><h3><a>greenGrow</a></h3></Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link as={Link} to="/">Home</Nav.Link>
              <Nav.Link href="#action2">Link</Nav.Link>
              <NavDropdown title="Link" id="navbarScrollingDropdown">
                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action4">Another action</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action5">Something else here</NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="#" disabled>Link</Nav.Link>
            </Nav>
            <Form className="d-flex">
              <Form.Control
                type="search"
                placeholder="Search"
                className="me-2"
                aria-label="Search"
              />
              <Button variant="outline-success">Search</Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Container className="mt-4">
        <Routes>
          <Route 
            path="/" 
            element={
              <Row xs={1} md={2} className="g-4">
                {cards.map((card, idx) => (
                  <Col key={idx}>
                    <Link to={card.path} style={{ textDecoration: 'none', color: 'inherit' }}>
                      <Card style={{height:'80vh', border:'2px solid grey', boxShadow:'0px 0px 10px rgba(0, 0, 0, 0.5)'}}>
                        <Card.Img variant="top" src={card.image} style={{objectFit: 'cover', height: '100%', width: '100%', border:'1px solid black'}}/>
                        <Card.Body>
                          <Card.Title>{card.title}</Card.Title>
                          <Card.Text>{card.text}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            }
          />
          <Route path="/weather" element={<Weather/>} />
          <Route path="/waterusage" element={<WaterUsage/>} />
          <Route path="/crop_rot" element={<CropRot/>} />
          <Route path="*" element={<h1>404 - Page Not Found</h1>} />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
