import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function EditSalle() {
  const { salle_id } = useParams(); // Récupérer l'ID de la salle depuis l'URL
  const navigate = useNavigate();
  const [salle, setSalle] = useState({
    nom_Salle: "",
    local_id: "", // Ajouter local_id à l'état de la salle
  });
  const [locaux, setLocaux] = useState([]); // État pour stocker la liste des locaux
  const [loading, setLoading] = useState(true);

  // Récupérer les données de la salle et la liste des locaux
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les détails de la salle et les informations du local associé
        const salleResponse = await fetch(`http://localhost:5000/api/salles/${salle_id}`);
        const salleData = await salleResponse.json();
  
        // Vérifier si les données sont valides
        if (!salleData || !salleData.local_id) {
          console.error("Données de la salle ou local_id non trouvées");
          setLoading(false);
          return;
        }
  
        // Mettre à jour l'état de la salle avec les données récupérées
        setSalle(salleData);
  
        // Récupérer la liste des locaux
        const locauxResponse = await fetch("http://localhost:5000/api/locaux");
        const locauxData = await locauxResponse.json();
        setLocaux(locauxData); // Mettre à jour l'état des locaux
  
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      }
    };
  
    fetchData();
  }, [salle_id]);

  // Gérer la modification des champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSalle((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Soumettre le formulaire pour mettre à jour la salle
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/salles/${salle_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salle), // Envoyer les données mises à jour
      });

      if (response.ok) {
        alert("Salle mise à jour avec succès !");
        navigate("/salles"); // Rediriger vers la table des salles
      } else {
        console.error("Erreur lors de la mise à jour de la salle");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la salle :", error);
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
              Modifier la salle
            </SoftTypography>
          </SoftBox>
          <SoftBox flexWrap="wrap" display="flex" justifyContent="space-between" ml={3} mr={3}>
            <SoftBox flex={1} mr={3}>
              <SoftTypography variant="h6" mb={1}>
                Nom de la salle
              </SoftTypography>
              <SoftInput
                type="text"
                placeholder="Nom de la salle"
                name="nom_Salle"
                value={salle.nom_Salle} // Pré-remplir le champ avec la valeur récupérée
                onChange={handleInputChange}
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
                onChange={handleInputChange}
                style={{
                  width: "100%",
                  padding: "8px",
                  borderRadius: "4px",
                  border: "1px solid #ccc",
                  fontSize: "14px",
                }}
              >
                <option value="" disabled>Sélectionner un local</option> {/* Option désactivée par défaut */}
                {locaux.map((local) => (
                  <option key={local.local_id} value={local.local_id}>
                    {local.nom_Local}
                  </option>
                ))}
              </select>
            </SoftBox>
          </SoftBox>
          <SoftBox display="flex" justifyContent="center" mt={3} mb={3} gap={2}>
            <SoftButton
              variant="gradient"
              color="error"
              sx={{ width: "40%" }}
              onClick={() => navigate("/salles")} // Annuler et revenir à la table des salles
            >
              Annuler
            </SoftButton>
            <SoftButton
              variant="gradient"
              color="secondary"
              sx={{ width: "40%" }}
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

export default EditSalle;