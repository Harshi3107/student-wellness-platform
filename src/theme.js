import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: { main: "#00796b" },    // teal
    secondary: { main: "#004d40" },  // deep teal
    background: { default: "#f4f6f6" }
  },
  shape: { borderRadius: 12 },
  typography: { fontFamily: "'Poppins', system-ui, -apple-system, Segoe UI, Roboto, sans-serif" },
  components: {
    MuiPaper: { styleOverrides: { root: { borderRadius: 16 } } }
  }
});

export default theme;
