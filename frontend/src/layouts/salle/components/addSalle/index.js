import React, { useState, useEffect } from "react";
import PropTypes from "prop-types"; // Importer PropTypes
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Card from "@mui/material/Card";

function AddSalle({ onCancel, onSalleAdded }) {
  const [salle, setSalle] = useState({
    nom_Salle: "",
    local_id: "", // Ajouter local_id à l'état de la salle
  });

  const [locaux, setLocaux] = useState([]); // État pour stocker la liste des locaux
  const [loading, setLoading] = useState(true); // État pour le chargement

  // Récupérer la liste des locaux depuis l'API
  useEffect(() => {
    const fetchLocaux = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/locaux");
        const data = await response.json();
        setLocaux(data); // Mettre à jour l'état des locaux
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des locaux :", error);
        setLoading(false);
      }
    };

    fetchLocaux();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSalle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!salle.nom_Salle || !salle.local_id) {
      alert("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const response = await fetch("http://localhost:5000/api/salles", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salle), // Envoyer nom_Salle et local_id
      });

      if (response.ok) {
        alert("Salle ajoutée avec succès !");
        setSalle({ nom_Salle: "", local_id: "" }); // Réinitialiser les champs
        if (onCancel) onCancel(); // Masquer le formulaire
        if (onSalleAdded) onSalleAdded(); // Appeler la fonction de callback pour rafraîchir la table
      } else {
        console.error("Erreur lors de l'ajout de la salle");
        alert("Erreur lors de l'ajout de la salle");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la requête:", error);
      alert("Erreur lors de l'envoi de la requête");
    }
  };

  if (loading) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6">Chargement en cours...</SoftTypography>
      </SoftBox>
    );
  }

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
            <SoftTypography variant="h6" mb={1}>
              Nom de la salle
            </SoftTypography>
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
          <SoftBox flex={1} mr={3}>
            <SoftTypography variant="h6" mb={1}>
              Local
            </SoftTypography>
            <select
              name="local_id"
              value={salle.local_id || ""} // Utiliser la valeur de salle.local_id ou une chaîne vide par défaut
              onChange={handleChange}
              style={{
                width: "100%",
                height: "54%",
                padding: "8px",
                borderRadius: "8px",
                border: "1px solid #ccc",
                fontSize: "14px",
              }}
            >
              <option value="" disabled>
                Sélectionner un local
              </option>{" "}
              {/* Option désactivée par défaut */}
              {locaux.map((local) => (
                <option key={local.local_id} value={local.local_id}>
                  {local.nom_Local}
                </option>
              ))}
            </select>
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
  onSalleAdded: PropTypes.func.isRequired, // onSalleAdded est une fonction obligatoire
};

export default AddSalle;