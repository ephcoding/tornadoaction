export const Footer = () => {
	const year = new Date().getFullYear();

	return (
		<footer className='text-center text-xs mb-3'>
			<p>&copy; {year} MODEVX, LLC. &nbsp; All Rights Reserved.</p>
		</footer>
	);
};
