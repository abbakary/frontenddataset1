import React from "react";
import { Box, Typography, Button, Grid } from "@mui/material";
import { DownloadOutlined, RefreshCw } from "lucide-react";

export default function DashboardHeader({ title, subtitle, onRefresh }) {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 4,
        flexWrap: "wrap",
        gap: 2,
      }}
    >
      <Box>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#1a1a1a", marginBottom: 0.5 }}
        >
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="body2" sx={{ color: "#666" }}>
            {subtitle}
          </Typography>
        )}
      </Box>
      <Box sx={{ display: "flex", gap: 1.5 }}>
        <Button
          variant="outlined"
          size="small"
          onClick={onRefresh}
          startIcon={<RefreshCw size={18} />}
          sx={{
            textTransform: "none",
            borderColor: "#ddd",
            color: "#666",
            "&:hover": { borderColor: "#999", backgroundColor: "#f5f5f5" },
          }}
        >
          Refresh
        </Button>
        <Button
          variant="outlined"
          size="small"
          startIcon={<DownloadOutlined size={18} />}
          sx={{
            textTransform: "none",
            borderColor: "#ddd",
            color: "#666",
            "&:hover": { borderColor: "#999", backgroundColor: "#f5f5f5" },
          }}
        >
          Export
        </Button>
      </Box>
    </Box>
  );
}
