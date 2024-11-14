"use client";
import React from "react";
import { createPosition, Response } from "@/utils/actions/position-actions";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  UploadedPosition,
  UploadedPositionSchema,
} from "@/utils/definitions/position";
import Link from "next/link";
import ErrorMessage from "@/ui/dashboard/forms/ErrorMessage";
import ImageInput from "@/ui/dashboard/forms/ImageInput";
import { ToastContext } from "@/ui/toast/ToastProvider";
import { ToastContextType } from "@/ui/toast/toast-types";

import styles from "./form.module.css";

export default function CreatePositionForm() {
  const { createToast } = React.useContext(ToastContext) as ToastContextType;
  const methods = useForm({
    resolver: zodResolver(UploadedPositionSchema),
    defaultValues: {
      name: "",
      image: null,
      alt: "",
      height: 0,
      width: 0,
    },
  });

  const {
    handleSubmit,
    register,
    formState: { errors: clientErrors, isSubmitting },
  } = methods;

  const [serverResponse, setServerResponse] = React.useState<Response>({
    message: null,
    errors: {},
  });

  const isNameError = clientErrors.name || serverResponse.errors?.name;

  const onSubmitForm: SubmitHandler<UploadedPosition> = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("image", data.image as File);
    formData.append("alt", data.alt);
    formData.append("width", data.width.toString());
    formData.append("height", data.height.toString());

    // call the server action
    const errorResponse = await createPosition(formData);

    if (errorResponse) {
      setServerResponse(errorResponse);
    } else {
      if (createToast) {
        createToast(`Position ${data.name} has been created`, "success");
      }
    }
  };

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={handleSubmit(onSubmitForm)}
        aria-describedby="generalError"
      >
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
          <ImageInput
            imageInput="image"
            altInput="alt"
            serverError={serverResponse.errors?.image}
            clientError={clientErrors.image?.message}
            heightInput="height"
            widthInput="width"
          />
          {/*  Image alt */}
          {/* <div className={styles.field}>

          </div> */}
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
    </FormProvider>
  );
}
