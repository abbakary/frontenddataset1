import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
  MenuItem,
  Alert,
} from "@mui/material";
import PageLayout from "../public/components/PageLayout";

const categories = [
  "Datasets",
  "Reports",
  "Analytics Templates",
  "Visualizations",
  "ML Models",
];

const locations = [
  "Lagos",
  "Abuja",
  "Port Harcourt",
  "Nairobi",
  "Kigali",
];

export default function PostAdPage() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    category: "",
    location: "",
    description: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const titleError = useMemo(() => form.title.trim().length === 0, [form.title]);

  const handleChange = (field) => (event) => {
    setSubmitted(false);
    setForm((prev) => ({ ...prev, [field]: event.target.value }));
  };

  const handleSubmit = () => {
    if (titleError || !form.category || !form.location) return;
    setSubmitted(true);
  };

  return (
    <PageLayout>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Paper sx={{ p: { xs: 2, md: 4 }, borderRadius: 2 }}>
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Typography sx={{ fontWeight: 700 }}>Post ad</Typography>
            <Button size="small" onClick={() => setForm({ title: "", category: "", location: "", description: "" })}>
              Clear
            </Button>
          </Box>

          <TextField
            fullWidth
            label="Title*"
            value={form.title}
            onChange={handleChange("title")}
            error={submitted && titleError}
            helperText={submitted && titleError ? "This field is required" : "0 / 70"}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            select
            label="Category*"
            value={form.category}
            onChange={handleChange("category")}
            sx={{ mb: 2 }}
          >
            {categories.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            select
            label="Select Location*"
            value={form.location}
            onChange={handleChange("location")}
            sx={{ mb: 2 }}
          >
            {locations.map((item) => (
              <MenuItem key={item} value={item}>
                {item}
              </MenuItem>
            ))}
          </TextField>

          <TextField
            fullWidth
            multiline
            minRows={4}
            label="Description"
            value={form.description}
            onChange={handleChange("description")}
            sx={{ mb: 2 }}
          />

          <Typography variant="caption" sx={{ color: "#7d8795", display: "block", mb: 2 }}>
            Supported formats: `png`, `jpg` and `jpeg` (demo UI only)
          </Typography>

          <Button
            fullWidth
            variant="contained"
            onClick={handleSubmit}
            sx={{ textTransform: "none", backgroundColor: "#d0dde2", color: "#fff", fontWeight: 700 }}
          >
            Next
          </Button>

          {submitted && (
            <Alert sx={{ mt: 2 }} severity="success" action={<Button onClick={() => navigate("/dashboard/seller")}>Go to Seller Dashboard</Button>}>
              Ad draft created successfully.
            </Alert>
          )}
        </Paper>
      </Container>
    </PageLayout>
  );
}
