/* eslint-disable */
import { useState } from "react";
import moment from "moment";

const useGetDateRange = () => {
	const [dateRange, setDateRange] = useState({
		startDate: moment().subtract(6, "days").startOf("day").format(),
		endDate: moment().endOf("day").format()
	});

	return { dateRange, setDateRange };
};

export { useGetDateRange };
