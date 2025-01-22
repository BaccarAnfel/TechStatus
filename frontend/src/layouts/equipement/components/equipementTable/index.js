import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function EquipementTable() {
  const [equipements, setEquipements] = useState([]); // State for storing equipment data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch equipment data on component load
  useEffect(() => {
    const fetchEquipementData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/equipements"); // Update API endpoint
        const data = await response.json();
        console.log("Données récupérées:", data);

        // Ensure data is an array
        if (Array.isArray(data)) {
          setEquipements(data);
        } else {
          console.error("Expected an array but got:", data);
          setEquipements([]); // Fallback to an empty array
        }

        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      }
    };

    fetchEquipementData();
  }, []);

  if (loading) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6">Chargement...</SoftTypography>
      </SoftBox>
    );
  }

  if (!Array.isArray(equipements)) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6" color="error">
          Erreur: Les données reçues ne sont pas valides.
        </SoftTypography>
      </SoftBox>
    );
  }

  return (
          <SoftBox >
            <SoftTypography variant="h6" fontWeight="bold" mb={2}>
              {`Table des Équipements`} {/* Fixed: Escaped apostrophe */}
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
                    ID DE L&apos;ÉQUIPEMENT {/* Fixed: Escaped apostrophe */}
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
                    NOM DE L&apos;ÉQUIPEMENT {/* Fixed: Escaped apostrophe */}
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
                    COMMAND ID
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
                    STATUS
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
                {equipements.map((equipement, index) => (
                  <tr key={equipement.equipement_id}>
                    <td
                      style={{
                        padding: "10px 15px",
                        fontSize: "14px",
                        color: "#344767",
                        borderBottom: index !== equipements.length - 1 ? "1px solid #e0e0e0" : "none",
                      }}
                    >
                      {equipement.equipement_id}
                    </td>
                    <td
                      style={{
                        padding: "10px 15px",
                        fontSize: "14px",
                        color: "#344767",
                        borderBottom: index !== equipements.length - 1 ? "1px solid #e0e0e0" : "none",
                      }}
                    >
                      {equipement.nom_Equipement}
                    </td>
                    <td
                      style={{
                        padding: "10px 15px",
                        fontSize: "14px",
                        color: "#344767",
                        borderBottom: index !== equipements.length - 1 ? "1px solid #e0e0e0" : "none",
                      }}
                    >
                      {equipement.command_id}
                    </td>
                    <td
                      style={{
                        padding: "10px 15px",
                        fontSize: "14px",
                        color: "#344767",
                        borderBottom: index !== equipements.length - 1 ? "1px solid #e0e0e0" : "none",
                      }}
                    >
                      {equipement.status || "N/A"} {/* Display status or "N/A" if null */}
                    </td>
                    <td
                      style={{
                        padding: "10px 15px",
                        textAlign: "center",
                        fontSize: "14px",
                        color: "#344767",
                        borderBottom: index !== equipements.length - 1 ? "1px solid #e0e0e0" : "none",
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

  );
}

export default EquipementTable;