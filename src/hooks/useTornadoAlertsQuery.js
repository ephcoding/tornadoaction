import { useQuery } from "react-query";
import { getTornadoAlerts } from "../services/national_weather_service";

export const useTornadoAlertsQuery = (alertType) => {
	return useQuery(["tornado-alerts", alertType], () =>
		getTornadoAlerts(alertType)
	);
};
