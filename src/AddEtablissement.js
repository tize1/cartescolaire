import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, FloatingLabel, Modal } from 'react-bootstrap';

function FormAddSchool() {
  const [currentStep, setCurrentStep] = useState(0);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contacts, setContacts] = useState([]);
  const [infrastructures, setInfrastructures] = useState([]);

  const steps = [
    <div key="step1">
      <h2 className="animated">Ajouter un Établissement</h2>
      <FloatingLabel controlId="schoolName" label="Nom de l'école" className="mb-3">
        <Form.Control name="schoolName" type="text" placeholder="Nom de l'école" required />
      </FloatingLabel>
      <FloatingLabel controlId="POBOX" label="Boîte Postale" className="mb-3">
        <Form.Control name="POBOX" type="text" placeholder="Boîte Postale" />
      </FloatingLabel>
      <FloatingLabel controlId="longitude" label="Longitude" className="mb-3">
        <Form.Control name="longitude" type="number" step="0.000001" placeholder="Longitude" required />
      </FloatingLabel>
      <FloatingLabel controlId="latitude" label="Latitude" className="mb-3">
        <Form.Control name="latitude" type="number" step="0.000001" placeholder="Latitude" required />
      </FloatingLabel>
      <Form.Group controlId="schoolImage" className="mb-3">
        <Form.Label>Image de l'établissement</Form.Label>
        <Form.Control name="schoolImage" type="file" accept="image/*" required />
      </Form.Group>
    </div>,
    <div key="step2">
      <h2 className="animated">Ajouter la description de l'établissement</h2>
      <Form.Group controlId="language" className="mb-3">
        <Form.Label>Langue d'enseignement</Form.Label>
        <Form.Select name="language" required>
          <option value="Francais">Français</option>
          <option value="Anglais">Anglais</option>
          <option value="Billingue">Bilingue</option>
        </Form.Select>
      </Form.Group>
      <FloatingLabel controlId="preinscriptionFees" label="Frais de préinscription" className="mb-3">
        <Form.Control name="preinscriptionFees" type="number" placeholder="Frais de préinscription" />
      </FloatingLabel>
      <FloatingLabel controlId="contact" label="Contact" className="mb-3">
        <Form.Control
          name="contact"
          type="text"
          placeholder="Contact"
          onClick={() => setShowContactModal(true)}
          readOnly
        />
      </FloatingLabel>
      <Form.Group controlId="typeEtablissement" className="mb-3">
        <Form.Label>Type d'établissement</Form.Label>
        <Form.Select name="typeEtablissement" required>
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
      {infrastructures.map((infra, index) => (
        <div key={index} className="mb-3">
          <Form.Group controlId={`infrastructureImage${index}`} className="mb-3">
            <Form.Label>Image de l'infrastructure</Form.Label>
            <Form.Control name={`infrastructureImage${index}`} type="file" accept="image/*" placeholder="Image de l'infrastructure" />
          </Form.Group>
          <Form.Group controlId={`infrastructureType${index}`} className="mb-3">
            <Form.Label>Type d'infrastructure</Form.Label>
            <Form.Select name={`infrastructureType${index}`} required>
              <option value="Cantine">Cantine</option>
              <option value="Gym">Gymnase</option>
              <option value="Library">Bibliothèque</option>
              <option value="Computer park">Parc informatique</option>
              <option value="Other">Autre</option>
            </Form.Select>
          </Form.Group>
        </div>
      ))}
      <Button variant="secondary" onClick={() => setInfrastructures([...infrastructures, {}])}>
        Ajouter une infrastructure
      </Button>
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
    const formData = new FormData(e.target);

    fetch('http://localhost:8080/api/schools', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          alert('Formulaire soumis avec succès !');
        } else {
          alert('Une erreur est survenue.');
        }
      })
      .catch((error) => {
        console.error('Erreur:', error);
        alert('Impossible d\'envoyer les données.');
      });

    console.log("Formulaire soumis");
  };

  const handleContactTypeChange = (index, type) => {
    const updatedContacts = [...contacts];
    updatedContacts[index].type = type;
    setContacts(updatedContacts);
  };

  const handleContactChange = (index, value) => {
    const updatedContacts = [...contacts];
    updatedContacts[index].value = value;
    setContacts(updatedContacts);
  };

  return (
    <div
      style={{
        backgroundImage: `url('/Layer.png')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={10} lg={6}>
            <Form className="p-4 border rounded bg-light shadow" onSubmit={handleSubmit}>
              {steps[currentStep]}
              <div className="d-flex justify-content-between mt-3">
                {currentStep > 0 && (
                  <Button variant="secondary" onClick={handlePrev}>
                    Précédent
                  </Button>
                )}
                {currentStep < steps.length - 1 ? (
                  <Button variant="primary" onClick={handleNext}>
                    Suivant
                  </Button>
                ) : (
                  <Button variant="success" type="submit">
                    Soumettre
                  </Button>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>

      <Modal show={showContactModal} onHide={() => setShowContactModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Ajouter des contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            {contacts.map((contact, index) => (
              <div key={index} className="mb-3">
                <Form.Group controlId={`contactType${index}`} className="mb-3">
                  <Form.Label>Type de contact {index + 1}</Form.Label>
                  <Form.Select
                    value={contact.type || ''}
                    onChange={(e) => handleContactTypeChange(index, e.target.value)}
                    required
                  >
                    <option value="">Sélectionner un type</option>
                    <option value="email">Email</option>
                    <option value="tel">Numéro de téléphone</option>
                    <option value="url">Lien</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group controlId={`contactValue${index}`} className="mb-3">
                  <Form.Label>Contact {index + 1}</Form.Label>
                  <Form.Control
                    type={contact.type === 'email' ? 'email' : contact.type === 'tel' ? 'tel' : 'text'}
                    value={contact.value || ''}
                    onChange={(e) => handleContactChange(index, e.target.value)}
                    placeholder={`Entrez le ${contact.type || 'contact'}`}
                    required
                  />
                </Form.Group>
              </div>
            ))}
            <Button
              variant="secondary"
              onClick={() => setContacts([...contacts, { type: '', value: '' }])}
            >
              Ajouter un autre contact
            </Button>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShowContactModal(false)}>
            Valider
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default FormAddSchool;
