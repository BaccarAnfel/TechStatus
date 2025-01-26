import React, { useState } from "react";
import Card from "@mui/material/Card";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import EquipementArchive from "./components/EquipementArchive";
import CommandeArchive from "./components/CommandeArchive";

function Archive() {
  const [activeTab, setActiveTab] = useState("equipement"); // State to manage active tab

  // Handle tab change
  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        {/* Tabs for switching between Equipement Archive and Commande Archive */}
        <SoftBox mb={3}>
          <Tabs value={activeTab} onChange={handleTabChange} centered>
            <Tab label="Équipement Archive" value="equipement" />
            <Tab label="Commande Archive" value="commande" />
          </Tabs>
        </SoftBox>

        {/* Display the active component based on the selected tab */}
        <Card>
          <SoftBox p={3}>
            {activeTab === "equipement" ? (
              <SoftTypography variant="h6">
                <EquipementArchive />
              </SoftTypography>
            ) : (
              <SoftTypography variant="h6">
                <CommandeArchive />
              </SoftTypography>
            )}
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Archive;