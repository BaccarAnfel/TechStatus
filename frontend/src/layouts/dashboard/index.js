import React from "react";
import SoftBox from "components/SoftBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import KPICards from "layouts/dashboard/components/KPICharts";
import OrderCharts from "layouts/dashboard/components/commandChart";
import OrderList from "layouts/dashboard/components/commandListChart";

function Dashboard() {
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <SoftBox py={3}>
        <SoftBox mb={3}>
          <KPICards />
        </SoftBox>
        <SoftBox mb={3}>
          <OrderCharts />
        </SoftBox>
        <SoftBox mb={3}>
          <OrderList />
        </SoftBox>
      </SoftBox>
    </DashboardLayout>
  );
}

export default Dashboard;