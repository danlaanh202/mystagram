import { Dispatch, ReactNode, SetStateAction, useState } from "react";

import Modal from "@mui/material/Modal";
import styled from "styled-components";

// const style = {
//   position: "absolute" as "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   border: "2px solid #000",
//   boxShadow: 24,
//   p: 4,
// };
const StyledModal = styled(Modal)`
  /* overflow-y: scroll; */
`;
export default function ModalProto({
  children,
  openBtn,
  open,
  setOpen,
  resetState = () => {},
}: {
  children?: ReactNode;
  openBtn?: ReactNode;
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  resetState?: () => void;
}) {
  // const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    resetState();
  };

  return (
    <div>
      {openBtn && (
        <button
          style={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={handleOpen}
        >
          {openBtn}
        </button>
      )}
      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <>{children}</>
      </StyledModal>
    </div>
  );
}
