import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Alert from "@mui/material/Alert";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import ArchiveIcon from "@mui/icons-material/Archive";
import { Card } from "@mui/material";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function EquipementDetails() {
  const { equipementName } = useParams();
  const navigate = useNavigate();
  const [details, setDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filterStatus, setFilterStatus] = useState("Tous");
  const [success, setSuccess] = useState(null);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/equipements/details/${encodeURIComponent(equipementName)}`
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des détails de l'équipement");
        }
        const data = await response.json();
        setDetails(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [equipementName]);

  const handleArchive = async (equipementId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/equipements/archive/${equipementId}`, {
        method: "PUT",
      });
      if (response.ok) {
        setSuccess("Équipement archivé avec succès");
        const updatedDetails = details.filter((equipement) => equipement.equipement_id !== equipementId);
        setDetails(updatedDetails);
      } else {
        setError("Erreur lors de l'archivage de l'équipement");
      }
    } catch (error) {
      console.error("Erreur lors de l'archivage :", error);
      setError("Erreur lors de l'archivage de l'équipement");
    }
  };

  const filteredDetails =
    filterStatus === "Tous"
      ? details
      : details.filter((equipement) => equipement.status_equipement === filterStatus);

  if (loading) return <SoftTypography>Chargement...</SoftTypography>;
  if (error) return <Alert severity="error">{error}</Alert>;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <SoftBox p={3}>
          {success && <Alert severity="success">{success}</Alert>}
          {error && <Alert severity="error">{error}</Alert>}

          <SoftBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <SoftTypography variant="h6" fontWeight="bold">
              Détails de l&apos;équipement: {decodeURIComponent(equipementName)}
            </SoftTypography>
            <FormControl variant="outlined" size="small">
              <Select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                style={{ minWidth: 120 }}
              >
                <MenuItem value="Tous">Filtre: Tous</MenuItem>
                <MenuItem value="Disponible">Filtre: Disponible</MenuItem>
                <MenuItem value="En Utilisation">Filtre: En Utilisation</MenuItem>
                <MenuItem value="Non Exploitable">Filtre: Non Exploitable</MenuItem>
              </Select>
            </FormControl>
          </SoftBox>

          {filteredDetails.length === 0 ? (
            <SoftTypography>Aucun équipement trouvé.</SoftTypography>
          ) : (
            <table style={styles.table}>
              <thead>
                <tr>
                  <th style={styles.header}>NOM DE L&apos;ÉQUIPEMENT</th>
                  <th style={styles.header}>STATUS ÉQUIPEMENT</th>
                  <th style={styles.header}>SALLE ID</th>
                  <th style={styles.header}>COMMANDE ID</th>
                  <th style={{ ...styles.header, textAlign: "center" }}>ACTIONS</th>
                </tr>
              </thead>
              <tbody>
                {filteredDetails.map((equipement, index) => (
                  <tr key={index}>
                    <td style={styles.cell}>{equipement.nom_Equipement}</td>
                    <td style={styles.cell}>{equipement.status_equipement || "N/A"}</td>
                    <td style={styles.cell}>{equipement.salle_id || "N/A"}</td>
                    <td style={styles.cell}>{equipement.command_id || "N/A"}</td>
                    <td style={{ ...styles.cell, textAlign: "center" }}>
                      <IconButton
                        color="primary"
                        onClick={() => navigate(`/edit-equipement/${equipement.equipement_id}`)}
                        disabled={equipement.status_equipement === "Non Exploitable"}
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        color="info"
                        onClick={() => handleArchive(equipement.equipement_id)}
                        disabled={equipement.status_equipement !== "Non Exploitable"}
                      >
                        <ArchiveIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </SoftBox>
      </Card>
    </DashboardLayout>
  );
}
// Styles pour simplifier le code
const styles = {
  table: {
    width: "100%",
    borderCollapse: "collapse",
  },
  header: {
    textAlign: "left",
    padding: "10px 15px",
    color: "#8392ab",
    fontWeight: "bold",
    fontSize: "14px",
    borderBottom: "1px solid #e0e0e0",
  },
  cell: {
    padding: "10px 15px",
    fontSize: "14px",
    color: "#344767",
    borderBottom: "1px solid #e0e0e0",
  },
};

export default EquipementDetails;