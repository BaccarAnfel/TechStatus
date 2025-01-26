import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import ArchiveIcon from "@mui/icons-material/Archive";
import PrintIcon from "@mui/icons-material/Print"; // Importer l'icône d'impression

function CommandeTable() {
  const [commandes, setCommandes] = useState([]); // State pour stocker les données des commandes
  const [loading, setLoading] = useState(true); // State pour le chargement
  const [error, setError] = useState(null); // State pour les erreurs
  const [success, setSuccess] = useState(null); // State pour les messages de succès
  const navigate = useNavigate();

  // Récupérer les données des commandes au chargement du composant
  useEffect(() => {
    const fetchCommandesData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/commandes"); // API pour récupérer les commandes
        const data = await response.json();
        console.log("Données récupérées:", data);

        if (Array.isArray(data)) {
          // Trier les commandes par command_id
          const sortedCommandes = data.sort((a, b) => a.command_id - b.command_id);
          setCommandes(sortedCommandes);
        } else {
          console.error("Expected an array but got:", data);
          setCommandes([]); // Fallback à un tableau vide
        }

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setError("Erreur lors de la récupération des données");
        setLoading(false);
      }
    };

    fetchCommandesData();
  }, []);

  // Fonction pour archiver une commande
  const handleArchive = async (commandId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/commandes/archive/${commandId}`, {
        method: "PUT",
      });
      if (response.ok) {
        setSuccess("Commande archivée avec succès");
        // Retirer la commande archivée de la liste
        const updatedCommandes = commandes.filter((commande) => commande.command_id !== commandId);
        setCommandes(updatedCommandes);
      } else {
        setError("Erreur lors de l'archivage de la commande");
      }
    } catch (error) {
      console.error("Erreur lors de l'archivage :", error);
      setError("Erreur lors de l'archivage de la commande");
    }
  };

  // Fonction pour rediriger vers le composant PrintCommande
  const handlePrint = (commandId) => {
    navigate(`/commandes/${commandId}/print`); // Rediriger vers PrintCommande avec l'ID de la commande
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
          {`Table des Commandes`}
        </SoftTypography>

        {/* Affichage des messages d'erreur ou de succès */}
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

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
                N°
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
                UTILISATEUR
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
                  {index + 1} {/* Numéro d'ordre séquentiel */}
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    fontSize: "14px",
                    color: "#344767",
                    borderBottom: index !== commandes.length - 1 ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  {commande.command_id} {/* ID de la commande */}
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    fontSize: "14px",
                    color: "#344767",
                    borderBottom: index !== commandes.length - 1 ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  {commande.status_cmd || "N/A"} {/* Statut de la commande */}
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    fontSize: "14px",
                    color: "#344767",
                    borderBottom: index !== commandes.length - 1 ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  {commande.nom_utilisateur || "N/A"} {/* Nom de l'utilisateur */}
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    fontSize: "14px",
                    color: "#344767",
                    borderBottom: index !== commandes.length - 1 ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  {commande.date || "N/A"} {/* Date de la commande */}
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
                  {/* Bouton Modifier */}
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/edit-commande/${commande.command_id}`)}
                  >
                    <EditIcon />
                  </IconButton>

                  {/* Bouton Archiver - Désactivé si le statut n'est pas "Terminée" */}
                  <IconButton
                    color="info"
                    onClick={() => handleArchive(commande.command_id)}
                    disabled={commande.status_cmd !== "Terminée"} // Désactiver si le statut n'est pas "Terminée"
                  >
                    <ArchiveIcon />
                  </IconButton>

                  {/* Bouton Imprimer - Désactivé si le statut n'est pas "Terminée" */}
                  <IconButton
                    color="secondary"
                    onClick={() => handlePrint(commande.command_id)}
                    disabled={commande.status_cmd !== "Terminée"} // Désactiver si le statut n'est pas "Terminée"
                  >
                    <PrintIcon />
                  </IconButton>
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