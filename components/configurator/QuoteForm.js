import { Fragment, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XIcon } from '@heroicons/react/outline';
import { ArrowRightIcon, CheckCircleIcon } from '@heroicons/react/solid';
import { Formik, Form, useField } from 'formik';
import * as Yup from 'yup';
import Link from 'next/link';
import translate from 'lib/locales';

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_W3F;

const MyTextInput = ({ locale, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-black/70" htmlFor={props.id || props.name}>
        {label}
      </label>
      <input
        className={`w-full rounded-lg border bg-white px-4 py-3 text-sm transition-colors focus:border-gold focus:outline-none ${
          meta.touched && meta.error ? 'border-red-light' : 'border-pink'
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div className="mt-1 text-xs text-red-light">{translate(meta.error, locale)}</div>
      )}
    </div>
  );
};

const MyTextarea = ({ locale, label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <div>
      <label className="mb-1 block text-xs font-medium text-black/70" htmlFor={props.id || props.name}>
        {label}
      </label>
      <textarea
        rows="4"
        className={`w-full rounded-lg border bg-white px-4 py-3 text-sm transition-colors focus:border-gold focus:outline-none ${
          meta.touched && meta.error ? 'border-red-light' : 'border-pink'
        }`}
        {...field}
        {...props}
      />
      {meta.touched && meta.error && (
        <div className="mt-1 text-xs text-red-light">{translate(meta.error, locale)}</div>
      )}
    </div>
  );
};

const MyCheckbox = ({ locale, children, ...props }) => {
  const [field, meta] = useField({ ...props, type: 'checkbox' });
  return (
    <div>
      <label className="flex cursor-pointer items-start gap-3">
        <input
          type="checkbox"
          className={`mt-1 h-4 w-4 rounded border-pink accent-gold ${
            meta.touched && meta.error ? 'border-red-light' : ''
          }`}
          {...field}
          {...props}
        />
        <span className="text-xs text-black/70">{children}</span>
      </label>
      {meta.touched && meta.error && (
        <div className="mt-1 text-xs text-red-light">{translate(meta.error, locale)}</div>
      )}
    </div>
  );
};

export default function QuoteForm({
  isOpen,
  onClose,
  configSummary,
  locale,
}) {
  const [status, setStatus] = useState(null); // null, 'success', 'error'

  const handleSubmit = async (formValues) => {
    try {
      // Build configuration summary for email
      const configText = [
        `Macchina: ${configSummary?.machine?.title || 'N/A'}`,
        `Funzioni: ${configSummary?.functions?.map(f => f.title).join(', ') || 'N/A'}`,
        `Optional: ${configSummary?.plusFunctions?.map(f => f.title).join(', ') || 'Nessuno'}`,
      ].join('\n');

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          apikey: WEB3FORMS_KEY,
          subject: `Richiesta preventivo configuratore - ${configSummary?.machine?.title}`,
          from_name: 'www.quintibottling.com',
          Nome: formValues.name,
          Cognome: formValues.surname,
          Azienda: formValues.company,
          Email: formValues.email,
          Telefono: formValues.phone,
          Messaggio: formValues.message,
          'Configurazione': configText,
        }),
      });

      const result = await response.json();
      if (result.success) {
        setStatus('success');
      } else {
        setStatus('error');
      }
    } catch (error) {
      setStatus('error');
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
            <div className="relative w-full max-w-2xl transform overflow-hidden rounded-2xl bg-pink-light shadow-xl transition-all">
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white transition-colors hover:bg-brown hover:text-white"
              >
                <XIcon className="h-5 w-5" />
              </button>

              {status === 'success' ? (
                // Success state
                <div className="p-8 text-center">
                  <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green/20">
                    <CheckCircleIcon className="h-10 w-10 text-green" />
                  </div>
                  <h3 className="mb-2 text-2xl font-bold text-black">
                    Richiesta Inviata!
                  </h3>
                  <p className="mb-6 text-black/70">
                    Grazie per averci contattato. Ti risponderemo il prima possibile.
                  </p>
                  <button
                    onClick={handleClose}
                    className="rounded-lg bg-gold px-6 py-3 text-sm font-medium text-white transition-colors hover:bg-gold-light"
                  >
                    Chiudi
                  </button>
                </div>
              ) : (
                // Form state
                <div className="p-6 lg:p-8">
                  {/* Header */}
                  <div className="mb-6">
                    <h3 className="text-2xl font-bold text-black">
                      Richiedi Preventivo
                    </h3>
                    <p className="mt-1 text-sm text-black/70">
                      Compila il form per ricevere un preventivo personalizzato
                    </p>
                  </div>

                  {/* Configuration Summary */}
                  <div className="mb-6 rounded-lg border border-pink bg-white p-4">
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-black/50">
                      Riepilogo Configurazione
                    </h4>
                    <div className="mb-3 text-lg font-bold text-gold">
                      Diamond Oil {configSummary?.machine?.title?.toUpperCase()}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {configSummary?.functions?.map((fn) => (
                        <span
                          key={fn.id}
                          className="rounded bg-gold/10 px-2 py-1 text-xs font-medium text-gold"
                        >
                          {fn.title}
                        </span>
                      ))}
                      {configSummary?.plusFunctions?.map((fn) => (
                        <span
                          key={fn.id}
                          className="rounded bg-green/10 px-2 py-1 text-xs font-medium text-green"
                        >
                          {fn.title}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Form */}
                  <Formik
                    initialValues={{
                      name: '',
                      surname: '',
                      company: '',
                      email: '',
                      phone: '',
                      message: '',
                      acceptedTerms: false,
                    }}
                    validationSchema={Yup.object({
                      name: Yup.string().required('fieldRequest'),
                      surname: Yup.string().required('fieldRequest'),
                      company: Yup.string().required('fieldRequest'),
                      email: Yup.string().email('emailNoValid').required('fieldRequest'),
                      phone: Yup.string().required('fieldRequest'),
                      acceptedTerms: Yup.boolean()
                        .required('fieldRequest')
                        .oneOf([true], 'acceptCondition'),
                    })}
                    onSubmit={handleSubmit}
                  >
                    <Form>
                      <div className="grid gap-4 lg:grid-cols-2">
                        <MyTextInput
                          label="Nome *"
                          locale={locale}
                          name="name"
                          type="text"
                          placeholder="Nome"
                        />
                        <MyTextInput
                          label="Cognome *"
                          locale={locale}
                          name="surname"
                          type="text"
                          placeholder="Cognome"
                        />
                        <MyTextInput
                          label="Azienda *"
                          locale={locale}
                          name="company"
                          type="text"
                          placeholder="Azienda"
                        />
                        <MyTextInput
                          label="Telefono *"
                          locale={locale}
                          name="phone"
                          type="tel"
                          placeholder="Telefono"
                        />
                        <div className="lg:col-span-2">
                          <MyTextInput
                            label="Email *"
                            locale={locale}
                            name="email"
                            type="email"
                            placeholder="Email"
                          />
                        </div>
                        <div className="lg:col-span-2">
                          <MyTextarea
                            label="Messaggio o richieste particolari"
                            locale={locale}
                            name="message"
                            placeholder="Scrivi qui..."
                          />
                        </div>
                        <div className="lg:col-span-2">
                          <MyCheckbox name="acceptedTerms" locale={locale}>
                            Accetto la{' '}
                            <Link href="/privacy-policy">
                              <a className="underline hover:text-gold">Privacy Policy</a>
                            </Link>{' '}
                            *
                          </MyCheckbox>
                        </div>
                      </div>

                      {status === 'error' && (
                        <div className="mt-4 rounded-lg bg-red-light/10 p-3 text-sm text-red-light">
                          Si è verificato un errore. Riprova più tardi.
                        </div>
                      )}

                      <div className="mt-6">
                        <button
                          type="submit"
                          className="group flex w-full items-center justify-center gap-2 rounded-lg bg-gold px-6 py-4 text-sm font-medium text-white transition-colors hover:bg-gold-light lg:w-auto"
                        >
                          <span>Invia Richiesta</span>
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
