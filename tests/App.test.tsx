import * as React from "react";
import { render, screen } from "@testing-library/react";
import Home from "../src/pages/Home";

describe("App", () => {
  test("should render", () => {
    render(<Home />);
    expect(screen.getByText("Anonymous user")).toBeTruthy();
  });
});
