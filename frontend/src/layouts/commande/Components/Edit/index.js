import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function EditCommande() {
  const { commandId } = useParams(); // Récupérer l'ID de la commande depuis l'URL
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]); // État pour les articles de la commande
  const [equipements, setEquipements] = useState([]); // État pour la liste des équipements disponibles
  const [loading, setLoading] = useState(true); // État pour le chargement
  const [error, setError] = useState(null); // État pour les erreurs

  // Récupérer les détails de la commande depuis l'API
  useEffect(() => {
    const fetchCommande = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/commandes/${commandId}`);
        if (!response.ok) {
          throw new Error("Commande non trouvée");
        }
        const data = await response.json();
        console.log("Données de la commande:", data); // Afficher les données dans la console

        // Mettre à jour les articles avec les équipements de la commande
        setArticles(
          data.equipements.map((equipement) => ({
            equipement_id: equipement.equipement_id, // Assurez-vous que c'est la bonne clé
            quantity: equipement.quantity,
            nom_Equipement: equipement.nom_Equipement || "Non spécifié", // Assurez-vous que c'est la bonne clé
          }))
        );
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération de la commande:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCommande();
  }, [commandId]);

  // Récupérer la liste des équipements disponibles
  useEffect(() => {
    const fetchEquipements = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/equipements");
        const data = await response.json();
        setEquipements(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des équipements:", error);
      }
    };

    fetchEquipements();
  }, []);

  // Gérer le changement d'équipement
  const handleEquipementChange = (index, value) => {
    const newArticles = [...articles];
    const selectedEquipement = equipements.find((equipement) => equipement.equipement_id === value);

    newArticles[index].equipement_id = value;
    newArticles[index].nom_Equipement = selectedEquipement ? selectedEquipement.nom_Equipement : "";
    setArticles(newArticles);
  };

  // Gérer le changement de quantité
  const handleQuantityChange = (index, value) => {
    const newArticles = [...articles];
    newArticles[index].quantity = value;
    setArticles(newArticles);
  };

  // Ajouter un nouvel article à la commande
  const handleAddArticle = () => {
    setArticles([...articles, { equipement_id: "", quantity: 1, nom_Equipement: "" }]);
  };

  // Supprimer un article de la commande
  const handleRemoveArticle = (index) => {
    const newArticles = articles.filter((_, i) => i !== index);
    setArticles(newArticles);
  };

  // Annuler et revenir à la page d'accueil
  const handleCancel = () => {
    navigate("/commandes");
  };

  // Sauvegarder les modifications
  const handleSubmit = async () => {
    try {
      const response = await fetch(`http://localhost:5000/api/commandes/${commandId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ articles }),
      });

      if (response.ok) {
        alert("Commande mise à jour avec succès !");
        navigate("/commandes"); // Rediriger vers la liste des commandes
      } else {
        console.error("Erreur lors de la mise à jour de la commande");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la commande:", error);
    }
  };

  // Afficher un message de chargement
  if (loading) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6">Chargement en cours...</SoftTypography>
      </SoftBox>
    );
  }

  // Afficher un message d'erreur
  if (error) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6" color="error">
          Erreur : {error}
        </SoftTypography>
      </SoftBox>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <SoftTypography variant="h6">Éditer la commande #{commandId}</SoftTypography>
        </SoftBox>

        {/* Afficher les articles de la commande */}
        {articles.map((article, index) => (
          <SoftBox key={index} display="flex" justifyContent="space-between" ml={3} >
            <SoftBox flex={1}>
              <Select
                labelId="equipement-label"
                value={article.equipement_id || ""}
                onChange={(e) => handleEquipementChange(index, e.target.value)}
                displayEmpty
                fullWidth
              >
                <MenuItem value="" disabled>
                  Sélectionner un équipement
                </MenuItem>
                {equipements.map((equipement) => (
                  <MenuItem key={equipement.equipement_id} value={equipement.equipement_id}>
                    {equipement.nom_Equipement}
                  </MenuItem>
                ))}
              </Select>
            </SoftBox>

            <SoftBox flex={1} ml={3}>
              <SoftInput
                icon={{ direction: "left" }}
                type="number"
                placeholder="Quantité"
                value={article.quantity || ""}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                fullWidth
              />
            </SoftBox>

            <SoftBox flex={1} ml={3}>
              <SoftButton
                variant="gradient"
                color="error"
                onClick={() => handleRemoveArticle(index)}
              >
                Supprimer
              </SoftButton>
            </SoftBox>
          </SoftBox>
        ))}

        {/* Bouton pour ajouter un nouvel article */}
        <SoftBox m={3}>
          <SoftButton variant="gradient" color="dark" fullWidth onClick={handleAddArticle}>
            Ajouter un nouvel article
          </SoftButton>
        </SoftBox>

        {/* Boutons Annuler et Enregistrer */}
        <SoftBox mb={3} display="flex" justifyContent="space-around" alignItems="stretch">
          <SoftBox>
            <SoftButton
              sx={{ width: (theme) => theme.spacing(70) }}
              variant="gradient"
              color="secondary"
              fullWidth
              onClick={handleCancel}
            >
              Annuler
            </SoftButton>
          </SoftBox>
          <SoftBox>
            <SoftButton
              sx={{ width: (theme) => theme.spacing(70) }}
              variant="gradient"
              color="secondary"
              fullWidth
              onClick={handleSubmit}
            >
              Enregistrer
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </Card>
    </DashboardLayout>
  );
}

export default EditCommande;
