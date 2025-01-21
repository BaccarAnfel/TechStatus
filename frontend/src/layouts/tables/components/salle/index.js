import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Salle() {
  const [salles, setSalles] = useState([]); // State pour stocker les données des salles
  const [loading, setLoading] = useState(true); // State pour gérer le chargement

  // Récupérer les données des salles au chargement du composant
  useEffect(() => {
    const fetchSallesData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/salles"); // Endpoint API pour les salles
        const data = await response.json();
        console.log("Données récupérées:", data);

        // Vérifier que les données sont un tableau
        if (Array.isArray(data)) {
          setSalles(data);
        } else {
          console.error("Expected an array but got:", data);
          setSalles([]); // Fallback à un tableau vide
        }

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      }
    };

    fetchSallesData();
  }, []);

  if (loading) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6">Chargement...</SoftTypography>
      </SoftBox>
    );
  }

  if (!Array.isArray(salles)) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6" color="error">
          Erreur: Les données reçues ne sont pas valides.
        </SoftTypography>
      </SoftBox>
    );
  }

  return (
          <Card>
            <SoftBox p={3} sx={{ paddingTop: "50px" }}>
              {/* Ajouter un espace après chaque table */}
              <SoftBox mb={4}> {/* Espace de 16px (theme.spacing(4)) après la table Salle */}
                <SoftTypography variant="h6" fontWeight="bold" mb={2}>
                  Table des Salles
                </SoftTypography>
                <table style={{ width: "100%", borderCollapse: "collapse" }}>
                  <thead>
                    <tr>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "10px 15px",
                          color: "#8392ab",
                          fontWeight: "bold",
                          fontSize: "14px",
                          borderBottom: "1px solid #e0e0e0",
                        }}
                      >
                        ID DE SALLE
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "10px 15px",
                          color: "#8392ab",
                          fontWeight: "bold",
                          fontSize: "14px",
                          borderBottom: "1px solid #e0e0e0",
                        }}
                      >
                        NOM DE SALLE
                      </th>
                      <th
                        style={{
                          textAlign: "left",
                          padding: "10px 15px",
                          color: "#8392ab",
                          fontWeight: "bold",
                          fontSize: "14px",
                          borderBottom: "1px solid #e0e0e0",
                        }}
                      >
                        NOM DE LOCALE
                      </th>
                      <th
                        style={{
                          textAlign: "center",
                          padding: "10px 15px",
                          color: "#8392ab",
                          fontWeight: "bold",
                          fontSize: "14px",
                          borderBottom: "1px solid #e0e0e0",
                        }}
                      >
                        ACTION
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {salles.map((salle, index) => (
                      <tr key={salle.salle_id}>
                        <td
                          style={{
                            padding: "10px 15px",
                            fontSize: "14px",
                            color: "#344767",
                            borderBottom: index !== salles.length - 1 ? "1px solid #e0e0e0" : "none",
                          }}
                        >
                          {salle.salle_id}
                        </td>
                        <td
                          style={{
                            padding: "10px 15px",
                            fontSize: "14px",
                            color: "#344767",
                            borderBottom: index !== salles.length - 1 ? "1px solid #e0e0e0" : "none",
                          }}
                        >
                          {salle.nom_Salle}
                        </td>
                        <td
                          style={{
                            padding: "10px 15px",
                            fontSize: "14px",
                            color: "#344767",
                            borderBottom: index !== salles.length - 1 ? "1px solid #e0e0e0" : "none",
                          }}
                        >
                          {salle.nom_Local}
                        </td>
                        <td
                          style={{
                            padding: "10px 15px",
                            textAlign: "center",
                            fontSize: "14px",
                            color: "#344767",
                            borderBottom: index !== salles.length - 1 ? "1px solid #e0e0e0" : "none",
                          }}
                        >
                          <SoftTypography
                            component="a"
                            href="#"
                            variant="caption"
                            color="secondary"
                            fontWeight="medium"
                            style={{
                              textDecoration: "underline",
                              cursor: "pointer",
                              color: "#5e72e4",
                            }}
                          >
                            Edit
                          </SoftTypography>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </SoftBox>
            </SoftBox>
          </Card>
  );
}

export default Salle;