import {
	AnnotationIcon,
	GlobeAltIcon,
	LightningBoltIcon,
	ScaleIcon,
} from "@heroicons/react/outline";

import { RiTornadoLine } from "react-icons/ri";
import { ImWarning } from "react-icons/im";

export const HomePageFeatureSection = ({ featureOBJ }) => {
	const { benefits: benefitsObjARR } = featureOBJ;
	// {titleSTR, taglineSTR, benefitsObjARR}
	return (
		<div className='py-12 bg-white'>
			<div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
				<div className='lg:text-center'>
					<h2 className='mt-2 text-3xl leading-8 font-extrabold tracking-tight text-gray-900 sm:text-4xl'>
						{featureOBJ.name}
					</h2>
					<p className='mt-4 max-w-2xl text-xl text-gray-500 lg:mx-auto'>
						{featureOBJ.tagline}
					</p>
				</div>

				<div className='mt-10'>
					<dl className='space-y-10 md:space-y-0 md:grid md:grid-cols-2 md:gap-x-8 md:gap-y-10'>
						{benefitsObjARR.map((benefitsOBJ) => (
							// {features.map((feature) => (
							<div key={benefitsOBJ.name} className='relative'>
								<dt>
									<div className='absolute flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white'>
										<benefitsOBJ.icon className='h-6 w-6' aria-hidden='true' />
									</div>
									<p className='ml-16 text-lg leading-6 font-medium text-gray-900'>
										{benefitsOBJ.name}
									</p>
								</dt>
								<dd className='mt-2 ml-16 text-base text-gray-500'>
									{benefitsOBJ.description}
								</dd>
							</div>
						))}
					</dl>
				</div>
			</div>
		</div>
	);
};

const features = [
	{
		name: "Competitive exchange rates",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
		icon: RiTornadoLine,
	},
	{
		name: "No hidden fees",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
		icon: ImWarning,
	},
	{
		name: "Transfers are instant",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
		icon: LightningBoltIcon,
	},
	{
		name: "Mobile notifications",
		description:
			"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Maiores impedit perferendis suscipit eaque, iste dolor cupiditate blanditiis ratione.",
		icon: AnnotationIcon,
	},
];
