import Link from "next/link";
import { PageWrapper } from "components/common";

export default function Custom500() {
	return (
		<PageWrapper>
			<div className='h-screen flex flex-col items-center justify-center'>
				<h1 className='sr-only'>500 - Server-side error occurred</h1>
				<p className='font-bold text-7xl text-yellow-300 mb-10 italic'>
					what the f...!?
				</p>
				<p className='font-bold text-3xl mb-10'>
					we&apos;ll get this fixed ASAP.{" "}
				</p>
				<p className='mb-10'>
					in the meantime, you can check for active alerts over at{" "}
					<Link href='https://www.weather.gov/alerts'>
						<a target='_blank' className='text-blue-500 hover:opacity-90'>
							The National Weather Service.
						</a>
					</Link>
				</p>
				<p className='text-md text-neutral-400'>
					(can&apos;t have nice things)
				</p>
			</div>
		</PageWrapper>
	);
}
