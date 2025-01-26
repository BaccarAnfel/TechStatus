import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import ArchiveIcon from "@mui/icons-material/Archive";

function EquipementTable() {
  const [equipements, setEquipements] = useState([]); // State for storing equipment data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // State for error messages
  const [success, setSuccess] = useState(null); // State for success messages
  const navigate = useNavigate();

  // Fetch equipment data on component load
  useEffect(() => {
    const fetchEquipementData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/equipements-filtre"); // Fetch non-archived equipment
        const data = await response.json();
        console.log("Données récupérées:", data);

        // Ensure data is an array
        if (Array.isArray(data)) {
          // Trier les équipements par equipement_id
          const sortedEquipements = data.sort((a, b) => a.equipement_id - b.equipement_id);
          setEquipements(sortedEquipements);
        } else {
          console.error("Expected an array but got:", data);
          setEquipements([]); // Fallback to an empty array
        }

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setError("Erreur lors de la récupération des données");
        setLoading(false);
      }
    };

    fetchEquipementData();
  }, []);

  // Function to handle archiving an equipment
  const handleArchive = async (equipement_id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/equipements/archive/${equipement_id}`, {
        method: "PUT",
      });
      if (response.ok) {
        setSuccess("Équipement archivé avec succès");
        // Remove the archived equipment from the list
        const updatedEquipements = equipements.filter(
          (equipement) => equipement.equipement_id !== equipement_id
        );
        setEquipements(updatedEquipements);
      } else {
        setError("Erreur lors de l'archivage de l'équipement");
      }
    } catch (error) {
      console.error("Erreur lors de l'archivage :", error);
      setError("Erreur lors de l'archivage de l'équipement");
    }
  };

  if (loading) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6">Chargement...</SoftTypography>
      </SoftBox>
    );
  }

  if (!Array.isArray(equipements)) {
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
          {`Table des Équipements`}
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
                NOM DE L&apos;ÉQUIPEMENT
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
                STATUS ÉQUIPEMENT
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
                SALLE
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
                ID DE L&apos;ÉQUIPEMENT
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
                ID DE LA COMMANDE
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
            {equipements.map((equipement, index) => (
              <tr key={equipement.equipement_id}>
                <td
                  style={{
                    padding: "10px 15px",
                    fontSize: "14px",
                    color: "#344767",
                    borderBottom: index !== equipements.length - 1 ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  {index + 1} {/* Numéro d'ordre séquentiel */}
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    fontSize: "14px",
                    color: "#344767",
                    borderBottom: index !== equipements.length - 1 ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  {equipement.nom_Equipement} {/* Afficher le nom de l'équipement */}
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    fontSize: "14px",
                    color: "#344767",
                    borderBottom: index !== equipements.length - 1 ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  {equipement.status_equipement || "N/A"} {/* Afficher le statut de l'équipement */}
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    fontSize: "14px",
                    color: "#344767",
                    borderBottom: index !== equipements.length - 1 ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  {equipement.nom_salle || "N/A"} {/* Utilisation de nom_salle */}
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    fontSize: "14px",
                    color: "#344767",
                    borderBottom: index !== equipements.length - 1 ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  {equipement.equipement_id} {/* Afficher l'ID de l'équipement */}
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    fontSize: "14px",
                    color: "#344767",
                    borderBottom: index !== equipements.length - 1 ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  {equipement.command_id || "N/A"} {/* Afficher l'ID de la commande */}
                </td>
                <td
                  style={{
                    padding: "10px 15px",
                    textAlign: "center",
                    fontSize: "14px",
                    color: "#344767",
                    borderBottom: index !== equipements.length - 1 ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  {/* Bouton Modifier - Désactivé si le statut est "Non Exploitable" */}
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/edit-equipement/${equipement.equipement_id}`)}
                    disabled={equipement.status_equipement === "Non Exploitable"} // Désactiver si le statut est "Non Exploitable"
                  >
                    <EditIcon />
                  </IconButton>

                  {/* Bouton Archiver - Désactivé si le statut est "Non Exploitable" */}
                  <IconButton
                    color="info"
                    onClick={() => handleArchive(equipement.equipement_id)}
                    disabled={equipement.status_equipement !== "Non Exploitable"} // Désactiver si le statut est "Non Exploitable"
                  >
                    <ArchiveIcon />
                  </IconButton>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </SoftBox>
  );
}

export default EquipementTable;