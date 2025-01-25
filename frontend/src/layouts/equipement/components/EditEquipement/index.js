import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";
import SoftButton from "components/SoftButton";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Card from "@mui/material/Card";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function EditEquipement() {
  const { equipement_id } = useParams(); // Récupérer l'ID de l'équipement depuis l'URL
  const navigate = useNavigate();
  const [equipement, setEquipement] = useState({
    nom_Equipement: "",
    status: "",
    salle_id: "", // Ajout de salle_id
  });
  const [salles, setSalles] = useState([]); // État pour stocker la liste des salles
  const [loading, setLoading] = useState(true);

  // Récupérer les données de l'équipement
  useEffect(() => {
    const fetchEquipementData = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/equipements/${equipement_id}`);
        const data = await response.json();
        setEquipement(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      }
    };

    fetchEquipementData();
  }, [equipement_id]);

  // Récupérer la liste des salles depuis l'API
  useEffect(() => {
    const fetchSalles = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/salles");
        const data = await response.json();
        setSalles(data);
      } catch (error) {
        console.error("Erreur lors de la récupération des salles :", error);
      }
    };

    fetchSalles();
  }, []);

  // Gérer la modification des champs du formulaire
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEquipement((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // Soumettre le formulaire pour mettre à jour l'équipement
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:5000/api/equipements/${equipement_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(equipement),
      });

      if (response.ok) {
        alert("Équipement mis à jour avec succès !");
        navigate("/equipements"); // Rediriger vers la table des équipements
      } else {
        console.error("Erreur lors de la mise à jour de l'équipement");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de l'équipement :", error);
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
              Modifier équipement
            </SoftTypography>
          </SoftBox>
          <SoftBox flexWrap="wrap" display="flex" justifyContent="space-between" ml={3} mr={3}>
            <SoftBox flex={1} mr={3}>
              <SoftTypography variant="h6" mb={1}>
                Nom de équipement
              </SoftTypography>
              <SoftInput
                icon={{ direction: "left" }}
                type="text"
                placeholder="Nom de l'équipement"
                name="nom_Equipement"
                value={equipement.nom_Equipement}
                onChange={handleInputChange}
                fullWidth
              />
            </SoftBox>
            <SoftBox flex={1} mr={3}>
              <SoftTypography variant="h6" mb={1}>
                Statut
              </SoftTypography>
              <Select
                name="status"
                value={equipement.status}
                onChange={handleInputChange}
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
            <SoftBox flex={1} mr={3}>
              <SoftTypography variant="h6" mb={1}>
                Salle
              </SoftTypography>
              <Select
                name="salle_id"
                value={equipement.salle_id || ""}
                onChange={handleInputChange}
                displayEmpty
                fullWidth
              >
                <MenuItem value="" disabled>
                  Selectionner une salle
                </MenuItem>
                {salles.map((salle) => (
                  <MenuItem key={salle.salle_id} value={salle.salle_id}>
                    {salle.nom_Salle}
                  </MenuItem>
                ))}
              </Select>
            </SoftBox>
          </SoftBox>
          <SoftBox display="flex" justifyContent="center" mt={3} mb={3} gap={3}>
            <SoftButton
              variant="gradient"
              color="error"
              sx={{ width: "47%" }}
              onClick={() => navigate("/equipements")} // Annuler et revenir à la table des équipements
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

export default EditEquipement;