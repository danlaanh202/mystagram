import { ReactNode, useState } from "react";

import ModalProto from "./ModalProto";

const FollowingModal = ({ children }: { children: ReactNode }) => {
  const [open, setOpen] = useState(false);
  return (
    <ModalProto open={open} setOpen={setOpen} openBtn={children}></ModalProto>
  );
};

export default FollowingModal;
