// TODO: refactor this to RECURSIVELY find key BEFORE sorting
export const sortArrByKey = (unsortedArr, key) => {
	const sortASC = (curObj, nexObj) => {
		const currentValue = curObj.properties[key];
		const nextValue = nexObj.properties[key];

		if (currentValue < nextValue) return 1;
		if (currentValue === nextValue) return 0;
		if (currentValue > nextValue) return -1;
	};
	return unsortedArr.sort(sortASC);
};
