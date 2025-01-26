import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import RestoreIcon from "@mui/icons-material/Restore"; // Icône pour restaurer une commande archivée
import Alert from "@mui/material/Alert";

function CommandeArchive() {
  const [commandes, setCommandes] = useState([]); // State pour stocker les commandes archivées
  const [loading, setLoading] = useState(true); // State pour le chargement
  const [error, setError] = useState(null); // State pour les erreurs
  const [success, setSuccess] = useState(null); // State pour les messages de succès
  const navigate = useNavigate();

  // Récupérer les commandes archivées au chargement du composant
  useEffect(() => {
    const fetchCommandesArchiveData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/commandeArchiver");
        const data = await response.json();
        console.log("Données archivées récupérées:", data);

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
        console.error("Erreur lors de la récupération des données archivées :", error);
        setError("Erreur lors de la récupération des données archivées");
        setLoading(false);
      }
    };

    fetchCommandesArchiveData();
  }, []);

  // Fonction pour restaurer une commande archivée
  const handleRestore = async (commandId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/commandes/restore/${commandId}`, {
        method: "PUT", // Méthode HTTP pour restaurer
      });

      if (response.ok) {
        setSuccess("Commande restaurée avec succès");
        // Mettre à jour la liste des commandes archivées
        const updatedCommandes = commandes.filter((commande) => commande.command_id !== commandId);
        setCommandes(updatedCommandes);
      } else {
        setError("Erreur lors de la restauration de la commande");
      }
    } catch (error) {
      console.error("Erreur lors de la restauration :", error);
      setError("Erreur lors de la restauration de la commande");
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
          Table des Commandes Archivées
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
                  {commande.command_id} {/* ID réel de la commande */}
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    fontSize: "14px",
                    color: "#344767",
                    borderBottom: index !== commandes.length - 1 ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  {commande.status_cmd || "N/A"}
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    fontSize: "14px",
                    color: "#344767",
                    borderBottom: index !== commandes.length - 1 ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  {commande.nom_utilisateur}
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
                  {/* Bouton Restaurer */}
                  <IconButton color="info" onClick={() => handleRestore(commande.command_id)}>
                    <RestoreIcon />
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

export default CommandeArchive;