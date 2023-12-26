import React from "react";
import { render } from "@testing-library/react";
import Search from "../src/components/Search";
import App from "./App";

//create a snapshot test for the search component
test("renders correctly", () => {
  const { asFragment } = render(<Search />);
  expect(asFragment()).toMatchSnapshot();
});

//unit test to test the whole app and see if it renders.
test("renders App component without crashing", () => {
  render(<App />);
});
