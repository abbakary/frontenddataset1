import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  Box,
  Grid,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  Typography,
  CircularProgress,
  Container,
} from "@mui/material";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  Users,
  TrendingUp,
  DollarSign,
  ShoppingCart,
  Activity,
  AlertCircle,
} from "lucide-react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/StatCard";
import ChartCard from "../../components/dashboard/ChartCard";
import { getAdminDashboardData } from "../../utils/mockDashboardData";

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeSection, setActiveSection] = useState(
    () => localStorage.getItem("dali-dashboard-section") || "browse"
  );

  useEffect(() => {
    loadDashboardData();
  }, []);

  useEffect(() => {
    const handleSectionChange = (event) => {
      setActiveSection(event.detail);
    };
    window.addEventListener("dashboard:section", handleSectionChange);
    return () => window.removeEventListener("dashboard:section", handleSectionChange);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const dashboardData = await getAdminDashboardData();
      setData(dashboardData);
    } catch (error) {
      console.error("Error loading dashboard data:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleRefresh = async () => {
    await loadDashboardData();
  };

  const getStatusColor = (status) => {
    const colors = {
      completed: "#2e7d32",
      pending: "#f59e0b",
      failed: "#dc2626",
    };
    return colors[status] || "#666";
  };

  if (loading) {
    return (
      <DashboardLayout>
        <Container maxWidth="lg" sx={{ py: 4 }}>
          <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
            <CircularProgress />
          </Box>
        </Container>
      </DashboardLayout>
    );
  }

  const renderBrowseSection = () => (
    <>
      <DashboardHeader title="Browse Datasets" subtitle="Available datasets on platform" onRefresh={handleRefresh} />
      <Typography sx={{ fontSize: "1rem", fontWeight: 600, marginBottom: 2 }}>Featured Datasets</Typography>
    </>
  );

  const renderSavedSection = () => (
    <>
      <DashboardHeader title="Saved Collections" subtitle="Manage saved collections" onRefresh={handleRefresh} />
      <Typography sx={{ fontSize: "1rem", fontWeight: 600, marginBottom: 2 }}>Collections</Typography>
    </>
  );

  const renderHistorySection = () => (
    <>
      <DashboardHeader title="Viewing History" subtitle="User viewing patterns" onRefresh={handleRefresh} />
      <Typography sx={{ fontSize: "1rem", fontWeight: 600, marginBottom: 2 }}>History</Typography>
    </>
  );

  const renderUsersSection = () => (
    <>
      <DashboardHeader title="User Management" subtitle="Manage platform users" onRefresh={handleRefresh} />
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Users" value={`${(data?.kpis.totalUsers / 1000).toFixed(1)}K`} icon={Users} trend={12.5} trendPercentage={12.5} color="#1976d2" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Active Users" value={`${(data?.kpis.activeUsers / 1000).toFixed(1)}K`} icon={Activity} trend={8.2} trendPercentage={8.2} color="#2e7d32" />
        </Grid>
      </Grid>
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={8}>
          <ChartCard title="User Growth Trend" subtitle="Last 6 months">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data?.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #ddd", borderRadius: "8px" }} />
                <Legend />
                <Line type="monotone" dataKey="users" stroke="#1976d2" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="newUsers" stroke="#2e7d32" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <ChartCard title="Users by Role" subtitle="Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie data={data?.usersByRole} cx="50%" cy="50%" labelLine={false} label={({ name, percentage }) => `${name} ${percentage}%`} outerRadius={80} fill="#8884d8" dataKey="count">
                  {data?.usersByRole.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </>
  );

  const renderModerationSection = () => (
    <>
      <DashboardHeader title="Content Moderation" subtitle="Review and manage flagged content" onRefresh={handleRefresh} />
      <Typography sx={{ fontSize: "1rem", fontWeight: 600, marginBottom: 2 }}>Pending Moderation</Typography>
    </>
  );

  const renderReportsSection = () => (
    <>
      <DashboardHeader title="Platform Reports" subtitle="System analytics and reports" onRefresh={handleRefresh} />
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Revenue" value={`$${(data?.kpis.totalRevenue / 1000).toFixed(0)}K`} icon={DollarSign} trend={15.3} trendPercentage={15.3} color="#0ea5e9" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Transactions" value={data?.kpis.totalTransactions.toLocaleString()} icon={ShoppingCart} trend={5.8} trendPercentage={5.8} color="#f59e0b" />
        </Grid>
      </Grid>
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <ChartCard title="Revenue by Category" subtitle="Total breakdown">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.revenueByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="category" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #ddd", borderRadius: "8px" }} formatter={(value) => `$${value.toLocaleString()}`} />
                <Bar dataKey="value" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </>
  );

  const renderSettingsSection = () => (
    <>
      <DashboardHeader title="System Settings" subtitle="Configure platform settings" onRefresh={handleRefresh} />
      <Grid container spacing={2.5}>
        <Grid item xs={12} md={6}>
          <Card sx={{ background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)", border: "1px solid #e0e0e0", borderRadius: "12px" }}>
            <CardContent>
              <Typography sx={{ fontSize: "1rem", fontWeight: 600, color: "#1a1a1a", marginBottom: 2 }}>Platform Health</Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
                    <Typography sx={{ fontSize: "0.875rem", color: "#666" }}>Uptime</Typography>
                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>{data?.platformHealth.uptime}%</Typography>
                  </Box>
                  <Box sx={{ height: "8px", background: "#e0e0e0", borderRadius: "4px", overflow: "hidden" }}>
                    <Box sx={{ height: "100%", background: "#2e7d32", width: `${data?.platformHealth.uptime}%` }} />
                  </Box>
                </Box>
                <Box>
                  <Box sx={{ display: "flex", justifyContent: "space-between", marginBottom: 1 }}>
                    <Typography sx={{ fontSize: "0.875rem", color: "#666" }}>API Response Time</Typography>
                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>{data?.platformHealth.apiResponseTime}ms</Typography>
                  </Box>
                  <Box sx={{ height: "8px", background: "#e0e0e0", borderRadius: "4px", overflow: "hidden" }}>
                    <Box sx={{ height: "100%", background: data?.platformHealth.apiResponseTime < 300 ? "#2e7d32" : "#f59e0b", width: `${Math.min((300 - data?.platformHealth.apiResponseTime) / 3, 100)}%` }} />
                  </Box>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between", paddingTop: 1, borderTop: "1px solid #f0f0f0" }}>
                  <Typography sx={{ fontSize: "0.875rem", color: "#666" }}>Active Connections</Typography>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>{data?.platformHealth.activeConnections.toLocaleString()}</Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {activeSection === "browse" && renderBrowseSection()}
        {activeSection === "saved" && renderSavedSection()}
        {activeSection === "history" && renderHistorySection()}
        {activeSection === "users" && renderUsersSection()}
        {activeSection === "moderation" && renderModerationSection()}
        {activeSection === "reports" && renderReportsSection()}
        {activeSection === "settings" && renderSettingsSection()}
        <style>{`
          @keyframes pulse {
            0%, 100% { opacity: 1; }
            50% { opacity: 0.5; }
          }
        `}</style>
      </Container>
    </DashboardLayout>
  );
}
