import React from "react";
import Image from "next/image";
import { Disclosure } from "@headlessui/react";
import { ChevronUpIcon } from "@heroicons/react/solid";
import { LocaleDate } from "components/common";

import { useTornadoAlertsQuery } from "../../hooks";

import { getAreaDescMAP, formatSenderNameSTR } from "utils";
import { STATES_MAP } from "site_data";

// [alertType] --> use "Watch" or "Warning"
export const TornadoAlertSection = ({ alertType }) => {
	const { data, error } = useTornadoAlertsQuery(alertType);

	if (data) {
		return data.length > 0 ? (
			<section className='flex-1'>
				<List activeAlerts={data} />
			</section>
		) : (
			<div
				className={`flex flex-col items-center justify-center container w-full h-[25vh] shadow-md shadow-stone-900 mb-6 mx-auto border-dashed border-2 border-stone-300 rounded-md p-2`}
			>
				<p className='text-5xl text-stone-300 text-center'>
					No active Tornado {alertType}
					{alertType.toLowerCase() === "watch" ? "es" : "s"}
				</p>
			</div>
		);
	}

	if (error) {
		return (
			<>
				<p>Something went wrong...</p>
				<p>{error.message}</p>
			</>
		);
	}

	return <p>Loading...</p>;
};

const List = ({ activeAlerts }) => {
	return (
		<ul className='p-4 md:grid md:grid-cols-2 xl:grid-cols-3 gap-6'>
			{activeAlerts.map((alert) => (
				<ListItem activeAlert={alert} key={alert.id} />
			))}
		</ul>
	);
};

const ListItem = ({ activeAlert }) => {
	const {
		event,
		messageType,
		effective,
		expires,
		areaDesc,
		headline,
		description,
		instruction,
		senderName,
	} = activeAlert.properties;

	const EVENT_COLOR_MAP = {
		warning: "bg-red-500",
		watch: "bg-yellow-500",
	};
	const color = EVENT_COLOR_MAP[event.split(" ")[1].toLowerCase()];
	const areaDescMAP = getAreaDescMAP(areaDesc);
	const areaDescMapARR = Array.from(areaDescMAP.entries());

	return (
		<div
			className={`flex flex-col w-full ${color} max-w-md shadow-md shadow-stone-900 mb-6 mx-auto rounded-md p-2`}
		>
			<div className='flex flex-col items-center mb-4 w-full'>
				<div className='bg-neutral-700 px-4 py-2 mb-4 rounded w-full'>
					<p className='text-3xl text-center font-medium w-full mb-2 drop-shadow-lg'>
						{event}
					</p>
					<div className='text-xs text-center'>
						<span>Expires: </span>
						<LocaleDate dateOBJ={expires} formatSTR='LT' />
					</div>
				</div>
			</div>

			<div className='bg-neutral-700 px-4 py-2 mb-4 rounded'>
				{areaDescMapARR.map(([state, areas]) => {
					const joinedAreaDescSTR = areas.join(", ");

					return (
						<div key={state}>
							<h4 className='text-lg font-medium mb-2 uppercase'>
								{STATES_MAP[state]}
							</h4>
							<p className='text-sm mb-2'>{joinedAreaDescSTR}</p>
						</div>
					);
				})}
			</div>

			{instruction !== null ? (
				<div className='bg-neutral-700 px-4 py-2 mb-4 rounded'>
					<p className='text-sm italic'>{instruction}</p>
				</div>
			) : (
				""
			)}

			<div className='flex-1'></div>

			<Disclosure>
				{({ open }) => (
					<>
						<Disclosure.Button
							className={`flex justify-between w-full shadow-lg shadow-black px-4 py-2 mb-2 text-sm font-medium rounded-md bg-blue-600 active:scale-95 active:shadow-sm`}
						>
							<span>Details</span>
							<ChevronUpIcon
								className={`${
									open ? "" : "transform rotate-180"
								} w-5 h-5 text-white`}
							/>
						</Disclosure.Button>
						<Disclosure.Panel className='px-4 pt-4 pb-2 text-sm text-white'>
							{description.split(/\n(?:\n)?/).map((text, index) => (
								<p
									className='text-xs mb-2'
									key={`${text.slice(0, 10)}-${index}`}
								>
									{text}
								</p>
							))}
						</Disclosure.Panel>
					</>
				)}
			</Disclosure>
		</div>
	);
};
