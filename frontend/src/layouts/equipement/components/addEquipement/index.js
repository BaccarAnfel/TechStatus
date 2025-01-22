import Card from "@mui/material/Card";
import React, { useState } from "react";
import PropTypes from "prop-types"; // Importer PropTypes
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";

function AddEquipement({ onCancel, onEquipementAdded }) {
  const [equipement, setEquipement] = useState({
    nom_equipement: "",
    status: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEquipement((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!equipement.nom_equipement || !equipement.status) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/addEquipement", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipement),
      });

      if (response.ok) {
        console.log("Équipement ajouté avec succès !");
        alert("Équipement ajouté avec succès !");
        // Réinitialisation des champs
        setEquipement({
          nom_equipement: "",
          status: "",
        });
        // Masquer le formulaire après la soumission
        if (onCancel) onCancel();
        // Appeler la fonction de callback pour mettre à jour la table
        if (onEquipementAdded) onEquipementAdded();
      } else {
        console.error("Erreur lors de l'ajout de l'équipement");
        alert("Erreur lors de l'ajout de l'équipement");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête:", error);
      alert("Erreur lors de l'envoi de la requête");
    }
  };

  const handleCancel = () => {
    // Réinitialiser les champs
    setEquipement({
      nom_equipement: "",
      status: "",
    });
    // Masquer le formulaire
    if (onCancel) onCancel();
  };

  return (
    <SoftBox mb={3}>
      <Card>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <SoftTypography variant="h6" fontWeight="bold">
            Ajouter un nouvel équipement
          </SoftTypography>
        </SoftBox>
        <SoftBox flexWrap="wrap" display="flex" justifyContent="space-between" ml={3}>
          <SoftBox flex={1} mr={3}>
            <SoftInput
              icon={{ direction: "left" }}
              type="text"
              placeholder="Nom de l'équipement"
              name="nom_equipement"
              value={equipement.nom_equipement}
              onChange={handleChange}
            />
          </SoftBox>
          <SoftBox flex={1} mr={3}>
            <Select
              name="status"
              value={equipement.status}
              onChange={handleChange}
              displayEmpty
              fullWidth
            >
              <MenuItem value="" disabled>
                Sélectionner un statut
              </MenuItem>
              <MenuItem value="En Maintenance">En Maintenance</MenuItem>
              <MenuItem value="En Utilisation">En Utilisation</MenuItem>
              <MenuItem value="Disponible">Disponible</MenuItem>
            </Select>
          </SoftBox>
        </SoftBox>
        <SoftBox display="flex" justifyContent="center" mt={3} mb={3} gap={3}>
          <SoftButton variant="gradient" color="error" sx={{ width: "47%" }} onClick={handleCancel}>
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
AddEquipement.propTypes = {
  onCancel: PropTypes.func.isRequired, // onCancel est une fonction obligatoire
  onEquipementAdded: PropTypes.func.isRequired, // onEquipementAdded est une fonction obligatoire
};

export default AddEquipement;