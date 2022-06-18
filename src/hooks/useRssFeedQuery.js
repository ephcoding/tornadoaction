import { useQuery } from "react-query";
import { getSpcRssFeed } from "services/storm_prediction_center";

export const useRssFeedQuery = (feedType) => {
	return useQuery(["spc-rss-feeds", feedType], () => getSpcRssFeed(feedType));
};
