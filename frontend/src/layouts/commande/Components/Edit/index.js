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
  const [articles, setArticles] = useState([]);
  const [equipements, setEquipements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les détails de la commande depuis l'API
  useEffect(() => {
    const fetchCommande = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/commandes/${commandId}`);
        if (!response.ok) {
          throw new Error("Commande non trouvée");
        }
        const data = await response.json();
        setArticles(data.equipements); // Mettre à jour les articles avec les équipements de la commande
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération de la commande:", error);
        setError(error.message);
        setLoading(false);
      }
    };

    fetchCommande();
  }, [commandId]);

  // Récupérer la liste des équipements
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

  const handleAddArticle = () => {
    setArticles([...articles, { equipement_id: "", quantity: "" }]);
  };

  const handleCancel = () => {
    navigate("/"); // Rediriger vers la page d'accueil ou une autre page
  };

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
        console.log("Commande mise à jour avec succès !");
        navigate("/"); // Rediriger vers la page d'accueil ou une autre page
      } else {
        console.error("Erreur lors de la mise à jour de la commande");
      }
    } catch (error) {
      console.error("Erreur lors de l'envoi de la commande:", error);
    }
  };

  if (loading) {
    return <div>Chargement en cours...</div>;
  }

  if (error) {
    return <div>Erreur : {error}</div>;
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <Card>
        <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
          <SoftTypography variant="h6">Éditer la commande #{commandId}</SoftTypography>
        </SoftBox>

        {articles.map((article, index) => (
          <SoftBox key={index} display="flex" justifyContent="space-between" ml={3} mr={3} mt={2}>
            <SoftBox flex={1} mr={3}>
              <Select
                labelId="equipement-label"
                value={article.equipement_id || ""}
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
            Ajouter un article
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
              Enregistrer
            </SoftButton>
          </SoftBox>
        </SoftBox>
      </Card>
    </DashboardLayout>
  );
}

export default EditCommande;