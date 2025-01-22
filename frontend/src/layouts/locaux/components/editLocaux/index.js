import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function EditLocaux() {
  const { local_id } = useParams(); // Récupérer l'ID du local depuis l'URL
  const navigate = useNavigate();
  const [local, setLocal] = useState({
    nom_Local: "",
  });
  const [loading, setLoading] = useState(true);

  // Récupérer les données du local
  useEffect(() => {
    const fetchLocalData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/locaux/${local_id}`);
        const data = await response.json();
        setLocal(data); // Mettre à jour l'état local avec les données récupérées
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      }
    };

    fetchLocalData();
  }, [local_id]);

  // Gérer la modification des champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLocal((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Soumettre le formulaire pour mettre à jour le local
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/locaux/${local_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(local), // Envoyer les données mises à jour
      });

      if (response.ok) {
        alert("Local mis à jour avec succès !");
        navigate("/locaux"); // Rediriger vers la table des locaux
      } else {
        console.error("Erreur lors de la mise à jour du local");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour du local :", error);
    }
  };

  if (loading) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6">Chargement...</SoftTypography>
      </SoftBox>
    );
  }

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox mb={3}>
        <Card>
          <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
            <SoftTypography variant="h6" fontWeight="bold">
              Modifier le local
            </SoftTypography>
          </SoftBox>
          <SoftBox flexWrap="wrap" display="flex" justifyContent="space-between" ml={3}>
            <SoftBox flex={1} mr={3}>
              <SoftTypography variant="h6" mb={1}>
                Nom du local
              </SoftTypography>
              <SoftInput
                icon={{ direction: "left" }}
                type="text"
                placeholder="Nom du local"
                name="nom_Local"
                value={local.nom_Local} // Pré-remplir le champ avec la valeur récupérée
                onChange={handleInputChange}
                fullWidth
              />
            </SoftBox>
          </SoftBox>
          <SoftBox display="flex" justifyContent="center" mt={3} mb={3} gap={3}>
            <SoftButton
              variant="gradient"
              color="error"
              sx={{ width: "47%" }}
              onClick={() => navigate("/locaux")} // Annuler et revenir à la table des locaux
            >
              Annuler
            </SoftButton>
            <SoftButton
              variant="gradient"
              color="secondary"
              sx={{ width: "47%" }}
              onClick={handleSubmit}
            >
              Enregistrer
            </SoftButton>
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}

export default EditLocaux;
