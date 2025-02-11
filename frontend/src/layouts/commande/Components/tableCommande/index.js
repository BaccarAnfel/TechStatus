import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftBadge from "components/SoftBadge";
import SoftTypography from "components/SoftTypography";
import { useNavigate } from "react-router-dom";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import Alert from "@mui/material/Alert";
import ArchiveIcon from "@mui/icons-material/Archive";
import PrintIcon from "@mui/icons-material/Print";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";

function CommandeTable() {
  const [commandes, setCommandes] = useState([]); // State pour stocker les données des commandes
  const [loading, setLoading] = useState(true); // State pour le chargement
  const [error, setError] = useState(null); // State pour les erreurs
  const [success, setSuccess] = useState(null); // State pour les messages de succès
  const [filterStatus, setFilterStatus] = useState("all"); // State pour le filtre de statut
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCommandesData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/commandes");
        const data = await response.json();
        if (Array.isArray(data)) {
          const sortedCommandes = data.sort((a, b) => a.command_id - b.command_id);
          setCommandes(sortedCommandes);
        } else {
          console.error("Expected an array but got:", data);
          setCommandes([]);
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

  const handleArchive = async (commandId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/commandes/archive/${commandId}`, {
        method: "PUT",
      });
      if (response.ok) {
        setSuccess("Commande archivée avec succès");
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

  const handlePrint = (commandId) => {
    navigate(`/commandes/${commandId}/print`);
  };

  const filteredCommandes = commandes.filter((commande) => {
    if (filterStatus === "all") {
      return true;
    } else {
      return commande.status_cmd === filterStatus;
    }
  });

  if (loading) {
    return <div>Chargement...</div>;
  }

  if (!Array.isArray(commandes)) {
    return <div>Erreur: Les données reçues ne sont pas valides.</div>;
  }

  return (
    <Card>
      <SoftBox p={3}>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" mb={2}>
          <SoftTypography variant="h6" fontWeight="bold">
            Table des Commandes
          </SoftTypography>
          <FormControl variant="outlined" size="small">
            <Select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              style={{ minWidth: 120 }}
            >
              <MenuItem value="all">Filtre: Tous</MenuItem>
              <MenuItem value="En cours">Filtre: En cours</MenuItem>
              <MenuItem value="Terminée">Filtre: Terminée</MenuItem>
            </Select>
          </FormControl>
        </SoftBox>
        {/* Affichage des messages d'erreur ou de succès */}
        {error && <Alert severity="error">{error}</Alert>}
        {success && <Alert severity="success">{success}</Alert>}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.header}>N°</th>
              <th style={styles.header}>ID DE COMMANDE</th>
              <th style={styles.header}>STATUT</th>
              <th style={styles.header}>UTILISATEUR</th>
              <th style={styles.header}>DATE DE COMMANDE</th>
              <th style={styles.header}>ACTION</th>
            </tr>
          </thead>
          <tbody>
            {filteredCommandes.map((commande, index) => (
              <tr key={commande.command_id} style={styles.cell}>
                <td style={styles.cell}>{index + 1}</td>
                <td style={styles.cell}>{commande.command_id}</td>
                <td style={styles.cell}><SoftBadge
                  variant="gradient"
                  badgeContent={commande.status_cmd}
                  color={commande.status_cmd === "En cours" ? "info" : "success"}
                  size="xs"
                  container
                /></td>
                <td style={styles.cell}>{commande.nom_utilisateur || "N/A"}</td>
                <td style={styles.cell}>{commande.date || "N/A"}</td>
                <td style={styles.cell}>
                  <IconButton
                    color="primary"
                    onClick={() => navigate(`/edit-commande/${commande.command_id}`)}
                    disabled={commande.status_cmd === "Terminée"}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    color="info"
                    onClick={() => handleArchive(commande.command_id)}
                    disabled={commande.status_cmd !== "Terminée"}
                  >
                    <ArchiveIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => handlePrint(commande.command_id)}
                    disabled={commande.status_cmd !== "Terminée"}
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

export default CommandeTable;
