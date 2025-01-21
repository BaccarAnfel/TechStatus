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

import Shop from "examples/Icons/Shop";
import Settings from "examples/Icons/Settings";
import Document from "examples/Icons/Document";
import CustomerSupport from "examples/Icons/CustomerSupport";


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
    name: "Commande",
    key: "Commande",
    route: "/Commande",
    icon: <Document size="12px"/>,
    component: <Commande />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Equipement",
    key: "equipement",
    route: "/equipement",
    icon: <Document size="12px" />,
    component: <Equipement />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Locaux",
    key: "locaux",
    route: "/locaux",
    icon: <Document size="12px" />,
    component: <Locaux />,
    noCollapse: true,
  },
  {
    type: "collapse",
    name: "Salle",
    key: "Salle",
    route: "/salle",
    icon: <Document size="12px" />,
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
  }
];

export default routes;
