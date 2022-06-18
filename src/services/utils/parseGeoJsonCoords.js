export const parseGeoJsonCoords = (arrWithGeoJson) => {
	const geoJsonCoordsArr = arrWithGeoJson.map((tvs) => {
		return tvs.geometry.coordinates;
	});

	return geoJsonCoordsArr;
};
