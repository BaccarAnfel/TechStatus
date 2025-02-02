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
    local_id: "",
  });
  const [locaux, setLocaux] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Récupérer les données de la salle et la liste des locaux
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Récupérer les détails de la salle
        const salleResponse = await fetch(`http://localhost:5000/api/salleGet/${salle_id}`);
        if (!salleResponse.ok) {
          throw new Error("Erreur lors de la récupération des données de la salle");
        }
        const salleData = await salleResponse.json();
        console.log(salleData);
        // Récupérer la liste des locaux
        const locauxResponse = await fetch("http://localhost:5000/api/locaux");
        if (!locauxResponse.ok) {
          throw new Error("Erreur lors de la récupération des locaux");
        }
        const locauxData = await locauxResponse.json();

        // Mettre à jour les états
        setSalle(salleData);
        setLocaux(locauxData);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setError(error.message);
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
    if (!salle.nom_Salle || !salle.local_id) {
      alert("Veuillez remplir tous les champs");
      return;
    }

    try {
      const response = await fetch(`http://localhost:5000/api/salles/${salle_id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(salle),
      });

      if (response.ok) {
        alert("Salle mise à jour avec succès !");
        navigate("/salles");
      } else {
        throw new Error("Erreur lors de la mise à jour de la salle");
      }
    } catch (error) {
      console.error("Erreur lors de la mise à jour de la salle :", error);
      alert("Erreur lors de la mise à jour de la salle");
    }
  };

  if (loading) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6">Chargement...</SoftTypography>
      </SoftBox>
    );
  }

  if (error) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6" color="error">
          {error}
        </SoftTypography>
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
                value={salle.local_id || ""}
                onChange={handleInputChange}
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
                </option>
                {locaux.map((local) => (
                  <option key={local.local_id} value={local.local_id}>
                    {local.nom_Local}
                  </option>
                ))}
              </select>
            </SoftBox>
          </SoftBox>
          <SoftBox display="flex" justifyContent="center" mt={3} mb={3} gap={3}>
            <SoftButton
              variant="gradient"
              color="error"
              sx={{ width: "47%" }}
              onClick={() => navigate("/salles")}
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

export default EditSalle;