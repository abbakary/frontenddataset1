import { useNavigate } from "react-router-dom";
import { Box, Button, Card, CardContent, Chip, Snackbar, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Area, AreaChart, Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import DashboardLayout from "./components/DashboardLayout";

export default function SellerDashboard() {
  const navigate = useNavigate();
  const [toast, setToast] = useState("");
  const [query, setQuery] = useState("");
  const [dataRows, setDataRows] = useState([
    { id: 1, name: "Social Media Metrics", status: "Published", price: "$120", views: 544 },
    { id: 2, name: "Retail Sales Data", status: "Published", price: "$95", views: 431 },
    { id: 3, name: "Financial Insights", status: "Review", price: "$150", views: 208 },
  ]);
  const salesTrend = [
    { month: "Jan", total: 6 },
    { month: "Feb", total: 9 },
    { month: "Mar", total: 12 },
    { month: "Apr", total: 11 },
    { month: "May", total: 16 },
    { month: "Jun", total: 21 },
  ];
  const earningTrend = [
    { day: "W1", amount: 320 },
    { day: "W2", amount: 410 },
    { day: "W3", amount: 380 },
    { day: "W4", amount: 520 },
  ];

  return (
    <DashboardLayout title="Seller Dashboard">
      <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, background: "#eef3fb", minHeight: "calc(100vh - 64px)" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", xl: "minmax(0,3fr) minmax(260px,1fr)" }, gap: { xs: 1.5, md: 2 }, width: "100%" }}>
          <Box>
            <Card>
              <CardContent>
                <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2, gap: 1, flexWrap: "wrap" }}>
                  <Typography sx={{ fontWeight: 800 }}>Manage My Datasets</Typography>
                  <Box sx={{ display: "flex", gap: 1, flexWrap: "wrap" }}>
                    <TextField
                      size="small"
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      placeholder="Search datasets..."
                      sx={{ minWidth: { xs: "100%", sm: 220 } }}
                    />
                    <Button variant="contained" onClick={() => navigate("/sell")} sx={{ textTransform: "none" }}>
                      Upload Dataset
                    </Button>
                  </Box>
                </Box>
                {dataRows
                  .filter((r) => r.name.toLowerCase().includes(query.toLowerCase()))
                  .map((row) => (
                  <Box key={row.id} sx={{ py: 1.2, borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", alignItems: "center", gap: 1, flexWrap: "wrap" }}>
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>{row.name}</Typography>
                      <Typography sx={{ color: "#64748b", fontSize: 12 }}>{row.views} views · {row.price}</Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 1 }}>
                      <Chip label={row.status} size="small" color={row.status === "Published" ? "success" : "warning"} />
                      <Button size="small" onClick={() => setToast(`Editing ${row.name}`)}>Edit</Button>
                      <Button
                        size="small"
                        color="error"
                        onClick={() => {
                          setDataRows((prev) => prev.filter((p) => p.id !== row.id));
                          setToast(`Removed ${row.name}`);
                        }}
                      >
                        Delete
                      </Button>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
            <Box sx={{ mt: 2, display: "grid", gridTemplateColumns: { xs: "1fr", md: "1fr 1fr" }, gap: { xs: 1.5, md: 2 } }}>
              <Box>
                <Card>
                  <CardContent>
                    <Typography sx={{ fontWeight: 700, mb: 1 }}>Sales Analytics</Typography>
                    <Box sx={{ width: "100%", height: 220 }}>
                      <ResponsiveContainer>
                        <AreaChart data={salesTrend}>
                          <XAxis dataKey="month" />
                          <YAxis />
                          <Tooltip />
                          <Area dataKey="total" stroke="#2563eb" fill="#bfdbfe" />
                        </AreaChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
              <Box>
                <Card>
                  <CardContent>
                    <Typography sx={{ fontWeight: 700, mb: 1 }}>Earnings Overview</Typography>
                    <Box sx={{ width: "100%", height: 220 }}>
                      <ResponsiveContainer>
                        <BarChart data={earningTrend}>
                          <XAxis dataKey="day" />
                          <YAxis />
                          <Tooltip />
                          <Bar dataKey="amount" fill="#10b981" radius={[6, 6, 0, 0]} />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </Box>
            </Box>
          </Box>
          <Box sx={{ display: "grid", gap: { xs: 1.5, md: 2 }, alignContent: "start" }}>
            <Card>
              <CardContent>
                <Typography variant="body2">Total Earnings</Typography>
                <Typography sx={{ fontWeight: 800, color: "#16a34a", fontSize: 26 }}>$32,450</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography variant="body2">Sales This Month</Typography>
                <Typography sx={{ fontWeight: 800, color: "#2563eb", fontSize: 26 }}>42</Typography>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Button fullWidth variant="contained" onClick={() => setToast("Withdrawal request submitted")} sx={{ textTransform: "none" }}>
                  Withdraw Funds
                </Button>
              </CardContent>
            </Card>
          </Box>
        </Box>
      </Box>
      <Snackbar open={Boolean(toast)} autoHideDuration={2000} onClose={() => setToast("")} message={toast} />
    </DashboardLayout>
  );
}
