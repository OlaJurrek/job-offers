"use client";
import React from "react";
import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { UploadedOffer, UploadedOfferSchema } from "@/utils/definitions/offer";
import Link from "next/link";
// import ErrorMessage from "@/ui/dashboard/forms/ErrorMessage";
import styles from "./form.module.css";

export default function CreateOfferForm() {
  const methods = useForm({
    resolver: zodResolver(UploadedOfferSchema),
    defaultValues: {
      active: false,
      description: "",
      requirements: "",
      offer: "",
    },
  });

  const {
    handleSubmit,
    register,
    formState: {
      //   errors:
      // clientErrors,
      // isSubmitting,
    },
  } = methods;

  const onSubmitForm: SubmitHandler<UploadedOffer> = async (data) => {
    const formData = new FormData();
    console.log(formData, data);
    // formData.append("name", data.name);
    // formData.append("image", data.image as File);
    // formData.append("alt", data.alt);
    // formData.append("width", data.width.toString());
    // formData.append("height", data.height.toString());

    // call the server action
    // const errorResponse = await createPosition(formData);

    // if (errorResponse) {
    //   setServerResponse(errorResponse);
    // } else {
    //   if (createToast) {
    //     createToast(`Position ${data.name} has been created`, "success");
    //   }
    // }
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmitForm)}>
        <div className={styles.fieldsWrapper}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="description">
              Description
            </label>
            <textarea
              className={styles.input}
              //   aria-invalid={isNameError ? true : undefined}
              //   aria-describedby={isNameError ? "nameError" : undefined}
              id="description"
              {...register("description")}
            ></textarea>
            {/* <ErrorMessage
              css={styles.fieldError}
              errorId="nameError"
              clientError={clientErrors.name?.message}
              serverError={serverResponse.errors?.name}
            /> */}
          </div>
        </div>
        <div className={styles.buttonWrapper}>
          <Link
            href="/admin/offers"
            className={`${styles.button} ${styles.secondary}`}
          >
            Cancel
          </Link>
          <button
            className={`${styles.button} ${styles.primary}`}
            // disabled={isSubmitting}
          >
            Create Offer
          </button>
        </div>
      </form>
    </FormProvider>
  );
}
