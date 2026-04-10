import React from "react";
import { Box, Typography, Card, CardContent, CircularProgress } from "@mui/material";

export default function ChartCard({
  title,
  subtitle,
  children,
  loading = false,
  height = "400px",
}) {
  return (
    <Card
      sx={{
        background: "linear-gradient(135deg, #ffffff 0%, #fafafa 100%)",
        border: "1px solid #e0e0e0",
        borderRadius: "12px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardContent
        sx={{
          paddingBottom: 1.5,
          borderBottom: "1px solid #f0f0f0",
        }}
      >
        <Typography
          sx={{
            fontSize: "1rem",
            fontWeight: 600,
            color: "#1a1a1a",
            marginBottom: subtitle ? 0.5 : 0,
          }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography
            sx={{
              fontSize: "0.875rem",
              color: "#999",
              fontWeight: 400,
            }}
          >
            {subtitle}
          </Typography>
        )}
      </CardContent>

      <Box
        sx={{
          flex: 1,
          position: "relative",
          minHeight: height,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          padding: 2,
          overflow: "auto",
        }}
      >
        {loading ? (
          <CircularProgress size={40} />
        ) : (
          <Box sx={{ width: "100%", height: "100%" }}>
            {children}
          </Box>
        )}
      </Box>
    </Card>
  );
}
