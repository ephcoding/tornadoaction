import { executeQueryJSON } from "@arcgis/core/rest/query";
import esriRequest from "@arcgis/core/request";
import { ENDPOINTS } from "services/storm_prediction_center";

export default async function handler(req, res) {
	const query = {
		outFields: [
			"objectid",
			"dn",
			"valid",
			"expire",
			"idp_source",
			"idp_subset",
			"idp_filedate",
			"idp_ingestdate",
			"idp_current_forecast",
			"idp_time_series",
			"idp_issueddate",
			"idp_validtime",
			"idp_validendtime",
			"idp_fcst_hour",
			// "shape",
			// "st_area(shape)",
			// "st_perimeter(shape)",
		],
		where: "1=1",
		returnDistinctValues: true,
		returnGeometry: false,
	};

	try {
		// returns Promise<FeatureSet>
		// const response = await executeQueryJSON(ENDPOINTS.spcms_1_conv);
		// const response = await executeQueryJSON(ENDPOINTS.spcms, query);
		// const response = await esriRequest(ENDPOINTS.spcms);
		// const features = response.features.map((graphic) => graphic.attributes);
		// res.status(200).json({ response });
	} catch (error) {
		res.status(500).json(error);
	}
}
