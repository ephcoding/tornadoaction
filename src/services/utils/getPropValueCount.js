export const countPropertyValueOccurrences = (objArr, property) => {
	let uniqueValues = new Map();

	// get value of objArr[property]
	objArr.forEach(curObject => {
		const thisValue = curObject[property];
		// IF: value is already in countValues[]
		if (uniqueValues.has(thisValue)) {
			// THEN: valueCount++
			uniqueValues.set(thisValue, uniqueValues.get(thisValue) + 1);
		} else {
			// ELSE: push value to countValues[] with countValues[value].count = 1
			propValueCounts[property].count = 1;
		}
	});
};
