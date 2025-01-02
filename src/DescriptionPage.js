import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { Button, Container, Row, Col, Card, Navbar, Nav, Form } from 'react-bootstrap';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import axios from 'axios';

const DescriptionPage = () => {
  const [establishments, setEtablissements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState({ name: '', email: '', comment: '' });

  // Fonction pour récupérer les établissements
  const fetchEtablissements = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/etablissements/all');
      setEtablissements(response.data);
    } catch (err) {
      setError('Impossible de charger les établissements.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEtablissements();
  }, []);

  const { id } = useParams();
  const establishment = establishments.find((place) => place.idEtabli === parseInt(id));

  const [map, setMap] = useState(null);

  const icon = new L.Icon({
    iconUrl: '/map-marker.png',
    iconSize: [32, 32],
    iconAnchor: [16, 32],
    popupAnchor: [0, -32],
  });

  useEffect(() => {
    if (map && establishment) {
      const legend = L.control({ position: 'topright' });

      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend');
        div.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';
        div.style.fontSize = '12px';
        div.style.lineHeight = '1.5';
        div.innerHTML = `
          <h5 style="margin: 0; font-size: 14px; font-weight: bold;">${establishment.nomEtabli}</h5>
          <p><strong>Longitude :</strong> ${establishment.localisation.coordonne.longitude}</p>
          <p><strong>Latitude :</strong> ${establishment.localisation.coordonne.latitude}</p>
        `;
        return div;
      };

      legend.addTo(map);
    }
  }, [map, establishment]);

  // Vérification de l'établissement
  if (!establishment) {
    return <div>Établissement non trouvé.</div>;
  }

  // Affichage pendant le chargement
  if (loading) {
    return <div>Chargement des données...</div>;
  }

  // Affichage en cas d'erreur
  if (error) {
    return <div>{error}</div>;
  }

  const handleCommentChange = (e) => {
    const { name, value } = e.target;
    setNewComment({ ...newComment, [name]: value });
  };

  const handleSubmitComment = (e) => {
    e.preventDefault();
    const comment = {
      ...newComment,
      date: new Date().toLocaleString(),
    };
    setComments([comment, ...comments]);
    setNewComment({ name: '', email: '', comment: '' });
  };

  return (
    <>
      {/* En-tête */}
      <Navbar bg="dark" variant="dark" expand="lg">
        <Container>
          <Navbar.Brand href="/">NomDuSite</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/">Accueil</Nav.Link>
              <Nav.Link href="/about">À propos</Nav.Link>
              <Nav.Link href="/contact">Contact</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      {/* Contenu principal */}
      <Container className="mt-5">
        <Row>
          {/* Image et détails de l'établissement */}
          <Col md={6} className="text-center">
            <img
              src={establishment.image}
              alt={establishment.nomEtabli}
              className="img-fluid rounded shadow-lg mb-4"
              style={{ maxHeight: '300px', objectFit: 'cover' }}
            />
          </Col>
          <Col md={6}>
            <h2 className="mb-4">{establishment.nomEtabli}</h2>
            <p><strong>Description :</strong> {establishment.description.general}</p>
            <p><strong>PO BOX :</strong> {establishment.poBox}</p>
            <p><strong>Langues :</strong> {establishment.description.langues}</p>

            {/* Boutons d'action */}
            <div className="d-flex gap-2">
              <Button variant="primary" className="text-start">Ajouter au favoris</Button>
              <Button variant="success">Envoyer un mail</Button>
              <Button variant="info" className="text-white">Appeler</Button>
            </div>
          </Col>
        </Row>

        <hr className="my-5" />

        {/* Localisation */}
        <h4>Localisation</h4>
        <MapContainer
          center={{
            lat: establishment.localisation.coordonne.latitude,
            lng: establishment.localisation.coordonne.longitude,
          }}
          zoom={17}
          style={{ height: '400px', marginBottom: '40px' }}
          whenCreated={setMap}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker
            position={{
              lat: establishment.localisation.coordonne.latitude,
              lng: establishment.localisation.coordonne.longitude,
            }}
            icon={icon}
          >
            <Popup>{establishment.nomEtabli} <br />Localisation de l'établissement</Popup>
            <Tooltip>{establishment.nomEtabli}</Tooltip>
          </Marker>
        </MapContainer>

        <hr className="my-5" />

        {/* Infrastructures */}
        <h4>Infrastructures disponibles</h4>
        {establishment.description.infrastructures && establishment.description.infrastructures.length > 0 ? (
          <Row className="mt-4">
            {establishment.description.infrastructures.map((infra, index) => (
              <Col key={index} md={4} className="mb-4">
                <Card>
                  <Card.Img
                    variant="top"
                    src={infra.image}
                    alt={infra.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                  />
                  <Card.Body>
                    <Card.Title>{infra.name}</Card.Title>
                    <Card.Text>
                      <strong>Type :</strong> {infra.type}<br />
                      {infra.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        ) : (
          <p>Aucune infrastructure disponible pour cet établissement.</p>
        )}

        <hr className="my-5" />

        {/* Formulaire de commentaire */}
        <h4>Laissez un commentaire</h4>
        <Form onSubmit={handleSubmitComment}>
          <Form.Group controlId="commentName">
            <Form.Label>Votre nom</Form.Label>
            <Form.Control
              type="text"
              placeholder="Entrez votre nom"
              name="name"
              value={newComment.name}
              onChange={handleCommentChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="commentEmail" className="mt-3">
            <Form.Label>Votre email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Entrez votre email"
              name="email"
              value={newComment.email}
              onChange={handleCommentChange}
              required
            />
          </Form.Group>
          <Form.Group controlId="commentText" className="mt-3">
            <Form.Label>Votre commentaire</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Laissez un commentaire"
              name="comment"
              value={newComment.comment}
              onChange={handleCommentChange}
              required
            />
          </Form.Group>
          <Button variant="primary" type="submit" className="mt-3">
            Commenter
          </Button>
        </Form>

        <hr className="my-5" />

        {/* Affichage des commentaires */}
        <h4>Commentaires</h4>
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <Card key={index} className="mb-4 shadow-sm" style={{ borderRadius: '10px' }}>
              <Card.Body>
                <Card.Title>
                  {comment.name} <small className="text-muted">le {new Date(comment.date).toLocaleString()}</small>
                </Card.Title>
                <Card.Text>{comment.comment}</Card.Text>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p>Aucun commentaire n'a été laissé pour le moment.</p>
        )}
      </Container>

      {/* Pied de page */}
      <footer className="bg-dark text-white text-center py-4">
        <Container>
          <p className="mb-0">© {new Date().getFullYear()} NomDuSite. Tous droits réservés.</p>
          <p>
            <a href="/privacy" className="text-white text-decoration-none">Politique de confidentialité</a> | 
            <a href="/terms" className="text-white text-decoration-none"> Termes et conditions</a>
          </p>
        </Container>
      </footer>
    </>
  );
};

export default DescriptionPage;
