import { watch, when } from "@arcgis/core/core/reactiveUtils";
import config from "@arcgis/core/config";
import esriRequest from "@arcgis/core/request";
import Map from "@arcgis/core/Map";
import MapView from "@arcgis/core/views/MapView";

import FeatureLayer from "@arcgis/core/layers/FeatureLayer";
import GroupLayer from "@arcgis/core/layers/GroupLayer";
import WMSLayer from "@arcgis/core/layers/WMSLayer";

import LayerList from "@arcgis/core/widgets/LayerList";
import Legend from "@arcgis/core/widgets/Legend";
// --
import { MAP_SERVICE_URLS } from "services/spc";
import {
	disableViewNavigation,
	setDefaultUiComponents,
} from "services/arcgis/utils";

config.apiKey = process.env.NEXT_PUBLIC_ARCGIS_KEY;

const app = {};
let watchHandle;

export const buildArcGISMap = async (container) => {
	if (app.mapView) {
		app.mapView.destroy();
	}

	const state_lines_layer = new FeatureLayer({
		url: "https://sampleserver6.arcgisonline.com/arcgis/rest/services/USA/MapServer/2",
	});

	const spc_wms_outlook_layer = new WMSLayer({
		title: "SPC Convective Outlooks",
		url: MAP_SERVICE_URLS.webmap_service,
		opacity: 0.2,
	});
	const map = new Map({
		basemap: "arcgis-dark-gray",
		layers: [state_lines_layer, spc_wms_outlook_layer],
	});
	const view = new MapView({
		map: map,
		container,
		extent: {
			xmin: -109.03,
			ymin: 19.75,
			xmax: -79,
			ymax: 62,
			spatialReference: 4269,
		},
	});

	// app.layer = spc_wms_outlook_layer;
	app.map = map;
	app.view = view;

	watchHandle = app.view.when().then(async () => {
		const mapLayers = await app.view.get("map.allLayers");
		const jsonLayers = await mapLayers.toJSON();
		jsonLayers.forEach((layer) => console.log(`${layer}\n`, layer.toJSON()));
		// console.log("app.view >>\n", await mapLayers.toJSON());
		// app.view?.forEach((layer) => console.log("WMSLayer >>\n", layer.toJSON()));

		app.view.extent = spc_wms_outlook_layer.fullExtent;

		const layerList = new LayerList({
			view,
		});

		const legend = new Legend({
			view,
			basemapLegendVisible: true,
		});

		disableViewNavigation(app.view);
		setDefaultUiComponents(["attribution"], app.view);

		// app.view.ui.add(layerList, "top-left");
		// app.view.ui.add(legend, "bottom-left");
	});

	return cleanup;
};

function cleanup() {
	app.mapView?.destroy();
	watchHandle.remove();
}
