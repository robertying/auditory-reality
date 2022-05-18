import { Campaign, Chat, Person, Tv } from "@mui/icons-material";
import { Box, Paper, PaperProps, Stack } from "@mui/material";
import { Positions } from "./Demo";

const Preset: React.FC<PaperProps & { positions: Positions }> = ({
  positions,
  ...restProps
}) => {
  const Icon = ({ source }: { source?: string }) => {
    return source === "presentation" ? (
      <Tv />
    ) : source === "chat" ? (
      <Chat />
    ) : source === "announcement" ? (
      <Campaign />
    ) : null;
  };

  return (
    <Paper {...restProps}>
      <Stack direction="row" justifyContent="center" spacing={0.5}>
        {new Array(5).fill(0).map((v, i) => (
          <Paper
            sx={{
              width: "2.5rem",
              height: "2.5rem",
              position: "relative",
              top: i === 0 || i === 4 ? "3rem" : undefined,
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
            key={i}
          >
            <Icon
              source={
                Object.entries(positions).find(
                  ([key, value]) => value === i
                )?.[0]
              }
            />
          </Paper>
        ))}
      </Stack>
      <Box sx={{ display: "flex", justifyContent: "center", p: 1 }}>
        <Person sx={{ fontSize: "2.5rem" }} />
      </Box>
    </Paper>
  );
};

export default Preset;
