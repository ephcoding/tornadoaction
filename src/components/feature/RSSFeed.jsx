import { SectionHeading } from "components/common";

export const RSSFeed = ({ rssFeedObjARR, sectionTitle }) => {
	const { isLoading, error, data } = rssFeedObjARR;
	let display;

	if (error) return <p>ERROR: Storm Prediction Center - RSS feed</p>;

	if (isLoading) return <p>Storm Prediction Center RSS feed loading...</p>;

	if (data)
		return (
			<section className='mb-4 p-4'>
				<SectionHeading title={sectionTitle} />
				{data.data.map((rssFeed) =>
					Object.entries(rssFeed).map(([rssFeedKey, value]) => (
						<div key={rssFeedKey} className='text-sm'>
							<span className='font-bold italic text-red-400'>
								{rssFeedKey}:{" "}
							</span>
							<span>{value}</span>
							<br />
						</div>
					))
				)}
			</section>
		);
};
