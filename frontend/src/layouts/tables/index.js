// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";

// Data
import locauxTableData from "layouts/tables/data/locauxTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";
import Locaux from "./components/locaux";
import Equipement from "./components/equipement";
import Commande from "./components/commande";
import Salle from "./components/salle";

function Tables() {
  const { columns, rows } = locauxTableData;
  const { columns: prCols, rows: prRows } = projectsTableData;

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <Card>
            <SoftBox p={3} sx={{ paddingTop: "50px" }}>
              {/* Ajouter un espace après chaque table */}
              <SoftBox mb={4}> {/* Espace de 16px (theme.spacing(4)) après la table Commande */}
                <SoftTypography variant="h6">
                  <Commande />
                </SoftTypography>
              </SoftBox>

              <SoftBox mb={4}> {/* Espace de 16px (theme.spacing(4)) après la table Equipement */}
                <SoftTypography variant="h6">
                  <Equipement />
                </SoftTypography>
              </SoftBox>

              
              <SoftBox mb={4}> {/* Espace de 16px (theme.spacing(4)) après la table Locaux */}
                <SoftTypography variant="h6">
                  <Locaux />
                </SoftTypography>
              </SoftBox>


              <SoftBox mb={4}> {/* Espace de 16px (theme.spacing(4)) après la table Equipement */}
                <SoftTypography variant="h6">
                  <Salle />
                </SoftTypography>
              </SoftBox>
            </SoftBox>
          </Card>
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Tables;