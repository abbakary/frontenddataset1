import React from "react";
import { Box, Typography, Card, CardContent } from "@mui/material";
import { TrendingUp, TrendingDown } from "lucide-react";

export default function StatCard({
  title,
  value,
  icon: Icon,
  trend,
  trendPercentage,
  color = "#1976d2",
  loading = false,
}) {
  return (
    <Card
      sx={{
        height: "100%",
        background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        transition: "all 0.3s ease",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
          transform: "translateY(-2px)",
        },
      }}
    >
      <CardContent
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <Box>
          <Typography
            sx={{
              color: "#999",
              fontSize: "0.875rem",
              fontWeight: 500,
              marginBottom: 1,
            }}
          >
            {title}
          </Typography>
          {loading ? (
            <div
              style={{
                height: "28px",
                background: "#e0e0e0",
                borderRadius: "4px",
                width: "120px",
                animation: "pulse 2s infinite",
              }}
            />
          ) : (
            <Typography
              sx={{
                fontSize: "1.75rem",
                fontWeight: 700,
                color: "#1a1a1a",
                marginBottom: 1,
              }}
            >
              {value}
            </Typography>
          )}
          {trend !== undefined && (
            <Box sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              {trend >= 0 ? (
                <TrendingUp size={16} color="#2e7d32" />
              ) : (
                <TrendingDown size={16} color="#dc2626" />
              )}
              <Typography
                sx={{
                  fontSize: "0.75rem",
                  color: trend >= 0 ? "#2e7d32" : "#dc2626",
                  fontWeight: 600,
                }}
              >
                {trend >= 0 ? "+" : ""}{trendPercentage || Math.abs(trend)}% vs last month
              </Typography>
            </Box>
          )}
        </Box>
        {Icon && (
          <Box
            sx={{
              width: "48px",
              height: "48px",
              borderRadius: "10px",
              background: `${color}15`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: color,
            }}
          >
            <Icon size={24} />
          </Box>
        )}
      </CardContent>
    </Card>
  );
}
