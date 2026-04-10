import { Box, Button, Card, CardContent, Typography } from "@mui/material";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import DashboardLayout from "./components/DashboardLayout";

export default function ViewerDashboard() {
  const traffic = [
    { m: "Jan", v: 320 },
    { m: "Feb", v: 370 },
    { m: "Mar", v: 410 },
    { m: "Apr", v: 390 },
    { m: "May", v: 470 },
    { m: "Jun", v: 520 },
  ];

  return (
    <DashboardLayout title="Viewer Dashboard">
      <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, background: "#eef3fb", minHeight: "calc(100vh - 64px)" }}>
        <Card>
          <CardContent>
            <Typography sx={{ fontWeight: 800, mb: 2 }}>Explore Datasets</Typography>
            <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2,minmax(0,1fr))", xl: "repeat(3,minmax(0,1fr))" }, gap: { xs: 1.5, md: 2 } }}>
              {["Market Trends Data", "Health Statistics", "Financial Insights"].map((item) => (
                <Box key={item}>
                  <Box sx={{ p: 2, border: "1px solid #e5e7eb", borderRadius: 2 }}>
                    <Typography sx={{ fontWeight: 700 }}>{item}</Typography>
                    <Typography variant="caption" sx={{ color: "#64748b" }}>
                      Public dataset
                    </Typography>
                    <Button size="small" sx={{ mt: 1 }} variant="outlined">Open</Button>
                  </Box>
                </Box>
              ))}
            </Box>
          </CardContent>
        </Card>
        <Card sx={{ mt: 2 }}>
          <CardContent>
            <Typography sx={{ fontWeight: 800, mb: 1 }}>Viewing Activity</Typography>
            <Box sx={{ height: 230 }}>
              <ResponsiveContainer>
                <AreaChart data={traffic}>
                  <XAxis dataKey="m" />
                  <YAxis />
                  <Tooltip />
                  <Area dataKey="v" stroke="#2563eb" fill="#bfdbfe" />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
}
