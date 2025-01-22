// @mui material components
import Card from "@mui/material/Card";

// Soft UI Dashboard React components
import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";

// Soft UI Dashboard React examples
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import LocauxTable from "./components/locauxTable";
import AjoutLocal from "./components/addLocaux";


function Locaux() {

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
      <AjoutLocal />
          <Card>
            <SoftBox p={3} >
              
              <SoftBox > {/* Espace de 16px (theme.spacing(4)) après la table Locaux */}
                <SoftTypography variant="h6">
                  <LocauxTable/>
                </SoftTypography>
              </SoftBox>

            </SoftBox>
          </Card>
        </SoftBox>
    </DashboardLayout>
  );
}

export default Locaux;