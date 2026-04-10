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

  useEffect(() => {
    loadDashboardData();
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

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <DashboardHeader
          title="Admin Dashboard"
          subtitle="System overview and platform analytics"
          onRefresh={handleRefresh}
        />

      {/* KPI Cards */}
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Users"
            value={`${(data?.kpis.totalUsers / 1000).toFixed(1)}K`}
            icon={Users}
            trend={12.5}
            trendPercentage={12.5}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Users"
            value={`${(data?.kpis.activeUsers / 1000).toFixed(1)}K`}
            icon={Activity}
            trend={8.2}
            trendPercentage={8.2}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={`$${(data?.kpis.totalRevenue / 1000).toFixed(0)}K`}
            icon={DollarSign}
            trend={15.3}
            trendPercentage={15.3}
            color="#0ea5e9"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Transactions"
            value={data?.kpis.totalTransactions.toLocaleString()}
            icon={ShoppingCart}
            trend={5.8}
            trendPercentage={5.8}
            color="#f59e0b"
          />
        </Grid>
      </Grid>

      {/* Charts Grid */}
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        {/* User Growth Chart */}
        <Grid item xs={12} md={8}>
          <ChartCard title="User Growth Trend" subtitle="Last 6 months">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data?.userGrowth}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="users"
                  stroke="#1976d2"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="newUsers"
                  stroke="#2e7d32"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Users by Role */}
        <Grid item xs={12} md={4}>
          <ChartCard title="Users by Role" subtitle="Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data?.usersByRole}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percentage }) => `${name} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
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

      {/* Revenue and Platform Health */}
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        {/* Revenue by Category */}
        <Grid item xs={12} md={6}>
          <ChartCard title="Revenue by Category" subtitle="Total breakdown">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.revenueByCategory}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="category" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => `$${value.toLocaleString()}`}
                />
                <Bar dataKey="value" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Platform Health */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
              border: "1px solid #e0e0e0",
              borderRadius: "12px",
            }}
          >
            <CardContent>
              <Typography
                sx={{
                  fontSize: "1rem",
                  fontWeight: 600,
                  color: "#1a1a1a",
                  marginBottom: 2,
                }}
              >
                Platform Health
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Uptime */}
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 1,
                    }}
                  >
                    <Typography sx={{ fontSize: "0.875rem", color: "#666" }}>
                      Uptime
                    </Typography>
                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                      {data?.platformHealth.uptime}%
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: "8px",
                      background: "#e0e0e0",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        background: "#2e7d32",
                        width: `${data?.platformHealth.uptime}%`,
                      }}
                    />
                  </Box>
                </Box>

                {/* API Response Time */}
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      marginBottom: 1,
                    }}
                  >
                    <Typography sx={{ fontSize: "0.875rem", color: "#666" }}>
                      API Response Time
                    </Typography>
                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                      {data?.platformHealth.apiResponseTime}ms
                    </Typography>
                  </Box>
                  <Box
                    sx={{
                      height: "8px",
                      background: "#e0e0e0",
                      borderRadius: "4px",
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        height: "100%",
                        background:
                          data?.platformHealth.apiResponseTime < 300
                            ? "#2e7d32"
                            : "#f59e0b",
                        width: `${Math.min((300 - data?.platformHealth.apiResponseTime) / 3, 100)}%`,
                      }}
                    />
                  </Box>
                </Box>

                {/* Active Connections */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingTop: 1,
                    borderTop: "1px solid #f0f0f0",
                  }}
                >
                  <Typography sx={{ fontSize: "0.875rem", color: "#666" }}>
                    Active Connections
                  </Typography>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                    {data?.platformHealth.activeConnections.toLocaleString()}
                  </Typography>
                </Box>

                {/* Error Rate */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Typography sx={{ fontSize: "0.875rem", color: "#666" }}>
                    Error Rate
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                    {data?.platformHealth.errorRate > 0.1 && (
                      <AlertCircle size={14} color="#f59e0b" />
                    )}
                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                      {data?.platformHealth.errorRate}%
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Recent Transactions */}
      <Grid item xs={12}>
        <ChartCard title="Recent Transactions" subtitle="Latest activity">
          <TableContainer sx={{ borderRadius: "8px" }}>
            <Table>
              <TableHead>
                <TableRow sx={{ background: "#f5f5f5" }}>
                  <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                    Transaction ID
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                    User
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                    Amount
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                    Type
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                    Date
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {data?.recentTransactions.map((txn) => (
                  <TableRow key={txn.id} sx={{ "&:hover": { background: "#f9f9f9" } }}>
                    <TableCell sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
                      {txn.id}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.875rem" }}>{txn.user}</TableCell>
                    <TableCell sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                      ${txn.amount.toFixed(2)}
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.875rem" }}>
                      <Chip
                        label={txn.type}
                        size="small"
                        variant="outlined"
                        sx={{ textTransform: "capitalize" }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.875rem" }}>
                      <Chip
                        label={txn.status}
                        size="small"
                        sx={{
                          background:
                            txn.status === "completed"
                              ? "#d4edda"
                              : txn.status === "pending"
                                ? "#fff3cd"
                                : "#f8d7da",
                          color:
                            txn.status === "completed"
                              ? "#155724"
                              : txn.status === "pending"
                                ? "#856404"
                                : "#721c24",
                          textTransform: "capitalize",
                        }}
                      />
                    </TableCell>
                    <TableCell sx={{ fontSize: "0.875rem" }}>{txn.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ChartCard>
      </Grid>

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
