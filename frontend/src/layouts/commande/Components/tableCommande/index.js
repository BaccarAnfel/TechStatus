import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import PrintIcon from "@mui/icons-material/Print";
import ArchiveIcon from "@mui/icons-material/Archive";
import IconButton from "@mui/material/IconButton";

function CommandeTable() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommandesData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/commandes");
        const data = await response.json();
        console.log("Données récupérées:", data);

        if (Array.isArray(data)) {
          setCommandes(data);
        } else {
          console.error("Expected an array but got:", data);
          setCommandes([]);
        }

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      }
    };

    fetchCommandesData();
  }, []);

  const handleDeleteCommande = async (commandId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/commandesDel/${commandId}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setCommandes(commandes.filter((commande) => commande.command_id !== commandId));
        console.log("Commande supprimée avec succès !");
      } else {
        console.error("Erreur lors de la suppression de la commande");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la commande :", error);
    }
  };

  const handleArchiveCommande = async (commandId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/commandesArchive/${commandId}`, {
        method: "POST", // Ou "PUT" selon votre API
      });

      if (response.ok) {
        console.log("Commande archivée avec succès !");
        // Mettre à jour l'état local si nécessaire
      } else {
        console.error("Erreur lors de l'archivage de la commande");
      }
    } catch (error) {
      console.error("Erreur lors de l'archivage de la commande :", error);
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
          {`Table des Commandes`}
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
                  {/* Bouton Modifier - Désactivé si la commande est terminée */}
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/edit-commande/${commande.command_id}`)}
                    disabled={commande.status_cmd === "Terminée"} // Désactiver si la commande est terminée
                  >
                    <EditIcon />
                  </IconButton>

                  {/* Bouton Supprimer - Désactivé si la commande n'est pas terminée */}
                  <IconButton
                    color="error"
                    onClick={() => handleDeleteCommande(commande.command_id)}
                    disabled={commande.status_cmd !== "Terminée"} // Désactiver si la commande n'est pas terminée
                  >
                    <DeleteIcon />
                  </IconButton>

                  {/* Boutons Imprimer et Archiver - Désactivés si la commande n'est pas terminée */}
                  <IconButton
                    color="secondary"
                    onClick={() => navigate(`/commandes/${commande.command_id}/print`)}
                    disabled={commande.status_cmd !== "Terminée"} // Désactiver si la commande n'est pas terminée
                  >
                    <PrintIcon />
                  </IconButton>
                  <IconButton
                    color="info"
                    onClick={() => handleArchiveCommande(commande.command_id)}
                    disabled={commande.status_cmd !== "Terminée"} // Désactiver si la commande n'est pas terminée
                  >
                    <ArchiveIcon />
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