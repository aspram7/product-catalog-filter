import React from "react";
import { render, screen, fireEvent, waitFor, act } from "@testing-library/react";
import DataGrid from "./index";
import { useFilters } from "../../context/filters";
import { getData } from "../../service";
import "@testing-library/jest-dom";

jest.mock("../../service", () => ({
  getData: jest.fn(),
}));

jest.mock("../../context/filters", () => ({
  useFilters: jest.fn(),
}));

jest.mock("react-dropdown", () => ({
  __esModule: true,
  default: ({ options, onChange, value }) => (
    <select
      data-testid="dropdown"
      value={value?.value}
      onChange={(e) => onChange(options.find((option) => option.value === parseInt(e.target.value)))}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ),
}));

describe("DataGrid", () => {
  beforeEach(() => {
    useFilters.mockReturnValue({ filters: {} });
    getData.mockResolvedValue({
      result: [{ id: 1, name: "Wireless Headphones", price: 99.99, rating: 4.5 }],
      hasMore: true,
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders loading when data is being fetched", async () => {
    render(<DataGrid />);

    expect(screen.getByTestId("loading")).toBeInTheDocument();
    await act(() => expect(getData).toHaveBeenCalledTimes(1));
  });

  test("renders products after fetching data", async () => {
    render(<DataGrid />);

    const productText = await screen.findByText("Wireless Headphones", { exact: false });

    expect(productText).toBeInTheDocument();
    expect(screen.getByText(/99.99/i)).toBeInTheDocument();
  });

  test('calls handlePagination when "Load More" button is clicked', async () => {
    render(<DataGrid />);

    const loadText = await screen.findByRole("button");

    expect(loadText).toBeInTheDocument();

    await fireEvent.click(loadText);
    await waitFor(() => expect(getData).toHaveBeenCalledWith(expect.objectContaining({ page: 2 })));
  });

  test("sorts products when sort dropdown is changed", async () => {
    render(<DataGrid />);

    const sortText = screen.getByText(/sort by/i);

    expect(sortText).toBeInTheDocument();
    const dropdown = screen.getByTestId("dropdown");

    await waitFor(async () => {
      await fireEvent.change(dropdown, { target: { value: "1" } });
    });
    expect(localStorage.getItem("sort")).toEqual(JSON.stringify({ value: 1, label: "Name (A - Z)" }));
  });

  test('displays "No products found" if data is empty', async () => {
    getData.mockResolvedValueOnce({ result: [], hasMore: false });
    render(<DataGrid />);

    const data = await screen.findByText(/no products found/i);
    expect(data).toBeInTheDocument();
  });
});
