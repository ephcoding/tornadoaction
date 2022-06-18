export const formatYYYYMMDD = date => {
	return date.toISOString().slice(0, 10).split("-").join("");
};
