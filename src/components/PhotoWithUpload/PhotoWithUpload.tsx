import { useRef, ChangeEvent } from "react";
import { Avatar, Box, Fab } from "@mui/material";
import AddIcon  from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import style from "./PhotoWithUpload.module.scss";

type PhotoWithUploadProps = {
  image?: string | null;
  onUpload: (file: File) => void
  isLoading?: boolean
}

type FileEventTarget = EventTarget & { files: FileList };

export const PhotoWithUpload = ({ image, onUpload, isLoading }: PhotoWithUploadProps) => {
  const inputFileRef = useRef(null);

  const handleOnChange = (event: ChangeEvent<HTMLInputElement>) => {
    const target = event.target as FileEventTarget;
    const newImage = target?.files?.[0];
    onUpload(newImage);
  };

  return (
    <Box className={style.wrapper}>
      {!isLoading && (
        <>
          <Avatar style={{ width: 180, height: 180 }} src={image || "../../assets/default-avatar.png"} />
          <input
            ref={inputFileRef}
            accept="image/*"
            hidden
            id="avatar-image-upload"
            type="file"
            onChange={handleOnChange}
          />
          <label htmlFor="avatar-image-upload">
            {image ? (
              <Fab component="span" aria-label="edit">
                <EditIcon />
              </Fab>
            ) : (
              <Fab component="span" aria-label="add">
                <AddIcon />
              </Fab>
            )}
          </label>
        </>
      )}
    </Box>
  );
};
