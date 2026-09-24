import React from "react";
import { render, screen } from "@testing-library/react";
import ContactLoading from "./loading";

describe("Contact Loading Component", () => {
  it("renders loading skeleton properly", () => {
    render(<ContactLoading />);
    expect(screen.getByTestId("contact-loading-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("contact-form-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("socials-block-skeleton")).toBeInTheDocument();
  });
});
