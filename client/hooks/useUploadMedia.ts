import { ChangeEvent, DragEvent, useState } from "react";
import axios from "axios";
import { IRootState } from "../redux/store";
import { IUser } from "../types";
import { useSelector } from "react-redux";

export default function useUploadMedia() {
  const [previewSource, setPreviewSource] = useState("");

  const [fileInputState, setFileInputState] = useState("");

  const [progress, setProgress] = useState(0);
  const user = useSelector((state: IRootState) => state.user.user as IUser);
  const handleFileInputChange = (
    e: ChangeEvent<HTMLInputElement> | DragEvent<HTMLInputElement>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    const file =
      ((e.target as HTMLInputElement).files as FileList)[0] ||
      (e as DragEvent).dataTransfer.files[0];

    setFileInputState((e.target as HTMLInputElement).value); //file input
    previewFile(file);
  };

  const previewFile = (file: File) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setPreviewSource(reader.result as string); //64 Encoded image
    };
  };

  const uploadImage = async ({
    preset,
    is_avatar,
    is_post,
    is_story,
    is_message,
  }: {
    preset: string;
    is_avatar?: boolean;
    is_post?: boolean;
    is_message?: boolean;
    is_story?: boolean;
  }) => {
    try {
      return await axios
        .post(`${process.env.API_URL}/cloudinary/upload`, {
          img: previewSource, //64EncodedImage
          preset: preset,
          userId: user._id,
          is_avatar: is_avatar || false,
          is_post: is_post || false,
          is_story: is_story || false,
          is_message: is_message || false,
        })
        .then((response) => {
          console.log(response);
          return response;
        });
    } catch (err) {
      console.log(err);
    }
  };
  const handleDeleteImage = () => {
    setPreviewSource("");
    setFileInputState("");
  };
  return {
    handleFileInputChange,
    uploadImage,
    fileInputState,
    previewSource,
    handleDeleteImage,
    progress,
  };
}
