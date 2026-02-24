import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { ArrowRightIcon, CheckIcon } from "@heroicons/react/solid";
import { Formik, Form, useField } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import translate from "lib/locales";

const MyTextInput = ({ locale, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        className="mb-1 block text-xxs text-black"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <input
        className={`w-full rounded-md border bg-white px-4 py-3 text-xs transition-colors focus:border-gold focus:outline-none ${
          meta.touched && meta.error ? "border-red-light" : "border-black/40"
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div className="mt-1 text-xs text-red-light">
          {translate(meta.error, locale)}
        </div>
      )}
    </div>
  );
};

const MyTextarea = ({ locale, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label
        className="mb-1 block text-xs font-medium text-black/70"
        htmlFor={props.id || props.name}
      >
        {label}
      </label>
      <textarea
        rows="4"
        className={`w-full rounded-lg border bg-white px-4 py-3 text-xs transition-colors focus:border-gold focus:outline-none ${
          meta.touched && meta.error ? "border-red-light" : "border-pink"
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div className="mt-1 text-xs text-red-light">
          {translate(meta.error, locale)}
        </div>
      )}
    </div>
  );
};

const MyCheckbox = ({ locale, children, ...props }) => {
  const [field, meta] = useField({ ...props, type: "checkbox" });
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          className={`mt-1 h-4 w-4 rounded border-pink accent-gold ${
            meta.touched && meta.error ? "border-red-light" : ""
          }`}
          {...field}
          {...props}
        />
        <span className="text-xs text-black/70">{children}</span>
      </label>
      {meta.touched && meta.error && (
        <div className="mt-1 text-xs text-red-light">
          {translate(meta.error, locale)}
        </div>
      )}
    </div>
  );
};

export default function QuoteForm({ isOpen, onClose, configSummary, locale }) {
  const [status, setStatus] = useState(null); // null, 'success', 'error'

  const handleSubmit = async (formValues) => {
    try {
      const payload = {
        nome: formValues.name,
        cognome: formValues.surname,
        azienda: formValues.company,
        partita_iva: formValues.vat,
        telefono: formValues.phone,
        email: formValues.email,
        messaggio: formValues.message,
        macchina: configSummary?.machine?.title || "N/A",
        funzioni:
          configSummary?.functions?.map((f) => f.title).join(", ") || "N/A",
        optional:
          configSummary?.plusFunctions?.map((f) => f.title).join(", ") ||
          "Nessuno",
      };

      const formData = new URLSearchParams();
      Object.entries(payload).forEach(([key, value]) => {
        formData.append(key, value);
      });

      const response = await fetch(
        "https://hooks.zapier.com/hooks/catch/426384/uc7wupg/",
        {
          method: "POST",
          body: formData,
        },
      );

      if (response.ok) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (error) {
      setStatus("error");
    }
  };

  const handleClose = () => {
    setStatus(null);
    onClose();
  };

  return (
    <Transition.Root show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="fixed inset-0 z-50 overflow-y-auto"
        onClose={handleClose}
      >
        <div className="flex min-h-screen items-center justify-center p-4">
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Dialog.Overlay className="fixed inset-0 bg-black/60 transition-opacity" />
          </Transition.Child>

          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-white shadow-xl transition-all">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white transition-colors hover:bg-brown hover:text-white"
              >
                <XIcon className="h-5 w-5" />
              </button>

              {status === "success" ? (
                // Success state
                <div className="p-8 text-center lg:p-12">
                  <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-dark">
                    <CheckIcon className="h-12 w-12 text-white" />
                  </div>
                  <h3 className="mt-4 block text-lg font-bold uppercase text-orange-dark">
                    {translate("quoteSuccess", locale)}
                  </h3>
                  <p className="mb-6 text-lg text-black/80">
                    {translate("quoteSuccessMsg", locale)}
                  </p>
                  <button
                    onClick={handleClose}
                    className="rounded-full border border-black px-6 py-3 text-sm font-medium text-black transition-colors hover:bg-gold-light"
                  >
                    {translate("close", locale)}
                  </button>
                </div>
              ) : (
                // Form state
                <div className="p-6 lg:p-8">
                  {/* Header */}
                  <div className="mb-6 text-center">
                    <h3 className="text-xxs uppercase text-orange-dark">
                      {translate("quoteTitle", locale)}
                    </h3>
                    <p className="mt-1 text-sm text-black/70">
                      {translate("quoteSubtitle", locale)}
                    </p>
                  </div>

                  {/* Configuration Summary */}
                  <div className="mb-6 rounded-lg text-center">
                    <div className="mb-7 text-lg text-gold">
                      Diamond Oil
                      <span className="ml-1.5 font-bold uppercase">
                        {configSummary?.machine?.title}
                      </span>
                    </div>
                    <p className="mt-1 mb-8 text-sm text-black/70">
                      {translate("quoteDescription", locale)}
                    </p>
                  </div>

                  {/* Form */}
                  <Formik
                    initialValues={{
                      name: "",
                      surname: "",
                      company: "",
                      vat: "",
                      phone: "",
                      email: "",
                      message: "",
                      acceptedTerms: false,
                    }}
                    validationSchema={Yup.object({
                      name: Yup.string().required("fieldRequest"),
                      surname: Yup.string().required("fieldRequest"),
                      company: Yup.string().required("fieldRequest"),
                      vat: Yup.string().required("fieldRequest"),
                      phone: Yup.string().required("fieldRequest"),
                      email: Yup.string()
                        .email("emailNoValid")
                        .required("fieldRequest"),
                      acceptedTerms: Yup.boolean()
                        .required("fieldRequest")
                        .oneOf([true], "acceptCondition"),
                    })}
                    onSubmit={handleSubmit}
                  >
                    <Form className="">
                      <div className="grid gap-4 bg-gray-dark/5 p-6 lg:grid-cols-2">
                        <MyTextInput
                          label={`${translate("firstName", locale)} *`}
                          locale={locale}
                          name="name"
                          type="text"
                          placeholder={translate("firstName", locale)}
                        />
                        <MyTextInput
                          label={`${translate("lastName", locale)} *`}
                          locale={locale}
                          name="surname"
                          type="text"
                          placeholder={translate("lastName", locale)}
                        />
                        <MyTextInput
                          label={`${translate("company", locale)} *`}
                          locale={locale}
                          name="company"
                          type="text"
                          placeholder={translate("company", locale)}
                        />
                        <MyTextInput
                          label={`${translate("vat", locale)} *`}
                          locale={locale}
                          name="vat"
                          type="text"
                          placeholder={translate("vat", locale)}
                        />
                        <MyTextInput
                          label={`${translate("phone", locale)} *`}
                          locale={locale}
                          name="phone"
                          type="tel"
                          placeholder={translate("phone", locale)}
                        />
                        <MyTextInput
                          label={`${translate("email", locale)} *`}
                          locale={locale}
                          name="email"
                          type="email"
                          placeholder={translate("email", locale)}
                        />
                        <div className="lg:col-span-2">
                          <MyTextarea
                            label={translate("messageLabel", locale)}
                            locale={locale}
                            name="message"
                            placeholder={translate("writePlaceholder", locale)}
                          />
                        </div>
                        <div className="lg:col-span-2">
                          <MyCheckbox name="acceptedTerms" locale={locale}>
                            {translate("acceptPrivacy", locale)}{" "}
                            <Link href="/privacy-policy">
                              <a className="underline hover:text-gold">
                                Privacy Policy
                              </a>
                            </Link>{" "}
                            *
                          </MyCheckbox>
                        </div>
                      </div>

                      {status === "error" && (
                        <div className="mt-4 rounded-lg bg-red-light/10 p-3 text-sm text-red-light">
                          {translate("quoteError", locale)}
                        </div>
                      )}

                      <div className="mt-6 text-center">
                        <button
                          type="submit"
                          className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-orange-dark px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-gold-light lg:w-auto lg:px-10"
                        >
                          <span>{translate("quoteSubmit", locale)}</span>
                          <ArrowRightIcon className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                        </button>
                      </div>
                    </Form>
                  </Formik>
                </div>
              )}
            </div>
          </Transition.Child>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
