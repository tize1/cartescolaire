import React, { useEffect, useState } from "react";
import axios from "axios"; // Importez Axios
import "./HomePage.css"

const HomePage = () => {
    const [etablissements, setEtablissements] = useState([]); // Stocker les données des établissements
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

    // Gestion du chargement et des erreurs
    if (loading) {
        return <div>Chargement en cours...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    // Rendu des établissements
    return (
        <div className="homepage">
            <h1>Liste des Établissements</h1>
            <div className="etablissement-list">
                {etablissements.map((etablissement) => (
                    <div className="etablissement-card" key={etablissement.idEtabli}>
                        <img src={etablissement.image} alt={etablissement.nomEtabli} className="etablissement-image" />
                        <h3>{etablissement.nomEtabli}</h3>
                        <p>Id: {etablissement.idEtabli}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default HomePage;
