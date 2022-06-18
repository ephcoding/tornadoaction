export const getAreaDescMAP = alertAreaDescSTR => {
	if (alertAreaDescSTR === null || alertAreaDescSTR === undefined) return;

	const areaDescARR = alertAreaDescSTR.split(/(?:;\s)/gm);
	const areaDescMAP = new Map();

	areaDescARR.forEach(affectedArea => {
		const [alertArea, state] = affectedArea.split(/\,\s/);

		if (areaDescMAP.get(state) === undefined) {
			areaDescMAP.set(state, new Array(alertArea));
		} else {
			areaDescMAP.set(state, [...areaDescMAP.get(state), alertArea]);
		}
	});

	return areaDescMAP;
};
