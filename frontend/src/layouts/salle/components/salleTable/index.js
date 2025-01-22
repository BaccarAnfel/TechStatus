import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useNavigate } from "react-router-dom"; // Importer useNavigate

function SalleTable() {
  const [salles, setSalles] = useState([]); // State pour stocker les données des salles
  const [loading, setLoading] = useState(true); // State pour gérer le chargement
  const navigate = useNavigate(); // Utiliser useNavigate pour la navigation

  // Récupérer les données des salles au chargement du composant
  useEffect(() => {
    const fetchSallesData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/salles"); // Endpoint API pour les salles
        const data = await response.json();
        console.log("Données récupérées:", data);

        // Vérifier que les données sont un tableau
        if (Array.isArray(data)) {
          setSalles(data);
        } else {
          console.error("Expected an array but got:", data);
          setSalles([]); // Fallback à un tableau vide
        }

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      }
    };

    fetchSallesData();
  }, []);

  // Fonction pour gérer la suppression d'une salle
  const handleDelete = async (salle_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/salles/${salle_id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Supprimer la salle de l'état local
        setSalles(salles.filter((salle) => salle.salle_id !== salle_id));
        console.log("Salle supprimée avec succès");
      } else {
        console.error("Erreur lors de la suppression de la salle");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la salle :", error);
    }
  };

  // Fonction pour gérer la redirection vers la page de modification
  const handleEdit = (salle_id) => {
    navigate(`/edit-salle/${salle_id}`); // Rediriger vers la page de modification
  };

  if (loading) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6">Chargement...</SoftTypography>
      </SoftBox>
    );
  }

  if (!Array.isArray(salles)) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6" color="error">
          Erreur: Les données reçues ne sont pas valides.
        </SoftTypography>
      </SoftBox>
    );
  }

  return (
    <SoftBox>
      <SoftTypography variant="h6" fontWeight="bold" mb={2}>
        Table des Salles
      </SoftTypography>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th
              style={{
                textAlign: "left",
                padding: "10px 15px",
                color: "#8392ab",
                fontWeight: "bold",
                fontSize: "14px",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              ID DE SALLE
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "10px 15px",
                color: "#8392ab",
                fontWeight: "bold",
                fontSize: "14px",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              NOM DE SALLE
            </th>
            <th
              style={{
                textAlign: "left",
                padding: "10px 15px",
                color: "#8392ab",
                fontWeight: "bold",
                fontSize: "14px",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              NOM DE LOCALE
            </th>
            <th
              style={{
                textAlign: "center",
                padding: "10px 15px",
                color: "#8392ab",
                fontWeight: "bold",
                fontSize: "14px",
                borderBottom: "1px solid #e0e0e0",
              }}
            >
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {salles.map((salle, index) => (
            <tr key={salle.salle_id}>
              <td
                style={{
                  padding: "10px 15px",
                  fontSize: "14px",
                  color: "#344767",
                  borderBottom: index !== salles.length - 1 ? "1px solid #e0e0e0" : "none",
                }}
              >
                {salle.salle_id}
              </td>
              <td
                style={{
                  padding: "10px 15px",
                  fontSize: "14px",
                  color: "#344767",
                  borderBottom: index !== salles.length - 1 ? "1px solid #e0e0e0" : "none",
                }}
              >
                {salle.nom_Salle}
              </td>
              <td
                style={{
                  padding: "10px 15px",
                  fontSize: "14px",
                  color: "#344767",
                  borderBottom: index !== salles.length - 1 ? "1px solid #e0e0e0" : "none",
                }}
              >
                {salle.nom_Local}
              </td>
              <td
                style={{
                  padding: "10px 15px",
                  textAlign: "center",
                  fontSize: "14px",
                  color: "#344767",
                  borderBottom: index !== salles.length - 1 ? "1px solid #e0e0e0" : "none",
                }}
              >
                <SoftTypography
                  component="a"
                  href="#"
                  variant="caption"
                  color="secondary"
                  fontWeight="medium"
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "#5e72e4",
                    marginRight: "10px",
                  }}
                  onClick={() => handleEdit(salle.salle_id)} // Rediriger vers la page de modification
                >
                  Modifier
                </SoftTypography>
                <SoftTypography
                  component="a"
                  href="#"
                  variant="caption"
                  color="error"
                  fontWeight="medium"
                  style={{
                    textDecoration: "underline",
                    cursor: "pointer",
                    color: "#f5365c",
                  }}
                  onClick={() => handleDelete(salle.salle_id)} // Gérer la suppression
                >
                  Supprimer
                </SoftTypography>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </SoftBox>
  );
}

export default SalleTable;