import Card from "@mui/material/Card";
import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

function Locaux() {
  const [locaux, setLocaux] = useState([]); // State for storing location data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch location data on component load
  useEffect(() => {
    const fetchLocauxData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/locaux");
        const data = await response.json();
        console.log("Données récupérées:", data);
        setLocaux(data);
        setLoading(false);
      } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
        setLoading(false);
      }
    };

    fetchLocauxData();
  }, []);

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
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox py={3}>
              <SoftBox px={3}>
                <SoftTypography variant="h6" fontWeight="bold" mb={2}>
                  Table des locaux
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
                        ID DE LOCAL
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
                        NOM DE LOCAL
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
                    {locaux.map((local, index) => (
                      <tr key={local.localId}>
                        <td
                          style={{
                            padding: "10px 15px",
                            fontSize: "14px",
                            color: "#344767",
                            borderBottom: index !== locaux.length - 1 ? "1px solid #e0e0e0" : "none",
                          }}
                        >
                          {local.localId}
                        </td>
                        <td
                          style={{
                            padding: "10px 15px",
                            fontSize: "14px",
                            color: "#344767",
                            borderBottom: index !== locaux.length - 1 ? "1px solid #e0e0e0" : "none",
                          }}
                        >
                          {local.nom}
                        </td>
                        <td
                          style={{
                            padding: "10px 15px",
                            textAlign: "center",
                            fontSize: "14px",
                            color: "#344767",
                            borderBottom: index !== locaux.length - 1 ? "1px solid #e0e0e0" : "none",
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
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Locaux;
