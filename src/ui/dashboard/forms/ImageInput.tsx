import React from "react";
import { useFormContext } from "react-hook-form";
import NextImage from "next/image";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import ErrorMessage from "@/ui/dashboard/forms/ErrorMessage";
import styles from "./form.module.css";

type Preview = {
  src: string | null;
  height: number | undefined;
  width: number | undefined;
  name: string;
};

const INITIAL_PREVIEW: Preview = {
  src: null,
  height: undefined,
  width: undefined,
  name: "",
};

type ImageInputProps = {
  serverError: string[] | undefined;
  clientError: string | undefined;
  name: string;
  formats?: string;
  alt: string;
};

export default function ImageInput({
  name,
  clientError,
  serverError,
  alt,
  formats = "image/jpeg,image/png,image/avif,image/svg+xml,image/webp",
}: ImageInputProps) {
  const { register, setValue, trigger } = useFormContext();
  const [preview, setPreview] = React.useState<Preview>(INITIAL_PREVIEW);
  const hiddenFileInputRef = React.useRef<HTMLInputElement | null>(null);

  const isError = clientError || serverError;
  const uploadInfoId = React.useId();
  const errorTextId = React.useId();

  const triggerFileInput = () => hiddenFileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const image = new Image();
        image.src = reader.result as string;
        image.onload = function () {
          const { height, width } = image;
          setPreview({
            src: reader.result as string,
            height,
            width,
            name: file.name,
          });
        };
        setValue(name, file); // manually set the image in the form state
        trigger(name);
      };

      reader.readAsDataURL(file);
    } else {
      setPreview(INITIAL_PREVIEW);
    }
  };

  const removeImage = () => {
    setPreview(INITIAL_PREVIEW);
    hiddenFileInputRef.current!.value = "";
    setValue(name, null);
    trigger(name);
  };

  return (
    <div className={styles.field}>
      {!preview.src && (
        <>
          <button
            type="button"
            onClick={triggerFileInput}
            className={`${styles.button} ${styles.primary} ${styles.withIcon}`}
            aria-hidden="true"
          >
            <ArrowUpOnSquareIcon width={24} />
            <span>Upload Image</span>
          </button>
          <p id={uploadInfoId} className={styles.info}>
            If no image is uploaded, the default image will be used.
          </p>
        </>
      )}

      {preview.src && (
        <div>
          <figure>
            <NextImage
              src={preview.src}
              className={styles.preview}
              alt={alt}
              height={preview.height}
              width={preview.width}
            />
            <figcaption className={styles.info}>
              Uploaded file: {preview.name}
            </figcaption>
          </figure>
          <div className={styles.uploadButtons}>
            <button
              type="button"
              onClick={triggerFileInput}
              className={`${styles.button} ${styles.primary}`}
            >
              Change Image
            </button>

            <button
              type="button"
              onClick={removeImage}
              className={`${styles.button} ${styles.outline}`}
            >
              Remove Image
            </button>
          </div>
        </div>
      )}
      <input
        {...register(name)}
        ref={hiddenFileInputRef}
        className="visually-hidden"
        accept={formats}
        type="file"
        onChange={handleFileChange}
        aria-describedby={`${uploadInfoId},${errorTextId}`}
        aria-invalid={isError ? true : undefined}
      />
      <ErrorMessage
        css={styles.fieldError}
        errorId={errorTextId}
        clientError={clientError}
        serverError={serverError}
      />
    </div>
  );
}
