import { useQuery } from "react-query";
import { fetchPublicInfoStatements } from "services/national_weather_service";

export const usePublicInfoStatementQuery = () => {
	return useQuery(["nws-pub-info-stmt"], () => fetchPublicInfoStatements());
};
