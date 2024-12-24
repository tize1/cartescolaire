import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Button } from 'react-bootstrap';

const Home = () => {
  return (
    <Container className="mt-4">
      <h2>Welcome to the Home Page</h2>
      <Link to="/admin">
        <Button variant="primary">Go to Admin Page</Button>
      </Link>
    </Container>
  );
};

export default Home;
