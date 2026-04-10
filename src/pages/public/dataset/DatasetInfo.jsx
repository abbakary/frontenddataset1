import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  Stack,
  Tab,
  Tabs,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import {
  ArrowLeft,
  Download,
  MoreVertical,
  Info,
  Code2,
  Eye,
  MessageSquare,
  FileText,
  ChevronDown,
  Activity,
  Users,
  GitFork,
} from "lucide-react";
import { useMemo, useState } from "react";
import PageLayout from "../components/PageLayout";

const PRIMARY_COLOR = "#61C5C3";

export default function DatasetInfo() {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [tab, setTab] = useState(0);
  const [expandAll, setExpandAll] = useState(false);

  const dataset = location.state?.dataset || {};

  const data = useMemo(
    () => ({
      title: dataset.title || "US 119th Congress Bill Intelligence 2025–2026",
      subtitle:
        dataset.subtitle ||
        "14,149 bills · House & Senate · status, topics & enactment tracking",
      image: dataset.image || "",
      author: dataset.author || "KANCHANA1990",
      updated: dataset.updated || "UPDATED 7 DAYS AGO",
      votes: dataset.votes || 28,
      usability: dataset.usability || "10.00",
      license: dataset.license || "Attribution 4.0 International (CC BY 4.0)",
      updateFrequency: dataset.updateFrequency || "Annually",
      files: dataset.files || "8 files",
      size: dataset.size || "12.4 MB",
      format: dataset.format || "CSV, JSON",
      category: dataset.category || "Government & Politics",
      description:
        dataset.description ||
        "A comprehensive record of all 14,149 bills and resolutions introduced in the 119th United States Congress (January 2025 – present), retrieved directly from the official Congress.gov API v3.",
      overviewParagraph2:
        dataset.overviewParagraph2 ||
        "Covers all eight legislative instrument types: House Bills (HR), Senate Bills (S), House Joint Resolutions (HJRES), Senate Joint Resolutions (SJRES), House Concurrent Resolutions (HCONRES), Senate Concurrent Resolutions (SCONRES), House Simple Resolutions (HRES), and Senate Simple Resolutions (SRES).",
      overviewParagraph3:
        dataset.overviewParagraph3 ||
        "Includes title metadata, sponsors, latest actions, bill status, policy area, subjects, chamber origin, and enactment progress to support legislative analysis, trend exploration, and public intelligence dashboards.",
      avatars: dataset.avatars || [],
      views: dataset.views || 961,
      downloads: dataset.downloads || 181,
      engagement: dataset.engagement || 0.18835,
      comments: dataset.comments || 0,
      relatedNotebooks: dataset.relatedNotebooks || [
        {
          id: 1,
          title: "US 119th Congress Bill EDA (2025-2026)",
          subtitle: "US 119th Congress Bill Intelligence 2025–2026",
          updated: "Updated 6 days ago",
          image: dataset.image || "",
        },
        {
          id: 2,
          title: "Congress Bills DB",
          subtitle: "US 119th Congress Bill Intelligence 2025–2026",
          updated: "Updated 7 days ago",
          image: dataset.image || "",
        },
        {
          id: 3,
          title: "US 119th Congress Bill Intelligence 2025–",
          subtitle: "US 119th Congress Bill Intelligence 2025–2026",
          updated: "Updated 6 days ago",
          image: dataset.image || "",
        },
      ],
      collaborators: dataset.collaborators || [
        "Open Legislative Data Team",
        "Public Policy Analytics Group",
        "Congressional Research Support Unit",
      ],
      authors: dataset.authors || [
        "Kanchana1990",
        "US Policy Data Lab",
        "Legislative Intelligence Contributors",
      ],
      coverage: dataset.coverage || [
        "United States Congress",
        "119th Congress (2025–2026)",
        "House and Senate bills and resolutions",
        "Status, sponsors, actions, policy areas, and enactment tracking",
      ],
      doiCitation:
        dataset.doiCitation ||
        "Kanchana1990. US 119th Congress Bill Intelligence 2025–2026. Data repository publication with legislative analytics content and metadata.",
    }),
    [dataset],
  );

  const titleSx = {
    fontSize: { xs: "1.9rem", md: "2.9rem" },
    fontWeight: 900,
    color: "#202124",
    lineHeight: 1.15,
  };

  const sectionTitleSx = {
    fontSize: "1.1rem",
    fontWeight: 900,
    color: "#111827",
  };

  const bodySx = {
    fontSize: "0.92rem",
    color: "#374151",
    lineHeight: 1.8,
  };

  const smallSx = {
    fontSize: "0.84rem",
    color: "#6b7280",
  };

  const sideLabelSx = {
    fontSize: "0.95rem",
    fontWeight: 800,
    color: "#111827",
    mb: 0.5,
  };

  const sideValueSx = {
    fontSize: "0.92rem",
    color: "#4b5563",
    lineHeight: 1.7,
  };

  const statCard = (icon, title, value, subtext, accent) => (
    <Box
      sx={{
        display: "flex",
        alignItems: "flex-start",
        gap: 2,
      }}
    >
      <Box
        sx={{
          width: 42,
          height: 42,
          borderRadius: "50%",
          border: "1px solid #e5e7eb",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#111827",
          flexShrink: 0,
        }}
      >
        {icon}
      </Box>

      <Box>
        <Typography
          sx={{
            fontSize: "0.95rem",
            fontWeight: 800,
            color: "#111827",
            mb: 0.5,
          }}
        >
          {title}
        </Typography>
        <Typography
          sx={{ fontSize: "1rem", fontWeight: 900, color: "#111827" }}
        >
          {value}
        </Typography>
        <Typography
          sx={{ fontSize: "0.86rem", color: accent || "#6b7280", mt: 0.3 }}
        >
          {subtext}
        </Typography>
      </Box>
    </Box>
  );

  return (
    <PageLayout>
      <Box
        sx={{
          minHeight: "100vh",
          backgroundColor: "#f8f9fb",
          py: 2,
        }}
      >
        <Container maxWidth="xl">
          <Button
            startIcon={<ArrowLeft size={16} />}
            onClick={() => navigate(-1)}
            sx={{
              mb: 2,
              color: PRIMARY_COLOR,
              textTransform: "none",
              fontWeight: 700,
              fontSize: "0.84rem",
              px: 0,
              minWidth: "auto",
            }}
          >
            Back
          </Button>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: { xs: "flex-start", md: "center" },
              gap: 2,
              mb: 3,
              flexWrap: "wrap",
            }}
          >
            <Stack direction="row" spacing={1.5} alignItems="center">
              <Avatar
                src={data.avatars[0] || ""}
                sx={{
                  width: 34,
                  height: 34,
                  border: "2px solid #eab308",
                }}
              >
                {data.author?.[0] || "A"}
              </Avatar>

              <Typography
                sx={{
                  fontSize: "0.8rem",
                  fontWeight: 800,
                  color: "#6b7280",
                  letterSpacing: "0.08em",
                }}
              >
                {data.author} · {data.updated}
              </Typography>
            </Stack>

            <Stack
              direction="row"
              spacing={1.5}
              alignItems="center"
              flexWrap="wrap"
            >
              <Button
                variant="outlined"
                sx={{
                  borderRadius: "24px",
                  minWidth: 60,
                  height: 44,
                  textTransform: "none",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  color: "#111827",
                  borderColor: "#d1d5db",
                  backgroundColor: "#fff",
                }}
              >
                {data.votes}
              </Button>

              <Button
                variant="outlined"
                startIcon={<Code2 size={16} />}
                sx={{
                  borderRadius: "24px",
                  textTransform: "none",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  px: 2.2,
                  py: 1.1,
                  color: "#111827",
                  borderColor: "#d1d5db",
                  backgroundColor: "#fff",
                }}
              >
                Code
              </Button>

              <Button
                variant="contained"
                startIcon={<Download size={16} />}
                sx={{
                  borderRadius: "24px",
                  textTransform: "none",
                  fontWeight: 800,
                  fontSize: "0.95rem",
                  px: 2.5,
                  py: 1.1,
                  backgroundColor: "#111827",
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#1f2937",
                    boxShadow: "none",
                  },
                }}
              >
                Download
              </Button>

              <Button
                sx={{
                  minWidth: "auto",
                  p: 1,
                  color: "#111827",
                }}
              >
                <MoreVertical size={18} />
              </Button>
            </Stack>
          </Box>

          <Grid container spacing={4} alignItems="center" sx={{ mb: 2 }}>
            <Grid item xs={12} md={8}>
              <Typography sx={titleSx}>{data.title}</Typography>

              <Typography
                sx={{
                  fontSize: "0.98rem",
                  color: "#4b5563",
                  lineHeight: 1.8,
                  mt: 2,
                }}
              >
                {data.subtitle}
              </Typography>
            </Grid>

            <Grid item xs={12} md={4}>
              <Box
                sx={{
                  width: "100%",
                  maxWidth: 380,
                  ml: { md: "auto" },
                  height: 190,
                  borderRadius: "18px",
                  overflow: "hidden",
                  backgroundColor: "#dbeafe",
                  backgroundImage: `url(${data.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  border: "1px solid #e5e7eb",
                }}
              />
            </Grid>
          </Grid>

          <Box
            sx={{
              borderBottom: "1px solid #e5e7eb",
              mb: 4,
            }}
          >
            <Tabs
              value={tab}
              onChange={(_, value) => setTab(value)}
              textColor="inherit"
              indicatorColor="primary"
              sx={{
                minHeight: 44,
                "& .MuiTabs-indicator": {
                  backgroundColor: "#202124",
                  height: 3,
                  borderRadius: 999,
                },
                "& .MuiTab-root": {
                  textTransform: "none",
                  minHeight: 44,
                  px: 2,
                  fontSize: "0.9rem",
                  color: "#4b5563",
                },
                "& .Mui-selected": {
                  color: "#111827 !important",
                  fontWeight: 700,
                },
              }}
            >
              <Tab label="Data Card" />
              <Tab label="Code (6)" />
              <Tab label="Discussion (0)" />
              <Tab label="Suggestions (0)" />
            </Tabs>
          </Box>

          <Grid container spacing={6}>
            <Grid item xs={12} md={8}>
              <Typography sx={{ ...sectionTitleSx, fontSize: "1.2rem", mb: 3 }}>
                About Dataset
              </Typography>

              <Typography
                sx={{ ...sectionTitleSx, fontSize: "0.98rem", mb: 1.5 }}
              >
                Dataset Overview
              </Typography>

              <Typography sx={bodySx} paragraph>
                {data.description}
              </Typography>

              <Typography sx={bodySx} paragraph>
                {data.overviewParagraph2}
              </Typography>

              <Typography sx={bodySx} paragraph>
                {data.overviewParagraph3}
              </Typography>
            </Grid>
          </Grid>

          <Box sx={{ mt: 7, mb: 5 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                py: 2,
                borderTop: "1px solid #d1d5db",
              }}
            >
              <Stack direction="row" spacing={1.2} alignItems="center">
                <FileText size={20} />
                <Typography
                  sx={{ fontSize: "1rem", fontWeight: 900, color: "#111827" }}
                >
                  Metadata
                </Typography>
              </Stack>

              <Button
                onClick={() => setExpandAll(!expandAll)}
                startIcon={
                  <ChevronDown
                    size={16}
                    style={{
                      transform: expandAll ? "rotate(180deg)" : "rotate(0deg)",
                    }}
                  />
                }
                sx={{
                  color: "#111827",
                  textTransform: "none",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                }}
              >
                {expandAll ? "Collapse All" : "Expand All"}
              </Button>
            </Box>

            <Accordion
              expanded={expandAll}
              sx={{
                boxShadow: "none",
                borderRadius: 0,
                "&:before": { display: "none" },
                borderTop: "1px solid #d1d5db",
              }}
            >
              <AccordionSummary expandIcon={<ChevronDown size={18} />}>
                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  Collaborators
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {data.collaborators.map((item, index) => (
                  <Typography key={index} sx={{ ...bodySx, mb: 1 }}>
                    • {item}
                  </Typography>
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expandAll}
              sx={{
                boxShadow: "none",
                borderRadius: 0,
                "&:before": { display: "none" },
                borderTop: "1px solid #d1d5db",
              }}
            >
              <AccordionSummary expandIcon={<ChevronDown size={18} />}>
                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  Authors
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {data.authors.map((item, index) => (
                  <Typography key={index} sx={{ ...bodySx, mb: 1 }}>
                    • {item}
                  </Typography>
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expandAll}
              sx={{
                boxShadow: "none",
                borderRadius: 0,
                "&:before": { display: "none" },
                borderTop: "1px solid #d1d5db",
              }}
            >
              <AccordionSummary expandIcon={<ChevronDown size={18} />}>
                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  Coverage
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                {data.coverage.map((item, index) => (
                  <Typography key={index} sx={{ ...bodySx, mb: 1 }}>
                    • {item}
                  </Typography>
                ))}
              </AccordionDetails>
            </Accordion>

            <Accordion
              expanded={expandAll}
              sx={{
                boxShadow: "none",
                borderRadius: 0,
                "&:before": { display: "none" },
                borderTop: "1px solid #d1d5db",
                borderBottom: "1px solid #d1d5db",
              }}
            >
              <AccordionSummary expandIcon={<ChevronDown size={18} />}>
                <Typography
                  sx={{
                    fontSize: "0.95rem",
                    fontWeight: 800,
                    color: "#111827",
                  }}
                >
                  DOI Citation
                </Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography sx={bodySx}>{data.doiCitation}</Typography>
              </AccordionDetails>
            </Accordion>
          </Box>

          <Box sx={{ mt: 7 }}>
            <Stack
              direction="row"
              spacing={1.2}
              alignItems="center"
              sx={{ mb: 3 }}
            >
              <GitFork size={20} />
              <Typography
                sx={{ fontSize: "1rem", fontWeight: 900, color: "#111827" }}
              >
                Activity Overview
              </Typography>
            </Stack>

            <Grid container spacing={4}>
              <Grid item xs={12} sm={6} md={3}>
                {statCard(
                  <Eye size={18} />,
                  "Views",
                  data.views,
                  `${data.views} in the last 30 days`,
                  "#2563eb",
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                {statCard(
                  <Download size={18} />,
                  "Downloads",
                  data.downloads,
                  `${data.downloads} in the last 30 days`,
                  "#15803d",
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                {statCard(
                  <Activity size={18} />,
                  "Engagement",
                  data.engagement,
                  "downloads per view",
                  "#4b5563",
                )}
              </Grid>

              <Grid item xs={12} sm={6} md={3}>
                {statCard(
                  <MessageSquare size={18} />,
                  "Comments",
                  data.comments,
                  "posted",
                  "#4b5563",
                )}
              </Grid>
            </Grid>

            <Box sx={{ mt: 5 }}>
              <Stack
                direction="row"
                spacing={1.2}
                alignItems="center"
                sx={{ mb: 2 }}
              >
                <Users size={20} />
                <Typography
                  sx={{ fontSize: "1rem", fontWeight: 900, color: "#111827" }}
                >
                  Top Contributors
                </Typography>
              </Stack>

              <Stack direction="row" spacing={1.2} alignItems="center">
                {data.avatars.length ? (
                  data.avatars.map((avatar, index) => (
                    <Avatar
                      key={index}
                      src={avatar}
                      sx={{
                        width: 40,
                        height: 40,
                        border:
                          index === 0
                            ? "3px solid #eab308"
                            : index === 1
                              ? "3px solid #7c3aed"
                              : "3px solid #8b5cf6",
                      }}
                    />
                  ))
                ) : (
                  <>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        border: "3px solid #eab308",
                      }}
                    >
                      A
                    </Avatar>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        border: "3px solid #7c3aed",
                      }}
                    >
                      B
                    </Avatar>
                    <Avatar
                      sx={{
                        width: 40,
                        height: 40,
                        border: "3px solid #8b5cf6",
                      }}
                    >
                      C
                    </Avatar>
                  </>
                )}
              </Stack>
            </Box>
          </Box>

          <Box sx={{ mt: 7 }}>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                mb: 2.5,
              }}
            >
              <Stack direction="row" spacing={1.2} alignItems="center">
                <Code2 size={20} />
                <Typography
                  sx={{ fontSize: "1rem", fontWeight: 900, color: "#111827" }}
                >
                  Related Notebooks
                </Typography>
              </Stack>

              <Button
                sx={{
                  color: "#111827",
                  textTransform: "none",
                  fontWeight: 800,
                  fontSize: "0.9rem",
                }}
              >
                See all
              </Button>
            </Box>

            <Grid container spacing={3}>
              {data.relatedNotebooks.map((notebook) => (
                <Grid item xs={12} sm={6} md={4} key={notebook.id}>
                  <Card
                    sx={{
                      borderRadius: 0,
                      border: "1px solid #d1d5db",
                      boxShadow: "none",
                      overflow: "hidden",
                      height: "100%",
                      backgroundColor: "#fff",
                    }}
                  >
                    <Box
                      sx={{
                        height: 145,
                        backgroundImage: `url(${notebook.image || data.image})`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundColor: "#e5e7eb",
                      }}
                    />

                    <CardContent sx={{ p: 2.5 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          gap: 1,
                        }}
                      >
                        <Typography
                          sx={{
                            fontSize: "0.95rem",
                            fontWeight: 800,
                            color: "#111827",
                            lineHeight: 1.45,
                            mb: 1,
                          }}
                        >
                          {notebook.title}
                        </Typography>

                        <MoreVertical size={18} color="#111827" />
                      </Box>

                      <Typography
                        sx={{ fontSize: "0.82rem", color: "#6b7280", mb: 0.8 }}
                      >
                        {notebook.updated}
                      </Typography>

                      <Typography
                        sx={{
                          fontSize: "0.85rem",
                          color: "#374151",
                          lineHeight: 1.7,
                        }}
                      >
                        {notebook.subtitle}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </PageLayout>
  );
}
