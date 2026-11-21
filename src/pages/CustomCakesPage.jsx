import { useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  MessageCircle,
  ArrowRight,
  X,
  Check,
  Info,
  ImagePlus,
  Phone,
  Paperclip,
} from 'lucide-react';
import Seo from '../components/seo/Seo.jsx';
import PageHeader from '../components/ui/PageHeader.jsx';
import Picture from '../components/media/Picture.jsx';
import Reveal from '../components/ui/Reveal.jsx';
import {
  FLAVOUR_OPTIONS,
  WEIGHT_OPTIONS,
  DIETARY_OPTIONS,
  validateEnquiry,
  validateImage,
  todayISO,
  IMAGE_RULES,
} from '../lib/validation.js';
import { buildWhatsAppUrl, customCakeMessage } from '../lib/whatsapp.js';
import { BUSINESS, PHONE_HREF } from '../data/business.js';
import { bakerySchema } from '../lib/schema.js';
import { formatDateLong } from '../lib/format.js';
import { cn } from '../lib/cn.js';

const EMPTY = {
  name: '',
  phone: '',
  flavour: '',
  weight: '',
  dietaryType: '',
  theme: '',
  message: '',
  requiredDate: '',
  instructions: '',
};

export default function CustomCakesPage() {
  const [values, setValues] = useState(EMPTY);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [image, setImage] = useState(null);
  const [imageError, setImageError] = useState('');
  const [status, setStatus] = useState('idle'); // idle | ready
  const [lastUrl, setLastUrl] = useState('');
  const formRef = useRef(null);
  const fileRef = useRef(null);
  const errorSummaryRef = useRef(null);

  const minDate = useMemo(() => todayISO(), []);

  function update(field, value) {
    setValues((current) => ({ ...current, [field]: value }));
    if (errors[field]) {
      setErrors((current) => {
        const next = { ...current };
        delete next[field];
        return next;
      });
    }
    setStatus('idle');
  }

  function blur(field) {
    setTouched((current) => ({ ...current, [field]: true }));
  }

  function handleImage(event) {
    const file = event.target.files?.[0] || null;
    const result = validateImage(file);
    if (!result.valid) {
      setImageError(result.message);
      setImage(null);
      if (fileRef.current) fileRef.current.value = '';
      return;
    }
    setImageError('');
    setImage(file);
  }

  function clearImage() {
    setImage(null);
    setImageError('');
    if (fileRef.current) fileRef.current.value = '';
  }

  function handleSubmit(event) {
    event.preventDefault();
    const { valid, errors: nextErrors } = validateEnquiry(values);
    setTouched(
      Object.fromEntries(Object.keys(EMPTY).map((key) => [key, true])),
    );

    if (!valid) {
      setErrors(nextErrors);
      setStatus('idle');
      // Move focus to the error summary for screen-reader users.
      window.requestAnimationFrame(() => {
        errorSummaryRef.current?.focus();
      });
      return;
    }

    setErrors({});
    const url = buildWhatsAppUrl(
      customCakeMessage({ ...values, hasReferenceImage: Boolean(image) }),
    );
    setLastUrl(url);
    setStatus('ready');
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  const errorEntries = Object.entries(errors);

  const jsonLd = useMemo(() => bakerySchema(), []);

  return (
    <>
      <Seo
        title="Custom Cakes in Madurai — Cake N Crush Cake Studio"
        description="Design a customised celebration cake with Cake N Crush, Madurai. Choose flavour, weight, eggless or regular, theme and date, then send your enquiry straight to the bakery on WhatsApp."
        path="/custom-cakes"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Custom Cakes', path: '/custom-cakes' },
        ]}
        jsonLd={jsonLd}
      />

      <PageHeader
        eyebrow="Custom Cake Studio"
        title="Tell us the occasion. We will tell you what is possible."
        lede="A guided enquiry, not a checkout. Fill this in once and it arrives at the bakery as a neatly formatted WhatsApp message."
      />

      <div className="bg-vanilla pb-20 pt-10 md:pb-24 md:pt-14">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <form ref={formRef} onSubmit={handleSubmit} noValidate className="space-y-7">
                {errorEntries.length > 0 ? (
                  <div
                    ref={errorSummaryRef}
                    tabIndex={-1}
                    role="alert"
                    className="border border-cherry/50 bg-cherry-soft p-4"
                  >
                    <p className="text-sm font-semibold text-cherry-deep">
                      Please check {errorEntries.length}{' '}
                      {errorEntries.length === 1 ? 'field' : 'fields'} before sending.
                    </p>
                    <ul className="mt-2 space-y-1">
                      {errorEntries.map(([key, message]) => (
                        <li key={key} className="text-[0.8125rem] text-ink-soft">
                          <a
                            href={`#field-${key}`}
                            className="underline decoration-cherry/40 underline-offset-2 hover:text-cherry-deep"
                          >
                            {message}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                <fieldset className="space-y-5">
                  <legend className="eyebrow mb-4">1 — About you</legend>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="field-name" className="field-label">
                        Your name <span className="text-cherry-deep">*</span>
                      </label>
                      <input
                        id="field-name"
                        name="name"
                        type="text"
                        autoComplete="name"
                        value={values.name}
                        onChange={(event) => update('name', event.target.value)}
                        onBlur={() => blur('name')}
                        className="field"
                        aria-invalid={touched.name && errors.name ? 'true' : undefined}
                        aria-describedby={errors.name ? 'error-name' : undefined}
                        placeholder="e.g. Priya Raman"
                        required
                      />
                      {touched.name && errors.name ? (
                        <p id="error-name" className="field-error">{errors.name}</p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="field-phone" className="field-label">
                        Phone number <span className="text-cherry-deep">*</span>
                      </label>
                      <input
                        id="field-phone"
                        name="phone"
                        type="tel"
                        inputMode="tel"
                        autoComplete="tel"
                        value={values.phone}
                        onChange={(event) => update('phone', event.target.value)}
                        onBlur={() => blur('phone')}
                        className="field"
                        aria-invalid={touched.phone && errors.phone ? 'true' : undefined}
                        aria-describedby={errors.phone ? 'error-phone' : 'hint-phone'}
                        placeholder="10-digit mobile number"
                        required
                      />
                      {touched.phone && errors.phone ? (
                        <p id="error-phone" className="field-error">{errors.phone}</p>
                      ) : (
                        <p id="hint-phone" className="mt-1.5 text-[0.75rem] text-ink-faint">
                          Used only so the bakery can reply.
                        </p>
                      )}
                    </div>
                  </div>
                </fieldset>

                <hr className="rule" />

                <fieldset className="space-y-5">
                  <legend className="eyebrow mb-4">2 — The cake</legend>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="field-flavour" className="field-label">
                        Cake flavour <span className="text-cherry-deep">*</span>
                      </label>
                      <select
                        id="field-flavour"
                        name="flavour"
                        value={values.flavour}
                        onChange={(event) => update('flavour', event.target.value)}
                        onBlur={() => blur('flavour')}
                        className="field"
                        aria-invalid={touched.flavour && errors.flavour ? 'true' : undefined}
                        aria-describedby={errors.flavour ? 'error-flavour' : undefined}
                        required
                      >
                        <option value="">Select a flavour</option>
                        {FLAVOUR_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {touched.flavour && errors.flavour ? (
                        <p id="error-flavour" className="field-error">{errors.flavour}</p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="field-weight" className="field-label">
                        Cake weight <span className="text-cherry-deep">*</span>
                      </label>
                      <select
                        id="field-weight"
                        name="weight"
                        value={values.weight}
                        onChange={(event) => update('weight', event.target.value)}
                        onBlur={() => blur('weight')}
                        className="field"
                        aria-invalid={touched.weight && errors.weight ? 'true' : undefined}
                        aria-describedby={errors.weight ? 'error-weight' : undefined}
                        required
                      >
                        <option value="">Select a weight</option>
                        {WEIGHT_OPTIONS.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                      {touched.weight && errors.weight ? (
                        <p id="error-weight" className="field-error">{errors.weight}</p>
                      ) : null}
                    </div>
                  </div>

                  <fieldset>
                    <legend className="field-label">
                      Eggless or regular <span className="text-cherry-deep">*</span>
                    </legend>
                    <div className="grid grid-cols-2 gap-2">
                      {DIETARY_OPTIONS.map((option) => {
                        const selected = values.dietaryType === option;
                        return (
                          <label
                            key={option}
                            className={cn(
                              'flex cursor-pointer items-center justify-between border px-4 py-3 text-sm transition-all duration-300',
                              selected
                                ? 'border-ink bg-ink text-vanilla'
                                : 'border-line bg-shell text-ink hover:border-ink/40',
                            )}
                          >
                            <span>{option}</span>
                            <span
                              aria-hidden="true"
                              className={cn(
                                'flex h-4 w-4 items-center justify-center rounded-full border',
                                selected ? 'border-vanilla bg-vanilla text-chocolate' : 'border-line',
                              )}
                            >
                              {selected ? <Check className="h-2.5 w-2.5" strokeWidth={3} /> : null}
                            </span>
                            <input
                              type="radio"
                              name="dietaryType"
                              value={option}
                              checked={selected}
                              onChange={() => update('dietaryType', option)}
                              className="sr-only"
                            />
                          </label>
                        );
                      })}
                    </div>
                    {touched.dietaryType && errors.dietaryType ? (
                      <p id="error-dietaryType" className="field-error">
                        {errors.dietaryType}
                      </p>
                    ) : null}
                  </fieldset>

                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="field-theme" className="field-label">
                        Theme / occasion <span className="text-cherry-deep">*</span>
                      </label>
                      <input
                        id="field-theme"
                        name="theme"
                        type="text"
                        value={values.theme}
                        onChange={(event) => update('theme', event.target.value)}
                        onBlur={() => blur('theme')}
                        className="field"
                        aria-invalid={touched.theme && errors.theme ? 'true' : undefined}
                        aria-describedby={errors.theme ? 'error-theme' : undefined}
                        placeholder="e.g. 30th birthday, gold and cream"
                        maxLength={120}
                        required
                      />
                      {touched.theme && errors.theme ? (
                        <p id="error-theme" className="field-error">{errors.theme}</p>
                      ) : null}
                    </div>

                    <div>
                      <label htmlFor="field-requiredDate" className="field-label">
                        Required date <span className="text-cherry-deep">*</span>
                      </label>
                      <input
                        id="field-requiredDate"
                        name="requiredDate"
                        type="date"
                        min={minDate}
                        value={values.requiredDate}
                        onChange={(event) => update('requiredDate', event.target.value)}
                        onBlur={() => blur('requiredDate')}
                        className="field"
                        aria-invalid={touched.requiredDate && errors.requiredDate ? 'true' : undefined}
                        aria-describedby={
                          errors.requiredDate ? 'error-requiredDate' : 'hint-requiredDate'
                        }
                        required
                      />
                      {touched.requiredDate && errors.requiredDate ? (
                        <p id="error-requiredDate" className="field-error">
                          {errors.requiredDate}
                        </p>
                      ) : (
                        <p id="hint-requiredDate" className="mt-1.5 text-[0.75rem] text-ink-faint">
                          Custom cakes usually need advance notice — the bakery will confirm.
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="field-message" className="field-label">
                      Personalised message <span className="font-normal normal-case tracking-normal text-ink-faint">(optional)</span>
                    </label>
                    <input
                      id="field-message"
                      name="message"
                      type="text"
                      value={values.message}
                      onChange={(event) => update('message', event.target.value)}
                      onBlur={() => blur('message')}
                      className="field"
                      aria-invalid={touched.message && errors.message ? 'true' : undefined}
                      aria-describedby={errors.message ? 'error-message' : 'hint-message'}
                      placeholder="e.g. Happy Birthday, Amma"
                      maxLength={80}
                    />
                    {touched.message && errors.message ? (
                      <p id="error-message" className="field-error">{errors.message}</p>
                    ) : (
                      <p id="hint-message" className="mt-1.5 text-[0.75rem] text-ink-faint">
                        {values.message.length}/80 characters
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="field-instructions" className="field-label">
                      Additional instructions{' '}
                      <span className="font-normal normal-case tracking-normal text-ink-faint">(optional)</span>
                    </label>
                    <textarea
                      id="field-instructions"
                      name="instructions"
                      rows={4}
                      value={values.instructions}
                      onChange={(event) => update('instructions', event.target.value)}
                      onBlur={() => blur('instructions')}
                      className="field resize-y"
                      aria-invalid={touched.instructions && errors.instructions ? 'true' : undefined}
                      aria-describedby={errors.instructions ? 'error-instructions' : undefined}
                      placeholder="Colours, flavours to avoid, collection time, anything else we should know."
                      maxLength={800}
                    />
                    {touched.instructions && errors.instructions ? (
                      <p id="error-instructions" className="field-error">{errors.instructions}</p>
                    ) : null}
                  </div>
                </fieldset>

                <hr className="rule" />

                <fieldset>
                  <legend className="eyebrow mb-4">3 — Reference image</legend>
                  <label
                    htmlFor="field-image"
                    className="flex cursor-pointer flex-col items-center justify-center border border-dashed border-line bg-shell/60 px-5 py-8 text-center transition-colors hover:border-cherry/60"
                  >
                    <ImagePlus className="h-6 w-6 text-ink-faint" aria-hidden="true" strokeWidth={1.5} />
                    <span className="mt-3 text-sm font-medium text-ink">
                      {image ? image.name : 'Choose a reference image'}
                    </span>
                    <span className="mt-1 text-[0.75rem] text-ink-faint">
                      Optional · JPG, PNG, WebP or HEIC · up to 5 MB
                    </span>
                    <input
                      ref={fileRef}
                      id="field-image"
                      name="reference"
                      type="file"
                      accept={IMAGE_RULES.acceptedTypes.join(',')}
                      onChange={handleImage}
                      className="sr-only"
                    />
                  </label>
                  {image ? (
                    <div className="mt-2 flex items-center justify-between gap-3 border border-line-soft bg-shell px-3 py-2">
                      <span className="flex min-w-0 items-center gap-2 text-[0.75rem] text-ink-soft">
                        <Paperclip className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                        <span className="truncate">{image.name}</span>
                        <span className="shrink-0 text-ink-faint">
                          ({Math.round(image.size / 1024)} KB)
                        </span>
                      </span>
                      <button
                        type="button"
                        onClick={clearImage}
                        className="flex h-7 w-7 shrink-0 items-center justify-center text-ink-faint hover:text-cherry-deep"
                        aria-label="Remove reference image"
                      >
                        <X className="h-3.5 w-3.5" aria-hidden="true" />
                      </button>
                    </div>
                  ) : null}
                  {imageError ? (
                    <p className="field-error" role="alert">{imageError}</p>
                  ) : null}
                  <p className="mt-3 flex gap-2 text-[0.75rem] leading-relaxed text-ink-faint">
                    <Info className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    This site cannot attach files to WhatsApp. After your enquiry opens,
                    tap the attachment icon in the chat and send the image from there.
                  </p>
                </fieldset>

                <div className="border-t border-line-soft pt-6">
                  <button type="submit" className="btn btn-primary w-full sm:w-auto">
                    <MessageCircle className="h-4 w-4" aria-hidden="true" />
                    Send enquiry on WhatsApp
                  </button>
                  <p className="mt-3 text-[0.75rem] leading-relaxed text-ink-faint">
                    Opening WhatsApp does not confirm your order or reserve a date. The
                    bakery will reply to confirm feasibility and price.
                  </p>
                </div>

                {status === 'ready' ? (
                  <div
                    role="status"
                    aria-live="polite"
                    className="border border-cherry/40 bg-cherry-soft p-4"
                  >
                    <p className="flex items-center gap-2 text-sm font-semibold text-ink">
                      <Check className="h-4 w-4 text-cherry-deep" aria-hidden="true" />
                      Your enquiry is ready in WhatsApp
                    </p>
                    <p className="mt-1.5 text-[0.8125rem] leading-relaxed text-ink-soft">
                      If WhatsApp did not open automatically, use the link below. Press
                      send in the chat — the message is not delivered until you do.
                    </p>
                    <div className="mt-3 flex flex-wrap items-center gap-4">
                      <a
                        href={lastUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-[0.8125rem] font-semibold text-cherry-deep underline underline-offset-4"
                      >
                        Open WhatsApp again
                        <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
                      </a>
                      <span className="text-[0.75rem] text-ink-faint">
                        {values.name ? `${values.name} · ` : ''}
                        {values.requiredDate ? formatDateLong(values.requiredDate) : ''}
                      </span>
                    </div>
                  </div>
                ) : null}
              </form>
            </div>

            <aside className="lg:col-span-5">
              <div className="sticky top-28 space-y-5">
                <Picture
                  name="gallery-custom"
                  alt="Illustrative editorial styling of a two-tier bespoke cake with piped buttercream, gold leaf and dried florals"
                  className="aspect-[4/5] w-full"
                  sizes="(min-width: 1024px) 38vw, 100vw"
                  showPlaceholderNote
                />

                <div className="border border-line-soft bg-shell/70 p-5">
                  <h2 className="font-display text-xl text-ink">How this works</h2>
                  <ol className="mt-3 space-y-3 text-[0.8125rem] leading-relaxed text-ink-soft">
                    {[
                      'Complete the fields — the details become one message.',
                      'WhatsApp opens with the message written for you; you press send.',
                      'Attach any reference image inside the chat.',
                      'The bakery confirms feasibility, price and collection.',
                    ].map((step, index) => (
                      <li key={step} className="flex gap-3">
                        <span
                          aria-hidden="true"
                          className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border border-cherry/40 text-[0.625rem] font-semibold text-cherry-deep"
                        >
                          {index + 1}
                        </span>
                        {step}
                      </li>
                    ))}
                  </ol>
                  <div className="mt-5 border-t border-line-soft pt-4">
                    <p className="text-[0.75rem] leading-relaxed text-ink-faint">
                      Prefer to talk it through? Call the bakery directly.
                    </p>
                    <a
                      href={PHONE_HREF}
                      className="mt-2 inline-flex items-center gap-2 font-display text-lg text-ink transition-colors hover:text-cherry-deep"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {BUSINESS.phoneDisplay}
                    </a>
                  </div>
                </div>

                <p className="text-[0.75rem] leading-relaxed text-ink-faint">
                  Looking for a standard cake instead?{' '}
                  <Link to="/menu" className="underline underline-offset-4 hover:text-ink">
                    Browse the menu
                  </Link>{' '}
                  — most celebration cakes can be ordered the same way.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </div>
    </>
  );
}
