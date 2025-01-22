import Card from "@mui/material/Card";
import React, { useState } from "react";
import PropTypes from "prop-types"; // Importer PropTypes
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";

function AjoutLocal({ onCancel, onLocalAdded }) {
  const [local, setLocal] = useState({
    nom_Local: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLocal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!local.nom_Local) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/addLocaux", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(local),
      });

      if (response.ok) {
        console.log("Local ajouté avec succès !");
        alert("Local ajouté avec succès !");
        // Réinitialisation des champs
        setLocal({
          nom_Local: "",
        });
        // Masquer le formulaire après la soumission
        if (onCancel) onCancel();
        // Appeler la fonction de callback pour mettre à jour la table
        if (onLocalAdded) onLocalAdded();
      } else {
        console.error("Erreur lors de l'ajout du local");
        alert("Erreur lors de l'ajout du local");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête:", error);
      alert("Erreur lors de l'envoi de la requête");
    }
  };

  const handleCancel = () => {
    // Réinitialiser les champs
    setLocal({
      nom_Local: "",
    });
    // Masquer le formulaire
    if (onCancel) onCancel();
  };

  return (
    <SoftBox mb={3}>
      <Card>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <SoftTypography variant="h6" fontWeight="bold">
            Ajouter un nouveau local
          </SoftTypography>
        </SoftBox>
        <SoftBox flexWrap="wrap" display="flex" justifyContent="space-between" ml={3}>
          <SoftBox flex={1} mr={3}>
            <SoftInput
              icon={{ direction: "left" }}
              type="text"
              placeholder="Nom du local"
              name="nom_Local"
              value={local.nom_Local}
              onChange={handleChange}
              fullWidth
            />
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
AjoutLocal.propTypes = {
  onCancel: PropTypes.func.isRequired, // onCancel est une fonction obligatoire
  onLocalAdded: PropTypes.func.isRequired, // onLocalAdded est une fonction obligatoire
};

export default AjoutLocal;