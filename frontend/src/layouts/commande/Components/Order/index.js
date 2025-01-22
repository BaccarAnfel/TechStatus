import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import PropTypes from "prop-types"; // Importer PropTypes

function Ordre({ onCancel, onSuccess }) {
  const [articles, setArticles] = useState([{ equipement_id: "", quantity: "" }]);
  const [equipements, setEquipements] = useState([]);
  const [status, setStatus] = useState("En cours");

  // Récupérer la liste des équipements disponibles
  useEffect(() => {
    const fetchEquipements = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/equipements");
        const data = await response.json();

        // Filtrer les équipements disponibles
        const equipementsDisponibles = data.filter(
          (equipement) => equipement.status === "Disponible"
        );

        setEquipements(equipementsDisponibles); // Mettre à jour l'état avec les équipements disponibles
      } catch (error) {
        console.error("Erreur lors de la récupération des équipements:", error);
      }
    };

    fetchEquipements();
  }, []);

  // Ajouter un nouvel article
  const handleAddArticle = () => {
    setArticles([...articles, { equipement_id: "", quantity: "" }]);
  };

  // Changer l'équipement sélectionné
  const handleEquipementChange = (index, value) => {
    const newArticles = [...articles];
    newArticles[index].equipement_id = value;
    setArticles(newArticles);
  };

  // Changer la quantité
  const handleQuantityChange = (index, value) => {
    const newArticles = [...articles];
    newArticles[index].quantity = value;
    setArticles(newArticles);
  };

  // Changer le statut
  const handleStatusChange = (value) => {
    setStatus(value);
  };

  // Soumettre la commande
  const handleSubmit = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/ordre", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ articles, status }),
      });

      if (response.ok) {
        console.log("Commande enregistrée avec succès !");
        setArticles([{ equipement_id: "", quantity: "" }]); // Réinitialiser les articles
        setStatus("En cours"); // Réinitialiser le statut
        alert("Commande enregistrée avec succès !");
        onSuccess(); // Appeler onSuccess pour rafraîchir la table des commandes
      } else {
        console.error("Erreur lors de l'enregistrement de la commande");
        alert("Erreur lors de l'enregistrement de la commande");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la commande:", error);
      alert("Erreur lors de l'envoi de la commande");
    }
  };

  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftTypography variant="h6">Passer une commande</SoftTypography>
      </SoftBox>

      {/* Champ pour le statut */}
      <SoftBox ml={3} mr={3} mt={1}>
        <FormControl fullWidth>
          <Select
            value={status}
            onChange={(e) => handleStatusChange(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Statut" }}
          >
            <MenuItem value="En cours">En cours</MenuItem>
            <MenuItem value="Terminée">Terminée</MenuItem>
          </Select>
        </FormControl>
      </SoftBox>

      {/* Liste des articles */}
      {articles.map((article, index) => (
        <SoftBox key={index} display="flex" justifyContent="space-between" ml={3} mr={3} mt={2} mb={2}>
          <SoftBox flex={1} mr={2}>
            <FormControl fullWidth>
              <Select
                value={article.equipement_id}
                onChange={(e) => handleEquipementChange(index, e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Équipement" }}
              >
                <MenuItem value="" disabled>
                  Choisir un équipement
                </MenuItem>
                {equipements.map((equipement, i) => (
                  <MenuItem key={i} value={equipement.equipement_id}>
                    {equipement.nom_Equipement}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </SoftBox>

          <SoftBox flex={1} ml={2}>
            <SoftInput
              icon={{ direction: "left" }}
              type="number"
              placeholder="Quantité"
              value={article.quantity}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
              fullWidth
            />
          </SoftBox>
        </SoftBox>
      ))}

      {/* Bouton pour ajouter un autre article */}
      <SoftBox ml={3} mr={3} mb={2}>
        <SoftButton variant="gradient" color="dark" fullWidth onClick={handleAddArticle}>
          Ajouter un autre article
        </SoftButton>
      </SoftBox>

      {/* Boutons Annuler et Soumettre */}
      <SoftBox mb={3} display="flex" justifyContent="space-around" alignItems="stretch">
        <SoftBox>
          <SoftButton
            sx={{ width: (theme) => theme.spacing(69) }}
            variant="gradient"
            color="secondary"
            fullWidth
            onClick={onCancel} // Appeler onCancel pour fermer le formulaire
          >
            Annuler
          </SoftButton>
        </SoftBox>
        <SoftBox>
          <SoftButton
            sx={{ width: (theme) => theme.spacing(69) }}
            variant="gradient"
            color="secondary"
            fullWidth
            onClick={handleSubmit}
          >
            Soumettre
          </SoftButton>
        </SoftBox>
      </SoftBox>
    </Card>
  );
}

// Validation des props
Ordre.propTypes = {
  onCancel: PropTypes.func.isRequired, // onCancel est une fonction obligatoire
  onSuccess: PropTypes.func.isRequired, // onSuccess est une fonction obligatoire
};

export default Ordre;