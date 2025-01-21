import React from "react";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Ordre from "./Components/Order";
import CommandeTable from "./Components/tableCommande";

function Commande() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Ordre />
        </SoftBox>
        <SoftBox mb={3}>
          <CommandeTable />
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Commande;