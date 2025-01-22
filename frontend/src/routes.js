import Dashboard from "layouts/dashboard";
import Billing from "layouts/billing";
import VirtualReality from "layouts/virtual-reality";
import RTL from "layouts/rtl";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Commande from "layouts/commande";
import Equipement from "layouts/equipement";
import Locaux from "layouts/locaux";
import Salle from "layouts/salle";
import EditCommande from "layouts/commande/Components/Edit";

import Shop from "examples/Icons/Shop";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import CustomerSupport from "examples/Icons/CustomerSupport";
import Basket from "examples/Icons/Basket";
import Cube from "examples/Icons/Cube";
import Map from "examples/Icons/Map";
import Office from "examples/Icons/Office";


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
    key: "Salles",
    route: "/salles",
    icon: <Office size="12px" />,
    component: <Salle />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    route: "/profile",
    icon: <CustomerSupport size="12px" />,
    component: <Profile />,
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
];

export default routes;
