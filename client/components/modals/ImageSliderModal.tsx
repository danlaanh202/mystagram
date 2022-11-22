import { Dispatch, SetStateAction, useState } from "react";
import { IPost } from "../../types";
import SwiperItem from "../image-item/SwiperItem";
import ImageSlider from "./ImageSlider";
import ModalProto from "./ModalProto";

const ImageSliderModal = ({
  open,
  setOpen,
  modalIndex = 0,
  posts,
  setModalIndex,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  modalIndex: number;
  posts: IPost[] | IPost;
  setModalIndex: Dispatch<SetStateAction<number>>;
}) => {
  return (
    <ModalProto open={open} setOpen={setOpen}>
      <ImageSlider
        setModalIndex={setModalIndex}
        posts={posts}
        modalIndex={modalIndex}
      />
    </ModalProto>
  );
};

export default ImageSliderModal;
