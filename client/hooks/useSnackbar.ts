import { useState } from "react";
import { severityType } from "../types";

export default function useSnackbar(): [
  boolean,
  string,
  string,
  (_message: string, _severity: severityType) => void,
  (event?: React.SyntheticEvent | Event, reason?: string) => void
] {
  const [open, setOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [severity, setSeverity] = useState<severityType>("success");
  const handleOpenSnackbar = (message: string, _severity: severityType) => {
    setSnackbarMessage(message);
    setSeverity(_severity);
    setOpen(true);
  };
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };
  return [open, snackbarMessage, severity, handleOpenSnackbar, handleClose];
}
