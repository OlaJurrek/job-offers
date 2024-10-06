"use client";

import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
// import { FormSchema, formSchema } from "../utils/validation/add-position";

import Image from "next/image";
// import { submitForm } from "../utils/actions/action-add-position";

import { z } from "zod";

// Define the file size limit and accepted file types as constants
const MAX_FILE_SIZE = 3 * 1024 * 1024; // 3MB in bytes
const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png"];

export const formSchema = z.object({
  image: z
    .instanceof(File)
    .refine(
      (file) => file.size <= MAX_FILE_SIZE,
      `Image size must be less than ${MAX_FILE_SIZE / 1024 / 1024}MB.`
    )
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      `Only the following image types are allowed: ${ACCEPTED_IMAGE_TYPES.join(
        ", "
      )}.`
    )
    .optional()
    .nullable(),
});

export type FormSchema = z.infer<typeof formSchema>;

function FileForm2() {
  // initialize the useForm hook with the Zod resolver and default values
  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
    defaultValues: { image: null },
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = form;

  const hiddenFileInputRef = useRef<HTMLInputElement | null>(null);
  const [preview, setPreview] = useState<string | null>(null);

  // function to handle file input changes
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      const reader = new FileReader();

      reader.onloadend = () => {
        setPreview(reader.result as string);
        setValue("image", file); // manually set the image in the form state
      };

      reader.readAsDataURL(file);
    } else {
      setPreview(null);
    }
  };

  const removeImage = () => {
    setPreview(null);
    hiddenFileInputRef.current!.value = "";
    setValue("image", null);
  };

  const triggerFileInput = () => hiddenFileInputRef.current?.click();

  const onSubmitForm: SubmitHandler<FormSchema> = async (data) => {
    console.log("file form 2", data);
    const formData = new FormData();
    formData.append("image", data.image as File);

    // call the server action
    // const { data: success, errors } = await submitForm(formData);

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
      <div className="upload">
        {!preview && (
          <button type="button" onClick={triggerFileInput}>
            Upload Image
          </button>
        )}

        {preview && (
          <div className="preview">
            <Image
              src={preview}
              className="img"
              alt="profilePicture"
              height={50}
              width={50}
            />

            <div className="buttons">
              <button type="button" onClick={triggerFileInput}>
                Change Image
              </button>

              <button type="button" onClick={removeImage}>
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
          //   onChange={handleFileChange}
        />
        <p className="error">{errors.image && errors.image.message}</p>
      </div>

      <button className="submit" disabled={isSubmitting}>
        {isSubmitting ? "Loading" : "Submit"}
      </button>
    </form>
  );
}

export default FileForm2;
