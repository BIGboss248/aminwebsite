export interface ContactFormProps {
  className?: string;
  locale?: "en" | "fa";
}

export interface FormValues {
  name: string;
  email: string;
  subject: string;
  message: string;
  _hp?: string;
}

export interface FormErrors {
  name?: string;
  email?: string;
  subject?: string;
  message?: string;
  form?: string;
}
