import React from "react";
import { useFormContext } from "react-hook-form";
import NextImage from "next/image";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import ErrorMessage from "@/ui/dashboard/forms/ErrorMessage";
import styles from "./form.module.css";

type Preview = {
  src: string | null | undefined;
  height: number | undefined;
  width: number | undefined;
  name?: string;
};

const EMPTY_PREVIEW: Preview = {
  src: null,
  height: undefined,
  width: undefined,
  name: "",
};

type ImageInputProps = {
  imageInput: string;
  altInput: string;
  heightInput: string;
  widthInput: string;
  clientError: string | undefined;
  serverError: string[] | undefined;
  formats?: string;
  initialPreview?: Preview;
  handleImageChange: () => void;
  isImageChanged?: boolean;
};

export default function ImageInput({
  imageInput,
  altInput,
  heightInput,
  widthInput,
  clientError,
  serverError,
  formats = "image/jpeg,image/png,image/avif,image/svg+xml,image/webp",
  initialPreview,
  handleImageChange,
  isImageChanged,
}: ImageInputProps) {
  const { register, setValue, trigger } = useFormContext();
  const [preview, setPreview] = React.useState<Preview>(
    initialPreview || EMPTY_PREVIEW
  );
  // const [] = React.useState()
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const heightInputRef = React.useRef<HTMLInputElement | null>(null);
  const widthInputRef = React.useRef<HTMLInputElement | null>(null);

  const isError = clientError || serverError;
  const uploadInfoId = React.useId();
  const errorTextId = React.useId();

  const triggerFileInput = () => fileInputRef.current?.click();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        const imageElement = new Image();
        imageElement.src = reader.result as string;
        imageElement.onload = function () {
          const { height, width } = imageElement;
          setPreview({
            src: reader.result as string,
            height,
            width,
            name: file.name,
          });
          setValue(heightInput, height);
          setValue(widthInput, width);
        };
        setValue(imageInput, file); // manually set the image in the form state
        trigger(imageInput);
      };

      reader.readAsDataURL(file);
      if (!isImageChanged) {
        handleImageChange();
      }
    } else {
      setPreview(EMPTY_PREVIEW);
    }
  };

  const removeImage = () => {
    setPreview(EMPTY_PREVIEW);
    fileInputRef.current!.value = "";
    setValue(imageInput, null);
    setValue(heightInput, 0);
    setValue(widthInput, 0);
    trigger(imageInput);
    if (!isImageChanged) {
      handleImageChange();
    }
  };

  return (
    <div className={styles.field}>
      {!preview.src && (
        <>
          <button
            type="button"
            onClick={triggerFileInput}
            className={`${styles.button} ${styles.primary} ${styles.withIcon}`}
            aria-describedby={uploadInfoId}
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
        <>
          <figure className={styles.previewWrapper}>
            <NextImage
              src={preview.src}
              className={styles.preview}
              alt=""
              height={preview.height}
              width={preview.width}
              priority={true}
            />
            {preview.name && (
              <figcaption className={styles.info}>
                Uploaded file: {preview.name}
              </figcaption>
            )}
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
        </>
      )}
      <input
        {...register(imageInput)}
        ref={fileInputRef}
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
      <label className={styles.label} htmlFor="alt">
        Text description of an image (alt)
      </label>
      <input
        className={styles.input}
        type="text"
        id="alt"
        {...register(altInput)}
      />
      <input
        {...register(heightInput)}
        className="visually-hidden"
        type="number"
        aria-hidden="true"
        ref={heightInputRef}
      />
      <input
        {...register(widthInput)}
        className="visually-hidden"
        type="number"
        aria-hidden="true"
        ref={widthInputRef}
      />
    </div>
  );
}
