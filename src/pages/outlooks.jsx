import Image from "next/image";
import { PageWrapper } from "components/common";

const OutlooksPage = () => {
	const OUTLOOKS = [
		{ day: "1", src: "http://www.spc.noaa.gov/products/outlook/day1otlk.gif" },
		{ day: "2", src: "http://www.spc.noaa.gov/products/outlook/day2otlk.gif" },
		{ day: "3", src: "http://www.spc.noaa.gov/products/outlook/day3otlk.gif" },
		{
			day: "4-8",
			src: "http://www.spc.noaa.gov/products/outlook/day48prob.gif",
		},
	];

	return (
		<PageWrapper>
			<div className='grow mx-auto p-4'>
				<h1 className='uppercase font-bold text-4xl mb-5'>
					Convective Outlooks
				</h1>

				{OUTLOOKS.map((outlook) => (
					<>
						<h2 className='mb-2'>Day {outlook.day} Outlook</h2>
						<Image
							key={outlook.src}
							alt={`Day ${outlook.day} Outlook Image`}
							src={outlook.src}
							height={555}
							width={815}
						/>
					</>
				))}
			</div>
		</PageWrapper>
	);
};

export default OutlooksPage;
