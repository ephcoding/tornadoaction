import Link from "next/link";
import { FaChevronDown } from "react-icons/fa";

export const HomePageHero = () => {
	return (
		<div className='h-[50vh] flex flex-col items-center sm:text-center lg:text-left border-b-2 border-red-500 px-4'>
			<div className='grow flex flex-col justify-center'>
				<h1 className='uppercase inline-block text-3xl tracking-tight font-extrabold sm:text-5xl md:text-6xl'>
					Tornado <span className='text-red-500'>Action</span>
				</h1>
				<p className='text-neutral-200'>stay ahead of the storm.</p>
			</div>
			<div className='mb-5'></div>
		</div>
	);
};
