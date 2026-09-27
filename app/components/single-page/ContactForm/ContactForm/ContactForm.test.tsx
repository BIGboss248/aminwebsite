import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ContactForm } from "./ContactForm";
import enMessages from "@/messages/en.json";

jest.mock("next-intl", () => ({
  useTranslations: () => (key: string, params?: Record<string, string | number>) => {
    const messages = enMessages.contact.form as Record<string, string>;
    let text = messages[key] || key;
    if (params) {
      Object.entries(params).forEach(([k, v]) => {
        text = text.replace(`{${k}}`, String(v));
      });
    }
    return text;
  },
}));

describe("ContactForm Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    global.fetch = jest.fn();
  });

  it("renders all form fields and submit button properly", () => {
    render(<ContactForm />);

    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/subject/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/message/i)).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /send message/i }),
    ).toBeInTheDocument();
  });

  it("shows validation errors when submitted empty", async () => {
    render(<ContactForm />);

    const submitBtn = screen.getByRole("button", { name: /send message/i });
    fireEvent.click(submitBtn);

    expect(screen.getByText(enMessages.contact.form.val_name_required)).toBeInTheDocument();
    expect(screen.getByText(enMessages.contact.form.val_email_invalid)).toBeInTheDocument();
    expect(screen.getByText(enMessages.contact.form.val_subject_required)).toBeInTheDocument();
    expect(screen.getByText(enMessages.contact.form.val_message_short)).toBeInTheDocument();
  });

  it("validates invalid email address format", async () => {
    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "John Doe" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "invalid-email" },
    });
    fireEvent.change(screen.getByLabelText(/subject/i), {
      target: { value: "Project Consultation" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: { value: "Hello, this is a test message that is long enough." },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    expect(screen.getByText(enMessages.contact.form.val_email_invalid)).toBeInTheDocument();
    expect(global.fetch).not.toHaveBeenCalled();
  });

  it("submits the form successfully and displays confirmation receipt", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      status: 200,
      json: async () => ({ success: true, refId: "INQ-TEST-1234" }),
    });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "Alice Wonderland" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "alice@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/subject/i), {
      target: { value: "Architecture Review" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: {
        value: "We would like to consult on Next.js App Router performance and systems architecture.",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByTestId("contact-form-success")).toBeInTheDocument();
    });

    expect(screen.getByText(enMessages.contact.form.success_title)).toBeInTheDocument();

    // Resetting the form
    fireEvent.click(screen.getByRole("button", { name: /send another message/i }));
    expect(screen.getByLabelText(/full name/i)).toBeInTheDocument();
  });

  it("handles server error properly", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 500,
      json: async () => ({ error: "server_error" }),
    });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "Bob Smith" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "bob@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/subject/i), {
      target: { value: "Systems Query" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: {
        value: "Inquiring about distributed backend services and caching layers.",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
    expect(screen.getByText(enMessages.contact.form.error_generic)).toBeInTheDocument();
  });

  it("handles rate limit response properly", async () => {
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      status: 429,
      json: async () => ({ error: "rate_limit" }),
    });

    render(<ContactForm />);

    fireEvent.change(screen.getByLabelText(/full name/i), {
      target: { value: "Bob Smith" },
    });
    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: "bob@example.com" },
    });
    fireEvent.change(screen.getByLabelText(/subject/i), {
      target: { value: "Systems Query" },
    });
    fireEvent.change(screen.getByLabelText(/message/i), {
      target: {
        value: "Inquiring about distributed backend services and caching layers.",
      },
    });

    fireEvent.click(screen.getByRole("button", { name: /send message/i }));

    await waitFor(() => {
      expect(screen.getByRole("alert")).toBeInTheDocument();
    });
    expect(screen.getByText(enMessages.contact.form.error_rate_limit)).toBeInTheDocument();
  });
});
