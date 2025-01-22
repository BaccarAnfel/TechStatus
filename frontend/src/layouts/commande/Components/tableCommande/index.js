import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useNavigate } from "react-router-dom";

function CommandeTable() {
  const [commandes, setCommandes] = useState([]); // State pour stocker les données des commandes
  const [loading, setLoading] = useState(true); // State pour gérer le chargement
  const navigate = useNavigate();

  // Récupérer les données des commandes au chargement du composant
  useEffect(() => {
    const fetchCommandesData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/commandes"); // Endpoint API pour les commandes
        const data = await response.json();
        console.log("Données récupérées:", data);

        // Vérifier que les données sont un tableau
        if (Array.isArray(data)) {
          setCommandes(data);
        } else {
          console.error("Expected an array but got:", data);
          setCommandes([]); // Fallback à un tableau vide
        }

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      }
    };

    fetchCommandesData();
  }, []);

  // Fonction pour supprimer une commande
  const handleDeleteCommande = async (commandId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/commandesDel/${commandId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Mettre à jour la liste des commandes après suppression
        setCommandes(commandes.filter((commande) => commande.command_id !== commandId));
        console.log("Commande supprimée avec succès !");
      } else {
        console.error("Erreur lors de la suppression de la commande");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la commande :", error);
    }
  };

  if (loading) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6">Chargement...</SoftTypography>
      </SoftBox>
    );
  }

  if (!Array.isArray(commandes)) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6" color="error">
          Erreur: Les données reçues ne sont pas valides.
        </SoftTypography>
      </SoftBox>
    );
  }

  return (
    <Card>
      <SoftBox p={3}>
        <SoftTypography variant="h6" fontWeight="bold" mb={2}>
          {`Table des Commandes`} {/* Titre de la table */}
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
                ID DE COMMANDE
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
                STATUT
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
                Utilisateur
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
                DATE DE COMMANDE
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
            {commandes.map((commande, index) => (
              <tr key={commande.command_id}>
                <td
                  style={{
                    padding: "10px 15px",
                    fontSize: "14px",
                    color: "#344767",
                    borderBottom: index !== commandes.length - 1 ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  {commande.command_id}
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    fontSize: "14px",
                    color: "#344767",
                    borderBottom: index !== commandes.length - 1 ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  {commande.statut || "N/A"} {/* Afficher le statut ou "N/A" si null */}
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    fontSize: "14px",
                    color: "#344767",
                    borderBottom: index !== commandes.length - 1 ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  {commande.nom_utilisateur} {/* Afficher le nom de l'utilisateur */}
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    fontSize: "14px",
                    color: "#344767",
                    borderBottom: index !== commandes.length - 1 ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  {commande.date}
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#344767",
                    borderBottom: index !== commandes.length - 1 ? "1px solid #e0e0e0" : "none",
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
                      marginRight: "10px", // Espace entre les boutons
                    }}
                    onClick={() => navigate(`/edit-commande/${commande.command_id}`)} // Redirige vers la page d'édition
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
                      marginRight: "10px",
                    }}
                    onClick={() => handleDeleteCommande(commande.command_id)} // Supprime la commande
                  >
                    Supprimer
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
                      color: "#f5365c", // Couleur rouge pour le bouton Supprimer
                    }}
                    onClick={() => navigate(`/commandes/${commande.command_id}/print`)}
                  >
                    Imprimer
                  </SoftTypography>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SoftBox>
    </Card>
  );
}

export default CommandeTable;