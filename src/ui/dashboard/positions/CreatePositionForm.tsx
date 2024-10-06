"use client";
import React from "react";
import { createPosition } from "@/utils/actions/actions";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PositionForm, positionSchema } from "@/utils/validation/validations";
import Image from "next/image";

export default function CreatePositionForm() {
  const [preview, setPreview] = React.useState<string | null>(null);

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

  const onSubmitForm: SubmitHandler<PositionForm> = async (data) => {
    console.log("data", data);
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image as File);

    // call the server action
    const { data: success, errors } = await createPosition(formData);

    if (errors) {
      // handle errors (e.g., display an alert notification or add error messages to the form)
    }

    if (success) {
      // handle success (e.g., display a success notification)
    }

    // fallback notification can go here
  };

  return (
    <form onSubmit={handleSubmit(onSubmitForm)}>
      {/* Position Name */}
      <div>
        <label htmlFor="name">Position name</label>
        <input type="text" id="name" {...register("name")} />
        <p className="error">{errors.name && errors.name.message}</p>
      </div>
      {/* Position Image */}
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
          onChange={handleFileChange}
        />
        <p className="error">{errors.image && errors.image.message}</p>
      </div>
      <button className="" disabled={isSubmitting}>
        {isSubmitting ? "Submitting" : "Submit"}
      </button>
    </form>
  );
}
