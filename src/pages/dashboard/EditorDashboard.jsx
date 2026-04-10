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
import DashboardLayout from "../../components/layout/DashboardLayout";
import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import {
  FileText,
  Eye,
  Heart,
  MessageCircle,
  Share2,
  TrendingUp,
} from "lucide-react";
import DashboardHeader from "../../components/dashboard/DashboardHeader";
import StatCard from "../../components/dashboard/StatCard";
import ChartCard from "../../components/dashboard/ChartCard";
import { getEditorDashboardData } from "../../utils/mockDashboardData";

export default function EditorDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const dashboardData = await getEditorDashboardData();
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
          title="Editor Dashboard"
          subtitle="Your content performance and engagement analytics"
          onRefresh={handleRefresh}
        />

      {/* KPI Cards */}
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Edits"
            value={data?.kpis.totalEdits}
            icon={FileText}
            trend={12.8}
            trendPercentage={12.8}
            color="#1976d2"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Published Articles"
            value={data?.kpis.articlesPublished}
            icon={Eye}
            trend={8.5}
            trendPercentage={8.5}
            color="#2e7d32"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Total Views"
            value={`${(data?.kpis.viewsGenerated / 1000).toFixed(0)}K`}
            icon={TrendingUp}
            trend={24.3}
            trendPercentage={24.3}
            color="#0ea5e9"
          />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard
            title="Avg Engagement"
            value={`${data?.kpis.avgEngagementRate}%`}
            icon={Heart}
            trend={3.2}
            trendPercentage={3.2}
            color="#dc2626"
          />
        </Grid>
      </Grid>

      {/* Publishing Activity and Engagement Trends */}
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        {/* Publishing Activity */}
        <Grid item xs={12} md={6}>
          <ChartCard title="Publishing Activity" subtitle="Last 6 months">
            <ResponsiveContainer width="100%" height={300}>
              <AreaChart data={data?.publishingActivity}>
                <defs>
                  <linearGradient id="colorPublished" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#2e7d32" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#2e7d32" stopOpacity={0} />
                  </linearGradient>
                  <linearGradient id="colorDrafts" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#f59e0b" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#f59e0b" stopOpacity={0} />
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
                />
                <Legend />
                <Area
                  type="monotone"
                  dataKey="published"
                  stroke="#2e7d32"
                  fillOpacity={1}
                  fill="url(#colorPublished)"
                />
                <Area
                  type="monotone"
                  dataKey="drafts"
                  stroke="#f59e0b"
                  fillOpacity={1}
                  fill="url(#colorDrafts)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>

        {/* Weekly Engagement Trends */}
        <Grid item xs={12} md={6}>
          <ChartCard title="Engagement Trends" subtitle="This week">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data?.engagementTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#999" />
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
                  dataKey="likes"
                  stroke="#dc2626"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="comments"
                  stroke="#0ea5e9"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
                <Line
                  type="monotone"
                  dataKey="shares"
                  stroke="#2e7d32"
                  strokeWidth={2}
                  dot={{ r: 4 }}
                  activeDot={{ r: 6 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>

      {/* Top Content */}
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
            Top Performing Content
          </Typography>
          <Grid container spacing={2}>
            {data?.contentMetrics.map((content, index) => (
              <Grid item xs={12} sm={6} lg={3} key={index}>
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
                    <Typography
                      sx={{
                        fontSize: "0.875rem",
                        fontWeight: 600,
                        color: "#1a1a1a",
                        marginBottom: 1.5,
                        minHeight: "2.5em",
                      }}
                    >
                      {content.title}
                    </Typography>

                    <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 1,
                          paddingY: 1,
                          borderY: "1px solid #f0f0f0",
                        }}
                      >
                        <Eye size={16} color="#0ea5e9" />
                        <Box>
                          <Typography sx={{ fontSize: "0.75rem", color: "#666" }}>
                            Views
                          </Typography>
                          <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                            {content.views.toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <Heart size={16} color="#dc2626" />
                        <Box>
                          <Typography sx={{ fontSize: "0.75rem", color: "#666" }}>
                            Likes
                          </Typography>
                          <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                            {content.likes.toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>

                      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                        <MessageCircle size={16} color="#f59e0b" />
                        <Box>
                          <Typography sx={{ fontSize: "0.75rem", color: "#666" }}>
                            Comments
                          </Typography>
                          <Typography sx={{ fontSize: "0.875rem", fontWeight: 600 }}>
                            {content.comments}
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

      {/* Recent Content */}
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <ChartCard title="Recent Content" subtitle="Your latest articles">
            <TableContainer sx={{ borderRadius: "8px" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                      Article ID
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                      Title
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                      Status
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                      Views
                    </TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>
                      Date
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.recentContent.map((article) => (
                    <TableRow key={article.id} sx={{ "&:hover": { background: "#f9f9f9" } }}>
                      <TableCell sx={{ fontSize: "0.875rem", fontWeight: 500 }}>
                        {article.id}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem" }}>
                        {article.title}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem" }}>
                        <Chip
                          label={article.status}
                          size="small"
                          sx={{
                            background:
                              article.status === "published"
                                ? "#d4edda"
                                : article.status === "draft"
                                  ? "#f0f0f0"
                                  : "#fff3cd",
                            color:
                              article.status === "published"
                                ? "#155724"
                                : article.status === "draft"
                                  ? "#666"
                                  : "#856404",
                            textTransform: "capitalize",
                          }}
                        />
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem" }}>
                        {article.views > 0 ? article.views.toLocaleString() : "-"}
                      </TableCell>
                      <TableCell sx={{ fontSize: "0.875rem" }}>{article.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ChartCard>
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
