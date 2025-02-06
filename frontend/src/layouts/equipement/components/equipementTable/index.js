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
        const response = await fetch("http://localhost:5000/api/equipementsByNameAndImage");
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération des données");
        }
        const data = await response.json();
        // Filtrer les équipements pour éviter les doublons
        const uniqueEquipements = [];
        const seen = new Set();

        data.forEach((equipement) => {
          if (!seen.has(equipement.nom_Equipement)) {
            seen.add(equipement.nom_Equipement);
            uniqueEquipements.push(equipement);
          }
        });

        setEquipements(uniqueEquipements);
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
            onClick={() => handleCardClick(equipement.nom_Equipement)}
          >
            <CardContent>
              {/* Affichage de l'image de l'équipement, ou d'un placeholder si aucune image n'est disponible */}
              {equipement.image_url ? (
                <img
                  src={equipement.image_url}
                  alt={equipement.nom_Equipement}
                  style={{
                    width: "150px",      // Largeur fixe de l'image
                    height: "150px",     // Hauteur fixe de l'image
                    objectFit: "cover",  // Pour maintenir le ratio tout en couvrant l'espace
                    borderRadius: "8px", // Pour arrondir les coins de l'image
                  }}
                />
              ) : (
                <div
                  style={{
                    width: "150px",
                    height: "150px",
                    backgroundColor: "#f0f0f0",
                    borderRadius: "8px",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    color: "#666",
                  }}
                >
                  Pas d&apos;image
                </div>
              )}
              <Typography variant="h6" component="div" mt={2}>
                {equipement.nom_Equipement}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </SoftBox>
    </SoftBox>
  );
}

export default EquipementList;