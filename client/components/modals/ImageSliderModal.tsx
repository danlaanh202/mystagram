import { Dispatch, SetStateAction } from "react";
import { IPost } from "../../types";
import ImageSlider from "./ImageSlider";
import ModalProto from "./ModalProto";

const ImageSliderModal = ({
  open,
  setOpen,
  modalIndex = 0,
  posts,
  setModalIndex,
  setUpdatedPost,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  modalIndex: number;
  posts: IPost[] | IPost;
  setModalIndex: Dispatch<SetStateAction<number>>;
  setUpdatedPost?: Dispatch<SetStateAction<IPost>>;
}) => {
  const offModal = () => {
    setOpen(false);
  };
  return (
    <ModalProto open={open} setOpen={setOpen}>
      <ImageSlider
        setModalIndex={setModalIndex}
        posts={posts}
        modalIndex={modalIndex}
        setUpdatedPost={setUpdatedPost}
        offModal={offModal}
      />
    </ModalProto>
  );
};

export default ImageSliderModal;
