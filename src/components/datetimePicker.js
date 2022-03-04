/* eslint-disable */
import React, { useEffect } from "react";
import $ from "jquery";
import moment from "moment";
import daterangepicker from "daterangepicker";
import PropTypes from "prop-types";

export default function Component({
	id,
	setDateRange,
	isRange = true,
	timePicker = true
}) {
	useEffect(() => {
		const updateConfig = ({ startDate, endDate }) => {
			let options = {
				timePicker,
				timePicker24Hour: false,
				autoApply: true,
				alwaysShowCalendars: true,
				singleDatePicker: !isRange,
				showCustomRangeLabel: isRange,
				ranges: isRange
					? {
							Today: [
								moment().startOf("day"),
								moment().endOf("day")
							],
							Yesterday: [
								moment().subtract(1, "days").startOf("day"),
								moment().subtract(1, "days").endOf("day")
							],
							"Last 7 Days": [
								moment().subtract(6, "days").startOf("day"),
								moment().endOf("day")
							],
							"Last 30 Days": [
								moment().subtract(29, "days").startOf("day"),
								moment().endOf("day")
							],
							"This Month": [
								moment().startOf("month").startOf("day"),
								moment().endOf("month").endOf("day")
							],
							"Last Month": [
								moment()
									.subtract(1, "month")
									.startOf("month")
									.startOf("day"),
								moment()
									.subtract(1, "month")
									.endOf("month")
									.endOf("day")
							]
					  }
					: null,
				locale: {
					format: `MM/DD/YYYY${timePicker ? " HH:mm:ss" : ""}`,
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

			$(`#${id}`).daterangepicker(options, function (start, end, label) {
				setDateRange({
					startDate: start.format(),
					endDate: end.format()
				});
			});
		};

		updateConfig({
			startDate: moment().subtract(6, "days").startOf("day"),
			endDate: moment().endOf("day")
		});
	}, []);

	return (
		<input
			id={id}
			type="text"
			className="form-control dateInput"
			style={{ display: "block" }}
			autoComplete="off"
			required
		/>
	);
}

Component.defaultProps = {
	id: "daterange",
	isRange: true,
	timePicker: true
};

Component.propTypes = {
	id: PropTypes.string,
	setDateRange: PropTypes.func.isRequired,
	isRange: PropTypes.bool,
	timePicker: PropTypes.bool
};
