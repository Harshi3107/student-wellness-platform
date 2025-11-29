import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Paper,
  TextField,
  FormControl,
  Select,
  MenuItem,
} from "@mui/material";

const CounsellorNotes = () => {
  const counsellorName =
    localStorage.getItem("counsellorName") || "Counsellor";

  const [allSessions, setAllSessions] = useState([]);
  const [mySessions, setMySessions] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem("sessions")) || [];
    setAllSessions(stored);
    setMySessions(stored.filter((s) => s.counselor === counsellorName));
  }, [counsellorName]);

  const updateSessions = (updatedAll) => {
    localStorage.setItem("sessions", JSON.stringify(updatedAll));
    setAllSessions(updatedAll);
    setMySessions(updatedAll.filter((s) => s.counselor === counsellorName));
  };

  const handleStatusChange = (id, newStatus) => {
    const updatedAll = allSessions.map((s) =>
      s.id === id ? { ...s, status: newStatus } : s
    );
    updateSessions(updatedAll);
  };

  const handleNotesChange = (id, notes) => {
    const updatedAll = allSessions.map((s) =>
      s.id === id ? { ...s, notes } : s
    );
    updateSessions(updatedAll);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background: "linear-gradient(to bottom right, #e8f6f3, #f5fffd)",
        display: "flex",
        justifyContent: "center",
        p: 3,
      }}
    >
      <Box sx={{ width: "100%", maxWidth: "1200px" }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 900, color: "#064e3b", mb: 2 }}
        >
          Session Details & Counselling Notes 📝
        </Typography>
        <Typography sx={{ mb: 3, color: "#555" }}>
          Review sessions, update statuses, and maintain confidential notes.
        </Typography>

        <Paper
          sx={{
            p: 3,
            borderRadius: 3,
            background: "#ffffff",
            boxShadow: "0 4px 16px rgba(0,0,0,0.06)",
          }}
        >
          {mySessions.length === 0 ? (
            <Typography>No sessions assigned yet.</Typography>
          ) : (
            <Box
              component="table"
              sx={{
                width: "100%",
                borderCollapse: "collapse",
                "& th, & td": {
                  border: "1px solid #ddd",
                  padding: "10px",
                  verticalAlign: "top",
                },
                "& th": {
                  backgroundColor: "#0f766e",
                  color: "#fff",
                  textAlign: "center",
                },
              }}
            >
              <thead>
                <tr>
                  <th>Student</th>
                  <th>Date</th>
                  <th>Concern</th>
                  <th>Status</th>
                  <th>Notes</th>
                </tr>
              </thead>
              <tbody>
                {mySessions.map((s) => (
                  <tr key={s.id}>
                    <td>{s.name}</td>
                    <td>{s.date}</td>
                    <td>{s.concern}</td>
                    <td>
                      <FormControl fullWidth size="small">
                        <Select
                          value={s.status || "Scheduled"}
                          onChange={(e) =>
                            handleStatusChange(s.id, e.target.value)
                          }
                        >
                          <MenuItem value="Scheduled">Scheduled</MenuItem>
                          <MenuItem value="Completed">Completed</MenuItem>
                          <MenuItem value="Follow-up">Follow-up</MenuItem>
                        </Select>
                      </FormControl>
                    </td>
                    <td>
                      <TextField
                        multiline
                        minRows={2}
                        fullWidth
                        placeholder="Private counselling notes..."
                        value={s.notes || ""}
                        onChange={(e) =>
                          handleNotesChange(s.id, e.target.value)
                        }
                      />
                    </td>
                  </tr>
                ))}
              </tbody>
            </Box>
          )}
        </Paper>
      </Box>
    </Box>
  );
};

export default CounsellorNotes;
