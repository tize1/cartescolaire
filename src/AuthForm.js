import React, { useState } from "react";
import { Form, Button, Container, Row, Col, FloatingLabel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AuthForm() {
  const [isLogin, setIsLogin] = useState(true); // État pour basculer entre Login et Signup

  // Gestion de la soumission des formulaires
  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLogin) {
      console.log("Connexion réussie");
    } else {
      console.log("Inscription réussie");
    }
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
              <h2 className="text-center mb-4">{isLogin ? "Connexion" : "Inscription"}</h2>
              <Form onSubmit={handleSubmit}>
                {!isLogin && (
                  <FloatingLabel
                    controlId="fullName"
                    label="Nom complet"
                    className="mb-3"
                  >
                    <Form.Control
                      type="text"
                      placeholder="Votre nom complet"
                      required
                    />
                  </FloatingLabel>
                )}
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
                  {isLogin ? "Se connecter" : "S'inscrire"}
                </Button>
              </Form>
              <div className="text-center mt-3">
                <Button
                  variant="link"
                  onClick={() => setIsLogin(!isLogin)}
                  className="text-decoration-none"
                >
                  {isLogin
                    ? "Pas encore inscrit ? Créez un compte"
                    : "Déjà un compte ? Connectez-vous"}
                </Button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AuthForm;
