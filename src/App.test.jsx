import { render, screen } from "@testing-library/react";
import ReactDOM from "react-dom";
import App from "./App";

describe("<App />", () => {
  it("renders without crashing", () => {
    const root = document.createElement("div");
    ReactDOM.render(<App />, root);
    ReactDOM.unmountComponentAtNode(root);
  });

  it("displays title", () => {
    render(<App />);
    expect(screen.getByRole("heading")).toBeInTheDocument();
    expect.assertions(1);
  });
});
