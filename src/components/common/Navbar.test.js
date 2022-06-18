import { render, screen } from "@testing-library/react";
import { Navbar } from "./Navbar";

describe("Navbar Tests", () => {
	let navbar;

	beforeEach(() => {
		render(<Navbar />);
		navbar = screen.getByTestId("navbar");
	});

	test("displays <Navbar/>", () => {
		expect(navbar).toBeInTheDocument();
	});

	test("contains ALERTS page link", () => {
		expect(navbar).toHaveTextContent(/alerts/i);
	});
});
