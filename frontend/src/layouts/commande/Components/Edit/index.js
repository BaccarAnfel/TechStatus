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
  const { commandId } = useParams();
  const navigate = useNavigate();
  const [articles, setArticles] = useState([]);
  const [statusCmd, setStatusCmd] = useState("En cours"); // Statut de la commande
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Liste statique des équipements prédéfinis
  const equipementsPredefinis = ["Vidéo projecteur", "Imprimante", "Ordinateur portable", "Tableau blanc"];

  // Récupérer les détails de la commande depuis l'API
  useEffect(() => {
    const fetchCommande = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/commandes/${commandId}`);
        if (!response.ok) {
          throw new Error("Commande non trouvée");
        }
        const data = await response.json();
        console.log("Données de la commande:", data);

        // Récupérer le statut de la commande
        setStatusCmd(data.status_cmd);

        // Correction de la méthode articlesAvecEquipementsValides
        const articlesAvecEquipementsValides = data.equipements
          .filter((equipement) => equipement.nom_Equipement) // Ignorer les équipements sans nom
          .map((equipement) => ({
            nom_Equipement: equipementsPredefinis.includes(equipement.nom_Equipement.trim())
              ? equipement.nom_Equipement.trim() // Utiliser le nom tel quel s'il est valide
              : "", // Remplacer par une chaîne vide pour les équipements non reconnus
            quantity: equipement.quantity,
          }));

        console.log("Articles avec équipements valides:", articlesAvecEquipementsValides);
        setArticles(articlesAvecEquipementsValides);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération de la commande:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCommande();
  }, [commandId]);

  // Gérer le changement d'équipement
  const handleEquipementChange = (index, value) => {
    const newArticles = [...articles];
    newArticles[index].nom_Equipement = value;
    setArticles(newArticles);
  };

  // Gérer le changement de quantité
  const handleQuantityChange = (index, value) => {
    const newArticles = [...articles];
    newArticles[index].quantity = value;
    setArticles(newArticles);
  };

  // Gérer le changement de statut de la commande
  const handleStatusChange = (value) => {
    setStatusCmd(value);
  };

  // Ajouter un nouvel article à la commande
  const handleAddArticle = () => {
    setArticles([...articles, { nom_Equipement: "", quantity: 1 }]);
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
        body: JSON.stringify({ articles, status_cmd: statusCmd }), // Envoyer les articles et le statut
      });

      if (response.ok) {
        alert("Commande mise à jour avec succès !");
        navigate("/commandes");
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

        {/* Champ pour modifier le statut de la commande */}
        <SoftBox display="flex" justifyContent="space-between" ml={3} mb={2}>
          <SoftBox flex={1}>
            <Select
              labelId="status-label"
              value={statusCmd}
              onChange={(e) => handleStatusChange(e.target.value)}
              fullWidth
            >
              <MenuItem value="En cours">En cours</MenuItem>
              <MenuItem value="Terminée">Terminée</MenuItem>
            </Select>
          </SoftBox>
        </SoftBox>

        {/* Afficher les articles de la commande */}
        {articles.map((article, index) => (
          <SoftBox key={index} display="flex" justifyContent="space-between" ml={3} mb={2}>
            <SoftBox flex={1}>
              <Select
                labelId="equipement-label"
                value={article.nom_Equipement || ""}
                onChange={(e) => handleEquipementChange(index, e.target.value)}
                displayEmpty
                fullWidth
              >
                <MenuItem value="" disabled>
                  Sélectionner un équipement
                </MenuItem>
                {equipementsPredefinis.map((equipement, i) => (
                  <MenuItem key={i} value={equipement}>
                    {equipement}
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