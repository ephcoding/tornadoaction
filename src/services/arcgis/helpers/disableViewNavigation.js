export const disableViewNavigation = (view) => {
	// disables using +/- and alts to zoom
	view.on("key-down", (e) => {
		const keysToIgnore = [
			"+",
			"-",
			"Shift",
			"_",
			"=",
			"ArrowLeft",
			"ArrowRight",
			"ArrowUp",
			"ArrowDown",
			"Left",
			"Right",
			"Up",
			"Down",
		];
		const pressedKey = e.key;
		keysToIgnore.includes(pressedKey) && e.stopPropagation();
	});

	// disable zooming with mouse wheel
	view.on("mouse-wheel", (e) => e.stopPropagation());

	// disable zooming by dbl clicking
	view.on("double-click", (e) => e.stopPropagation());
	view.on("double-click", ["Control"], (e) => e.stopPropagation());

	// disable pinch zoom & panning
	view.on("drag", (e) => e.stopPropagation());

	// disable alt drag-zooming events
	view.on("drag", ["Shift"], (e) => e.stopPropagation());
	view.on("drag", ["Shift", "Control"], (e) => e.stopPropagation());
};
