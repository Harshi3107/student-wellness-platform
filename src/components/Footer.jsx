import { Box, Typography } from "@mui/material";

export default function Footer() {
  return (
    <Box component="footer" sx={{ py: 3, textAlign: "center", color: "white", bgcolor: "primary.main" }}>
      <Typography variant="body2">
        © {new Date().getFullYear()} Student Wellness — Built with 💚 for students
      </Typography>
    </Box>
  );
}
