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
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
} from "recharts";
import {
  Eye,
  Heart,
  Book,
  Tag,
  Clock,
  Star,
  Bookmark,
} from "lucide-react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/StatCard";
import ChartCard from "../../components/dashboard/ChartCard";
import { getViewerDashboardData } from "../../utils/mockDashboardData";

export default function ViewerDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const dashboardData = await getViewerDashboardData();
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

  // Calculate total read time in hours and minutes
  const hours = Math.floor(data?.kpis.readTime / 60);
  const minutes = data?.kpis.readTime % 60;
  const readTimeText = `${hours}h ${minutes}m`;

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <DashboardHeader
        title="Viewer Dashboard"
        subtitle="Your reading activity and content preferences"
        onRefresh={handleRefresh}
      />

      {/* KPI Cards */}
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Articles Viewed"
            value={data?.kpis.articlesViewed}
            icon={Eye}
            trend={15.3}
            trendPercentage={15.3}
            color="#0ea5e9"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Read Time"
            value={readTimeText}
            icon={Clock}
            trend={22.8}
            trendPercentage={22.8}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Saved Items"
            value={data?.kpis.savedItems}
            icon={Bookmark}
            trend={8.5}
            trendPercentage={8.5}
            color="#f59e0b"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Content Liked"
            value={data?.kpis.contentLiked}
            icon={Heart}
            trend={12.1}
            trendPercentage={12.1}
            color="#dc2626"
          />
        </Grid>
      </Grid>

      {/* Viewing Activity and Category Preferences */}
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        {/* Viewing Activity */}
        <Grid item xs={12} md={8}>
          <ChartCard title="Viewing Activity" subtitle="Last 7 days">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data?.viewingActivity}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="date" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                  formatter={(value) => `${value} views`}
                />
                <Line
                  type="monotone"
                  dataKey="views"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Category Preferences */}
        <Grid item xs={12} md={4}>
          <ChartCard title="Preferred Categories" subtitle="By time spent">
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={data?.preferredCategories}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ category, views }) => `${category} (${views})`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="views"
                >
                  {[
                    { color: "#1976d2" },
                    { color: "#0ea5e9" },
                    { color: "#2e7d32" },
                    { color: "#f59e0b" },
                  ].map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip formatter={(value) => `${value} views`} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Reading by Category */}
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        <Grid item xs={12}>
          <ChartCard title="Content by Category" subtitle="Views and time spent">
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data?.preferredCategories}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="category" stroke="#999" />
                <YAxis stroke="#999" yAxisId="left" />
                <YAxis stroke="#999" yAxisId="right" orientation="right" />
                <Tooltip
                  contentStyle={{
                    background: "#fff",
                    border: "1px solid #ddd",
                    borderRadius: "8px",
                  }}
                  formatter={(value, name) => {
                    if (name === "views") return [value, "Views"];
                    return [Math.round(value), "Minutes"];
                  }}
                />
                <Bar dataKey="views" fill="#0ea5e9" radius={[8, 8, 0, 0]} yAxisId="left" />
                <Bar dataKey="timeSpent" fill="#2e7d32" radius={[8, 8, 0, 0]} yAxisId="right" />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Recently Viewed Content */}
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        <Grid item xs={12}>
          <ChartCard title="Recently Viewed" subtitle="Your latest reads">
            <TableContainer sx={{ borderRadius: "8px" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                      Article
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                      Category
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                      Rating
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                      Viewed
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.recentlyViewed.map((article) => (
                    <TableRow key={article.id} sx={{ "&:hover": { background: "#f9f9f9" } }}>
                      <TableCell sx={{ fontSize: "0.875rem" }}>
                        {article.title}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem" }}>
                        <Chip
                          label={article.category}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem" }}>
                        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              size={14}
                              fill={i < article.rating ? "#f59e0b" : "#ddd"}
                              color={i < article.rating ? "#f59e0b" : "#ddd"}
                            />
                          ))}
                        </Box>
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem", color: "#666" }}>
                        {article.viewedAt}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Saved Items and Collections */}
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
            Your Reading List
          </Typography>
          <Grid container spacing={2}>
            {data?.savedItems.map((item) => (
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
                        height: "140px",
                        background: "#f0f0f0",
                        borderRadius: "8px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        marginBottom: 1.5,
                      }}
                    >
                      <Book size={32} color="#999" />
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
                      {item.title}
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          paddingY: 1,
                          borderY: "1px solid #f0f0f0",
                        }}
                      >
                        <Typography sx={{ fontSize: "0.75rem", color: "#666" }}>
                          Saved
                        </Typography>
                        <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                          {item.savedAt}
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                        }}
                      >
                        <Typography sx={{ fontSize: "0.75rem", color: "#666" }}>
                          Status
                        </Typography>
                        <Chip
                          label={item.status}
                          size="small"
                          sx={{
                            background:
                              item.status === "unread"
                                ? "#cce5ff"
                                : item.status === "reading"
                                  ? "#fff3cd"
                                  : "#d4edda",
                            color:
                              item.status === "unread"
                                ? "#004085"
                                : item.status === "reading"
                                  ? "#856404"
                                  : "#155724",
                            textTransform: "capitalize",
                          }}
                        />
                      </Box>
                    </Box>

                    <Button
                      fullWidth
                      variant="outlined"
                      size="small"
                      sx={{
                        marginTop: 1.5,
                        textTransform: "none",
                        borderColor: "#ddd",
                        color: "#666",
                        "&:hover": {
                          borderColor: "#999",
                          backgroundColor: "#f5f5f5",
                        },
                      }}
                    >
                      Continue Reading
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
  );
}
