import { Clock, Navbar } from "components/common";

export const Header = () => {
	return (
		<header
			data-testid='header'
			className='text-center p-4 sm:flex sm:justify-between sm:items-center'
		>
			<div className='mb-4 sm:mb-0 w-full'>
				<Navbar />
			</div>
		</header>
	);
};
