import { Campaign, Chat, Tv } from "@mui/icons-material";
import { Paper, PaperProps, Stack, Typography } from "@mui/material";

const Block: React.FC<
  PaperProps & {
    presentation: boolean;
    chat: boolean;
    announcement: boolean;
    selectedSource: "presentation" | "chat" | "announcement";
    sourceMoving: boolean;
    presetMode: boolean;
  }
> = ({
  presentation,
  chat,
  announcement,
  selectedSource,
  sourceMoving,
  presetMode,
  ...restProps
}) => {
  return (
    <Paper {...restProps}>
      <Stack
        sx={{ p: 1, height: "100%" }}
        direction="column"
        alignItems="center"
        justifyContent="center"
        spacing={1}
      >
        {presentation && (
          <Stack
            component={Paper}
            variant={
              selectedSource === "presentation" && !sourceMoving && !presetMode
                ? "outlined"
                : "elevation"
            }
            elevation={
              selectedSource === "presentation" && sourceMoving ? 10 : 0
            }
            sx={{
              p: 1,
              border:
                selectedSource === "presentation" &&
                !sourceMoving &&
                !presetMode
                  ? "2px solid black;"
                  : undefined,
            }}
            direction="row"
            alignItems="center"
            spacing={0.5}
          >
            <Tv />
            <Typography>Presentation</Typography>
          </Stack>
        )}
        {chat && (
          <Stack
            component={Paper}
            variant={
              selectedSource === "chat" && !sourceMoving && !presetMode
                ? "outlined"
                : "elevation"
            }
            elevation={selectedSource === "chat" && sourceMoving ? 10 : 0}
            sx={{
              p: 1,
              border:
                selectedSource === "chat" && !sourceMoving && !presetMode
                  ? "2px solid black;"
                  : undefined,
            }}
            direction="row"
            alignItems="center"
            spacing={0.5}
          >
            <Chat />
            <Typography>Chat</Typography>
          </Stack>
        )}
        {announcement && (
          <Stack
            component={Paper}
            variant={
              selectedSource === "announcement" && !sourceMoving && !presetMode
                ? "outlined"
                : "elevation"
            }
            elevation={
              selectedSource === "announcement" && sourceMoving ? 10 : 0
            }
            sx={{
              p: 1,
              border:
                selectedSource === "announcement" &&
                !sourceMoving &&
                !presetMode
                  ? "2px solid black;"
                  : undefined,
            }}
            direction="row"
            alignItems="center"
            spacing={0.5}
          >
            <Campaign />
            <Typography>Announcement</Typography>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default Block;
