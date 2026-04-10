import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Typography,
  Container,
  Card,
  CardContent,
  TextField,
  Box,
  Chip,
  Avatar,
  IconButton,
  InputAdornment,
} from "@mui/material";
import {
  Search,
  SlidersHorizontal,
  TrendingUp,
  MoreVertical,
  ChevronUp,
} from "lucide-react";
import PageLayout from "../components/PageLayout";
import { categoriesData } from "../components/CategorySidebar";

const PRIMARY_COLOR = "#61C5C3";

export default function ProjectPage() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All datasets");

  const categories = [
    "All datasets",
    ...categoriesData.map((cat) => cat.name),
  ];

  const trendingDatasets = [
    {
      id: 1,
      title: "Liver Cirrhosis Disease Prediction Dataset",
      author: "zkskhurram",
      usability: "10.0",
      updated: "Updated a day ago",
      files: "2 Files (CSV)",
      size: "10 kB",
      downloads: "92 downloads",
      votes: 13,
      image:
        "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80",
      avatars: [
        "https://i.pravatar.cc/40?img=11",
        "https://i.pravatar.cc/40?img=14",
      ],
    },
    {
      id: 2,
      title: "Python OSV Vulnerabilities & CVSS Features",
      author: "Kanchana1990",
      usability: "10.0",
      updated: "Updated 14 hours ago",
      files: "3 Files (CSV)",
      size: "3 MB",
      downloads: "32 downloads",
      votes: 10,
      image:
        "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80",
      avatars: [
        "https://i.pravatar.cc/40?img=21",
        "https://i.pravatar.cc/40?img=25",
      ],
    },
    {
      id: 3,
      title: "Spotify Global Hits and Artist Analytics",
      author: "Eman Fatima",
      usability: "10.0",
      updated: "Updated 7 days ago",
      files: "3 Files (CSV)",
      size: "9 kB",
      downloads: "418 downloads",
      votes: 16,
      image:
        "https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=900&q=80",
      avatars: [
        "https://i.pravatar.cc/40?img=31",
        "https://i.pravatar.cc/40?img=33",
      ],
    },
    {
      id: 4,
      title: "Student Mental Health and Burnout Dataset",
      author: "Mansehaj Preet",
      usability: "10.0",
      updated: "Updated 23 days ago",
      files: "1 File (CSV)",
      size: "3 MB",
      downloads: "742 downloads",
      votes: 16,
      image:
        "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80",
      avatars: [
        "https://i.pravatar.cc/40?img=41",
        "https://i.pravatar.cc/40?img=43",
      ],
    },
  ];

  const filteredDatasets = trendingDatasets.filter((dataset) => {
    const matchesSearch =
      dataset.title.toLowerCase().includes(search.toLowerCase()) ||
      dataset.author.toLowerCase().includes(search.toLowerCase());

    const matchesCategory =
      selectedCategory === "All datasets" ||
      dataset.title.toLowerCase().includes(selectedCategory.toLowerCase()) ||
      dataset.author.toLowerCase().includes(selectedCategory.toLowerCase());

    return matchesSearch && matchesCategory;
  });

  return (
    <PageLayout>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f8f9fb",
          py: 4,
        }}
      >
        <Container maxWidth="xl">
          <Box sx={{ mb: 3 }}>
            <TextField
              fullWidth
              placeholder="Search datasets"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              variant="outlined"
              sx={{
                backgroundColor: "#fff",
                borderRadius: "8px",
                "& .MuiOutlinedInput-root": {
                  borderRadius: "8px",
                  height: 48,
                  fontSize: "0.9rem",
                },
              }}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Search size={20} color="#111827" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        fontWeight: 600,
                        color: PRIMARY_COLOR,
                        cursor: "pointer",
                      }}
                    >
                      <SlidersHorizontal size={18} />
                      <Typography
                        fontWeight={600}
                        sx={{ fontSize: "0.9rem", color: PRIMARY_COLOR }}
                      >
                        Filters
                      </Typography>
                    </Box>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              gap: 1.2,
              flexWrap: "wrap",
              mb: 6,
            }}
          >
            {categories.map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => setSelectedCategory(category)}
                variant={selectedCategory === category ? "filled" : "outlined"}
                sx={{
                  borderRadius: "6px",
                  fontSize: "0.85rem",
                  height: 32,
                  px: 1,
                  backgroundColor:
                    selectedCategory === category ? PRIMARY_COLOR : "#fff",
                  color: selectedCategory === category ? "#fff" : "#374151",
                  borderColor: "#d1d5db",
                  "&:hover": {
                    backgroundColor:
                      selectedCategory === category ? PRIMARY_COLOR : "#e6f7f6",
                  },
                }}
              />
            ))}
          </Box>

          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              mb: 3,
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
              <TrendingUp size={20} color="#111827" />
              <Typography
                sx={{
                  fontSize: "1.3rem",
                  fontWeight: 700,
                  color: "#111827",
                }}
              >
                Trending Datasets
              </Typography>
            </Box>

            <Typography
              sx={{
                fontSize: "0.9rem",
                fontWeight: 600,
                color: PRIMARY_COLOR,
                cursor: "pointer",
              }}
            >
              See All
            </Typography>
          </Box>

          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: {
                xs: "1fr",
                sm: "repeat(2, 1fr)",
                lg: "repeat(4, 1fr)",
              },
              gap: 3,
            }}
          >
            {filteredDatasets.map((dataset) => (
              <DatasetCard key={dataset.id} dataset={dataset} />
            ))}
          </Box>
        </Container>
      </Box>
    </PageLayout>
  );
}

function DatasetCard({ dataset }) {
  const navigate = useNavigate();

  const handleOpenDataset = () => {
    navigate(`/dataset-info/${dataset.id}`, {
      state: {
        dataset,
      },
    });
  };

  return (
    <Card
      sx={{
        borderRadius: 2,
        overflow: "hidden",
        backgroundColor: "#fff",
        border: "1px solid #e5e7eb",
        boxShadow: "none",
        transition: "0.2s ease",
        "&:hover": {
          transform: "translateY(-2px)",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)",
        },
      }}
    >
      <Box
        sx={{
          height: 145,
          backgroundImage: `url(${dataset.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />

      <CardContent sx={{ p: 2 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "flex-start",
            justifyContent: "space-between",
            gap: 1,
            mb: 1,
          }}
        >
          <Typography
            onClick={handleOpenDataset}
            sx={{
              fontSize: "0.95rem",
              fontWeight: 700,
              lineHeight: 1.4,
              color: "#111827",
              cursor: "pointer",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              overflow: "hidden",
              "&:hover": {
                color: PRIMARY_COLOR,
                textDecoration: "underline",
              },
            }}
          >
            {dataset.title}
          </Typography>

          <IconButton size="small" sx={{ mt: -0.3 }}>
            <MoreVertical size={16} />
          </IconButton>
        </Box>

        <Typography
          sx={{
            fontSize: "0.85rem",
            color: "#1f2937",
            mb: 1,
          }}
        >
          {dataset.author}
        </Typography>

        <Typography
          sx={{
            fontSize: "0.8rem",
            color: "#6b7280",
            mb: 0.7,
          }}
        >
          Usability <b>{dataset.usability}</b> · {dataset.updated}
        </Typography>

        <Typography
          sx={{
            fontSize: "0.8rem",
            color: "#6b7280",
            mb: 0.5,
          }}
        >
          {dataset.files} · {dataset.size} · {dataset.downloads}
        </Typography>
      </CardContent>

      <Box
        sx={{
          px: 2,
          py: 1.5,
          borderTop: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            border: "1px solid #d1d5db",
            borderRadius: "6px",
            overflow: "hidden",
            backgroundColor: "#fff",
          }}
        >
          <Box
            sx={{
              px: 1,
              py: 0.5,
              display: "flex",
              alignItems: "center",
              borderRight: "1px solid #d1d5db",
            }}
          >
            <ChevronUp size={14} />
          </Box>

          <Box sx={{ px: 1.4, py: 0.35 }}>
            <Typography
              sx={{
                fontSize: "0.85rem",
                fontWeight: 700,
              }}
            >
              {dataset.votes}
            </Typography>
          </Box>
        </Box>

        <Box sx={{ display: "flex", alignItems: "center", gap: 0.7 }}>
          {dataset.avatars.map((avatar, index) => (
            <Avatar
              key={index}
              src={avatar}
              sx={{
                width: 26,
                height: 26,
                border: `2px solid ${PRIMARY_COLOR}`,
              }}
            />
          ))}
        </Box>
      </Box>
    </Card>
  );
}
