import type { Dispatch, SetStateAction } from "react";

export type InteractionProps = {
  isListening: boolean;
  onPressIn: () => void;
  onPressOut: () => void;
  setIsStarted: Dispatch<SetStateAction<boolean>>;
};
