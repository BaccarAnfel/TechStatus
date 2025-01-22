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
import SalleTable from "./components/salleTable";
import AddSalle from "./components/addSalle";

function Salle() {
  const [showAddSalle, setShowAddSalle] = useState(false); // État pour afficher/masquer le formulaire d'ajout

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        {/* Bouton "Ajouter une salle" */}
        {!showAddSalle && (
          <SoftBox mb={3} display="flex" justifyContent="flex-end">
            <SoftButton
              variant="gradient"
              color="dark"
              onClick={() => setShowAddSalle(true)}
            >
              Ajouter une salle
            </SoftButton>
          </SoftBox>
        )}

        {/* Formulaire d'ajout de salle */}
        {showAddSalle && (
          <AddSalle onCancel={() => setShowAddSalle(false)} />
        )}

        {/* Tableau des salles */}
        <Card>
          <SoftBox p={3}>
            <SoftTypography variant="h6">
              <SalleTable />
            </SoftTypography>
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Salle;