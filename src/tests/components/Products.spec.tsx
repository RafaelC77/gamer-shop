import { render, screen } from "@testing-library/react";
import { Products } from "../../components/Products";

describe("Products component", () => {
  it("Should render correctly", () => {
    const product = {
      slug: "slug",
      title: "title",
      image: "http://testimage.com/",
      price: 10,
    };

    render(<Products products={[product]} />);

    expect(screen.getByText(/produtos/i)).toBeInTheDocument();
    expect(screen.getByText(/title/i)).toBeInTheDocument();
  });
});
