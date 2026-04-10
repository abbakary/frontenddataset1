import React, { useEffect, useState } from "react";
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
  Button,
} from "@mui/material";
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  AreaChart,
  Area,
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
  ShoppingBag,
  Heart,
  TrendingUp,
  Star,
  Package,
  Eye,
} from "lucide-react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/StatCard";
import ChartCard from "../../components/dashboard/ChartCard";
import { getBuyerDashboardData } from "../../utils/mockDashboardData";

export default function BuyerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const dashboardData = await getBuyerDashboardData();
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
          title="Buyer Dashboard"
          subtitle="Your shopping activity and personalized recommendations"
          onRefresh={handleRefresh}
        />

      {/* KPI Cards */}
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Spent"
            value={`$${data?.kpis.totalSpent.toFixed(2)}`}
            icon={ShoppingBag}
            trend={18.5}
            trendPercentage={18.5}
            color="#0ea5e9"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Orders"
            value={data?.kpis.ordersCount}
            icon={Package}
            trend={5.2}
            trendPercentage={5.2}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Saved Items"
            value={data?.kpis.savedItems}
            icon={Heart}
            trend={12.1}
            trendPercentage={12.1}
            color="#dc2626"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Loyalty Points"
            value={data?.kpis.loyaltyPoints.toLocaleString()}
            icon={Star}
            trend={8.7}
            trendPercentage={8.7}
            color="#f59e0b"
          />
        </Grid>
      </Grid>

      {/* Spending Trend and Orders Status */}
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        {/* Spending Trend */}
        <Grid item xs={12} md={8}>
          <ChartCard title="Spending Trend" subtitle="Last 6 months">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data?.spendingTrend}>
                <defs>
                  <linearGradient id="colorSpent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => `$${value}`}
                />
                <Area
                  type="monotone"
                  dataKey="spent"
                  stroke="#0ea5e9"
                  fillOpacity={1}
                  fill="url(#colorSpent)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Order Status Distribution */}
        <Grid item xs={12} md={4}>
          <ChartCard title="Order Status" subtitle="Distribution">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data?.ordersByStatus}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ status, count }) => `${status} (${count})`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="count"
                >
                  {data?.ordersByStatus.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Top Categories and Recent Orders */}
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        {/* Top Categories */}
        <Grid item xs={12} md={6}>
          <ChartCard title="Top Categories" subtitle="Spending breakdown">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.topCategories}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="category" stroke="#999" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#999" />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => `$${value}`}
                />
                <Bar dataKey="spent" fill="#0ea5e9" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Items per Category */}
        <Grid item xs={12} md={6}>
          <ChartCard title="Items Purchased by Category" subtitle="Count">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.topCategories}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="category" stroke="#999" angle={-45} textAnchor="end" height={100} />
                <YAxis stroke="#999" />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                />
                <Bar dataKey="items" fill="#2e7d32" radius={[8, 8, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Recent Orders */}
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        <Grid item xs={12}>
          <ChartCard title="Recent Orders" subtitle="Your latest purchases">
            <TableContainer sx={{ borderRadius: "8px" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                      Order ID
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                      Product
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                      Price
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                      Seller
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
                  {data?.recentOrders.map((order) => (
                    <TableRow key={order.id} sx={{ "&:hover": { background: "#f9f9f9" } }}>
                      <TableCell sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
                        {order.id}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem" }}>
                        {order.title}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                        ${order.price.toFixed(2)}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem" }}>
                        {order.seller}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem" }}>
                        <Chip
                          label={order.status}
                          size="small"
                          sx={{
                            background:
                              order.status === "delivered"
                                ? "#d4edda"
                                : order.status === "in-transit"
                                  ? "#cce5ff"
                                  : "#fff3cd",
                            color:
                              order.status === "delivered"
                                ? "#155724"
                                : order.status === "in-transit"
                                  ? "#004085"
                                  : "#856404",
                            textTransform: "capitalize",
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem" }}>{order.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Recommendations */}
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "#1a1a1a",
              marginBottom: 2,
            }}
          >
            Recommended for You
          </Typography>
          <Grid container spacing={2}>
            {data?.recommendations.map((item) => (
              <Grid item xs={12} sm={6} md={4} key={item.id}>
                <Card
                  sx={{
                    background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
                    border: "1px solid #e0e0e0",
                    borderRadius: "12px",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <CardContent>
                    <Box
                      sx={{
                        height: "150px",
                        background: "#f0f0f0",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 2,
                      }}
                    >
                      <Eye size={32} color="#999" />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        color: "#999",
                        marginBottom: 0.5,
                      }}
                    >
                      {item.category}
                    </Typography>
                    <Typography
                      sx={{
                        fontSize: "1rem",
                        fontWeight: 600,
                        color: "#1a1a1a",
                        marginBottom: 1,
                      }}
                    >
                      {item.title}
                    </Typography>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        marginBottom: 1.5,
                      }}
                    >
                      <Typography sx={{ fontSize: "1.25rem", fontWeight: 700 }}>
                        ${item.price.toFixed(2)}
                      </Typography>
                      <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                        <Star size={16} fill="#f59e0b" color="#f59e0b" />
                        <Typography sx={{ fontSize: "0.875rem" }}>
                          {item.rating}
                        </Typography>
                      </Box>
                    </Box>
                    <Button
                      fullWidth
                      variant="contained"
                      sx={{
                        background: "#0ea5e9",
                        textTransform: "none",
                        borderRadius: "8px",
                        "&:hover": { background: "#0394d0" },
                      }}
                    >
                      Add to Cart
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
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
