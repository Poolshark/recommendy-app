import type { Dispatch, SetStateAction } from "react";

export type StartScreenProps = {
  setIsStarted: Dispatch<SetStateAction<boolean | undefined>>;
};