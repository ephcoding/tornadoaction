import React from "react";
import dayjs from "dayjs";
import localized from "dayjs/plugin/localizedFormat";
dayjs.extend(localized);

export const Clock = () => {
	const [time, setTime] = React.useState(new Date());

	const clockTick = () => {
		setTime(new Date());
	};

	React.useEffect(() => {
		let id = setInterval(() => {
			clockTick();
		}, 60000);

		return () => clearInterval(id);
	}, [time]);

	return <span className='text-xl'>{dayjs(time).format("lll")}</span>;
};
