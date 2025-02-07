import React, { useState, useCallback } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SalleTable from "./components/salleTable";
import AddSalle from "./components/addSalle";

function Salle() {
  const [showAddSalle, setShowAddSalle] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // État pour forcer le rafraîchissement

  // Fonction pour rafraîchir la table des salles
  const refreshSalles = useCallback(() => {
    setRefreshKey((prevKey) => prevKey + 1); // Incrémenter la clé pour forcer le rafraîchissement
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <AddSalle
          onCancel={() => setShowAddSalle(false)}
          onSalleAdded={() => {
            setShowAddSalle(false); // Masquer le formulaire
            refreshSalles(); // Rafraîchir la table des salles
          }}
        />
        <Card>
          <SoftBox p={3}>
            <SoftTypography variant="h6">
              <SalleTable key={refreshKey} />{" "}
              {/* Utiliser la clé pour forcer le rafraîchissement */}
            </SoftTypography>
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Salle;
