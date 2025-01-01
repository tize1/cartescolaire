import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, FloatingLabel } from 'react-bootstrap';

function FormAddSchool() {
  const [currentStep, setCurrentStep] = useState(0);

  // Étapes du formulaire
  const steps = [
    <div key="step1">
      <h2 className="animated">Ajouter un Établissement</h2>
      <FloatingLabel controlId="schoolName" label="Nom de l'école" className="mb-3">
        <Form.Control type="text" placeholder="Nom de l'école" required />
      </FloatingLabel>
      <FloatingLabel controlId="POBOX" label="Boîte Postale" className="mb-3">
        <Form.Control type="text" placeholder="Boîte Postale" />
      </FloatingLabel>
      <FloatingLabel controlId="longitude" label="Longitude" className="mb-3">
        <Form.Control type="number" step="0.000001" placeholder="Longitude" required />
      </FloatingLabel>
      <FloatingLabel controlId="latitude" label="Latitude" className="mb-3">
        <Form.Control type="number" step="0.000001" placeholder="Latitude" required />
      </FloatingLabel>
      <FloatingLabel controlId="imageURL" label="URL de l'image" className="mb-3">
        <Form.Control type="url" placeholder="URL de l'image" />
      </FloatingLabel>
    </div>,
    <div key="step2">
      <h2 className="animated">Ajouter la description de l'établissement</h2>
      <FloatingLabel controlId="language" label="Langue d'enseignement" className="mb-3">
        <Form.Control type="text" placeholder="Langue d'enseignement" required />
      </FloatingLabel>
      <FloatingLabel controlId="preinscriptionFees" label="Frais de préinscription" className="mb-3">
        <Form.Control type="number" placeholder="Frais de préinscription" />
      </FloatingLabel>
      <FloatingLabel controlId="contact" label="Contact" className="mb-3">
        <Form.Control type="tel" placeholder="Contact" />
      </FloatingLabel>
      <Form.Group controlId="typeEtablissement" className="mb-3">
        <Form.Label>Type d'établissement</Form.Label>
        <Form.Select>
          <option value="Public">Public</option>
          <option value="Privé">Privé</option>
          <option value="Maternelle">Maternelle</option>
          <option value="Secondaire">Secondaire</option>
          <option value="Supérieur">Supérieur</option>
        </Form.Select>
      </Form.Group>
    </div>,
    <div key="step3">
      <h2 className="animated">Ajouter une infrastructure</h2>
      <Form.Group controlId="infrastructureImage" className="mb-3">
        <Form.Label>Image de l'infrastructure</Form.Label>
        <Form.Control type="file" placeholder="Image de l'infrastructure" />
      </Form.Group>
      <Form.Group controlId="infrastructureType" className="mb-3">
        <Form.Label>Type d'infrastructure</Form.Label>
        <Form.Select>
          <option value="Cantine">Cantine</option>
          <option value="Gym">Gymnase</option>
          <option value="Library">Bibliothèque</option>
          <option value="Computer park">Parc informatique</option>
          <option value="Other">Autre</option>
        </Form.Select>
      </Form.Group>
    </div>,
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };

  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulaire soumis");   // ajouter le code d'enregistrement ici
  };

  return (
    <div style={{ backgroundImage: `url('/Layer.png')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundRepeat: 'no-repeat', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={6}>
            <Form className="p-4 border rounded bg-light shadow" onSubmit={handleSubmit}>
              {steps[currentStep]}
              <div className="d-flex justify-content-between mt-3">
                {currentStep > 0 && <Button variant="secondary" onClick={handlePrev}>Précédent</Button>}
                {currentStep < steps.length - 1 ? <Button variant="primary" onClick={handleNext}>Suivant</Button> : <Button variant="success" type="submit">Soumettre</Button>}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default FormAddSchool;
