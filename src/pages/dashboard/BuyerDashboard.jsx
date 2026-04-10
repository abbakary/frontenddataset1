import { useState } from "react";
import { Box, Button, Card, CardContent, Chip, Snackbar, TextField, Typography } from "@mui/material";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import DashboardLayout from "./components/DashboardLayout";

const BLUE = "#1976d2";

export default function BuyerDashboard() {
  const [saved, setSaved] = useState(["Customer Behavior Data"]);
  const [toast, setToast] = useState("");
  const [query, setQuery] = useState("");

  const datasets = ["Customer Behavior Data", "Global Trade Stats", "Real Estate Analysis"];
  const spending = [
    { month: "Jan", spent: 220 },
    { month: "Feb", spent: 340 },
    { month: "Mar", spent: 280 },
    { month: "Apr", spent: 390 },
    { month: "May", spent: 510 },
    { month: "Jun", spent: 430 },
  ];
  const downloadStats = [
    { name: "Mon", count: 14 },
    { name: "Tue", count: 24 },
    { name: "Wed", count: 11 },
    { name: "Thu", count: 33 },
    { name: "Fri", count: 28 },
    { name: "Sat", count: 19 },
    { name: "Sun", count: 16 },
  ];
  const recentOrders = ["Market Trends Data", "Health Statistics", "Economic Indicators", "Climate Data"];

  return (
    <DashboardLayout title="Buyer Dashboard">
      <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, background: "#eef3fb", minHeight: "calc(100vh - 64px)" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", xl: "minmax(0,3fr) minmax(260px,1fr)" }, gap: { xs: 1.5, md: 2 }, width: "100%" }}>
          <Box>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2, gap: 1, flexWrap: "wrap" }}>
                  <Typography sx={{ fontWeight: 800 }}>My Purchased Datasets</Typography>
                  <TextField
                    size="small"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search purchased..."
                    sx={{ minWidth: { xs: "100%", sm: 240 } }}
                  />
                </Box>
                <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3,minmax(0,1fr))" }, gap: 1.5 }}>
                  {datasets.filter((name) => name.toLowerCase().includes(query.toLowerCase())).map((name) => {
                    const isSaved = saved.includes(name);
                    return (
                      <Box key={name}>
                        <Box sx={{ border: "1px solid #e5e7eb", borderRadius: 2, p: 1.5 }}>
                          <Typography sx={{ fontWeight: 700, fontSize: 13 }}>{name}</Typography>
                          <Box sx={{ mt: 1, display: "flex", gap: 1 }}>
                            <Button size="small" variant="outlined" onClick={() => setToast(`Downloaded ${name}`)}>
                              Download
                            </Button>
                            <Button
                              size="small"
                              onClick={() => {
                                setSaved((prev) => (isSaved ? prev.filter((x) => x !== name) : [...prev, name]));
                                setToast(isSaved ? "Removed from saved collections" : "Saved to your collection");
                              }}
                            >
                              {isSaved ? "Saved" : "Save"}
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    );
                  })}
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography sx={{ fontWeight: 800, mb: 1 }}>Purchase Statistics</Typography>
                <Box sx={{ width: "100%", height: 250 }}>
                  <ResponsiveContainer>
                    <AreaChart data={spending}>
                      <XAxis dataKey="month" />
                      <YAxis />
                      <Tooltip />
                      <Area type="monotone" dataKey="spent" stroke="#2563eb" fill="#93c5fd" strokeWidth={2} />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>

            <Card sx={{ mt: 2 }}>
              <CardContent>
                <Typography sx={{ fontWeight: 800, mb: 1 }}>Recent Orders</Typography>
                {recentOrders.map((item) => (
                  <Box key={item} sx={{ py: 1, borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between" }}>
                    <Typography>{item}</Typography>
                    <Chip size="small" label="New Since" />
                  </Box>
                ))}
              </CardContent>
            </Card>
          </Box>

          <Box sx={{ display: "grid", gap: { xs: 1.5, md: 2 }, alignContent: "start" }}>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="body2">Total Spent</Typography>
                <Typography sx={{ fontWeight: 800, color: BLUE }}>$1,450</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="body2">Downloads</Typography>
                <Typography sx={{ fontWeight: 800, color: BLUE }}>122</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="body2">Recent Orders</Typography>
                <Typography sx={{ fontWeight: 800, color: BLUE }}>4</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="body2" sx={{ mb: 1 }}>Download Trend</Typography>
                <Box sx={{ width: "100%", height: 160 }}>
                  <ResponsiveContainer>
                    <BarChart data={downloadStats}>
                      <XAxis dataKey="name" hide />
                      <YAxis hide />
                      <Tooltip />
                      <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
      <Snackbar open={Boolean(toast)} autoHideDuration={2000} onClose={() => setToast("")} message={toast} />
    </DashboardLayout>
  );
}
