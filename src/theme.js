import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1976d2",
    },
    secondary: {
      main: "#0ea5e9",
    },
    background: {
      default: "#f6f7fb",
    },
  },

  typography: {
    fontFamily: "Poppins, sans-serif",

    h1: {
      fontWeight: 700,
    },

    h2: {
      fontWeight: 600,
    },

    button: {
      textTransform: "none",
      fontWeight: 500,
    },
  },

  shape: {
    borderRadius: 10,
  },
});

export default theme;
