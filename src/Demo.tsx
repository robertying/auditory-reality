import { Person } from "@mui/icons-material";
import { Box, Stack, Switch, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Block from "./Block";
import Player from "./Player";
import Preset from "./Preset";

const sources = ["presentation", "chat", "announcement"] as const;

export interface Positions {
  presentation: number;
  chat: number;
  announcement: number;
}

const presets: Positions[] = [
  {
    presentation: 2,
    chat: 2,
    announcement: 2,
  },
  {
    presentation: 2,
    chat: 4,
    announcement: 0,
  },
  {
    presentation: 2,
    chat: 4,
    announcement: 4,
  },
  {
    presentation: 0,
    chat: 4,
    announcement: 4,
  },
];

function speak(text: string) {
  const el = document.createElement("div");
  el.setAttribute("aria-live", "assertive");
  el.style.cssText = `
    top: 0;
    left: -2px;
    width: 1px;
    height: 1px;
    position: absolute;
    overflow: hidden;
  `;
  el.innerHTML = text;
  document.body.appendChild(el);

  setTimeout(function () {
    document.body.removeChild(el);
  }, 1000);
}

const Demo: React.FC = () => {
  const [positions, setPositions] = useState<Positions>(presets[0]);

  const [selectedSource, setSelectedSource] = useState(0);
  const [sourceMoving, setSourceMoving] = useState(false);

  const [presetMode, setPresetMode] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState(0);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (!sourceMoving) {
            setSelectedSource((v) => (v === 0 ? 2 : v - 1));
          }
          break;
        case "ArrowDown":
          if (!sourceMoving) {
            setSelectedSource((v) => (v === 2 ? 0 : v + 1));
          }
          break;
        case "Enter":
          if (!presetMode) {
            setSourceMoving((v) => !v);
          }
          break;
        case "ArrowLeft":
          if (presetMode) {
            setSelectedPreset((v) => (v === 0 ? 3 : v - 1));
            return;
          }
          if (sourceMoving) {
            const source = sources[selectedSource];
            setPositions({
              ...positions,
              [source]: Math.max(0, positions[source] - 1),
            });
          }
          break;
        case "ArrowRight":
          if (presetMode) {
            setSelectedPreset((v) => (v === 3 ? 0 : v + 1));
            return;
          }
          if (sourceMoving) {
            const source = sources[selectedSource];
            setPositions({
              ...positions,
              [source]: Math.min(4, positions[source] + 1),
            });
          }
          break;
      }
    };
    window.addEventListener("keydown", handler);

    return () => window.removeEventListener("keydown", handler);
  }, [positions, presetMode, selectedPreset, selectedSource, sourceMoving]);

  useEffect(() => {
    if (presetMode) {
      setPositions(presets[selectedPreset]);
    }
  }, [presetMode, selectedPreset]);

  useEffect(() => {
    if (sourceMoving) {
      speak(
        `You can now change the position of ${sources[selectedSource]} sound source. Use the Left Arrow key or Right Arrow key to change its position.`
      );
    } else {
      speak(
        `The position of ${sources[selectedSource]} sound source has been set.`
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sourceMoving]);

  useEffect(() => {
    speak(
      `The ${sources[selectedSource]} sound source has been selected. Press the Enter key to start changing its position.`
    );
  }, [selectedSource]);

  useEffect(() => {
    if (presetMode) {
      speak(
        "Preset mode has been enabled. You can now use the Left Arrow key or Right Arrow key to cycle through sound layout presets."
      );
    } else {
      speak(
        "Preset mode has been disabled. You can now use the Up Arrow key or Down Arrow key to manually cycle through sound sources."
      );
    }
  }, [presetMode]);

  useEffect(() => {
    speak(`Sound layout preset ${selectedPreset + 1} has been applied.`);
  }, [selectedPreset]);

  return (
    <Box
      component="main"
      sx={{
        px: 8,
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Player positions={positions} />
      <Stack direction="row" justifyContent="center" spacing={4}>
        {new Array(5).fill(0).map((v, i) => (
          <Block
            sx={{
              width: "10rem",
              height: "10rem",
              position: "relative",
              top: i === 0 || i === 4 ? "12rem" : undefined,
            }}
            key={i}
            presentation={positions.presentation === i}
            chat={positions.chat === i}
            announcement={positions.announcement === i}
            selectedSource={sources[selectedSource]}
            sourceMoving={sourceMoving}
            presetMode={presetMode}
          />
        ))}
      </Stack>
      <Box sx={{ flex: 1, display: "flex", justifyContent: "center", p: 4 }}>
        <Person sx={{ fontSize: "10rem" }} />
      </Box>
      <Box sx={{ justifySelf: "stretch", width: "100%", pb: 2 }}>
        <Typography component="h2" variant="h6">
          Presets
          <Switch
            sx={{ ml: 1 }}
            checked={presetMode}
            onChange={(e, checked) => setPresetMode(checked)}
            inputProps={{ "aria-label": "Preset Mode" }}
          />
        </Typography>
        {presetMode && (
          <Stack direction="row" justifyContent="center" spacing={4}>
            {presets.map((preset, i) => (
              <Preset
                sx={{
                  width: "12rem",
                  height: "12rem",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                }}
                key={i}
                positions={preset}
                elevation={0}
                variant={i === selectedPreset ? "outlined" : "elevation"}
              />
            ))}
          </Stack>
        )}
      </Box>
    </Box>
  );
};

export default Demo;
