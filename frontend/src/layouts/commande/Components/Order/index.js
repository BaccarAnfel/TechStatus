import React, { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";

function Ordre() {
  const [articles, setArticles] = useState([{ equipement_id: "", quantity: "" }]);
  const [equipements, setEquipements] = useState([]);
  const [status, setStatus] = useState("En cours");

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

  const handleAddArticle = () => {
    setArticles([...articles, { equipement_id: "", quantity: "" }]);
  };

  const handleEquipementChange = (index, value) => {
    const newArticles = [...articles];
    newArticles[index].equipement_id = value;
    setArticles(newArticles);
  };

  const handleQuantityChange = (index, value) => {
    const newArticles = [...articles];
    newArticles[index].quantity = value;
    setArticles(newArticles);
  };

  const handleStatusChange = (value) => {
    setStatus(value);
  };

  const handleCancel = () => {
    setArticles([{ equipement_id: "", quantity: "" }]);
    setStatus("En cours");
  };

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
        setArticles([{ equipement_id: "", quantity: "" }]);
        setStatus("En cours");
        alert("Commande enregistrée avec succès !");
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
        <SoftBox ml={3} mr={3} mt={2}>
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

        <SoftBox m={3}>
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
              onClick={handleCancel}
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

export default Ordre;