import Card from "@mui/material/Card";
import Table from "examples/Tables/Table";

import SoftBox from "components/SoftBox";
import SoftTypography from "components/SoftTypography";
import SoftInput from "components/SoftInput";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

import SoftButton from "components/SoftButton";

function Order() {
    return (
        <DashboardLayout>
            <DashboardNavbar />
            <SoftBox mb={3}>
                <Card>
                    <SoftBox display="flex" justifyContent="space-between" alignItems="center" p={3}>
                        <SoftTypography variant="h6">Place an order</SoftTypography>
                    </SoftBox>
                    <SoftBox display="flex" justifyContent="space-between" ml={3} mr={3}>
                        <SoftBox flex={1} mr={3}>
                            <SoftInput icon={{ direction: "left" }} type="designation" placeholder="Designation" />
                        </SoftBox>
                        <SoftBox flex={1} ml={3}>
                            <SoftInput icon={{ direction: "left" }} type="quantity" placeholder="Quantity" />
                        </SoftBox>
                    </SoftBox>
                    <SoftBox m={3}>
                        <SoftButton variant="gradient" color="dark" fullWidth>
                            Add another item
                        </SoftButton>
                    </SoftBox>
                    <SoftBox mb={3} display="flex" justifyContent="space-around" alignItems="stretch">
                        <SoftBox>
                            <SoftButton sx={{ width: (theme) => theme.spacing(70) }} variant="gradient" color="secondary" fullWidth>
                                Cancel
                            </SoftButton>
                        </SoftBox>
                        <SoftBox>
                            <SoftButton sx={{ width: (theme) => theme.spacing(70) }} variant="gradient" color="secondary" fullWidth>
                                Submit
                            </SoftButton>
                        </SoftBox>
                    </SoftBox>
                    <SoftBox
                        sx={{
                            "& .MuiTableRow-root:not(:last-child)": {
                                "& td": {
                                    borderBottom: ({ borders: { borderWidth, borderColor } }) =>
                                        `${borderWidth[1]} solid ${borderColor}`,
                                },
                            },
                        }}
                    >
                    </SoftBox>
                </Card>
            </SoftBox>
        </DashboardLayout>
    )
}

export default Order;