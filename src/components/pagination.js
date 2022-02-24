import React from "react";
import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";

const defPage = {
	prevPage: "prevPage",
	nextPage: "nextPage"
};

const pageNumbers = (currentPage, totalPages) => {
	const pairs = 2;
	const range = [1];

	if (totalPages <= 1) return range;

	const range_of_head = currentPage - pairs;
	const range_of_tail = currentPage + pairs;
	for (let i = range_of_head; i <= range_of_tail; i++) {
		if (i < totalPages && i > 1) range.push(i);
	}
	range.push(totalPages);

	let tmp;
	const rangeWithDots = [];
	for (const i of range) {
		if (tmp) {
			if (i - tmp === 2) {
				rangeWithDots.push(tmp + 1);
			} else if (i - tmp !== 1) {
				rangeWithDots.push("...");
			}
		}
		rangeWithDots.push(i);
		tmp = i;
	}

	return rangeWithDots;
};

const BasicPagination = ({ currentPage, totalPages, clickPageNumber }) => {
	const _clickPageNumber = p => {
		let page = 1;

		if (!isNaN(p)) {
			page = p;
		} else if (p === defPage.prevPage) {
			page = currentPage === 1 ? 1 : currentPage - 1;
		} else if (p === defPage.nextPage) {
			page = currentPage === totalPages ? totalPages : currentPage + 1;
		}

		if (page !== currentPage && clickPageNumber) {
			clickPageNumber(page);
		}
	};
	const arr = pageNumbers(currentPage, totalPages);
	const _arr = arr?.map(i => (
		<Pagination.Item
			key={`pageNumber-${i}`}
			onClick={() => _clickPageNumber(i)}>
			{i}
		</Pagination.Item>
	));

	if (totalPages !== 0)
		return (
			<Pagination className="d-flex justify-content-center">
				<Pagination.Prev
					disabled={currentPage === 1}
					onClick={() => _clickPageNumber(defPage.prevPage)}
				/>

				{_arr}

				<Pagination.Next
					disabled={currentPage === totalPages}
					onClick={() => _clickPageNumber(defPage.nextPage)}
				/>
			</Pagination>
		);

	return null;
};

BasicPagination.defaultProps = {
	currentPage: 1,
	totalPages: 0
};

BasicPagination.propTypes = {
	currentPage: PropTypes.number,
	totalPages: PropTypes.number,
	clickPageNumber: PropTypes.func.isRequired
};

export { BasicPagination as Pagination };
