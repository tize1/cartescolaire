import React, { useState } from "react";
import { Form, Button, Container, Row, Col, FloatingLabel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

function AuthForm() {
  const [formData, setFormData] = useState({
    nomEtabli: "",
    image: "",
    localisation: {
      coordonne: {
        latitude: "",
        longitude: "",
      },
      localite: {
        region: "",
        departement: "",
        arrondissement: "",
        ville: "",
      },
    },
    description: {
      scolarite: "",
      tauxreussite: "",
      langues: "",
    },
    typeEtablissement: "",
    contacts: [
      {
        typeContact: "",
        contenu: "",
      },
    ],
  });

  // Gestion des modifications des champs
  const handleChange = (e, fieldPath) => {
    const value = e.target.value;

    if (Array.isArray(fieldPath)) {
      const [field, ...subFields] = fieldPath;
      setFormData((prevState) => {
        let newState = { ...prevState };
        let subObj = newState[field];

        // Descendre dans l'objet
        for (let i = 0; i < subFields.length - 1; i++) {
          subObj = subObj[subFields[i]];
        }

        // Modifier la valeur finale
        subObj[subFields[subFields.length - 1]] = value;

        return newState;
      });
    } else {
      setFormData({ ...formData, [fieldPath]: value });
    }
  };

  // Gestion de la soumission des formulaires
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Données soumises :", formData);
  };

  return (
    <div
      style={{
        backgroundImage: `url('/login.webp')`,
        backgroundSize: "500px",
        backgroundPosition: "left",
        backgroundRepeat: "no-repeat",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <div className="p-4 border rounded bg-light shadow">
              <h2 className="text-center mb-4">Créer un Établissement</h2>
              <Form onSubmit={handleSubmit}>
                {/* Nom de l'Établissement */}
                <FloatingLabel
                  controlId="nomEtabli"
                  label="Nom de l'Établissement"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Nom de l'Établissement"
                    required
                    value={formData.nomEtabli}
                    onChange={(e) => handleChange(e, "nomEtabli")}
                  />
                </FloatingLabel>

                {/* Image */}
                <FloatingLabel
                  controlId="image"
                  label="Lien de l'Image"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Lien de l'Image"
                    value={formData.image}
                    onChange={(e) => handleChange(e, "image")}
                  />
                </FloatingLabel>

                {/* Localisation */}
                <h5>Localisation</h5>
                <Row>
                  <Col>
                    <FloatingLabel
                      controlId="latitude"
                      label="Latitude"
                      className="mb-3"
                    >
                      <Form.Control
                        type="number"
                        placeholder="Latitude"
                        value={formData.localisation.coordonne.latitude}
                        onChange={(e) =>
                          handleChange(e, ["localisation", "coordonne", "latitude"])
                        }
                      />
                    </FloatingLabel>
                  </Col>
                  <Col>
                    <FloatingLabel
                      controlId="longitude"
                      label="Longitude"
                      className="mb-3"
                    >
                      <Form.Control
                        type="number"
                        placeholder="Longitude"
                        value={formData.localisation.coordonne.longitude}
                        onChange={(e) =>
                          handleChange(e, ["localisation", "coordonne", "longitude"])
                        }
                      />
                    </FloatingLabel>
                  </Col>
                </Row>
                <FloatingLabel
                  controlId="ville"
                  label="Ville"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Ville"
                    value={formData.localisation.localite.ville}
                    onChange={(e) =>
                      handleChange(e, ["localisation", "localite", "ville"])
                    }
                  />
                </FloatingLabel>

                {/* Description */}
                <h5>Description</h5>
                <FloatingLabel
                  controlId="scolarite"
                  label="Frais de Scolarité"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder="Frais de Scolarité"
                    value={formData.description.scolarite}
                    onChange={(e) =>
                      handleChange(e, ["description", "scolarite"])
                    }
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="tauxreussite"
                  label="Taux de Réussite (%)"
                  className="mb-3"
                >
                  <Form.Control
                    type="number"
                    placeholder="Taux de Réussite"
                    value={formData.description.tauxreussite}
                    onChange={(e) =>
                      handleChange(e, ["description", "tauxreussite"])
                    }
                  />
                </FloatingLabel>

                {/* Type Établissement */}
                <FloatingLabel
                  controlId="typeEtablissement"
                  label="Type d'Établissement"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Type d'Établissement"
                    value={formData.typeEtablissement}
                    onChange={(e) =>
                      handleChange(e, "typeEtablissement")
                    }
                  />
                </FloatingLabel>

                {/* Contacts */}
                <h5>Contacts</h5>
                <FloatingLabel
                  controlId="typeContact"
                  label="Type de Contact"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Type de Contact"
                    value={formData.contacts[0]?.typeContact || ""}
                    onChange={(e) =>
                      handleChange(e, ["contacts", 0, "typeContact"])
                    }
                  />
                </FloatingLabel>
                <FloatingLabel
                  controlId="contenuContact"
                  label="Détails du Contact"
                  className="mb-3"
                >
                  <Form.Control
                    type="text"
                    placeholder="Détails du Contact"
                    value={formData.contacts[0]?.contenu || ""}
                    onChange={(e) =>
                      handleChange(e, ["contacts", 0, "contenu"])
                    }
                  />
                </FloatingLabel>

                <Button variant="primary" type="submit" className="w-100">
                  Soumettre
                </Button>
              </Form>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default AuthForm;
