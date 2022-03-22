import React from "react";
import { Formik, Form, useField } from "formik";
import Link from "next/link";
import * as Yup from "yup";
import { useRouter } from "next/router";
import { ArrowRightIcon } from "@heroicons/react/solid";

import translate from "lib/locales";

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_W3F;
const COOKIE_TOKEN = process.env.NEXT_PUBLIC_IUBENDA_SITE_ID;
const SITE_URL = process.env.SITE_URL;

const MyTextInput = ({ locale, label, ...props }) => {
  const [field, meta] = useField(props);

  return (
    <div>
      <label className="form__label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className={`${
          meta.touched && meta.error
            ? "form__input input__error"
            : "form__input"
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="form__error">{translate(`${meta.error}`, locale)}</div>
      ) : null}
    </div>
  );
};

const MyTextarea = ({ locale, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className="form__label" htmlFor={props.id || props.name}>
        {label}
      </label>
      <textarea
        rows="4"
        className={`${
          meta.touched && meta.error
            ? "form__input input__error"
            : "form__input"
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error ? (
        <div className="form__error">{translate(`${meta.error}`, locale)}</div>
      ) : null}
    </div>
  );
};

const MyCheckbox = ({ locale, children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="form__label__checkbox">
        <input
          type="checkbox"
          className={`${
            meta.touched && meta.error
              ? "form__input__checkbox input__error"
              : "form__input__checkbox"
          }`}
          {...field}
          {...props}
        />
        {children}
      </label>
      {meta.touched && meta.error ? (
        <div className="form__error">{translate(`${meta.error}`, locale)}</div>
      ) : null}
    </div>
  );
};

export default function FormComponent({ locale, titlePage }) {
  async function handleSubmit(formValues) {
    console.log("formValues", formValues);
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      body: JSON.stringify({
        apikey: WEB3FORMS_KEY,
        subject: `Contatto dalla pagina ${titlePage}`,
        from_name: "www.quintibottling.com",
        Nome: formValues.name,
        Cognome: formValues.surname,
        Email: formValues.email,
        "Numero di telefono": formValues.phone,
        Messaggio: formValues.messagge,
      }),
    });
    const result = await response.json();
    if (result.success) {
      console.log(result);
    }
  }

  const router = useRouter();
  const phoneRegExp =
    /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

  return (
    <>
      <div className="">
        <div className="mt-10 mb-4 flex items-center gap-2 md:mt-0">
          <div className="-mt-1 h-2 w-2 rounded-full bg-gold"></div>
          <div className="text-xs uppercase">
            {translate("fill_form", locale)}
          </div>
        </div>
        <Formik
          initialValues={{
            name: "",
            surname: "",
            email: "",
            phone: "",
            messagge: "",
            acceptedTerms: false,
          }}
          validationSchema={Yup.object({
            name: Yup.string().max(30, "min30").required("fieldRequest"),
            surname: Yup.string().max(30, "min30").required("fieldRequest"),
            email: Yup.string().email("emailNoValid").required("fieldRequest"),
            phone: Yup.string()
              .matches(phoneRegExp, "phoneNoValid")
              .required("fieldRequest"),
            messagge: Yup.string().required("fieldRequest"),
            acceptedTerms: Yup.boolean()
              .required("fieldRequest")
              .oneOf([true], "acceptCondition"),
          })}
          onSubmit={(formValues) => {
            handleSubmit(formValues);
            router.push("/");
          }}
        >
          <Form>
            <div className="grid gap-2 border border-pink p-4 py-6 lg:grid-cols-2 lg:gap-4 lg:px-8 lg:py-8">
              <MyTextInput
                label={`${translate("firstName", locale)}`}
                locale={locale}
                name="name"
                id="name"
                type="text"
                placeholder={`${translate("firstName", locale)}`}
              />
              <MyTextInput
                label={`${translate("lastName", locale)}`}
                locale={locale}
                name="surname"
                id="surname"
                type="text"
                placeholder={`${translate("lastName", locale)}`}
              />
              <MyTextInput
                label="Email"
                locale={locale}
                name="email"
                id="email"
                type="email"
                placeholder="Email"
              />
              <MyTextInput
                label={`${translate("phone", locale)}`}
                locale={locale}
                name="phone"
                id="phone"
                type="number"
                placeholder={`${translate("phone", locale)}`}
              />
              <div className="lg:col-span-2">
                <MyTextarea
                  label={`${translate("message", locale)}`}
                  locale={locale}
                  name="messagge"
                  id="messagge"
                  type="text"
                  placeholder={`${translate("message", locale)}`}
                />
              </div>
              <div className="lg:col-span-2">
                <MyCheckbox name="acceptedTerms" locale={locale}>
                  <span className="pl-2 text-xs">
                    {translate("privacy_before", locale)}
                    <Link
                      href={`//www.iubenda.com/privacy-policy/${COOKIE_TOKEN}`}
                    >
                      <a
                        target="_blank"
                        className="iubenda-nostyle no-brand iubenda-embed mx-1"
                      >
                        Privacy Policy
                      </a>
                    </Link>
                    {translate("privacy_after", locale)}
                  </span>
                </MyCheckbox>
              </div>
              <div className="mt-2">
                <button
                  className="button mt-2 flex items-center gap-x-2 lg:mt-4"
                  type="submit"
                >
                  <div className="text-sm tracking-wide xl:text-base">
                    {translate("submit", locale)}
                  </div>
                  <ArrowRightIcon
                    className="h-4 w-4 -rotate-45 text-orange duration-200 group-hover:-rotate-[22.5px]"
                    aria-hidden="true"
                  />
                </button>
              </div>
            </div>
          </Form>
        </Formik>
      </div>
    </>
  );
}
