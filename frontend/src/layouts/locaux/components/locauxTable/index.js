import React, { useEffect, useState } from "react";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

function LocauxTable() {
  const [locaux, setLocaux] = useState([]); // State for storing location data
  const [loading, setLoading] = useState(true); // Loading state

  // Fetch location data on component load
  useEffect(() => {
    const fetchLocauxData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/locaux");
        const data = await response.json();
        console.log("Données récupérées:", data);

        // Ensure data is an array
        if (Array.isArray(data)) {
          setLocaux(data);
        } else {
          console.error("Expected an array but got:", data);
          setLocaux([]); // Fallback to an empty array
        }

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

  if (!Array.isArray(locaux)) {
    return (
      <SoftBox py={3}>
        <SoftTypography variant="h6" color="error">
          Erreur: Les données reçues ne sont pas valides.
        </SoftTypography>
      </SoftBox>
    );
  }

  return (

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
                    {locaux.map((locale, index) => (
                      <tr key={locale.local_id}>
                        <td
                          style={{
                            padding: "10px 15px",
                            fontSize: "14px",
                            color: "#344767",
                            borderBottom: index !== locaux.length - 1 ? "1px solid #e0e0e0" : "none",
                          }}
                        >
                          {locale.local_id}
                        </td>
                        <td
                          style={{
                            padding: "10px 15px",
                            fontSize: "14px",
                            color: "#344767",
                            borderBottom: index !== locaux.length - 1 ? "1px solid #e0e0e0" : "none",
                          }}
                        >
                          {locale.nom_Local}
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

  );
}

export default LocauxTable;