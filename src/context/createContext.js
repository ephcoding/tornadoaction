export const createContext = (reducer, dispatchReducerFuncs, initState) => {
	const StateContext = React.createContext();
	const DispatchContext = React.createContext();

	const Provider = ({ children }) => {
		const [state, dispatch] = useReducer(reducer, initState);

		const actions = {};

		for (let key in dispatchReducerFuncs) {
			actions[key] = dispatchReducerFuncs[key](dispatch);
		}

		return (
			<DispatchContext.Provider value={{ ...actions }}>
				<StateContext.Provider value={{ state }}>
					{children}
				</StateContext.Provider>
			</DispatchContext.Provider>
		);
	};

	return { DispatchContext, StateContext, Provider };
};
