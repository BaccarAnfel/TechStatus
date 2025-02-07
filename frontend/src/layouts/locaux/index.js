import React, { useState, useCallback } from "react";
import Card from "@mui/material/Card";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import LocauxTable from "./components/locauxTable";
import AjoutLocal from "./components/addLocaux";

function Locaux() {
  const [showAddLocal, setShowAddLocal] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // État pour forcer le rafraîchissement

  // Fonction pour rafraîchir la table des locaux
  const refreshLocaux = useCallback(() => {
    setRefreshKey((prevKey) => prevKey + 1); // Incrémenter la clé pour forcer le rafraîchissement
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <AjoutLocal
          onCancel={() => setShowAddLocal(false)}
          onLocalAdded={() => {
            setShowAddLocal(false); // Masquer le formulaire
            refreshLocaux(); // Rafraîchir la table des locaux
          }}
        />

        <Card>
          <SoftBox p={3}>
            <SoftTypography variant="h6">
              <LocauxTable key={refreshKey} />{" "}
              {/* Utiliser la clé pour forcer le rafraîchissement */}
            </SoftTypography>
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Locaux;
