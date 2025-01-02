import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import { Button, Container, Row, Col, Card } from 'react-bootstrap';
import L from 'leaflet'; // Assurez-vous que L est bien importé
import 'leaflet/dist/leaflet.css';
import axios from "axios";



const DescriptionPage = () => {



  const [establishments, setEtablissements] = useState([]); // Stocker les données des établissements
  const [loading, setLoading] = useState(true); // Indiquer si les données sont en cours de chargement
  const [error, setError] = useState(null); // Stocker les erreurs éventuelles

  // Fonction pour récupérer les établissements depuis l'API
  const fetchEtablissements = async () => {
      try {
          const response = await axios.get("http://localhost:8080/api/etablissements/all");
          setEtablissements(response.data); // Stocker les établissements dans l'état
      } catch (err) {
          setError("Impossible de charger les établissements.");
          console.error(err);
      } finally {
          setLoading(false); // Arrêter le chargement
      }
  };

  // Utilisez useEffect pour récupérer les données au montage du composant
  useEffect(() => {
      fetchEtablissements();
  }, []);






  const { id } = useParams(); // Récupère l'ID de l'établissement depuis l'URL
  const establishment = establishments.find((place) => place.idEtabli === parseInt(id));

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
          <h5 style="margin: 0; font-size: 14px; font-weight: bold;">${establishment.nomEtabli}</h5>
          <p style="margin: 5px 0; font-size: 12px;"><strong>Longitude :</strong> ${establishment.localisation.coordonne.longitude}</p>
          <p style="margin: 5px 0; font-size: 12px;"><strong>Latitude :</strong> ${establishment.localisation.coordonne.latitude}</p>
          <p style="margin: 5px 0; font-size: 12px;"><strong>Contact :</strong> ${establishment.nomEtabli}</p>
        `;
        return div;
      };

      legend.addTo(map); // Ajout de la légende à la carte
    }
  }, [map, establishment]);

  if (!establishment) {
    return <div>Établissement  non trouvé.</div>;
  }

  return (
    <div className="container mt-5">
      {/* Entête avec l'image et les détails */}
      <Row className="mb-5">
        <Col md={6} className="text-center">
          <img
            src={establishment.image}
            alt={establishment.nomEtabli}
            className="img-fluid rounded shadow-lg"
            style={{ maxHeight: '300px', objectFit: 'cover' }}
          />
        </Col>
        <Col md={6}>
          <h2>{establishment.name}</h2>
          <p><strong>CONTACTS :</strong> </p>
          <Col>
              {establishment.contacts.map((contact, idContact) => (
                <Row key={idContact}>
                    <p>{contact.contenu}</p>
                </Row>
              ) )}
          </Col>

          <p><strong>PO BOX :</strong> {establishment.poBox}</p>
          <p><strong>LANGUES : </strong> {establishment.description.langues}</p>
          <Button variant="primary">Contacter l'établissement</Button>
        </Col>
      </Row>

      {/* Carte avec localisation de l'établissement */}
      <h4>Localisation</h4>
      <MapContainer
        center={{lat:establishment.localisation.coordonne.latitude,lng:establishment.localisation.coordonne.longitude}}
        zoom={17}
        style={{ height: '400px', marginBottom: '40px' }}
        whenCreated={setMap} // Cette fonction est appelée lorsque la carte est créée
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
        />
        <Marker position={{lat:establishment.localisation.coordonne.latitude,lng:establishment.localisation.coordonne.longitude}} icon={icon}>
          <Popup>
            {establishment.nomEtabli} <br />
            Localisation de l'établissement
          </Popup>
          <Tooltip>{establishment.nomEtabli}</Tooltip>
        </Marker>
      </MapContainer>

      {/* Infrastructures de l'établissement */}
      <h4>Infrastructures disponibles</h4>
      <Row>
        {establishment.description.infrastructures.map((infra, idInfrastructure) => (
          <Col key={idInfrastructure} md={4} className="mb-4">
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
