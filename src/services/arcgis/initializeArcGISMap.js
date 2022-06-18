import esriConfig from "@arcgis/core/config";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import WFSLayer from "@arcgis/core/layers/WFSLayer";
import WMSLayer from "@arcgis/core/layers/WMSLayer";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";
import { watch, when } from "@arcgis/core/core/reactiveUtils";
import Extent from "@arcgis/core/geometry/Extent";
// --
import { ENDPOINTS } from "services/storm_prediction_center";
import {
	disableViewNavigation,
	setDefaultUiComponents,
} from "services/ArcGIS/helpers";

esriConfig.apiKey = process.env.NEXT_PUBLIC_ARCGIS_KEY;

const app = {};
let watchHandler;

export const initializeArcGISMap = async (container, layerId) => {
	// if (app.view) {
	// 	app.view.destroy();
	// }

	const stateLinesLayer = new FeatureLayer({
		url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2",
		// listMode: "hide",
		// legendEnabled: false,
	});

	const spcLayer = new FeatureLayer({
		url: `${ENDPOINTS.spcms}/${layerId}`,
		opacity: 0.3,
	});

	const map = new Map({
		basemap: "arcgis-dark-gray",
		layers: [stateLinesLayer, spcLayer],
	});

	const view = new MapView({
		map,
		container,
		center: [-97, 38],
		scale: 70000000,
		// extent: {
		// 	xmin: -125,
		// 	xmax: -65,
		// 	ymin: 25,
		// 	ymax: 50,
		// 	// spatialReference: { wkid: 102100 },
		// },
	});

	// watchHandler = watch(
	// 	() => view.extent,
	// 	() => {
	// 		app.savedExtent = view.extent.toJSON();
	// 	}
	// );

	view.when(async () => {
		await spcLayer.when();
		console.log("ArcGIS MAP LAYER >>\n", spcLayer.toJSON());
		console.log("MAP VIEW SIZE >>\n", view.size);
		disableViewNavigation(view);
		setDefaultUiComponents([], view);
	});

	app.spcLayer = spcLayer;
	app.stateLinesLayer = stateLinesLayer;
	app.map = map;
	app.view = view;

	return cleanup;
};

function cleanup() {
	app.view?.destroy();
}
