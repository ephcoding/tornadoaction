import axios from "axios";

// //////////////////////////////////
// ENDPOINTS
// //////////////////////////////////
const BASE_URL = {
	app_api: "/api",
	spc: "http://www.spc.noaa.gov",
	map_server:
		"https://mapservices.weather.noaa.gov/vector/rest/services/outlooks/SPC_wx_outlks/MapServer",
	// SPC OGC Web Feature Services Server
	wfs_server:
		"https://mapservices.weather.noaa.gov/vector/services/outlooks/SPC_wx_outlks/MapServer/WFSServer?request=GetCapabilities&service=WFS",
	// SPC OGC Web Map Services Server
	wms_server:
		"https://mapservices.weather.noaa.gov/vector/services/outlooks/SPC_wx_outlks/MapServer/WMSServer?request=GetCapabilities&service=WMS",
};
// "oms" --> outlook map service
// "wms" --> web map service
export const ENDPOINTS = Object.freeze({
	spcms: BASE_URL.map_server,
	wfs_server: BASE_URL.wfs_server,
	wms_server: BASE_URL.wms_server,
	spcms_layers: `${BASE_URL.map_server}/layers`,
	spcms_1_conv: `${BASE_URL.map_server}/0`,
	spcms_1_cat: `${BASE_URL.map_server}/1`,
	spcms_1_sig_tornado: `${BASE_URL.map_server}/2`,
	spcms_1_prob_tornado: `${BASE_URL.map_server}/3`,
	spcms_1_sig_hail: `${BASE_URL.map_server}/4`,
	spcms_1_prob_hail: `${BASE_URL.map_server}/5`,
	spcms_1_sig_wind: `${BASE_URL.map_server}/6`,
	spcms_1_prob_wind: `${BASE_URL.map_server}/7`,
	spcms_2_conv: `${BASE_URL.map_server}/8`,
	spcms_2_cat: `${BASE_URL.map_server}/9`,
	spcms_2_sig_tornado: `${BASE_URL.map_server}/10`,
	spcms_2_prob_tornado: `${BASE_URL.map_server}/11`,
	spcms_2_sig_hail: `${BASE_URL.map_server}/12`,
	spcms_2_prob_hail: `${BASE_URL.map_server}/13`,
	spcms_2_sig_wind: `${BASE_URL.map_server}/14`,
	spcms_2_prob_wind: `${BASE_URL.map_server}/15`,
	spcms_3_conv: `${BASE_URL.map_server}/16`,
	spcms_3_cat: `${BASE_URL.map_server}/17`,
	spcms_3_sig: `${BASE_URL.map_server}/19`,
	spcms_3_prob: `${BASE_URL.map_server}/18`,
	spcms_4_8_conv: `${BASE_URL.map_server}/20`,
	spcms_4_prob: `${BASE_URL.map_server}/21`,
	spcms_5_prob: `${BASE_URL.map_server}/22`,
	spcms_6_prob: `${BASE_URL.map_server}/23`,
	spcms_7_prob: `${BASE_URL.map_server}/24`,
	spcms_8_prob: `${BASE_URL.map_server}/25`,
	rss_outlooks: `${BASE_URL.spc}/products/spcacrss.xml`,
	rss_mesos: `${BASE_URL.spc}/products/spcmdrss.xml`,
	rss_mul_med_brfs: `${BASE_URL.spc}/products/spcmbrss.xml`,
	rss_pds: `${BASE_URL.spc}/products/spcpdswwrss.xml`,
	rss_sev_wx: `${BASE_URL.spc}/products/spcwwrss.xml`,
	rss_test_outlooks: `${BASE_URL.spc_test}/products/spcacrss.xml`,
	rss_test_mesos: `${BASE_URL.spc_test}/products/spcmdrss.xml`,
	rss_test_mul_med_brfs: `${BASE_URL.spc_test}/products/spcmbrss.xml`,
	rss_test_pds: `${BASE_URL.spc_test}/products/spcpdswwrss.xml`,
	rss_test_sev_wx: `${BASE_URL.spc_test}/products/spcwwrss.xml`,
	wms: "",
});

// //////////////////////////////////
// CLIENT CONFIG
// //////////////////////////////////
const DEFAULT_TIMEOUT = 5000;
const CLIENT = {
	app_api: axios.create({
		baseURL: BASE_URL.app_api,
		timeout: DEFAULT_TIMEOUT,
	}),
	map_serverice: axios.create({
		baseURL: BASE_URL.map_server,
		timeout: DEFAULT_TIMEOUT,
	}),
	spc: axios.create({
		baseURL: BASE_URL.spc,
		timeout: DEFAULT_TIMEOUT,
	}),
	spc_test: axios.create({
		baseURL: BASE_URL.spc_test,
		timeout: DEFAULT_TIMEOUT,
	}),
	web_map_svc: axios.create({
		baseURL: BASE_URL.web_map_svc,
		timeout: DEFAULT_TIMEOUT,
	}),
};

// //////////////////////////////////
// SERVICE REQUESTS
// //////////////////////////////////
export const getSpcRssFeed = async (feedType) => {
	const feedMap = {
		outlooks: `${BASE_URL.spc}/products/spcacrss.xml`,
		media: `${BASE_URL.spc}/products/spcmbrss.xml`,
		meso: `${BASE_URL.spc}/products/spcmdrss.xml`,
		pds: `${BASE_URL.spc}/products/spcpdswwrss.xml`,
		swx: `${BASE_URL.spc}/products/spcwwrss.xml`,
	};

	if (!Object.keys(feedMap).includes(feedType)) {
		throw new Error(
			`${feedType} is not a valid RSS Feed.  Valid feed types: ${Object.keys(
				feedMap
			).toString()}.`
		);
	}

	const { data } = await CLIENT.app_api.post("/api/spc-rss-feeds", {
		feed_url: feedMap[feedType],
	});

	return data;
};
