import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import { useNavigate } from "react-router-dom"; // Importer useNavigate
import IconButton from "@mui/material/IconButton"; // Importer IconButton
import EditIcon from "@mui/icons-material/Edit"; // Importer l'icône de modification
import DeleteIcon from "@mui/icons-material/Delete"; // Importer l'icône de suppression
import Dialog from "@mui/material/Dialog"; // Importer Dialog pour la confirmation
import DialogTitle from "@mui/material/DialogTitle"; // Importer DialogTitle
import DialogContent from "@mui/material/DialogContent"; // Importer DialogContent
import DialogActions from "@mui/material/DialogActions"; // Importer DialogActions
import Button from "@mui/material/Button"; // Importer Button
import Snackbar from "@mui/material/Snackbar"; // Importer Snackbar pour les notifications
import Alert from "@mui/material/Alert"; // Importer Alert pour les messages d'erreur
import CircularProgress from "@mui/material/CircularProgress"; // Importer CircularProgress pour le chargement

function SalleTable() {
  const [salles, setSalles] = useState([]); // State pour stocker les données des salles
  const [loading, setLoading] = useState(true); // State pour gérer le chargement initial
  const [deleteLoading, setDeleteLoading] = useState(false); // State pour gérer le chargement pendant la suppression
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false); // State pour gérer l'ouverture de la boîte de dialogue de suppression
  const [salleToDelete, setSalleToDelete] = useState(null); // State pour stocker la salle à supprimer
  const [snackbarOpen, setSnackbarOpen] = useState(false); // State pour gérer l'ouverture du Snackbar
  const [snackbarMessage, setSnackbarMessage] = useState(""); // State pour stocker le message du Snackbar
  const [snackbarSeverity, setSnackbarSeverity] = useState("success"); // State pour gérer la sévérité du Snackbar (success, error, etc.)
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

  // Fonction pour ouvrir la boîte de dialogue de suppression
  const handleDeleteClick = (salle_id) => {
    setSalleToDelete(salle_id);
    setOpenDeleteDialog(true);
  };

  // Fonction pour fermer la boîte de dialogue de suppression
  const handleDeleteDialogClose = () => {
    setOpenDeleteDialog(false);
    setSalleToDelete(null);
  };

  // Fonction pour gérer la suppression d'une salle
  const handleDeleteConfirm = async () => {
    setDeleteLoading(true);
    try {
      const response = await fetch(`http://localhost:5000/api/salles/${salleToDelete}`, {
        method: "DELETE",
      });

      if (response.ok) {
        // Supprimer la salle de l'état local
        setSalles(salles.filter((salle) => salle.salle_id !== salleToDelete));
        setSnackbarMessage("Salle supprimée avec succès");
        setSnackbarSeverity("success");
      } else {
        setSnackbarMessage("Erreur lors de la suppression de la salle");
        setSnackbarSeverity("error");
      }
    } catch (error) {
      console.error("Erreur lors de la suppression de la salle :", error);
      setSnackbarMessage("Erreur lors de la suppression de la salle");
      setSnackbarSeverity("error");
    } finally {
      setDeleteLoading(false);
      setOpenDeleteDialog(false);
      setSnackbarOpen(true);
    }
  };

  // Fonction pour gérer la redirection vers la page de modification
  const handleEdit = (salle_id) => {
    navigate(`/edit-salle/${salle_id}`); // Rediriger vers la page de modification
  };

  // Fonction pour fermer le Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  if (loading) {
    return (
      <SoftBox py={3} display="flex" justifyContent="center">
        <CircularProgress />
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
            <th style={{ textAlign: "left", padding: "10px 15px", color: "#8392ab", fontWeight: "bold", fontSize: "14px", borderBottom: "1px solid #e0e0e0" }}>
              ID DE SALLE
            </th>
            <th style={{ textAlign: "left", padding: "10px 15px", color: "#8392ab", fontWeight: "bold", fontSize: "14px", borderBottom: "1px solid #e0e0e0" }}>
              NOM DE SALLE
            </th>
            <th style={{ textAlign: "left", padding: "10px 15px", color: "#8392ab", fontWeight: "bold", fontSize: "14px", borderBottom: "1px solid #e0e0e0" }}>
              NOM DE LOCALE
            </th>
            <th style={{ textAlign: "center", padding: "10px 15px", color: "#8392ab", fontWeight: "bold", fontSize: "14px", borderBottom: "1px solid #e0e0e0" }}>
              ACTION
            </th>
          </tr>
        </thead>
        <tbody>
          {salles.map((salle, index) => (
            <tr key={salle.salle_id}>
              <td style={{ padding: "10px 15px", fontSize: "14px", color: "#344767", borderBottom: index !== salles.length - 1 ? "1px solid #e0e0e0" : "none" }}>
                {salle.salle_id}
              </td>
              <td style={{ padding: "10px 15px", fontSize: "14px", color: "#344767", borderBottom: index !== salles.length - 1 ? "1px solid #e0e0e0" : "none" }}>
                {salle.nom_Salle}
              </td>
              <td style={{ padding: "10px 15px", fontSize: "14px", color: "#344767", borderBottom: index !== salles.length - 1 ? "1px solid #e0e0e0" : "none" }}>
                {salle.nom_Local}
              </td>
              <td style={{ padding: "10px 15px", textAlign: "center", fontSize: "14px", color: "#344767", borderBottom: index !== salles.length - 1 ? "1px solid #e0e0e0" : "none" }}>
                {/* Bouton Modifier */}
                <IconButton color="primary" onClick={() => handleEdit(salle.salle_id)}>
                  <EditIcon />
                </IconButton>

                {/* Bouton Supprimer */}
                <IconButton color="error" onClick={() => handleDeleteClick(salle.salle_id)}>
                  <DeleteIcon />
                </IconButton>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Boîte de dialogue de confirmation pour la suppression */}
      <Dialog open={openDeleteDialog} onClose={handleDeleteDialogClose}>
        <DialogTitle>Confirmer la suppression</DialogTitle>
        <DialogContent>
          Êtes-vous sûr de vouloir supprimer cette salle ?
        </DialogContent>
        <DialogActions>
          <Button onClick={handleDeleteDialogClose} color="primary">
            Annuler
          </Button>
          <Button onClick={handleDeleteConfirm} color="error" disabled={deleteLoading}>
            {deleteLoading ? <CircularProgress size={24} /> : "Supprimer"}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar pour les notifications */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </SoftBox>
  );
}

export default SalleTable;