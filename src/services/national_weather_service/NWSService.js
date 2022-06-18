import axios from "axios";

// //////////////////////////////////
// ENDPOINTS
// //////////////////////////////////
const BASE_URL = "https://api.weather.gov";

const ENDPOINT = {
	alert_count: "/alerts/active/count",
	alert_tornado_warnings:
		"/alerts/active?event=Tornado%20Warning&message_type=alert",
	alert_tornado_watches:
		"/alerts/active?event=Tornado%20Watch&message_type=alert",
	alert_types: "/alerts/types",
	glossary: "/glossary",
	products: "/products",
	radar_servers: "/radar/servers",
	radar_stations: "/radar/stations",
	zones: "/zones",
};

// //////////////////////////////////
// CLIENT CONFIG
// //////////////////////////////////
const DEFAULT_TIMEOUT = 5000;
const CLIENT = axios.create({
	baseURL: BASE_URL,
	timeout: DEFAULT_TIMEOUT,
});

// //////////////////////////////////
// SERVICE REQUESTS
// //////////////////////////////////
export const getTornadoAlerts = async (alertType) => {
	const ALERT_MAP = {
		warning: `${ENDPOINT.alert_tornado_warnings}`,
		watch: `${ENDPOINT.alert_tornado_watches}`,
	};
	const alertEndpoint = ALERT_MAP[alertType.toLowerCase()];

	// TODO: create map validation util func
	if (!Object.keys(ALERT_MAP).includes(alertType.toLowerCase())) {
		throw new Error(
			`${alertType} is not a valid tornado alert type.  Valid tornado alerts: ${Object.keys(
				ALERT_MAP
			).toString()}.`
		);
	}

	const { data } = await CLIENT.get(alertEndpoint);
	console.log(`GET TORNADO ALERT TYPE: ${alertType} >>\n`, data);
	return await data.features;
};
// ----- used to get PRELIM DAMAGE ASSESSMENTS
export const fetchPublicInfoStatements = async () => {
	const end_date = new Date();
	const start_date = new Date(
		end_date.getFullYear(),
		end_date.getMonth(),
		end_date.getDate() - 14
	);
	const locationsSET = new Set();

	// ***************************************
	// 1. get tornado warnings from last 2 weeks
	// ***************************************
	const res = await getFromService(NATIONAL_WEATHER_SERVICE, "/alerts", {
		params: {
			start: start_date,
			end: end_date,
			message_type: "alert",
			event: "Tornado Warning",
		},
	});

	const warnings = await res.features;

	// ***************************************
	// 2. parse locations (station call signs) from WMOidentifiers
	// ***************************************
	const rawLocations = await warnings.map((warning) => {
		const wmoId = warning.properties.parameters.WMOidentifier[0];

		return parseLocation(wmoId);
	});

	// ***************************************
	// 3. create unique array of locations (station call signs)
	// to get PUBLIC INFORMATION STATEMENT ids for
	// ***************************************
	await rawLocations.forEach((location) => locationsSET.add(location));

	// ***************************************
	// 4. get PNS [id]s (Public Info Statements) for tornado-warned locations
	// ***************************************
	const pnsPromises = await Promise.all(
		Array.from(locationsSET).map((location) => {
			return getFromService(NATIONAL_WEATHER_SERVICE, "/products", {
				params: {
					start: start_date,
					end: end_date,
					type: "PNS",
					location: location,
				},
			});
		})
	);

	const pubInfoStatements = [];

	await pnsPromises.forEach((location) => {
		const locStatements = location["@graph"];

		if (locStatements.length > 0) {
			locStatements.forEach(({ id }) => pubInfoStatements.push(id));
		}
	});

	// ***************************************
	// 5. get PUBLIC INFO STATEMENTS for
	// tornado-warned locations over last
	// 2 weeks
	// ***************************************
	const tornadoWarnedPNSs = await Promise.all(
		pubInfoStatements.map((pnsId) => {
			return getFromService(NATIONAL_WEATHER_SERVICE, `/products/${pnsId}`);
		})
	);

	const regex = /preliminary damage assessment/i;

	return tornadoWarnedPNSs.filter(({ productText }) => {
		return regex.test(productText);
	});
};

const parseLocation = (WMOidentifier) => {
	const splitWmoId = WMOidentifier.split(" ");
	const station = splitWmoId.slice(1, 2)[0];
	return station.slice(1);
};
