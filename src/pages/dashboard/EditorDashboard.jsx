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
  const [activeSection, setActiveSection] = useState(
    () => localStorage.getItem("dali-dashboard-section") || "review"
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

  const renderReviewSection = () => (
    <>
      <DashboardHeader title="Content Review" subtitle="Review and manage submitted content" onRefresh={handleRefresh} />
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <ChartCard title="Pending Review" subtitle="Articles awaiting approval">
            <TableContainer sx={{ borderRadius: "8px" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>Article ID</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>Submitted By</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.recentContent.filter(a => a.status === "draft").map((article) => (
                    <TableRow key={article.id} sx={{ "&:hover": { background: "#f9f9f9" } }}>
                      <TableCell sx={{ fontSize: "0.875rem", fontWeight: 500 }}>{article.id}</TableCell>
                      <TableCell sx={{ fontSize: "0.875rem" }}>{article.title}</TableCell>
                      <TableCell sx={{ fontSize: "0.875rem" }}>Author</TableCell>
                      <TableCell sx={{ fontSize: "0.875rem" }}>{article.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </>
  );

  const renderQualitySection = () => (
    <>
      <DashboardHeader title="Quality Checks" subtitle="Monitor content quality metrics" onRefresh={handleRefresh} />
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Edits" value={data?.kpis.totalEdits} icon={FileText} trend={12.8} trendPercentage={12.8} color="#1976d2" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Published Articles" value={data?.kpis.articlesPublished} icon={Eye} trend={8.5} trendPercentage={8.5} color="#2e7d32" />
        </Grid>
      </Grid>
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
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
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #ddd", borderRadius: "8px" }} />
                <Legend />
                <Area type="monotone" dataKey="published" stroke="#2e7d32" fillOpacity={1} fill="url(#colorPublished)" />
                <Area type="monotone" dataKey="drafts" stroke="#f59e0b" fillOpacity={1} fill="url(#colorDrafts)" />
              </AreaChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </>
  );

  const renderHistorySection = () => (
    <>
      <DashboardHeader title="Approval History" subtitle="View all approved and rejected content" onRefresh={handleRefresh} />
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <ChartCard title="Content History" subtitle="All reviewed articles">
            <TableContainer sx={{ borderRadius: "8px" }}>
              <Table>
                <TableHead>
                  <TableRow sx={{ background: "#f5f5f5" }}>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>Article ID</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>Title</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>Status</TableCell>
                    <TableCell sx={{ fontWeight: 600, color: "#1a1a1a" }}>Date</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {data?.recentContent.map((article) => (
                    <TableRow key={article.id} sx={{ "&:hover": { background: "#f9f9f9" } }}>
                      <TableCell sx={{ fontSize: "0.875rem", fontWeight: 500 }}>{article.id}</TableCell>
                      <TableCell sx={{ fontSize: "0.875rem" }}>{article.title}</TableCell>
                      <TableCell sx={{ fontSize: "0.875rem" }}><Chip label={article.status} size="small" sx={{ background: article.status === "published" ? "#d4edda" : article.status === "draft" ? "#f0f0f0" : "#fff3cd", color: article.status === "published" ? "#155724" : article.status === "draft" ? "#666" : "#856404", textTransform: "capitalize" }} /></TableCell>
                      <TableCell sx={{ fontSize: "0.875rem" }}>{article.date}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </>
  );

  const renderAlertsSection = () => (
    <>
      <DashboardHeader title="Notifications" subtitle="Important alerts and notifications" onRefresh={handleRefresh} />
      <Grid container spacing={2.5} sx={{ marginBottom: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Total Views" value={`${(data?.kpis.viewsGenerated / 1000).toFixed(0)}K`} icon={TrendingUp} trend={24.3} trendPercentage={24.3} color="#0ea5e9" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard title="Avg Engagement" value={`${data?.kpis.avgEngagementRate}%`} icon={Heart} trend={3.2} trendPercentage={3.2} color="#dc2626" />
        </Grid>
      </Grid>
      <Grid container spacing={2.5}>
        <Grid item xs={12}>
          <ChartCard title="Engagement Trends" subtitle="This week">
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data?.engagementTrends}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="day" stroke="#999" />
                <YAxis stroke="#999" />
                <Tooltip contentStyle={{ background: "#fff", border: "1px solid #ddd", borderRadius: "8px" }} />
                <Legend />
                <Line type="monotone" dataKey="likes" stroke="#dc2626" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="comments" stroke="#0ea5e9" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                <Line type="monotone" dataKey="shares" stroke="#2e7d32" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>
        </Grid>
      </Grid>
    </>
  );

  return (
    <DashboardLayout>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        {activeSection === "review" && renderReviewSection()}
        {activeSection === "quality" && renderQualitySection()}
        {activeSection === "history" && renderHistorySection()}
        {activeSection === "alerts" && renderAlertsSection()}


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
