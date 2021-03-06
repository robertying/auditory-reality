import { Fragment, useEffect, useState } from "react";
import { PauseCircle, PlayCircle } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { Positions } from "./Demo";

const Player: React.FC<{ positions: Positions }> = ({ positions }) => {
  const [playing, setPlaying] = useState(false);

  const handleEnterKey: React.KeyboardEventHandler<HTMLButtonElement> = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
    }
  };

  useEffect(() => {
    if (playing) {
      document.querySelectorAll("audio").forEach((el) => {
        el.volume = 0.8;
        el.play();
      });
    } else {
      document.querySelectorAll("audio").forEach((el) => el.pause());
    }
  }, [playing]);

  return (
    <Box sx={{ mb: 2 }}>
      <IconButton
        sx={{ alignSelf: "center" }}
        size="large"
        aria-label={playing ? "Pause Audio" : "Play Audio"}
        onClick={() => setPlaying((v) => !v)}
        onKeyDown={handleEnterKey}
      >
        {playing ? (
          <PauseCircle sx={{ fontSize: "3rem" }} />
        ) : (
          <PlayCircle sx={{ fontSize: "3rem" }} />
        )}
      </IconButton>
      {[0, 1, 2, 3, 4].map((i) => (
        <Fragment key={i}>
          <audio
            src={`/audio/presentation-${i}.mp3`}
            preload="auto"
            loop
            muted={positions.presentation !== i}
          />
          <audio
            src={`/audio/chat-${i}.mp3`}
            preload="auto"
            loop
            muted={positions.chat !== i}
          />
          <audio
            src={`/audio/announcement-${i}.mp3`}
            preload="auto"
            loop
            muted={positions.announcement !== i}
          />
        </Fragment>
      ))}
    </Box>
  );
};

export default Player;
