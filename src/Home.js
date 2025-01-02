import React, { useState } from 'react';
import { Navbar, Nav, Form, Button, Container, Row, Col, Modal, Card } from 'react-bootstrap';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'leaflet/dist/leaflet.css';
import { Link } from 'react-router-dom';

// Fix Leaflet marker icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Données fictives des établissements à Ngaoundéré
// Ajout d'établissements fictifs supplémentaires
const establishments = [
  {
    id: 1,
    name: 'Université de Ngaoundéré',
    lat: 7.3256,
    lng: 13.5815,
    image: 'https://via.placeholder.com/150',
    details: 'Université publique de Ngaoundéré.',
    rating: 4.7,
    infrastructure: 'Wifi',
    languages: ['Français', 'Anglais'],
    link: '/description/1',
  },
  {
    id: 2,
    name: 'Hôtel Transcam',
    lat: 7.3600,
    lng: 13.5650,
    image: 'https://via.placeholder.com/150',
    details: 'Hôtel confortable à Ngaoundéré.',
    rating: 4.3,
    infrastructure: 'Parking',
    languages: ['Français'],
    link: '/description/2',
  },
  {
    id: 3,
    name: 'Marché Central',
    lat: 7.3190,
    lng: 13.5830,
    image: 'https://via.placeholder.com/150',
    details: 'Marché animé au cœur de Ngaoundéré.',
    rating: 4.0,
    infrastructure: 'Wifi',
    languages: ['Français', 'Anglais'],
    link: '/description/3',
  },
  {
    id: 4,
    name: 'Centre Hospitalier Régional',
    lat: 7.3250,
    lng: 13.5900,
    image: 'https://via.placeholder.com/150',
    details: 'Hôpital moderne offrant des soins de qualité.',
    rating: 4.5,
    infrastructure: 'Parking',
    languages: ['Français'],
    link: '/description/4',
  },
  {
    id: 5,
    name: 'Parc National de Ngaoundéré',
    lat: 7.3100,
    lng: 13.6000,
    image: 'https://via.placeholder.com/150',
    details: 'Un parc naturel pour se détendre et explorer la faune locale.',
    rating: 4.8,
    infrastructure: 'Parking',
    languages: ['Français', 'Anglais'],
    link: '/description/5',
  },
  {
    id: 6,
    name: 'Bibliothèque Municipale',
    lat: 7.3300,
    lng: 13.5780,
    image: 'https://via.placeholder.com/150',
    details: 'Espace calme pour lire et travailler.',
    rating: 4.2,
    infrastructure: 'Wifi',
    languages: ['Français'],
    link: '/description/6',
  },
  {
    id: 7,
    name: 'Stade Omnisports',
    lat: 7.3400,
    lng: 13.5800,
    image: 'https://via.placeholder.com/150',
    details: 'Complexe sportif pour des événements locaux et régionaux.',
    rating: 4.6,
    infrastructure: 'Parking',
    languages: ['Français', 'Anglais'],
    link: '/description/7',
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

const Home = () => {
  const [filters, setFilters] = useState({
    infrastructure: '',
    language: '',
    proximity: '',
  });

  const [filteredEstablishments, setFilteredEstablishments] = useState(establishments);
  const [showFilters, setShowFilters] = useState(false); // Pour afficher ou masquer les filtres

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({ ...prevFilters, [name]: value }));
  };

  const applyFilters = () => {
    const { infrastructure, language, proximity } = filters;
    const results = establishments.filter((est) => {
      return (
        (infrastructure ? est.infrastructure === infrastructure : true) &&
        (language ? est.languages.includes(language) : true) &&
        (proximity ? calculateProximity(est.lat, est.lng, proximity) : true)
      );
    });
    setFilteredEstablishments(results);
    setShowFilters(false); // Masquer les filtres après l'application
  };

  // Fonction pour calculer la proximité (en kilomètres)
  const calculateProximity = (lat, lng, proximity) => {
    const userLat = 7.3256; // Latitude approximative de l'utilisateur à Ngaoundéré
    const userLng = 13.5815; // Longitude approximative de l'utilisateur à Ngaoundéré
    const R = 6371; // Rayon de la Terre en km
    const dLat = (lat - userLat) * (Math.PI / 180);
    const dLng = (lng - userLng) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(userLat * (Math.PI / 180)) * Math.cos(lat * (Math.PI / 180)) *
      Math.sin(dLng / 2) * Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance en kilomètres

    return distance <= proximity;
  };

  const customIcon = new L.Icon({
    iconUrl: '/map-marker.png',
    iconSize: [50, 50],
    iconAnchor: [15, 30],
    popupAnchor: [0, -30],
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
            <Button variant="outline-primary" onClick={() => setShowFilters(true)}>
              Filtrer
            </Button>
            <Button variant="outline-secondary" className="ms-3">
              <Link to="/TestIA">Contacter</Link>
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
        center={[7.3256, 13.5815]} // Coordonnées de Ngaoundéré
        zoom={15}
        style={{ height: '400px', marginTop: '20px' }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        {filteredEstablishments.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={customIcon}
          >
            <Popup>{place.name}</Popup>
          </Marker>
        ))}
      </MapContainer>

      {/* Modal de filtre */}
      <Modal show={showFilters} onHide={() => setShowFilters(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Filtres</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Infrastructure</Form.Label>
              <Form.Control
                as="select"
                name="infrastructure"
                value={filters.infrastructure}
                onChange={handleFilterChange}
              >
                <option value="">-- Tous --</option>
                <option value="Wifi">Wifi</option>
                <option value="Parking">Parking</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Langue</Form.Label>
              <Form.Control
                as="select"
                name="language"
                value={filters.language}
                onChange={handleFilterChange}
              >
                <option value="">-- Toutes --</option>
                <option value="Français">Français</option>
                <option value="Anglais">Anglais</option>
                <option value="Bilingue">Bilingue</option>
              </Form.Control>
            </Form.Group>
            <Form.Group>
              <Form.Label>Proximité</Form.Label>
              <Form.Control
                as="select"
                name="proximity"
                value={filters.proximity}
                onChange={handleFilterChange}
              >
                <option value="">-- Sélectionner la proximité --</option>
                <option value="5">5 km</option>
                <option value="10">10 km</option>
                <option value="15">15 km</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowFilters(false)}>
            Fermer
          </Button>
          <Button variant="primary" onClick={applyFilters}>
            Appliquer les filtres
          </Button>
        </Modal.Footer>
      </Modal>

      <Container className="mt-4">
        <Row>
          {filteredEstablishments.map((place) => (
            <Col key={place.id} xs={12} sm={6} md={4} className="mb-3">
              <Card className="h-100">
                <Card.Img variant="top" src={place.image} />
                <Card.Body>
                  <Card.Title>{place.name}</Card.Title>
                  <Card.Text>{place.details}</Card.Text>
                  <Rating rating={place.rating} />
                  <Link to={place.link}>
                    <Button variant="primary" className="mt-2">Voir Plus</Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;
