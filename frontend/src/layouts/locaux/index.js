// @mui material components
import Card from "@mui/material/Card";
import React, { useState } from "react";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftButton from "components/SoftButton";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Composants personnalisés
import LocauxTable from "./components/locauxTable";
import AjoutLocal from "./components/addLocaux";

function Locaux() {
  const [showAddLocal, setShowAddLocal] = useState(false); // État pour afficher/masquer le formulaire d'ajout

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        {/* Bouton "Ajouter un local" */}
        {!showAddLocal && (
          <SoftBox mb={3} display="flex" justifyContent="flex-end">
            <SoftButton
              variant="gradient"
              color="dark"
              onClick={() => setShowAddLocal(true)}
            >
              Ajouter un local
            </SoftButton>
          </SoftBox>
        )}

        {/* Formulaire d'ajout de local */}
        {showAddLocal && (
          <AjoutLocal onCancel={() => setShowAddLocal(false)} />
        )}

        {/* Tableau des locaux */}
        <Card>
          <SoftBox p={3}>
            <SoftTypography variant="h6">
              <LocauxTable />
            </SoftTypography>
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Locaux;