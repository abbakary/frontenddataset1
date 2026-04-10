import { useEffect, useState } from "react";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
  Divider,
} from "@mui/material";
import {
  Database,
  Menu as MenuIcon,
  DollarSign,
  FolderOpen,
  Wallet,
  BarChart3,
  FileText,
  User,
  LogOut,
} from "lucide-react";
import logo from "../../../assets/dali-data-logo.png";

const PRIMARY_COLOR = "#61C5C3";
const TOKEN_KEY = "dali-token";
const USER_KEY = "dali-user";

/**
 * Get the role-specific dashboard path
 */
const getRoleDashboardPath = (role) => {
  const normalizedRole = String(role || "").trim().toLowerCase();
  const dashboardPaths = {
    admin: "/dashboard/admin",
    editor: "/dashboard/editor",
    seller: "/dashboard/seller",
    buyer: "/dashboard/buyer",
    viewer: "/dashboard/viewer",
  };
  return dashboardPaths[normalizedRole] || "/dashboard/viewer";
};

export default function NavBar() {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMenu, setMobileMenu] = useState(null);
  const [authUser, setAuthUser] = useState(null);

  const isLoggedIn = Boolean(authUser?.token);

  useEffect(() => {
    loadAuthUser();

    const handleAuthUpdate = () => loadAuthUser();
    window.addEventListener("auth:updated", handleAuthUpdate);

    return () => {
      window.removeEventListener("auth:updated", handleAuthUpdate);
    };
  }, []);

  const loadAuthUser = () => {
    const token =
      localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY);

    const rawUser =
      localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY);

    if (!token || !rawUser) {
      setAuthUser(null);
      return;
    }

    try {
      const parsedUser = JSON.parse(rawUser);
      setAuthUser({
        token,
        ...parsedUser,
      });
    } catch (error) {
      console.error("Invalid stored user data:", error);
      setAuthUser(null);
    }
  };

  const handleLogout = () => {
    navigate("/logout", { replace: true });
  };

  const navLinks = [
    { label: "Dataset", path: "/public/datasets", icon: Database },
    { label: "Budget", path: "/public/budget", icon: DollarSign },
    { label: "Project", path: "/public/project", icon: FolderOpen },
    { label: "Funds", path: "/public/funds", icon: Wallet },
    { label: "Analysis", path: "/public/analysis", icon: BarChart3 },
    { label: "Report", path: "/public/reports", icon: FileText },
  ];

  const displayName =
    authUser?.full_name ||
    authUser?.name ||
    authUser?.username ||
    authUser?.email ||
    "User";

  const avatarLetter = displayName.charAt(0).toUpperCase();

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: "#ffffff",
        borderBottom: "1px solid #e5e7eb",
        color: "#111827",
      }}
    >
      <Toolbar
        sx={{
          justifyContent: "space-between",
          minHeight: 64,
          px: { xs: 2, md: 4 },
        }}
      >
        <Box
          component={RouterLink}
          to="/"
          sx={{
            display: "flex",
            alignItems: "center",
            cursor: "pointer",
            textDecoration: "none",
            color: "inherit",
          }}
        >
          <Box
            component="img"
            src={logo}
            alt="Dali Data"
            sx={{
              height: 40,
              width: "auto",
              objectFit: "contain",
            }}
          />
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 1.5,
            alignItems: "center",
          }}
        >
          {navLinks.map((item) => {
            const Icon = item.icon;

            return (
              <Button
                key={item.label}
                component={RouterLink}
                to={item.path}
                color="inherit"
                startIcon={<Icon size={16} />}
                sx={{
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  textTransform: "none",
                  borderRadius: "6px",
                  px: 1.5,
                  minWidth: "auto",
                  color: "#111827",
                  "&:hover": {
                    backgroundColor: "#f1f5f9",
                    color: PRIMARY_COLOR,
                  },
                }}
              >
                {item.label}
              </Button>
            );
          })}
        </Box>

        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 1,
            alignItems: "center",
          }}
        >
          {isLoggedIn ? (
            <>
              <Button
                variant="contained"
                onClick={() => navigate("/sell")}
                sx={{
                  textTransform: "none",
                  borderRadius: "6px",
                  px: 2.5,
                  color: "#8e5a00",
                  backgroundColor: "#ffbf47",
                  fontWeight: 800,
                  boxShadow: "none",
                  "&:hover": { backgroundColor: "#f3b136", boxShadow: "none" },
                }}
              >
                SELL
              </Button>

              <Button
                onClick={(e) => setAnchorEl(e.currentTarget)}
                sx={{
                  textTransform: "none",
                  borderRadius: "6px",
                  px: 1,
                  color: "#111827",
                  display: "flex",
                  alignItems: "center",
                  gap: 1,
                  "&:hover": { backgroundColor: "#f1f5f9" },
                }}
              >
                <Avatar
                  sx={{
                    width: 30,
                    height: 30,
                    fontSize: "0.8rem",
                    bgcolor: PRIMARY_COLOR,
                    color: "#04121D",
                    fontWeight: 700,
                  }}
                >
                  {avatarLetter}
                </Avatar>

                <Box sx={{ textAlign: "left" }}>
                  <Typography
                    sx={{
                      fontSize: "0.82rem",
                      fontWeight: 700,
                      lineHeight: 1.1,
                    }}
                  >
                    {displayName}
                  </Typography>

                  <Typography
                    sx={{
                      fontSize: "0.72rem",
                      color: "#6b7280",
                      lineHeight: 1.1,
                    }}
                  >
                    {authUser?.role || "member"}
                  </Typography>
                </Box>
              </Button>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
              >
                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    const dashboardPath = getRoleDashboardPath(authUser?.role);
                    navigate(dashboardPath);
                  }}
                  sx={{ display: "flex", gap: 1, alignItems: "center" }}
                >
                  <BarChart3 size={16} />
                  My Dashboard
                </MenuItem>

                <MenuItem
                  onClick={() => {
                    setAnchorEl(null);
                    navigate("/profile");
                  }}
                  sx={{ display: "flex", gap: 1, alignItems: "center" }}
                >
                  <User size={16} />
                  Profile
                </MenuItem>

                <Divider />

                <MenuItem onClick={handleLogout} sx={{ display: "flex", gap: 1, alignItems: "center" }}>
                  <LogOut size={16} />
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <>
              <Button
                variant="outlined"
                component={RouterLink}
                to="/login"
                sx={{
                  borderRadius: "6px",
                  textTransform: "none",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  borderColor: PRIMARY_COLOR,
                  color: PRIMARY_COLOR,
                  px: 2,
                  "&:hover": {
                    borderColor: PRIMARY_COLOR,
                    backgroundColor: "#e6f7f6",
                  },
                }}
              >
                Sign In
              </Button>

              <Button
                variant="contained"
                component={RouterLink}
                to="/register"
                sx={{
                  borderRadius: "6px",
                  textTransform: "none",
                  fontSize: "0.85rem",
                  fontWeight: 700,
                  backgroundColor: PRIMARY_COLOR,
                  color: "#04121D",
                  px: 2,
                  boxShadow: "none",
                  "&:hover": {
                    backgroundColor: "#49b2b1",
                    boxShadow: "none",
                  },
                }}
              >
                Register
              </Button>
            </>
          )}
        </Box>

        <Box
          sx={{
            display: { xs: "flex", md: "none" },
            alignItems: "center",
            gap: 1,
          }}
        >
          {isLoggedIn && (
            <Avatar
              sx={{
                width: 28,
                height: 28,
                fontSize: "0.75rem",
                bgcolor: PRIMARY_COLOR,
                color: "#04121D",
                fontWeight: 700,
              }}
            >
              {avatarLetter}
            </Avatar>
          )}

          <IconButton onClick={(e) => setMobileMenu(e.currentTarget)}>
            <MenuIcon size={20} />
          </IconButton>

          <Menu
            anchorEl={mobileMenu}
            open={Boolean(mobileMenu)}
            onClose={() => setMobileMenu(null)}
          >
            {navLinks.map((item) => {
              const Icon = item.icon;

              return (
                <MenuItem
                  key={item.label}
                  onClick={() => {
                    setMobileMenu(null);
                    navigate(item.path);
                  }}
                  sx={{
                    display: "flex",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  <Icon size={16} />
                  {item.label}
                </MenuItem>
              );
            })}

            {isLoggedIn
              ? [
                  <MenuItem
                    key="dashboard"
                    onClick={() => {
                      setMobileMenu(null);
                      const dashboardPath = getRoleDashboardPath(authUser?.role);
                      navigate(dashboardPath);
                    }}
                    sx={{ display: "flex", gap: 1, alignItems: "center" }}
                  >
                    <BarChart3 size={16} />
                    My Dashboard
                  </MenuItem>,
                  <MenuItem
                    key="sell"
                    onClick={() => {
                      setMobileMenu(null);
                      navigate("/sell");
                    }}
                    sx={{ display: "flex", gap: 1, alignItems: "center" }}
                  >
                    <DollarSign size={16} />
                    Sell
                  </MenuItem>,
                  <MenuItem
                    key="profile"
                    onClick={() => {
                      setMobileMenu(null);
                      navigate("/profile");
                    }}
                    sx={{ display: "flex", gap: 1, alignItems: "center" }}
                  >
                    <User size={16} />
                    Profile
                  </MenuItem>,
                  <MenuItem
                    key="logout"
                    onClick={() => {
                      setMobileMenu(null);
                      handleLogout();
                    }}
                    sx={{ display: "flex", gap: 1, alignItems: "center" }}
                  >
                    <LogOut size={16} />
                    Logout
                  </MenuItem>,
                ]
              : [
                  <MenuItem
                    key="login"
                    onClick={() => {
                      setMobileMenu(null);
                      navigate("/login");
                    }}
                  >
                    Sign In
                  </MenuItem>,
                  <MenuItem
                    key="register"
                    onClick={() => {
                      setMobileMenu(null);
                      navigate("/register");
                    }}
                  >
                    Register
                  </MenuItem>,
                ]}
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
