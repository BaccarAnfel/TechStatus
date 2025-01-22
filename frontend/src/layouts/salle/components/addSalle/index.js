import React, { useState } from "react";
import PropTypes from "prop-types"; // Importer PropTypes
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Card from "@mui/material/Card";

function AddSalle({ onCancel }) {
  const [salle, setSalle] = useState({
    nom_Salle: "", // Supprimer le champ capacite
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!salle.nom_Salle) {
      // Supprimer la validation de capacite
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/salles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salle), // Envoyer uniquement nom_Salle
      });

      if (response.ok) {
        alert("Salle ajoutée avec succès !");
        setSalle({ nom_Salle: "" }); // Réinitialiser uniquement nom_Salle
        if (onCancel) onCancel(); // Masquer le formulaire
      } else {
        console.error("Erreur lors de l'ajout de la salle");
        alert("Erreur lors de l'ajout de la salle");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête:", error);
      alert("Erreur lors de l'envoi de la requête");
    }
  };

  return (
    <SoftBox mb={3}>
      <Card>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <SoftTypography variant="h6" fontWeight="bold">
            Ajouter une nouvelle salle
          </SoftTypography>
        </SoftBox>
        <SoftBox flexWrap="wrap" display="flex" justifyContent="space-between" ml={3}>
          <SoftBox flex={1} mr={3}>
            <SoftInput
              icon={{ direction: "left" }}
              type="text"
              placeholder="Nom de la salle"
              name="nom_Salle"
              value={salle.nom_Salle}
              onChange={handleChange}
              fullWidth
            />
          </SoftBox>
        </SoftBox>
        <SoftBox display="flex" justifyContent="center" mt={3} mb={3} gap={3}>
          <SoftButton variant="gradient" color="error" sx={{ width: "47%" }} onClick={onCancel}>
            Annuler
          </SoftButton>
          <SoftButton
            variant="gradient"
            color="secondary"
            sx={{ width: "47%" }}
            onClick={handleSubmit}
          >
            Confirmer
          </SoftButton>
        </SoftBox>
      </Card>
    </SoftBox>
  );
}

// Validation des props
AddSalle.propTypes = {
  onCancel: PropTypes.func.isRequired, // onCancel est une fonction obligatoire
};

export default AddSalle;
