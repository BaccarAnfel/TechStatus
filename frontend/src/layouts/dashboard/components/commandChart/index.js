import React, { useState, useEffect } from "react";
import { Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from "recharts";

const COLORS = ["#0088FE", "#00C49F", "#FF8042"];

const OrderCharts = () => {
  const [chartData, setChartData] = useState([]); // State for bar chart data
  const [pieData, setPieData] = useState([]); // State for pie chart data

  // Fetch orders per month for the bar chart
  useEffect(() => {
    fetch("http://localhost:5000/api/orders-per-month")
      .then((response) => response.json())
      .then((data) => {
        setChartData(data);
      })
      .catch((error) => console.error("Error fetching orders per month:", error));
  }, []);

  // Fetch equipment status for the pie chart
  useEffect(() => {
    fetch("http://localhost:5000/api/equipment-status")
      .then((response) => response.json())
      .then((data) => {
        setPieData(data);
      })
      .catch((error) => console.error("Error fetching equipment status:", error));
  }, []);

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={6}>
        <Card>
  <CardContent>
    <Typography variant="h6" gutterBottom>
      Commandes par Mois
    </Typography>
    <Box height={390}> {/* Ajustez la hauteur ici */}
      <BarChart width={500} height={400} data={chartData}>
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="orders" fill="#8884d8" />
      </BarChart>
    </Box>
  </CardContent>
</Card>
      </Grid>
      <Grid item xs={12} md={6}>
        <Card>
          <CardContent>
            <Typography variant="h6" gutterBottom>
              Statut des Équipements
            </Typography>
            <Box display="flex" flexDirection="column" alignItems="center" height="100%">
              {/* Pie Chart */}
              <PieChart width={400} height={300}>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {pieData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>

              {/* Color Legend */}
              <Box mt={2}>
                <Typography variant="subtitle1" gutterBottom>
                  Légende :
                </Typography>
                <Box display="flex" justifyContent="center" flexWrap="wrap">
                  {pieData.map((entry, index) => (
                    <Box key={index} display="flex" alignItems="center" mb={1} mx={1}>
                      <Box
                        width={16}
                        height={16}
                        bgcolor={COLORS[index % COLORS.length]}
                        mr={1}
                        borderRadius="50%"
                      />
                      <Typography variant="body2">
                        {entry.status}: {entry.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  );
};

export default OrderCharts;