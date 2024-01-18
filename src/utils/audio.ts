import { AUDIO_BASE_64 } from "@/constants/audio";

export const beep = (volume: number): void => {
  const sound = new Audio("data:audio/wav;base64," + AUDIO_BASE_64);
  sound.volume = volume;
  sound.play();
};
