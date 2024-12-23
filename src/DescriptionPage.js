// DescriptionPage.js
import React from 'react';
import { useParams } from 'react-router-dom';

// Liste des établissements pour la démonstration
const establishments = [
  {
    id: 1,
    name: 'Établissement 1',
    image: 'https://via.placeholder.com/150/FF5733/FFFFFF?text=Établissement+1',
    details: 'Détails de l’établissement 1... Ici vous trouverez plus d\'information sur cet établissement.',
  },
  {
    id: 2,
    name: 'Établissement 2',
    image: 'https://via.placeholder.com/150/33FF57/FFFFFF?text=Établissement+2',
    details: 'Détails de l’établissement 2... Cet établissement offre des services variés.',
  },
  {
    id: 3,
    name: 'Établissement 3',
    image: 'https://via.placeholder.com/150/3357FF/FFFFFF?text=Établissement+3',
    details: 'Détails de l’établissement 3... Ce lieu est particulièrement apprécié des visiteurs.',
  },
];

const DescriptionPage = () => {
  const { id } = useParams(); // Récupère l'ID de l'établissement depuis l'URL
  const establishment = establishments.find((place) => place.id === parseInt(id));

  if (!establishment) {
    return <div>Établissement non trouvé.</div>;
  }

  return (
    <div className="container mt-5">
      <h2>{establishment.name}</h2>
      <img src={establishment.image} alt={establishment.name} className="img-fluid" />
      <p>{establishment.details}</p>
    </div>
  );
};

export default DescriptionPage;
