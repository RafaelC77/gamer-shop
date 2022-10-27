import { fireEvent, render, screen } from "@testing-library/react";
import { ChangeAmountButton } from "../../components/ChangeAmountButton";

describe("ChangeAmountButton Component", () => {
  it("should render correctly", () => {
    const decreaseFunction = jest.fn();
    const increaseFunction = jest.fn();

    render(
      <ChangeAmountButton
        itemAmount={1}
        increaseItem={increaseFunction}
        decreaseItem={decreaseFunction}
      />
    );

    expect(screen.getByTestId("decrease-button")).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/1/i)).toBeInTheDocument();
    expect(screen.getByTestId("increase-button")).toBeInTheDocument();
  });

  it("should call decrease function when user clicks on decrease button", () => {
    const decreaseFunction = jest.fn();
    const increaseFunction = jest.fn();

    render(
      <ChangeAmountButton
        itemAmount={1}
        increaseItem={increaseFunction}
        decreaseItem={decreaseFunction}
      />
    );

    const decreaseButton = screen.getByTestId("decrease-button");

    fireEvent.click(decreaseButton);

    expect(decreaseFunction).toHaveBeenCalled();
  });

  it("should call increase function when user clicks on increase button", () => {
    const decreaseFunction = jest.fn();
    const increaseFunction = jest.fn();

    render(
      <ChangeAmountButton
        itemAmount={1}
        increaseItem={increaseFunction}
        decreaseItem={decreaseFunction}
      />
    );

    const increaseButton = screen.getByTestId("increase-button");

    fireEvent.click(increaseButton);

    expect(increaseFunction).toHaveBeenCalled();
  });
});
