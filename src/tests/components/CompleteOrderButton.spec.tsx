import { render, screen } from "@testing-library/react";
import { CompleteOrderButton } from "../../components/CompleteOrderButton";

describe("CompleteOrderButton Component", () => {
  it("Should render correctly", () => {
    render(<CompleteOrderButton />);

    screen.logTestingPlaygroundURL();

    expect(
      screen.getByRole("button", {
        name: /finalizar pedido/i,
      })
    ).toBeInTheDocument();
  });
});
