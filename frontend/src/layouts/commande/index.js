import React, { useState } from "react";
import SoftBox from "components/SoftBox";
import SoftButton from "components/SoftButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Ordre from "./Components/Order";
import CommandeTable from "./Components/tableCommande";

function Commande() {
  const [showAddOrder, setShowAddOrder] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0); // État pour forcer le rafraîchissement

  // Fonction pour rafraîchir la table des commandes
  const refreshCommandes = () => {
    setRefreshKey((prevKey) => prevKey + 1); // Incrémenter la clé pour forcer le rafraîchissement
  };

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
              onClick={() => setShowAddOrder(true)}
            >
              Ajouter une commande
            </SoftButton>
          </SoftBox>
        )}

        {/* Formulaire d'ajout de commande */}
        {showAddOrder && (
          <SoftBox mb={3}>
            <Ordre
              onCancel={() => setShowAddOrder(false)}
              onSuccess={() => {
                setShowAddOrder(false); // Masquer le formulaire
                refreshCommandes(); // Rafraîchir la table des commandes
              }}
            />
          </SoftBox>
        )}

        {/* Tableau des commandes */}
        <SoftBox mb={3}>
          <CommandeTable key={refreshKey} /> {/* Utiliser la clé pour forcer le rafraîchissement */}
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Commande;