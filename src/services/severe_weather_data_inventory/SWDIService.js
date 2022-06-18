import axios from "axios";

// //////////////////////////////////
// ENDPOINTS
// //////////////////////////////////
const BASE_URL = "https://www.ncdc.noaa.gov/swdiws";

const ENDPOINT = Object.freeze({
	hail_json: `${BASE_URL}/json/nx3hail`,
	meso_json: `${BASE_URL}/json/nx3meso`,
	strm_cell_json: `${BASE_URL}/json/nx3structure`,
	tvs_json: `${BASE_URL}/json/nx3tvs`,
});

const SEVERE_WEATHER_DATA_INVENTORY = Object.freeze({
	outputFormat: {
		json: "/json",
		csv: "/csv",
		xml: "/xml",
		shp: "/shp",
		kmz: "/kmz",
	},
	dataset: {
		tornado_vortex_signatures: "nx3tvs",
		mesocyclone_signatures: "nx3meso",
		hail: "nx3hail",
		storm_cell_structure: "nx3structure",
		prelim_local_storm_reports: "plsr",
		storm_warnings: "warn",
		dataset_inventory: ":inv",
	},
	optionalParams: {
		bounding_box: "bbox",
		degree_tile: "tile",
		statistics: "stat",
		results_count: "count",
		daily_feature_counts: "tilesum",
		column_value_count: "countGroupBy",
		filter: "filterBy",
		filter_many: "filterBy[]",
	},
	id: "id",
});
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
// * format options:
// csv, kmz, json, shp, xml
export const getSevereWeatherDataInventoryProducts = async ({
	outputFormat,
	dataset,
	dateRange,
}) => {
	const validOutputFormats = ["json", "csv", "xml", "shp", "kmz"];
	const validDatasets = [
		"nx3tvs",
		"nx3meso",
		"nx3hail",
		"nx3structure",
		"plsr",
		"warn",
	];

	if (!validOutputFormats.includes(outputFormat)) {
		throw new Error(
			`${outputFormat} is not a valid output format.  Valid formats: "json", "csv", "xml", "shp", "kmz".`
		);
	}

	if (!validDatasets.includes(dataset)) {
		throw new Error(
			`${dataset} is not a valid dataset.  Valid datasets: "nx3tvs", "nx3meso", "nx3hail", "nx3structure", "plsr", and "warn".`
		);
	}

	const res = await CLIENT.get(
		`${BASE_URL}/${outputFormat}/${dataset}/${dateRange}`
	);
	return res.data;
};

// TODO: add dateRange format validation with RegEx
// TODO: explore lightweight TS alts
