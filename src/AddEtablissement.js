import React, { useState } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const EtablissementForm = () => {
  const [formData, setFormData] = useState({
    nomEtabli: '',
    image: '',
    localisation: {
      coordonne: {
        latitude: '',
        longitude: '',
      },
      localite: {
        region: '',
        departement: '',
        arrondissement: '',
        ville: '',
      },
    },
    description: {
      scolarite: '',
      tauxreussite: '',
      langues: '',
      infrastructures: '',
    },
    typeEtablissement: {
      libelle: '',
    },
    contacts: [
      {
        typeContact: '',
        contenu: '',
      },
    ],
  });

  const handleChange = (e, field, nestedField, deeperField) => {
    const value = e.target.value;

    if (nestedField && deeperField) {
      setFormData({
        ...formData,
        [field]: {
          ...formData[field],
          [nestedField]: {
            ...formData[field][nestedField],
            [deeperField]: value,
          },
        },
      });
    } else if (nestedField) {
      setFormData({
        ...formData,
        [field]: {
          ...formData[field],
          [nestedField]: value,
        },
      });
    } else {
      setFormData({
        ...formData,
        [field]: value,
      });
    }
  };

  const handleContactChange = (e, index, field) => {
    const value = e.target.value;
    const updatedContacts = formData.contacts.map((contact, i) => (
      i === index ? { ...contact, [field]: value } : contact
    ));
    setFormData({ ...formData, contacts: updatedContacts });
  };

  const addContact = () => {
    setFormData({
      ...formData,
      contacts: [...formData.contacts, { typeContact: '', contenu: '' }],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:8080/api/etablissements', formData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('Data submitted successfully:', response.data);
    } catch (error) {
      console.error('Error submitting data:', error);
    }
  };

  return (
    <Container>
      <h1>Ajouter un Établissement</h1>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Nom de l'établissement</Form.Label>
          <Form.Control
            type="text"
            value={formData.nomEtabli}
            onChange={(e) => handleChange(e, 'nomEtabli')}
            placeholder="Entrer le nom"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <Form.Control
            type="text"
            value={formData.image}
            onChange={(e) => handleChange(e, 'image')}
            placeholder="Entrer l'URL de l'image"
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="text"
                value={formData.localisation.coordonne.latitude}
                onChange={(e) => handleChange(e, 'localisation', 'coordonne', 'latitude')}
                placeholder="Latitude"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="text"
                value={formData.localisation.coordonne.longitude}
                onChange={(e) => handleChange(e, 'localisation', 'coordonne', 'longitude')}
                placeholder="Longitude"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Région</Form.Label>
          <Form.Control
            type="text"
            value={formData.localisation.localite.region}
            onChange={(e) => handleChange(e, 'localisation', 'localite', 'region')}
            placeholder="Région"
          />
        </Form.Group>

        <Row>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Département</Form.Label>
              <Form.Control
                type="text"
                value={formData.localisation.localite.departement}
                onChange={(e) => handleChange(e, 'localisation', 'localite', 'departement')}
                placeholder="Département"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Arrondissement</Form.Label>
              <Form.Control
                type="text"
                value={formData.localisation.localite.arrondissement}
                onChange={(e) => handleChange(e, 'localisation', 'localite', 'arrondissement')}
                placeholder="Arrondissement"
              />
            </Form.Group>
          </Col>
          <Col>
            <Form.Group className="mb-3">
              <Form.Label>Ville</Form.Label>
              <Form.Control
                type="text"
                value={formData.localisation.localite.ville}
                onChange={(e) => handleChange(e, 'localisation', 'localite', 'ville')}
                placeholder="Ville"
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Scolarité</Form.Label>
          <Form.Control
            type="number"
            value={formData.description.scolarite}
            onChange={(e) => handleChange(e, 'description', 'scolarite')}
            placeholder="Scolarité"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Taux de Réussite</Form.Label>
          <Form.Control
            type="number"
            value={formData.description.tauxreussite}
            onChange={(e) => handleChange(e, 'description', 'tauxreussite')}
            placeholder="Taux de Réussite"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Langues</Form.Label>
          <Form.Control
            type="text"
            value={formData.description.langues}
            onChange={(e) => handleChange(e, 'description', 'langues')}
            placeholder="Langues"
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Type d'Établissement</Form.Label>
          <Form.Control
            type="text"
            value={formData.typeEtablissement.libelle}
            onChange={(e) => handleChange(e, 'typeEtablissement', 'libelle')}
            placeholder="Type d'Établissement"
          />
        </Form.Group>

        {formData.contacts.map((contact, index) => (
          <Row key={index} className="mb-3">
            <Col>
              <Form.Group>
                <Form.Label>Type de Contact</Form.Label>
                <Form.Control
                  type="text"
                  value={contact.typeContact}
                  onChange={(e) => handleContactChange(e, index, 'typeContact')}
                  placeholder="Type de Contact"
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Contenu</Form.Label>
                <Form.Control
                  type="text"
                  value={contact.contenu}
                  onChange={(e) => handleContactChange(e, index, 'contenu')}
                  placeholder="Contenu"
                />
              </Form.Group>
            </Col>
          </Row>
        ))}
        <Button onClick={addContact} className="mb-3">Ajouter un Contact</Button>

        <Button variant="primary" type="submit">Soumettre</Button>
      </Form>
    </Container>
  );
};

export default EtablissementForm;
