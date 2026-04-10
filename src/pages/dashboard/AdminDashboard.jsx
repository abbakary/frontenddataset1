import { useEffect, useMemo, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Drawer,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Snackbar,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import {
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Cell,
  LineChart,
  Line,
  XAxis,
  YAxis,
  BarChart,
  Bar,
  CartesianGrid,
} from "recharts";
import DashboardLayout from "./components/DashboardLayout";

export default function AdminDashboard() {
  const [toast, setToast] = useState("");
  const [maintenance, setMaintenance] = useState(false);
  const [activeSection, setActiveSection] = useState(
    () => localStorage.getItem("dali-dashboard-section") || "users"
  );
  const [users, setUsers] = useState([
    { id: 1, name: "John Doe", email: "john@dali.com", role: "Seller", status: "Active" },
    { id: 2, name: "Mary Ade", email: "mary@dali.com", role: "Buyer", status: "Active" },
    { id: 3, name: "Emi Lyo", email: "emi@dali.com", role: "Editor", status: "Suspended" },
  ]);
  const [editUser, setEditUser] = useState(null);
  const [removeUser, setRemoveUser] = useState(null);
  const [newRole, setNewRole] = useState("");
  const [actionPanel, setActionPanel] = useState({ open: false, type: "" });
  const [actionForm, setActionForm] = useState({
    managerName: "",
    managerEmail: "",
    reportPeriod: "monthly",
    backupReason: "",
  });

  const userTrend = [
    { m: "Jan", users: 920 },
    { m: "Feb", users: 1020 },
    { m: "Mar", users: 1110 },
    { m: "Apr", users: 1175 },
    { m: "May", users: 1210 },
    { m: "Jun", users: 1250 },
  ];
  const moderation = [
    { name: "Approved", value: 62, color: "#16a34a" },
    { name: "Pending", value: 24, color: "#f59e0b" },
    { name: "Rejected", value: 14, color: "#dc2626" },
  ];
  const activity = [
    { day: "Mon", actions: 54 },
    { day: "Tue", actions: 72 },
    { day: "Wed", actions: 63 },
    { day: "Thu", actions: 81 },
    { day: "Fri", actions: 76 },
    { day: "Sat", actions: 44 },
    { day: "Sun", actions: 39 },
  ];

  const kpis = useMemo(() => {
    const activeCount = users.filter((u) => u.status === "Active").length;
    const suspendedCount = users.filter((u) => u.status === "Suspended").length;
    return [
      { label: "Active Users", value: `${activeCount.toLocaleString()}`, color: "#2563eb" },
      { label: "Suspended Users", value: `${suspendedCount.toLocaleString()}`, color: "#f59e0b" },
      { label: "Total Earnings", value: "$28,300", color: "#16a34a" },
      { label: "Flagged Content", value: "16", color: "#dc2626" },
    ];
  }, [users]);

  useEffect(() => {
    const syncSection = (event) => {
      if (event?.detail) setActiveSection(event.detail);
    };
    window.addEventListener("dashboard:section", syncSection);
    return () => window.removeEventListener("dashboard:section", syncSection);
  }, []);

  const handleToggleStatus = (id) => {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "Active" ? "Suspended" : "Active" } : u
      )
    );
    setToast("User status updated");
  };

  const handleSaveRole = () => {
    if (!editUser || !newRole) return;
    setUsers((prev) => prev.map((u) => (u.id === editUser.id ? { ...u, role: newRole } : u)));
    setEditUser(null);
    setNewRole("");
    setToast("User role updated");
  };

  const handleRemoveUser = () => {
    if (!removeUser) return;
    setUsers((prev) => prev.filter((u) => u.id !== removeUser.id));
    setRemoveUser(null);
    setToast("User removed");
  };

  const openActionPanel = (type) => setActionPanel({ open: true, type });
  const closeActionPanel = () => setActionPanel({ open: false, type: "" });

  const submitActionForm = () => {
    const labels = {
      invite: "Manager invite sent successfully",
      audit: "Audit report generated",
      backup: "Platform backup started",
    };
    setToast(labels[actionPanel.type] || "Action completed");
    closeActionPanel();
  };

  const sectionTitleMap = {
    browse: "Browse Datasets",
    saved: "Saved Collections",
    history: "Viewing History",
    users: "User Management",
    moderation: "Content Moderation",
    reports: "Platform Reports",
    settings: "System Settings",
  };

  const renderBrowseSection = () => (
    <Card>
      <CardContent>
        <Typography sx={{ fontWeight: 800, mb: 1.5 }}>Browse Datasets</Typography>
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(3,minmax(0,1fr))" }, gap: 1.5 }}>
          {["Market Trends Data", "Economic Indicators", "Demographic Growth"].map((item) => (
            <Box key={item} sx={{ p: 1.5, border: "1px solid #e2e8f0", borderRadius: 2 }}>
              <Typography sx={{ fontWeight: 700 }}>{item}</Typography>
              <Typography sx={{ fontSize: 12, color: "#64748b", mb: 1 }}>Public data source</Typography>
              <Button size="small" variant="outlined" sx={{ textTransform: "none" }}>Open</Button>
            </Box>
          ))}
        </Box>
      </CardContent>
    </Card>
  );

  const renderSavedSection = () => (
    <Card>
      <CardContent>
        <Typography sx={{ fontWeight: 800, mb: 1.5 }}>Saved Collections</Typography>
        {["Executive Reports", "Regional Trends", "Moderation Evidence"].map((name) => (
          <Box key={name} sx={{ py: 1.2, borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between" }}>
            <Typography>{name}</Typography>
            <Button size="small" sx={{ textTransform: "none" }}>Open Collection</Button>
          </Box>
        ))}
      </CardContent>
    </Card>
  );

  const renderHistorySection = () => (
    <Card>
      <CardContent>
        <Typography sx={{ fontWeight: 800, mb: 1.5 }}>Viewing History</Typography>
        {["User abuse flags - Apr", "Seller activity report", "Role change logs"].map((name) => (
          <Box key={name} sx={{ py: 1.2, borderBottom: "1px solid #f1f5f9" }}>
            <Typography sx={{ fontWeight: 600 }}>{name}</Typography>
            <Typography sx={{ color: "#64748b", fontSize: 12 }}>Viewed recently by Admin</Typography>
          </Box>
        ))}
      </CardContent>
    </Card>
  );

  const renderModerationSection = () => (
    <Card>
      <CardContent>
        <Typography sx={{ fontWeight: 800, mb: 1.5 }}>Content Moderation</Typography>
        {["Dataset policy mismatch", "Inaccurate metadata", "Spam upload pattern"].map((issue) => (
          <Box key={issue} sx={{ py: 1.2, borderBottom: "1px solid #f1f5f9", display: "flex", justifyContent: "space-between", gap: 1 }}>
            <Typography>{issue}</Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button size="small" color="success">Approve</Button>
              <Button size="small" color="error">Remove</Button>
            </Box>
          </Box>
        ))}
      </CardContent>
    </Card>
  );

  const renderReportsSection = () => (
    <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 2 }}>
      <Card>
        <CardContent>
          <Typography sx={{ fontWeight: 800, mb: 1 }}>User Growth</Typography>
          <Box sx={{ height: 240 }}>
            <ResponsiveContainer>
              <LineChart data={userTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                <XAxis dataKey="m" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
      <Card>
        <CardContent>
          <Typography sx={{ fontWeight: 800, mb: 1 }}>Moderation Split</Typography>
          <Box sx={{ height: 240 }}>
            <ResponsiveContainer>
              <PieChart>
                <Pie data={moderation} dataKey="value" outerRadius={85}>
                  {moderation.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );

  const renderSettingsSection = () => (
    <Card>
      <CardContent>
        <Typography sx={{ fontWeight: 800, mb: 1.5 }}>System Settings</Typography>
        <Box sx={{ py: 1, display: "flex", justifyContent: "space-between" }}>
          <Typography>Maintenance mode</Typography>
          <Switch checked={maintenance} onChange={() => setMaintenance((v) => !v)} />
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ py: 1, display: "flex", justifyContent: "space-between" }}>
          <Typography>Enable user registration</Typography>
          <Switch defaultChecked />
        </Box>
        <Divider sx={{ my: 1 }} />
        <Box sx={{ py: 1, display: "flex", justifyContent: "space-between" }}>
          <Typography>Automatic content scan</Typography>
          <Switch defaultChecked />
        </Box>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout title="Admin Dashboard">
      <Box sx={{ p: { xs: 2, md: 3 }, background: "#eef3fb", minHeight: "calc(100vh - 64px)" }}>
        <Typography sx={{ fontWeight: 800, fontSize: 22, mb: 1.5 }}>{sectionTitleMap[activeSection] || "Admin Dashboard"}</Typography>
        {activeSection === "browse" && renderBrowseSection()}
        {activeSection === "saved" && renderSavedSection()}
        {activeSection === "history" && renderHistorySection()}
        {activeSection === "moderation" && renderModerationSection()}
        {activeSection === "reports" && renderReportsSection()}
        {activeSection === "settings" && renderSettingsSection()}

        {activeSection === "users" && (
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", xl: "2.1fr 1fr" }, gap: { xs: 1.5, md: 2 }, width: "100%" }}>
          <Box>
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: { xs: "1fr 1fr", lg: "repeat(4,minmax(0,1fr))" },
                gap: 1.5,
                mb: 2,
              }}
            >
              {kpis.map((item) => (
                <Card
                  key={item.label}
                  sx={{
                    background: `linear-gradient(135deg, ${item.color}18, #ffffff)`,
                    border: `1px solid ${item.color}30`,
                    animation: "fadeUp 450ms ease",
                    "@keyframes fadeUp": {
                      from: { opacity: 0, transform: "translateY(8px)" },
                      to: { opacity: 1, transform: "translateY(0)" },
                    },
                  }}
                >
                  <CardContent sx={{ p: 1.6 }}>
                    <Typography sx={{ color: "#64748b", fontSize: 12 }}>{item.label}</Typography>
                    <Typography sx={{ fontWeight: 900, color: item.color, fontSize: 26 }}>{item.value}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>

            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography sx={{ fontWeight: 800, mb: 1.2 }}>User Management</Typography>
                {users.map((user) => (
                  <Box
                    key={user.id}
                    sx={{
                      py: 1.2,
                      borderBottom: "1px solid #f1f5f9",
                      display: "flex",
                      justifyContent: "space-between",
                      gap: 1,
                      alignItems: "center",
                      flexWrap: "wrap",
                    }}
                  >
                    <Box>
                      <Typography sx={{ fontWeight: 700 }}>{user.name}</Typography>
                      <Typography sx={{ color: "#64748b", fontSize: 12 }}>
                        {user.email} · {user.role}
                      </Typography>
                    </Box>
                    <Box sx={{ display: "flex", gap: 0.8, flexWrap: "wrap" }}>
                      <Chip size="small" label={user.status} color={user.status === "Active" ? "success" : "warning"} />
                      <Button size="small" color="warning" onClick={() => handleToggleStatus(user.id)}>
                        {user.status === "Active" ? "Suspend" : "Restore"}
                      </Button>
                      <Button
                        size="small"
                        onClick={() => {
                          setEditUser(user);
                          setNewRole(user.role);
                        }}
                      >
                        Change Role
                      </Button>
                      <Button size="small" color="error" onClick={() => setRemoveUser(user)}>
                        Remove
                      </Button>
                    </Box>
                  </Box>
                ))}
              </CardContent>
            </Card>
            <Box sx={{ mt: 2, display: "grid", gridTemplateColumns: { xs: "1fr", lg: "1fr 1fr" }, gap: 2 }}>
              <Card>
              <CardContent>
                <Typography sx={{ fontWeight: 800, mb: 1 }}>User Growth</Typography>
                <Box sx={{ height: 220 }}>
                  <ResponsiveContainer>
                    <LineChart data={userTrend}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                      <XAxis dataKey="m" />
                      <YAxis />
                      <Tooltip />
                      <Line type="monotone" dataKey="users" stroke="#2563eb" strokeWidth={3} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
              </Card>
              <Card>
                <CardContent>
                  <Typography sx={{ fontWeight: 800, mb: 1 }}>Admin Activity</Typography>
                  <Box sx={{ height: 220 }}>
                    <ResponsiveContainer>
                      <BarChart data={activity}>
                        <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                        <XAxis dataKey="day" />
                        <YAxis />
                        <Tooltip />
                        <Bar dataKey="actions" fill="#14b8a6" radius={[6, 6, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </Box>
          <Box>
            <Card sx={{ mb: 2 }}>
              <CardContent>
                <Typography sx={{ mb: 1, fontWeight: 700 }}>Moderation Split</Typography>
                <Box sx={{ height: 200 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie data={moderation} dataKey="value" outerRadius={75}>
                        {moderation.map((entry) => <Cell key={entry.name} fill={entry.color} />)}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
            <Card>
              <CardContent>
                <Typography sx={{ fontWeight: 700, mb: 1 }}>Quick Admin Actions</Typography>
                <Box sx={{ display: "grid", gap: 1 }}>
                  <Button variant="outlined" onClick={() => openActionPanel("invite")} sx={{ textTransform: "none" }}>
                    Invite New Manager
                  </Button>
                  <Button variant="outlined" onClick={() => openActionPanel("audit")} sx={{ textTransform: "none" }}>
                    Generate Audit Report
                  </Button>
                  <Button variant="contained" onClick={() => openActionPanel("backup")} sx={{ textTransform: "none" }}>
                    Backup Platform Data
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
        )}
      </Box>
      <Snackbar open={Boolean(toast)} autoHideDuration={2000} onClose={() => setToast("")} message={toast} />

      <Dialog open={Boolean(editUser)} onClose={() => setEditUser(null)} fullWidth maxWidth="xs">
        <DialogTitle>Change User Role</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="User"
            value={editUser?.name || ""}
            sx={{ mt: 1, mb: 2 }}
            disabled
          />
          <TextField
            fullWidth
            select
            label="Role"
            value={newRole}
            onChange={(e) => setNewRole(e.target.value)}
          >
            {["Viewer", "Buyer", "Seller", "Editor", "Admin"].map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </TextField>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setEditUser(null)}>Cancel</Button>
          <Button variant="contained" onClick={handleSaveRole}>
            Save Role
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={Boolean(removeUser)} onClose={() => setRemoveUser(null)} fullWidth maxWidth="xs">
        <DialogTitle>Remove User</DialogTitle>
        <DialogContent>
          <Typography>
            You are about to remove {removeUser?.name}. This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setRemoveUser(null)}>Cancel</Button>
          <Button color="error" variant="contained" onClick={handleRemoveUser}>
            Remove User
          </Button>
        </DialogActions>
      </Dialog>

      <Drawer
        anchor="right"
        open={actionPanel.open}
        onClose={closeActionPanel}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: 460 },
            p: 2.2,
            background: "linear-gradient(180deg,#f8fbff,#ffffff)",
            borderLeft: "1px solid #dbeafe",
            transition: "transform 760ms cubic-bezier(0.16, 0.78, 0.18, 1.18)",
          },
        }}
      >
        <Typography sx={{ fontWeight: 900, fontSize: 20, mb: 0.4 }}>
          {actionPanel.type === "invite" && "Invite New Manager"}
          {actionPanel.type === "audit" && "Generate Audit Report"}
          {actionPanel.type === "backup" && "Backup Platform Data"}
        </Typography>
        <Typography sx={{ color: "#64748b", mb: 2 }}>
          Fill the details and submit this admin operation.
        </Typography>

        {actionPanel.type === "invite" && (
          <Box sx={{ display: "grid", gap: 1.5 }}>
            <TextField
              label="Manager Name"
              value={actionForm.managerName}
              onChange={(e) => setActionForm((p) => ({ ...p, managerName: e.target.value }))}
              fullWidth
            />
            <TextField
              label="Manager Email"
              value={actionForm.managerEmail}
              onChange={(e) => setActionForm((p) => ({ ...p, managerEmail: e.target.value }))}
              fullWidth
            />
          </Box>
        )}

        {actionPanel.type === "audit" && (
          <Box sx={{ display: "grid", gap: 1.5 }}>
            <TextField
              select
              label="Report Period"
              value={actionForm.reportPeriod}
              onChange={(e) => setActionForm((p) => ({ ...p, reportPeriod: e.target.value }))}
              fullWidth
            >
              <MenuItem value="weekly">Weekly</MenuItem>
              <MenuItem value="monthly">Monthly</MenuItem>
              <MenuItem value="quarterly">Quarterly</MenuItem>
            </TextField>
            <TextField label="Notes" multiline minRows={4} fullWidth />
          </Box>
        )}

        {actionPanel.type === "backup" && (
          <Box sx={{ display: "grid", gap: 1.5 }}>
            <TextField
              label="Backup Reason"
              value={actionForm.backupReason}
              onChange={(e) => setActionForm((p) => ({ ...p, backupReason: e.target.value }))}
              fullWidth
            />
            <TextField label="Destination (secure bucket)" fullWidth />
          </Box>
        )}

        <Box sx={{ mt: 3, display: "flex", justifyContent: "flex-end", gap: 1 }}>
          <Button onClick={closeActionPanel}>Cancel</Button>
          <Button variant="contained" onClick={submitActionForm}>
            Submit Action
          </Button>
        </Box>
      </Drawer>
    </DashboardLayout>
  );
}
