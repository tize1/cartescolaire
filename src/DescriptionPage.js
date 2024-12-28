import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import L from 'leaflet'; // Assurez-vous que L est bien importé
import 'leaflet/dist/leaflet.css';

// Liste des établissements pour la démonstration
const establishments = [
  {
    id: 1,
    name: 'Établissement 1',
    image: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Établissement+1',
    contact: '+235 65555555',
    poBox: 'B.P. 1234',
    description: 'Détails de l’établissement 1... Ici vous trouverez plus d\'information sur cet établissement.',
    location: { lat: 12.122, lng: 15.045 },
    infrastructures: [
      { name: 'Cantine', image: 'https://via.placeholder.com/150', description: 'Cantine avec des repas diversifiés.' },
      { name: 'Salle informatique', image: 'https://via.placeholder.com/150', description: 'Salle avec des ordinateurs récents pour les étudiants.' },
      { name: 'Bibliothèque', image: 'https://via.placeholder.com/150', description: 'Bibliothèque avec un large choix de livres.' },
    ],
  },
  {
    id: 2,
    name: 'Établissement 2',
    image: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Établissement+2',
    contact: '+235 65555556',
    poBox: 'B.P. 5678',
    description: 'Détails de l’établissement 2... Cet établissement offre des services variés.',
    location: { lat: 12.123, lng: 15.046 },
    infrastructures: [
      { name: 'Restaurant', image: 'https://via.placeholder.com/150', description: 'Restaurant avec une variété de menus.' },
      { name: 'Salle informatique', image: 'https://via.placeholder.com/150', description: 'Salle avec des ordinateurs modernes pour les études.' },
    ],
  },
];

const DescriptionPage = () => {
  const { id } = useParams(); // Récupère l'ID de l'établissement depuis l'URL
  const establishment = establishments.find((place) => place.id === parseInt(id));

  const [map, setMap] = useState(null); // Etat pour la carte

  // Définir l'icône avant d'utiliser useEffect
  const icon = new L.Icon({
    iconUrl: '/map-marker.png', // Assurez-vous que cette image existe et est accessible
    iconSize: [32, 32], // Taille de l'icône
    iconAnchor: [16, 32], // Ancrage de l'icône
    popupAnchor: [0, -32], // Ancrage du popup
  });

  useEffect(() => {
    if (map) {
      // Création du contrôle de la légende et ajout à la carte
      const legend = L.control({ position: 'topright' });

      legend.onAdd = () => {
        const div = L.DomUtil.create('div', 'info legend');
        div.style.backgroundColor = 'rgba(255, 255, 255, 0.8)';
        div.style.padding = '10px';
        div.style.borderRadius = '5px';
        div.style.fontSize = '12px'; // Taille de la police plus petite
        div.style.lineHeight = '1.5'; // Espacement des lignes
        div.innerHTML = `
          <h5 style="margin: 0; font-size: 14px; font-weight: bold;">${establishment.name}</h5>
          <p style="margin: 5px 0; font-size: 12px;"><strong>Longitude :</strong> ${establishment.location.lng}</p>
          <p style="margin: 5px 0; font-size: 12px;"><strong>Latitude :</strong> ${establishment.location.lat}</p>
          <p style="margin: 5px 0; font-size: 12px;"><strong>Contact :</strong> ${establishment.contact}</p>
        `;
        return div;
      };

      legend.addTo(map); // Ajout de la légende à la carte
    }
  }, [map, establishment]);

  if (!establishment) {
    return <div>Établissement non trouvé.</div>;
  }

  return (
    <div className="container mt-5">
      {/* Entête avec l'image et les détails */}
      <Row className="mb-5">
        <Col md={6} className="text-center">
          <img
            src={establishment.image}
            alt={establishment.name}
            className="img-fluid rounded shadow-lg"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        </Col>
        <Col md={6}>
          <h2>{establishment.name}</h2>
          <p><strong>Contact :</strong> {establishment.contact}</p>
          <p><strong>PO BOX :</strong> {establishment.poBox}</p>
          <p>{establishment.description}</p>
          <Button variant="primary">Contacter l'établissement</Button>
        </Col>
      </Row>

      {/* Carte avec localisation de l'établissement */}
      <h4>Localisation</h4>
      <MapContainer
        center={establishment.location}
        zoom={15}
        style={{ height: '400px', marginBottom: '40px' }}
        whenCreated={setMap} // Cette fonction est appelée lorsque la carte est créée
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={establishment.location} icon={icon}>
          <Popup>
            {establishment.name} <br />
            Localisation de l'établissement
          </Popup>
          <Tooltip>Localisation de l'établissement</Tooltip>
        </Marker>
      </MapContainer>

      {/* Infrastructures de l'établissement */}
      <h4>Infrastructures disponibles</h4>
      <Row>
        {establishment.infrastructures.map((infra, index) => (
          <Col key={index} md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src={infra.image} />
              <Card.Body>
                <Card.Title>{infra.name}</Card.Title>
                <Card.Text>{infra.description}</Card.Text>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default DescriptionPage;
