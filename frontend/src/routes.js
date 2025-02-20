import Dashboard from "layouts/dashboard";
import Commande from "layouts/commande";
import Equipement from "layouts/equipement";
import Locaux from "layouts/locaux";
import Salle from "layouts/salle";
import EditCommande from "layouts/commande/Components/Edit";

import Shop from "examples/Icons/Shop";
import Settings from "examples/Icons/Settings";
import Basket from "examples/Icons/Basket";
import Map from "examples/Icons/Map";
import Office from "examples/Icons/Office";
import Store from "examples/Icons/Store";

import EditEquipement from "layouts/equipement/components/EditEquipement";
import EditLocaux from "layouts/locaux/components/editLocaux";
import EditSalle from "layouts/salle/components/editSalle";
import PrintCommande from "layouts/commande/Components/Imprimer";

import Archive from "layouts/archive";
import EquipementDetails from "layouts/equipement/components/equipementTable/components/EquipementDetails";

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    route: "/dashboard",
    icon: <Shop size="12px" />,
    component: <Dashboard />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Commandes",
    key: "Commandes",
    route: "/Commandes",
    icon: <Basket size="12px"/>,
    component: <Commande />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Equipements",
    key: "equipements",
    route: "/equipements",
    icon: <Settings size="12px" />,
    component: <Equipement />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Locaux",
    key: "locaux",
    route: "/locaux",
    icon: <Map size="12px" />,
    component: <Locaux />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Salles",
    key: "salles",
    route: "/salles",
    icon: <Office size="12px" />,
    component: <Salle />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "archive",
    key: "archive",
    route: "/archive",
    icon: <Store size="12px" />,
    component: <Archive />,
    noCollapse: true,
  },
  {
    type: "route",
    name: "Edit Commande",
    key: "edit-commande",
    route: "/edit-commande/:commandId", // Route dynamique avec l'ID de la commande
    component: <EditCommande />, // Composant pour éditer la commande
    noCollapse: true,
  },
  {
    type: "route",
    name: "Edit Equipement",
    key: "edit-equipement",
    route: "/edit-equipement/:equipement_id", 
    component: <EditEquipement />, 
    noCollapse: true,
  },
  {
    type: "route",
    name: "Edit Locaux",
    key: "edit-locaux",
    route: "/edit-locaux/:local_id", 
    component: <EditLocaux />, 
    noCollapse: true,
  },
  {
    type: "route",
    name: "Edit Salle",
    key: "edit-salle",
    route: "/edit-salle/:salle_id", 
    component: <EditSalle />, 
    noCollapse: true,
  },
  {
    type: "route",
    name: "Imprimer commande",
    key: "imprimer commande",
    route: "/commandes/:commandId/print", // Route dynamique avec l'ID de la commande
    component: <PrintCommande />, // Composant pour éditer la commande
    noCollapse: true,
  },
  {
    type: "route",
    name: "Equipement Detail",
    key: "equipement detail",
    route: "/equipement-details/:equipementName", 
    component: <EquipementDetails />, 
    noCollapse: true,
  },

];

export default routes;
