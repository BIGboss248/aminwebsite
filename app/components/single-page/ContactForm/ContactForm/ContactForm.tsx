"use client";

import React, { useState } from "react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";
import type {
  ContactFormProps,
  FormErrors,
  FormValues,
} from "./ContactForm.types";

export function ContactForm({
  className = "",
}: ContactFormProps): React.JSX.Element {
  const t = useTranslations("contact.form");

  const [values, setValues] = useState<FormValues>({
    name: "",
    email: "",
    subject: "",
    message: "",
    _hp: "",
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validate = (): boolean => {
    const errs: FormErrors = {};

    if (!values.name.trim()) {
      errs.name = t("val_name_required");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!values.email.trim() || !emailRegex.test(values.email.trim())) {
      errs.email = t("val_email_invalid");
    }

    if (!values.subject.trim()) {
      errs.subject = t("val_subject_required");
    }

    if (!values.message.trim() || values.message.trim().length < 10) {
      errs.message = t("val_message_short");
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setErrors({});

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });

      const data = await response.json();

      if (response.status === 429) {
        setErrors({ form: t("error_rate_limit") });
        setIsSubmitting(false);
        return;
      }

      if (!response.ok || !data.success) {
        setErrors({ form: t("error_generic") });
        setIsSubmitting(false);
        return;
      }

      setIsSuccess(true);
    } catch {
      setErrors({ form: t("error_generic") });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setValues({
      name: "",
      email: "",
      subject: "",
      message: "",
      _hp: "",
    });
    setErrors({});
    setIsSuccess(false);
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-border bg-card p-6 sm:p-8 text-card-foreground shadow-sm transition-colors",
        className,
      )}
    >
      <h2 className="text-xl sm:text-2xl font-bold tracking-tight text-foreground mb-6">
        {t("title")}
      </h2>

      {isSuccess ? (
        <div
          data-testid="contact-form-success"
          className="p-6 sm:p-8 rounded-xl border border-status-success/30 bg-status-success/5 flex flex-col items-center text-center space-y-4 animate-in fade-in zoom-in-95 duration-200"
        >
          <div className="size-14 rounded-full bg-status-success/10 border border-status-success/30 text-status-success flex items-center justify-center">
            <svg
              className="size-7"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <polyline points="20 6 9 17 4 12" />
            </svg>
          </div>

          <div className="space-y-1.5">
            <h3 className="text-lg sm:text-xl font-bold text-foreground">
              {t("success_title")}
            </h3>
            <p className="text-sm text-muted-foreground max-w-md leading-relaxed">
              {t("success_desc")}
            </p>
          </div>

          <button
            type="button"
            onClick={handleReset}
            className="inline-flex items-center justify-center px-5 py-2.5 rounded-lg border border-border bg-background text-foreground font-medium text-sm hover:bg-muted hover:text-foreground transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary cursor-pointer mt-2"
          >
            {t("send_another")}
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} noValidate className="space-y-5">
          {/* Honeypot hidden input */}
          <div
            aria-hidden="true"
            style={{ display: "none", position: "absolute", left: "-9999px" }}
          >
            <label htmlFor="contact-hp">Ignore this field</label>
            <input
              id="contact-hp"
              type="text"
              name="_hp"
              value={values._hp}
              onChange={(e) => setValues({ ...values, _hp: e.target.value })}
              tabIndex={-1}
              autoComplete="off"
            />
          </div>

          {errors.form && (
            <div
              role="alert"
              className="p-3.5 rounded-lg border border-destructive/30 bg-destructive/10 text-destructive text-sm flex items-center gap-2.5"
            >
              <svg
                className="size-5 shrink-0"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              <span>{errors.form}</span>
            </div>
          )}

          {/* Full Name */}
          <div className="space-y-2">
            <label
              htmlFor="contact-name"
              className="block text-sm font-medium text-foreground"
            >
              {t("name_label")}{" "}
              <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-name"
              type="text"
              required
              value={values.name}
              onChange={(e) =>
                setValues({ ...values, name: e.target.value })
              }
              placeholder={t("name_placeholder")}
              className={cn(
                "w-full px-4 py-2.5 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-11",
                errors.name
                  ? "border-destructive focus-visible:ring-destructive"
                  : "border-border",
              )}
              aria-invalid={Boolean(errors.name)}
              aria-describedby={errors.name ? "contact-name-error" : undefined}
            />
            {errors.name && (
              <p
                id="contact-name-error"
                className="text-xs text-destructive font-medium"
              >
                {errors.name}
              </p>
            )}
          </div>

          {/* Email Address */}
          <div className="space-y-2">
            <label
              htmlFor="contact-email"
              className="block text-sm font-medium text-foreground"
            >
              {t("email_label")}{" "}
              <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-email"
              type="email"
              required
              value={values.email}
              onChange={(e) =>
                setValues({ ...values, email: e.target.value })
              }
              placeholder={t("email_placeholder")}
              className={cn(
                "w-full px-4 py-2.5 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-11",
                errors.email
                  ? "border-destructive focus-visible:ring-destructive"
                  : "border-border",
              )}
              aria-invalid={Boolean(errors.email)}
              aria-describedby={errors.email ? "contact-email-error" : undefined}
            />
            {errors.email && (
              <p
                id="contact-email-error"
                className="text-xs text-destructive font-medium"
              >
                {errors.email}
              </p>
            )}
          </div>

          {/* Subject */}
          <div className="space-y-2">
            <label
              htmlFor="contact-subject"
              className="block text-sm font-medium text-foreground"
            >
              {t("subject_label")}{" "}
              <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <input
              id="contact-subject"
              type="text"
              required
              value={values.subject}
              onChange={(e) =>
                setValues({ ...values, subject: e.target.value })
              }
              placeholder={t("subject_placeholder")}
              className={cn(
                "w-full px-4 py-2.5 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary min-h-11",
                errors.subject
                  ? "border-destructive focus-visible:ring-destructive"
                  : "border-border",
              )}
              aria-invalid={Boolean(errors.subject)}
              aria-describedby={errors.subject ? "contact-subject-error" : undefined}
            />
            {errors.subject && (
              <p
                id="contact-subject-error"
                className="text-xs text-destructive font-medium"
              >
                {errors.subject}
              </p>
            )}
          </div>

          {/* Message */}
          <div className="space-y-2">
            <label
              htmlFor="contact-message"
              className="block text-sm font-medium text-foreground"
            >
              {t("message_label")}{" "}
              <span className="text-destructive" aria-hidden="true">*</span>
            </label>
            <textarea
              id="contact-message"
              rows={5}
              required
              value={values.message}
              onChange={(e) =>
                setValues({ ...values, message: e.target.value })
              }
              placeholder={t("message_placeholder")}
              className={cn(
                "w-full px-4 py-2.5 rounded-lg border bg-background text-foreground text-sm placeholder:text-muted-foreground/60 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary resize-y min-h-28",
                errors.message
                  ? "border-destructive focus-visible:ring-destructive"
                  : "border-border",
              )}
              aria-invalid={Boolean(errors.message)}
              aria-describedby={errors.message ? "contact-message-error" : undefined}
            />
            {errors.message && (
              <p
                id="contact-message-error"
                className="text-xs text-destructive font-medium"
              >
                {errors.message}
              </p>
            )}
          </div>

          {/* Submit button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-primary-foreground font-semibold text-sm hover:bg-primary/90 transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm cursor-pointer"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="size-4 animate-spin"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <circle cx="12" cy="12" r="10" strokeDasharray="32" strokeDashoffset="12" />
                  </svg>
                  <span>{t("submitting_btn")}</span>
                </>
              ) : (
                <>
                  <svg
                    className="size-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                  >
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                  <span>{t("submit_btn")}</span>
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
}

export default ContactForm;
