import { Box, CssBaseline, Typography } from "@mui/material";
import Demo from "./Demo";

function App() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <CssBaseline />
      <Box
        component="header"
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          p: 2,
        }}
      >
        <Typography sx={{ mb: 1 }} variant="h3" component="h1">
          Auditory Reality Demo
        </Typography>
        <Typography component="ul">
          <li>
            Use Tab key to select controls and use Space key to activate them.
          </li>
          <li>
            Use Up Arrow key and Down Arrow key to cycle through sound source.
          </li>
          <li>Use Enter key to select source to move around.</li>
          <li>
            Use Left Arrow key and Right Arrow key to change source position.
          </li>
        </Typography>
      </Box>
      <Demo />
    </Box>
  );
}

export default App;
