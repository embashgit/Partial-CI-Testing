import Header from "../pages/secondHeader";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";


describe("Tesing check", () => {
    it("renders a sub header", () => {
      render(<Header />);
      expect(screen.getByTestId("second-header")).toHaveTextContent("Header2 is on the top");;
    })
})