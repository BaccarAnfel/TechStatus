import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import Alert from "@mui/material/Alert";

function EquipementList() {
  const [equipements, setEquipements] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEquipementData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/equipementsByName");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data = await response.json();
        setEquipements(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchEquipementData();
  }, []);

  const handleCardClick = (equipementName) => {
    navigate(`/equipement-details/${encodeURIComponent(equipementName)}`);
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
        <Alert severity="error">{error}</Alert>
      </SoftBox>
    );
  }

  return (
    <SoftBox>
      <SoftTypography variant="h6" fontWeight="bold" mb={2}>
        Liste des Types Équipements
      </SoftTypography>

      <SoftBox display="flex" flexWrap="wrap" gap={2}>
        {equipements.map((equipement, index) => (
          <Card
            key={index}
            sx={{ minWidth: 200, cursor: "pointer" }}
            onClick={() => handleCardClick(equipement)}
          >
            <CardContent>
              <Typography variant="h6" component="div">
                {equipement}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </SoftBox>
    </SoftBox>
  );
}

export default EquipementList;