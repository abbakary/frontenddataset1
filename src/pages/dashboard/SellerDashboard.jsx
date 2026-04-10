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
} from "@mui/material";
import {
  ComposedChart,
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
  TrendingUp,
  ShoppingCart,
  Star,
  Eye,
  Package,
  Award,
} from "lucide-react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/StatCard";
import ChartCard from "../../components/dashboard/ChartCard";
import { getSellerDashboardData } from "../../utils/mockDashboardData";

export default function SellerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const dashboardData = await getSellerDashboardData();
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
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <DashboardHeader
        title="Seller Dashboard"
        subtitle="Your sales performance and product analytics"
        onRefresh={handleRefresh}
      />

      {/* KPI Cards */}
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Revenue"
            value={`$${(data?.kpis.totalRevenue / 1000).toFixed(0)}K`}
            icon={TrendingUp}
            trend={22.4}
            trendPercentage={22.4}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Sales"
            value={data?.kpis.totalSales}
            icon={ShoppingCart}
            trend={18.2}
            trendPercentage={18.2}
            color="#0ea5e9"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Active Listings"
            value={data?.kpis.activeListings}
            icon={Package}
            trend={4.3}
            trendPercentage={4.3}
            color="#f59e0b"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Avg Rating"
            value={`${data?.kpis.averageRating}/5`}
            icon={Star}
            trend={2.1}
            trendPercentage={2.1}
            color="#f59e0b"
          />
        </Grid>
      </Grid>

      {/* Sales Trend and Revenue by Category */}
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        {/* Sales Trend */}
        <Grid item xs={12} md={8}>
          <ChartCard title="Sales Trend" subtitle="Last 6 months">
            <ResponsiveContainer width="100%" height={300}>
              <ComposedChart data={data?.salesTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" stroke="#999" />
                <YAxis stroke="#999" yAxisId="left" />
                <YAxis stroke="#999" yAxisId="right" orientation="right" />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                  formatter={(value, name) => {
                    if (name === "revenue") return `$${value.toLocaleString()}`;
                    return value;
                  }}
                />
                <Legend />
                <Bar dataKey="revenue" fill="#2e7d32" radius={[8, 8, 0, 0]} yAxisId="left" />
                <Line
                  type="monotone"
                  dataKey="orders"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  yAxisId="right"
                />
              </ComposedChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Revenue by Category */}
        <Grid item xs={12} md={4}>
          <ChartCard title="Revenue by Category" subtitle="Breakdown">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data?.revenueByCategory}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, percentage }) => `${category} ${percentage}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {[
                    { color: "#2e7d32" },
                    { color: "#0ea5e9" },
                    { color: "#f59e0b" },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `$${value.toLocaleString()}`} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Top Products */}
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        <Grid item xs={12}>
          <Typography
            sx={{
              fontSize: "1rem",
              fontWeight: 600,
              color: "#1a1a1a",
              marginBottom: 2,
            }}
          >
            Top Performing Products
          </Typography>
          <Grid container spacing={2}>
            {data?.topProducts.map((product) => (
              <Grid item xs={12} sm={6} md={3} key={product.id}>
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
                        height: "120px",
                        background: "#f0f0f0",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 1.5,
                      }}
                    >
                      <Package size={32} color="#999" />
                    </Box>
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#1a1a1a",
                        marginBottom: 1,
                        minHeight: "2.5em",
                      }}
                    >
                      {product.name}
                    </Typography>
                    <Box sx={{ marginBottom: 1.5 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 0.5,
                        }}
                      >
                        <Typography sx={{ fontSize: "0.75rem", color: "#666" }}>
                          Sales
                        </Typography>
                        <Typography sx={{ fontSize: "0.75rem", fontWeight: 600 }}>
                          {product.sales}
                        </Typography>
                      </Box>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          marginBottom: 0.5,
                        }}
                      >
                        <Typography sx={{ fontSize: "0.75rem", color: "#666" }}>
                          Revenue
                        </Typography>
                        <Typography sx={{ fontSize: "0.75rem", fontWeight: 600 }}>
                          ${product.revenue.toLocaleString()}
                        </Typography>
                      </Box>
                      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                        <Typography sx={{ fontSize: "0.75rem", color: "#666" }}>
                          Rating
                        </Typography>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          <Star size={12} fill="#f59e0b" color="#f59e0b" />
                          <Typography sx={{ fontSize: "0.75rem", fontWeight: 600 }}>
                            {product.rating}
                          </Typography>
                        </Box>
                      </Box>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>

      {/* Recent Orders and Customer Satisfaction */}
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        {/* Recent Orders */}
        <Grid item xs={12} md={8}>
          <ChartCard title="Recent Orders" subtitle="Latest transactions">
            <TableContainer sx={{ borderRadius: "8px" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                      Order ID
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                      Buyer
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                      Product
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                      Amount
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
                        {order.buyer}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem" }}>
                        {order.product}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                        ${order.amount.toFixed(2)}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem" }}>
                        <Chip
                          label={order.status}
                          size="small"
                          sx={{
                            background:
                              order.status === "delivered"
                                ? "#d4edda"
                                : order.status === "shipped"
                                  ? "#cce5ff"
                                  : "#fff3cd",
                            color:
                              order.status === "delivered"
                                ? "#155724"
                                : order.status === "shipped"
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

        {/* Customer Satisfaction */}
        <Grid item xs={12} md={4}>
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
                Customer Satisfaction
              </Typography>

              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {/* Average Rating */}
                <Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      marginBottom: 1,
                    }}
                  >
                    <Typography sx={{ fontSize: "0.875rem", color: "#666" }}>
                      Average Rating
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                      <Star size={16} fill="#f59e0b" color="#f59e0b" />
                      <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                        {data?.customerSatisfaction.avgRating}/5
                      </Typography>
                    </Box>
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
                        background: "#f59e0b",
                        width: `${(data?.customerSatisfaction.avgRating / 5) * 100}%`,
                      }}
                    />
                  </Box>
                </Box>

                {/* Review Count */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingY: 1,
                    borderY: "1px solid #f0f0f0",
                  }}
                >
                  <Typography sx={{ fontSize: "0.875rem", color: "#666" }}>
                    Total Reviews
                  </Typography>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                    {data?.customerSatisfaction.reviewCount}
                  </Typography>
                </Box>

                {/* Return Rate */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingY: 1,
                    borderY: "1px solid #f0f0f0",
                  }}
                >
                  <Typography sx={{ fontSize: "0.875rem", color: "#666" }}>
                    Return Rate
                  </Typography>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                    {data?.customerSatisfaction.returnRate}%
                  </Typography>
                </Box>

                {/* Repeat Customers */}
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    paddingY: 1,
                  }}
                >
                  <Typography sx={{ fontSize: "0.875rem", color: "#666" }}>
                    Repeat Customers
                  </Typography>
                  <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                    {data?.customerSatisfaction.repeatCustomers}%
                  </Typography>
                </Box>

                {/* Award Badge */}
                <Box
                  sx={{
                    background: "#f59e0b15",
                    border: "1px solid #f59e0b30",
                    borderRadius: "8px",
                    padding: 1.5,
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    marginTop: 1,
                  }}
                >
                  <Award size={20} color="#f59e0b" />
                  <Box>
                    <Typography sx={{ fontSize: "0.75rem", color: "#999" }}>
                      Status
                    </Typography>
                    <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                      Excellent Seller
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
      `}</style>
    </Container>
  );
}
