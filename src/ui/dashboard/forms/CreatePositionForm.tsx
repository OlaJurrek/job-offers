"use client";
import React from "react";
import { createPosition } from "@/utils/actions/position-actions";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PositionForm, positionSchema } from "@/utils/validation/validations";
import NextImage from "next/image";
import Link from "next/link";
import styles from "./form.module.css";
import { ArrowUpOnSquareIcon } from "@heroicons/react/24/outline";

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
  const [preview, setPreview] = React.useState<Preview>(INITIAL_PREVIEW);

  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<PositionForm>({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      name: "",
      image: null,
    },
  });
  const hiddenFileInputRef = React.useRef<HTMLInputElement | null>(null);

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
  };

  const onSubmitForm: SubmitHandler<PositionForm> = async (data) => {
    console.log("data", data);
    console.log("errors", errors);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image as File);

    // call the server action
    // const { data: success, errors } = await createPosition(formData);
    createPosition(formData);
    // if (errors) {
    //   // handle errors (e.g., display an alert notification or add error messages to the form)
    // }

    // if (success) {
    //   // handle success (e.g., display a success notification)
    // }

    // fallback notification can go here
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      <div className={styles.fieldsWrapper}>
        {/* Position Name */}
        <div className={styles.field}>
          <label className={styles.label} htmlFor="name">
            Position name
          </label>
          <input
            className={styles.input}
            type="text"
            id="name"
            {...register("name")}
          />
          <p className="error">{errors.name && errors.name.message}</p>
        </div>
        {/* Position Image */}
        <div className={styles.field}>
          {!preview.src && (
            <>
              <button
                type="button"
                onClick={triggerFileInput}
                className={`${styles.button} ${styles.primary} ${styles.withIcon}`}
                aria-describedby="uploadInfo"
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
            hidden
            type="file"
            onChange={handleFileChange}
            aria-describedby="uploadInfo"
          />
          {/* <p className="error">{errors.image && errors.image.message}</p> */}
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
