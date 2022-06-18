import { render, screen } from "@testing-library/react";
import { Header } from ".";

describe("Header Tests", () => {
	test("displays <Header/>", () => {
		render(<Header />);
		const header = screen.getByTestId(/header/i);
		expect(header).toBeInTheDocument();
	});

	test("Tornado Action logo text displays", () => {
		render(<Header />);
		const header = screen.getByTestId("header");
		expect(header).toHaveTextContent(/Tornado Action/i);
	});
});
