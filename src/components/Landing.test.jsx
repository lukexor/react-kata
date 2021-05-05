import { render, screen } from "@testing-library/react";
import Landing from "./Landing";

describe("<Landing />", () => {
  it("displays title", () => {
    render(<Landing />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect.assertions(1);
  });
});
