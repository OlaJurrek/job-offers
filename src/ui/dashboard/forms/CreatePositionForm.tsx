"use client";
import React from "react";
import { createPosition, Response } from "@/utils/actions/position-actions";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PositionForm, positionSchema } from "@/utils/validation/validations";
import Link from "next/link";
import ErrorMessage from "@/ui/dashboard/forms/ErrorMessage";
import ImageInput from "@/ui/dashboard/forms/ImageInput";
import styles from "./form.module.css";

export default function CreatePositionForm() {
  const methods = useForm({
    resolver: zodResolver(positionSchema),
    defaultValues: {
      name: "",
      image: null,
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

  const onSubmitForm: SubmitHandler<PositionForm> = async (data) => {
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
            name="image"
            alt="An uploaded position image"
            serverError={serverResponse.errors?.image}
            clientError={clientErrors.image?.message}
          />
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
