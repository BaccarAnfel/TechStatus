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
import InputLabel from "@mui/material/InputLabel";

function Ordre() {
  const [articles, setArticles] = useState([{ nom_Equipement: "", quantity: "" }]);
  const [equipements, setEquipements] = useState([]);

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
    setArticles([...articles, { nom_Equipement: "", quantity: "" }]);
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

  const handleCancel = () => {
    setArticles([{ nom_Equipement: "", quantity: "" }]);
  };

  const handleSubmit = async () => {
    try {
        const response = await fetch("http://localhost:5000/api/ordre", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ articles }),
        });

        if (response.ok) {
            console.log("Commande enregistrée avec succès !");
            setArticles([{ nom_Equipement: "", quantity: "" }]);
        } else {
            console.error("Erreur lors de l'enregistrement de la commande");
        }
    } catch (error) {
        console.error("Erreur lors de l'envoi de la commande:", error);
    }
};

  return (

        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6">Passer une commande</SoftTypography>
          </SoftBox>

          {articles.map((article, index) => (
            <SoftBox key={index} display="flex" justifyContent="space-between" ml={3} mr={3} mt={2}>
              <SoftBox flex={1} mr={3}>
              <Select
                    labelId="equipement-label"
                    value={article.equipement_id}
                    onChange={(e) => handleEquipementChange(index, e.target.value)}
                    displayEmpty
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
              </SoftBox>

              <SoftBox flex={1} ml={3}>
                <SoftInput
                  icon={{ direction: "left" }}
                  type="number"
                  placeholder="Quantité"
                  value={article.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
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
                Soumettre
              </SoftButton>
            </SoftBox>
          </SoftBox>
        </Card>
  );
}

export default Ordre;