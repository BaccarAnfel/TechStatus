import React, { useState } from "react";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import { Card } from "@mui/material";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import EquipementTable from "./components/equipementTable";
import AddEquipement from "./components/addEquipement";

function Equipement() {
  const [showAddEquipement, setShowAddEquipement] = useState(false);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        {/* Bouton "Ajouter un équipement" */}
        {!showAddEquipement && (
          <SoftBox mb={3} display="flex" justifyContent="flex-end">
            <SoftButton
              variant="gradient"
              color="dark"
              onClick={() => setShowAddEquipement(true)}
            >
              Ajouter un équipement
            </SoftButton>
          </SoftBox>
        )}

        {/* Formulaire d'ajout d'équipement */}
        {showAddEquipement && (
          <AddEquipement onCancel={() => setShowAddEquipement(false)} />
        )}

        {/* Tableau des équipements */}
        <Card>
          <SoftBox p={3}>
            <SoftTypography variant="h6">
              <EquipementTable />
            </SoftTypography>
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Equipement;