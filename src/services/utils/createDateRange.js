import { formatToYYYYMMDD } from "./dateFormatToYYYYMMDD";

export const createMonthRangeDates = (year, month, day = "01") => {
	// SWDI has max date range of 1 month
	// ** Date() months are indexed from 0
	// to account for that: date range = user's selected month (-1) + 1 month (passed month value)
	if (year !== undefined && month !== undefined) {
		let ogStartDate, formattedStartDate, ogEndDate, formattedEndDate;

		ogStartDate = new Date(year, month - 1, day);
		ogEndDate = new Date(year, month, day);

		formattedStartDate = formatToYYYYMMDD(ogStartDate);
		formattedEndDate = formatToYYYYMMDD(ogEndDate);

		const DATE_RANGE = {
			start: formattedStartDate,
			end: formattedEndDate,
		};
		// console.log(DATE_RANGE);
		return DATE_RANGE;
	} else {
		throw new Error("Missing year/month value.");
	}
};
