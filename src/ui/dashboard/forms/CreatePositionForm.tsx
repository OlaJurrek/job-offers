"use client";
import React from "react";
import { createPosition, Response } from "@/utils/actions/position-actions";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PositionForm, positionSchema } from "@/utils/validation/validations";
import NextImage from "next/image";
import Link from "next/link";
import styles from "./form.module.css";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";
import ErrorMessage from "@/ui/dashboard/forms/ErrorMessage";

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

export default function CreatePositionForm() {
  const hiddenFileInputRef = React.useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = React.useState<Preview>(INITIAL_PREVIEW);
  const [serverResponse, setServerResponse] = React.useState<Response>({
    message: null,
    errors: {},
  });

  const {
    handleSubmit,
    register,
    setValue,
    trigger,
    formState: { errors: clientErrors, isSubmitting },
  } = useForm<PositionForm>({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      name: "",
      image: null,
    },
  });

  const isNameError = clientErrors.name || serverResponse.errors?.name;
  const isImageError = clientErrors.image || serverResponse.errors?.image;

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
        setValue("image", file); // manually set the image in the form state
        trigger("image");
      };

      reader.readAsDataURL(file);
    } else {
      setPreview(INITIAL_PREVIEW);
    }
  };

  const removeImage = () => {
    setPreview(INITIAL_PREVIEW);
    hiddenFileInputRef.current!.value = "";
    setValue("image", null);
    trigger("image");
  };

  const onSubmitForm: SubmitHandler<PositionForm> = async (data) => {
    console.log("data", data);
    console.log("errors", clientErrors);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image as File);

    // call the server action
    const errorResponse = await createPosition(formData);

    if (errorResponse) {
      setServerResponse(errorResponse);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)} aria-describedby="generalError">
      <div className={styles.fieldsWrapper}>
        {serverResponse.message && (
          <p
            id="generalError"
            className={styles.formError}
            aria-live="polite"
            aria-atomic="true"
          >
            {serverResponse.message}
          </p>
        )}
        {/* Position Name */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Position name
          </label>
          <input
            className={styles.input}
            aria-invalid={isNameError ? true : undefined}
            aria-describedby={isNameError ? "nameError" : undefined}
            type="text"
            id="name"
            {...register("name")}
          />
          <ErrorMessage
            css={styles.fieldError}
            errorId="nameError"
            clientError={clientErrors.name?.message}
            serverError={serverResponse.errors?.name}
          />
        </div>
        {/* Position Image */}
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
              <p id="uploadInfo" className={styles.info}>
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
                  alt="profilePicture"
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
            {...register("image")}
            ref={hiddenFileInputRef}
            className="visually-hidden"
            accept="image/jpeg,image/png,image/avif,image/svg+xml,image/webp"
            type="file"
            onChange={handleFileChange}
            aria-describedby={`uploadInfo${
              isImageError ? "," + "imageError" : ""
            }`}
            aria-invalid={isImageError ? true : undefined}
          />
          <ErrorMessage
            css={styles.fieldError}
            errorId="imageError"
            clientError={clientErrors.image?.message}
            serverError={serverResponse.errors?.image}
          />
        </div>
      </div>
      <div className={styles.buttonWrapper}>
        <Link
          href="/admin/positions"
          className={`${styles.button} ${styles.secondary}`}
        >
          Cancel
        </Link>
        <button
          className={`${styles.button} ${styles.primary}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Submitting" : "Create Position"}
        </button>
      </div>
    </form>
  );
}
