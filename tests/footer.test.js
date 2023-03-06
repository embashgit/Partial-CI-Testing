import Footer from "../pages/footer";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";


describe("Calculator", () => {
    it("renders a footer", () => {
      render(<Footer />);
      expect(screen.getByTestId("footer")).toHaveTextContent("this is a footer");;
    })
})