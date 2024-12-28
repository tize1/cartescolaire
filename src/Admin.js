import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col, Navbar, Nav, Button, NavDropdown, Card, ListGroup } from 'react-bootstrap';

const Admin = () => {
  return (
    <div>
      {/* Navbar */}
      <Navbar bg="primary" variant="dark" expand="lg">
        <Navbar.Brand href="#home">Admin Dashboard</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
          <Nav.Link><Link class="text-light" to="/">Home</Link></Nav.Link>
            <Nav.Link href="#features">Features</Nav.Link>
            <NavDropdown title="Settings" id="basic-nav-dropdown">
              <NavDropdown.Item href="#action/3.1">Profile</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.2">Account Settings</NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3"><Link to="/AuthAdmin">Logout</Link></NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Container fluid className="mt-4">
        <Row>
          {/* Sidebar */}
          <Col md={3} className="bg-light p-3">
            <h4>Dashboard</h4>
            <ListGroup>
              <ListGroup.Item action href="#link1"><Link to="/Admin">Dashboard</Link></ListGroup.Item>
              <ListGroup.Item action href="#link2">Manage Users</ListGroup.Item>
              <ListGroup.Item action href="#link3">Notifications</ListGroup.Item>
              <ListGroup.Item action href="#link4"><Link to="/">Manage School</Link></ListGroup.Item>
              <ListGroup.Item action href="#link5"><Link to="/FormAddSchool">Add School</Link></ListGroup.Item>
              <ListGroup.Item action href="#link6">Reports</ListGroup.Item>
              <ListGroup.Item action href="#link7"><Link to="/AuthAdmin">Logout</Link></ListGroup.Item>
            </ListGroup>
          </Col>

          {/* Main Content */}
          <Col md={9}>
            <h2>Welcome to the Admin Dashboard</h2>
            <Row>
              <Col md={4}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Manage Users</Card.Title>
                    <Card.Text>
                      View and manage new user registrations.
                    </Card.Text>
                    <Button variant="primary">Go to Users</Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Manage School</Card.Title>
                    <Card.Text>
                      Manage customer orders and track their progress.
                    </Card.Text>
                    <Button variant="primary">View Schools</Button>
                  </Card.Body>
                </Card>
              </Col>

              <Col md={4}>
                <Card className="mb-4">
                  <Card.Body>
                    <Card.Title>Reports</Card.Title>
                    <Card.Text>
                      Generate reports about sales, users, and traffic.
                    </Card.Text>
                    <Button variant="primary">Generate Report</Button>
                  </Card.Body>
                </Card>
              </Col>
            </Row>

            {/* Recent Activity */}
            <h3>Recent Activity</h3>
            <ListGroup>
              <ListGroup.Item>Order #1234 has been shipped.</ListGroup.Item>
              <ListGroup.Item>User "John Doe" registered.</ListGroup.Item>
              <ListGroup.Item>New report generated for sales.</ListGroup.Item>
            </ListGroup>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Admin;
