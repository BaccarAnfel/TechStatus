// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import SalleTable from "./components/salleTable";
import AddSalle from "./components/addSalle";

function Salle() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <AddSalle />
        <Card>
          <SoftBox p={3}>
            <SoftBox>
              {" "}
              {/* Espace de 16px (theme.spacing(4)) après la table Locaux */}
              <SoftTypography variant="h6">
                <SalleTable />
              </SoftTypography>
            </SoftBox>
          </SoftBox>
        </Card>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Salle;
