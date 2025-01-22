import React, { useState } from "react";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Ordre from "./Components/Order";
import CommandeTable from "./Components/tableCommande";

function Commande() {
  const [showAddOrder, setShowAddOrder] = useState(false); // État pour gérer la visibilité du formulaire

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        {/* Bouton "Ajouter une commande" */}
        {!showAddOrder && (
          <SoftBox mb={3} display="flex" justifyContent="flex-end">
            <SoftButton
              variant="gradient"
              color="dark"
              onClick={() => setShowAddOrder(true)} // Afficher le formulaire
            >
              Ajouter une commande
            </SoftButton>
          </SoftBox>
        )}

        {/* Formulaire d'ajout de commande */}
        {showAddOrder && (
          <SoftBox mb={3}>
            <Ordre onCancel={() => setShowAddOrder(false)} /> {/* Passer une fonction pour annuler */}
          </SoftBox>
        )}

        {/* Tableau des commandes */}
        <SoftBox mb={3}>
          <CommandeTable />
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Commande;