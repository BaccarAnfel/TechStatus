import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import PropTypes from "prop-types";

function Ordre({ onCancel, onSuccess }) {
  const [articles, setArticles] = useState([{ nom_Equipement: "", quantity: 1, status_equipement: "Disponible" }]);
  const [status_cmd, setStatusCmd] = useState("En cours");
  const [equipements, setEquipements] = useState([]); // État pour stocker les équipements

  // Récupérer les équipements depuis la base de données
  useEffect(() => {
    const fetchEquipements = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/equipementsByName");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des équipements");
        }
        const data = await response.json();
        setEquipements(data); // Mettre à jour l'état avec les équipements récupérés
      } catch (error) {
        console.error("Erreur:", error);
      }
    };

    fetchEquipements();
  }, []);

  const handleAddArticle = () => {
    setArticles([...articles, { nom_Equipement: "", quantity: 1, status_equipement: "Disponible" }]);
  };

  const handleEquipementChange = (index, value) => {
    const newArticles = [...articles];
    newArticles[index].nom_Equipement = value;
    setArticles(newArticles);
  };

  const handleQuantityChange = (index, value) => {
    const newArticles = [...articles];
    newArticles[index].quantity = value;
    setArticles(newArticles);
  };

  const handleStatusChange = (value) => {
    setStatusCmd(value);
  };

  const handleSubmit = async () => {
    try {
      const articlesToSend = articles.map((article) => ({
        nom_Equipement: article.nom_Equipement,
        quantity: article.quantity,
        status_equipement: article.status_equipement,
      }));

      const commandeResponse = await fetch("http://localhost:5000/api/commande", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: new Date().toISOString().split("T")[0],
          status_cmd: status_cmd,
          articles: articlesToSend,
        }),
      });

      if (!commandeResponse.ok) {
        throw new Error("Erreur lors de la création de la commande");
      }

      const commandeData = await commandeResponse.json();
      const commandId = commandeData.command_id;

      console.log("Commande et équipements créés avec succès !");
      setArticles([{ nom_Equipement: "", quantity: 1, status_equipement: "Disponible" }]);
      setStatusCmd("En cours");
      alert("Commande enregistrée avec succès !");
      onSuccess();
    } catch (error) {
      console.error("Erreur lors de l'enregistrement de la commande:", error);
      alert("Erreur lors de l'enregistrement de la commande");
    }
  };

  return (
    <Card>
      <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
        <SoftTypography variant="h6">Passer une commande</SoftTypography>
      </SoftBox>

      <SoftBox ml={3} mr={3} mt={1}>
        <FormControl fullWidth>
          <Select
            value={status_cmd}
            onChange={(e) => handleStatusChange(e.target.value)}
            displayEmpty
            inputProps={{ "aria-label": "Statut" }}
          >
            <MenuItem value="En cours">En cours</MenuItem>
          </Select>
        </FormControl>
      </SoftBox>

      {articles.map((article, index) => (
        <SoftBox key={index} display="flex" justifyContent="space-between" ml={3} mr={3} mt={2} mb={2}>
          <SoftBox flex={1} mr={2}>
            <FormControl fullWidth>
              <Select
                value={article.nom_Equipement}
                onChange={(e) => handleEquipementChange(index, e.target.value)}
                displayEmpty
                inputProps={{ "aria-label": "Nom de l'équipement" }}
              >
                <MenuItem value="" disabled>
                  Sélectionnez un équipement
                </MenuItem>
                {equipements.map((equipement, i) => (
                  <MenuItem key={i} value={equipement}>
                    {equipement}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </SoftBox>

          <SoftBox flex={1} ml={2}>
            <TextField
              type="number"
              placeholder="Quantité"
              value={article.quantity}
              onChange={(e) => handleQuantityChange(index, e.target.value)}
              fullWidth
              inputProps={{ min: 1 }} // Quantité minimale de 1
            />
          </SoftBox>
        </SoftBox>
      ))}

      <SoftBox ml={3} mr={3} mb={2}>
        <SoftButton variant="gradient" color="dark" fullWidth onClick={handleAddArticle}>
          Ajouter un autre article
        </SoftButton>
      </SoftBox>

      <SoftBox mb={3} display="flex" justifyContent="space-around" alignItems="stretch">
        <SoftBox>
          <SoftButton
            sx={{ width: (theme) => theme.spacing(69) }}
            variant="gradient"
            color="secondary"
            fullWidth
            onClick={onCancel}
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

Ordre.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onSuccess: PropTypes.func.isRequired,
};

export default Ordre;