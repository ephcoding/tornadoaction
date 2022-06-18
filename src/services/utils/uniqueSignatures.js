// ///////////////////////// NOTE: ////////////////////////////////
//        - SWDI returns multiple coord-unique TVS for each tornado
//        - outside of rendering a tornado's path, I only need 1
//        - uniqueSignatures() returns 1 TVS/tornado
// ///////////////////////// NOTE: ////////////////////////////////
// TODO: reference FCC algo for filtering objects from array based on matching entries

export const uniqueSignatures = (sortedTVS) => {
	let uniqueTVS = [];

	for (let i = 0; i < sortedTVS.length - 1; i++) {
		const curCELL_ID = sortedTVS[i].properties.CELL_ID;
		const curWSR_ID = sortedTVS[i].properties.WSR_ID;
		const nextCELL_ID = sortedTVS[i + 1].properties.CELL_ID;
		const nextWSR_ID = sortedTVS[i + 1].properties.WSR_ID;
		if (curCELL_ID === nextCELL_ID && nextWSR_ID !== curWSR_ID) {
			uniqueTVS.push(sortedTVS[i]);
		}
	}

	return uniqueTVS;
};
