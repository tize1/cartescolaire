import React, { useState } from 'react';
import { Navbar, Nav, Form, Button, Container, Row, Col, Modal } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';

// Établissements avec leurs coordonnées, détails et notation
const establishments = [
  {
    id: 1,
    name: 'Établissement 1',
    lat: 12.122,
    lng: 15.045,
    image: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Établissement+1',
    details: 'Détails de l’établissement 1...',
    rating: 4,  // Notation sur 5
    link: '/description/1',
  },
  {
    id: 2,
    name: 'Établissement 2',
    lat: 12.123,
    lng: 15.046,
    image: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Établissement+2',
    details: 'Détails de l’établissement 2...',
    rating: 3,  // Notation sur 5
    link: '/description/2',
  },
  {
    id: 3,
    name: 'Établissement 3',
    lat: 12.124,
    lng: 15.047,
    image: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=Établissement+3',
    details: 'Détails de l’établissement 3...',
    rating: 5,  // Notation sur 5
    link: '/description/3',
  },
];

// Composant pour afficher les étoiles
const Rating = ({ rating }) => {
  const stars = [];
  for (let i = 0; i < 5; i++) {
    stars.push(
      <span key={i} style={{ color: i < rating ? '#FFD700' : '#ccc' }}>
        &#9733;
      </span>
    );
  }
  return <div>{stars}</div>;
};

function Home() {
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    infrastructure: '',
    language: '',
    proximity: ''
  });

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Données du formulaire :', formData); // afficher les elements tries 
    handleClose();
  };

  const customIcon = new L.Icon({
    iconUrl: '/map-marker.png',
    iconSize: [50, 50],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30]
  });

  return (
    <div>
      <Navbar bg="light" expand="lg">
        <Navbar.Brand href="#home">
          <Link to="/">
            <img
              src="/map-marker.png"
              width="30"
              height="30"
              className="d-inline-block align-top"
              alt="Logo Application"
            />
          </Link>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Form className="d-flex ms-auto">
            <Form.Control
              type="search"
              placeholder="Rechercher"
              className="me-2"
              aria-label="Search"
            />
            <Button variant="primary">Chercher</Button>
          </Form>
          <Nav className="ms-auto">
            <Button variant="outline-primary" onClick={handleShow}>
              Filtrer
            </Button>
            <Button variant="outline-secondary" className="ms-3">
              Contacter
            </Button>
            <Link to="/AuthForm">
              <Button variant="outline-primary" className="ms-3">Login</Button>
            </Link>
            <Link to="/Admin">
              <Button variant="outline-primary" className="ms-3">Admin</Button>
            </Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <MapContainer
        center={[12.122, 15.045]}
        zoom={17}
        style={{ height: '400px', marginTop: '20px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {establishments.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={customIcon}
          >
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      <Container className="mt-4">
        <Row>
          {establishments.map((place) => (
            <Col key={place.id} xs={12} sm={6} md={4} className="mb-3">
              <div className="d-flex flex-column border bg-light p-3" style={{ minHeight: '300px' }}>
                <div className="flex-grow-1">
                  <img
                    src={place.image}
                    alt={place.name}
                    style={{ width: '100%', height: '150px', objectFit: 'cover' }}
                  />
                </div>
                <div className="bg-secondary text-white text-center p-3 mt-auto">
                  <h5>{place.name}</h5>
                  <p>{place.details}</p>
                  {/* Affichage des étoiles */}
                  <Rating rating={place.rating} />
                  <Link to={place.link}>
                    <Button variant="primary" className="mt-2">Voir Plus</Button>
                  </Link>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Filtrer les établissements</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group controlId="formInfrastructure">
              <Form.Label>Infrastructure</Form.Label>
              <Form.Control
                as="select"
                name="infrastructure"
                value={formData.infrastructure}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez une option</option>
                <option value="Salle informatique">Salle informatique</option>
                <option value="Bibliotheque">Bibliotheque</option>
                <option value="Terrain de sport">Terrain de sport</option>
                <option value="Cantine">Cantine</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formLanguage" className="mt-3">
              <Form.Label>Langue</Form.Label>
              <Form.Control
                as="select"
                name="language"
                value={formData.language}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez une langue</option>
                <option value="francais">Français</option>
                <option value="anglais">Anglais</option>
                <option value="bilingue">Bilingue</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="formProximity" className="mt-3">
              <Form.Label>Proximité</Form.Label>
              <Form.Control
                as="select"
                name="proximity"
                value={formData.proximity}
                onChange={handleChange}
                required
              >
                <option value="">Sélectionnez une proximité</option>
                <option value="5km">5 km</option>
                <option value="10km">10 km</option>
                <option value="15km">15 km</option>
              </Form.Control>
            </Form.Group>

            <div className="mt-3 text-center">
              <Button variant="primary" type="submit">
                Appliquer les filtres
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Home;
