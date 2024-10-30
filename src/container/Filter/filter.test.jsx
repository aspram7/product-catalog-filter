import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Filter, { filterData }from "./index";
import { useFilters } from "../../context/filters";
import "@testing-library/jest-dom/extend-expect";

const setFiltersMock = jest.fn();
jest.mock("../../context/filters", () => ({
  useFilters: jest.fn(),
}));

describe("Filter Component", () => {
  beforeEach(() => {
    setFiltersMock.mockReset();
    useFilters.mockReturnValue({
      filters: {
        categories: [],
        brands: [],
        price: [0, 1000],
        rating: 0,
      },
      setFilters: setFiltersMock,
    });
  });

  test("renders filter content", () => {
    render(<Filter />);

    expect(screen.getByText("Filters")).toBeInTheDocument();
    expect(screen.getByText("Category")).toBeInTheDocument();
    expect(screen.getByText("Brand")).toBeInTheDocument();
    expect(screen.getByText("Price")).toBeInTheDocument();
    expect(screen.getByText("Rating")).toBeInTheDocument();

    filterData.categories.forEach((category) => {
      expect(screen.getByLabelText(category)).toBeInTheDocument();
    });

    filterData.brands.forEach((brand) => {
      expect(screen.getByLabelText(brand)).toBeInTheDocument();
    });
  });

  test("handles checkbox click for categories", () => {
    render(<Filter />);

    const categoryCheckbox = screen.getByLabelText("Electronics");
    fireEvent.click(categoryCheckbox);

    expect(setFiltersMock).toHaveBeenCalledTimes(1);
    expect(setFiltersMock).toHaveBeenCalledWith(expect.any(Function));
  });

  test("handles range input change", () => {
    render(<Filter />);

    const sliderThumb = screen.getAllByRole("slider");

    expect(sliderThumb[0]).toBeInTheDocument();
    expect(sliderThumb[0]).toHaveAttribute("aria-valuemin", "0");
    expect(sliderThumb[1]).toHaveAttribute("aria-valuemax", "1000");
  });

  test("handles rating input change", async () => {
    render(<Filter />);

    const ratingItem = screen.getAllByTestId("rate");

    expect(ratingItem[0]).toBeInTheDocument();
  });
});
