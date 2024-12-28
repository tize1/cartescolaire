import React from "react";
import { Form, Button, Container, Row, Col, FloatingLabel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AuthAdmin() {
  // Gestion de la soumission du formulaire
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Admin connecté");
  };

  return (
    <div
    style={{
        backgroundImage: `url('/login.webp')`,
        backgroundSize: "500px",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={6} lg={5}>
            <div className="p-4 border rounded bg-light shadow">
              <h2 className="text-center mb-4">Connexion Admin</h2>
              <Form onSubmit={handleSubmit}>
                <FloatingLabel
                  controlId="email"
                  label="Adresse email"
                  className="mb-3"
                >
                  <Form.Control
                    type="email"
                    placeholder="name@example.com"
                    required
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="password"
                  label="Mot de passe"
                  className="mb-3"
                >
                  <Form.Control
                    type="password"
                    placeholder="Mot de passe"
                    required
                  />
                </FloatingLabel>
                <Button variant="primary" type="submit" className="w-100">
                  Se connecter
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AuthAdmin;
