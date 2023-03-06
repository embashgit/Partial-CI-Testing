import Header from "../pages/header";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";


describe("Calculator", () => {
    it("renders a footer", () => {
      render(<Header />);
      expect(screen.getByTestId("header")).toHaveTextContent("Header is on the top first");;
    })
})