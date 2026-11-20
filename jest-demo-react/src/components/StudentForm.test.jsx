import { render, screen } from "@testing-library/react";
import App from "../App";

test("renders the student portal and registration form", () => {
  render(<App />);

  expect(
    screen.getByRole("heading", { name: "Student Management" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("heading", { name: "Student Registration" }),
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: "Register Student" }),
  ).toBeInTheDocument();
});