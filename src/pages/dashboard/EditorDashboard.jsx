import { useState } from "react";
import { Box, Button, Card, CardContent, Chip, Snackbar, TextField, Typography } from "@mui/material";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import DashboardLayout from "./components/DashboardLayout";

export default function EditorDashboard() {
  const [toast, setToast] = useState("");
  const [query, setQuery] = useState("");
  const [submissions, setSubmissions] = useState(["Financial Documents Data", "Healthcare Data Review", "Market Sentiment Dataset"]);
  const quality = [
    { name: "Accuracy", val: 97 },
    { name: "Completeness", val: 89 },
    { name: "Consistency", val: 84 },
    { name: "Compliance", val: 91 },
  ];
  return (
    <DashboardLayout title="Editor Dashboard">
      <Box sx={{ p: { xs: 1.5, sm: 2, md: 3 }, background: "#eef3fb", minHeight: "calc(100vh - 64px)" }}>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", xl: "minmax(0,2fr) minmax(260px,1fr)" }, gap: { xs: 1.5, md: 2 }, width: "100%" }}>
          <Box>
        <Card sx={{ mb: 2 }}>
          <CardContent>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 1, mb: 1, flexWrap: "wrap" }}>
              <Typography sx={{ fontWeight: 800 }}>Pending Submissions</Typography>
              <TextField
                size="small"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search queue..."
                sx={{ minWidth: { xs: "100%", sm: 220 } }}
              />
            </Box>
            {submissions.filter((s) => s.toLowerCase().includes(query.toLowerCase())).map((item) => (
              <Box key={item} sx={{ py: 1.2, borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between" }}>
                <Typography>{item}</Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  <Button
                    size="small"
                    color="success"
                    onClick={() => {
                      setSubmissions((prev) => prev.filter((p) => p !== item));
                      setToast(`Approved ${item}`);
                    }}
                  >
                    Approve
                  </Button>
                  <Button
                    size="small"
                    color="error"
                    onClick={() => {
                      setSubmissions((prev) => prev.filter((p) => p !== item));
                      setToast(`Rejected ${item}`);
                    }}
                  >
                    Reject
                  </Button>
                </Box>
              </Box>
            ))}
          </CardContent>
        </Card>
          </Box>
          <Box>
        <Card>
          <CardContent>
            <Typography sx={{ fontWeight: 800, mb: 1 }}>Quality Review</Typography>
            <Chip label="48% complete" sx={{ mr: 1 }} />
            <Chip label="97% accuracy" color="success" sx={{ mr: 1 }} />
            <Chip label="84% consistency" color="info" />
            <Box sx={{ width: "100%", height: 200, mt: 2 }}>
              <ResponsiveContainer>
                <BarChart data={quality}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="val" fill="#2563eb" radius={[5, 5, 0, 0]} />
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
