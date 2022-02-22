/* eslint-disable */
import React, { useEffect } from "react";
import $ from "jquery";
import moment from "moment";
import daterangepicker from "daterangepicker";
import PropTypes from "prop-types";

export default function Component({ setDateRange }) {
	useEffect(() => {
		const updateConfig = ({ startDate, endDate }) => {
			let options = {
				timePicker: true,
				timePicker24Hour: false,
				autoApply: true,
				alwaysShowCalendars: true,
				ranges: {
					Today: [moment(), moment()],
					Yesterday: [
						moment().subtract(1, "days"),
						moment().subtract(1, "days")
					],
					"Last 7 Days": [moment().subtract(6, "days"), moment()],
					"Last 30 Days": [moment().subtract(29, "days"), moment()],
					"This Month": [
						moment().startOf("month"),
						moment().endOf("month")
					],
					"Last Month": [
						moment().subtract(1, "month").startOf("month"),
						moment().subtract(1, "month").endOf("month")
					]
				},
				locale: {
					format: "MM/DD/YYYY HH:mm:ss",
					separator: " - ",
					applyLabel: "Apply",
					cancelLabel: "Cancel",
					fromLabel: "From",
					toLabel: "To",
					customRangeLabel: "Custom",
					weekLabel: "W",
					daysOfWeek: ["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"],
					monthNames: [
						"January",
						"February",
						"March",
						"April",
						"May",
						"June",
						"July",
						"August",
						"September",
						"October",
						"November",
						"December"
					],
					firstDay: 1
				},
				startDate: startDate,
				endDate: endDate
			};

			$("#daterange").daterangepicker(
				options,
				function (start, end, label) {
					setDateRange({
						startDate: start.format(),
						endDate: end.format()
					});
				}
			);
		};

		updateConfig({
			startDate: moment().subtract(6, "days").startOf("day"),
			endDate: moment().endOf("day")
		});
	}, []);

	return (
		<input
			id="daterange"
			type="text"
			className="form-control dateInput"
			style={{ display: "block" }}
			autoComplete="off"
			required
		/>
	);
}

Component.propTypes = {
	setDateRange: PropTypes.func.isRequired
};
