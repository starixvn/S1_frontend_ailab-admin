import React from "react";
import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";
import styled from "styled-components";
import Dropdown from "./dropdown";

const Header = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 1rem;

	.page-dropdown {
		display: flex;
		align-items: center;
		> select {
			margin: auto 0.5rem;
		}
	}
`;

const Bottom = styled.div`
	display: flex;
	justify-content: space-between;
	align-items: center;
	margin-top: 0.5rem;
`;

const defPage = {
	prevPage: "prevPage",
	nextPage: "nextPage"
};

const defaultEntryOptions = [
	{ value: 10, displayText: 10 },
	{ value: 25, displayText: 25 },
	{ value: 50, displayText: 50 },
	{ value: 75, displayText: 75 },
	{ value: 100, displayText: 100 }
];

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

const BasicPagination = ({
	t,
	children,
	currentPage,
	totalPages,
	clickPageNumber,
	pageSize,
	rowCount,
	onSelectEntry,
	entryOptions,
	headerComponent
}) => {
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
			clickPageNumber({ pageNumber: page });
		}
	};

	const arr = pageNumbers(currentPage, totalPages);
	const _arr = arr?.map(i => (
		<Pagination.Item
			key={`pageNumber-${i}`}
			onClick={() => _clickPageNumber(i)}
			active={i === currentPage}>
			{i}
		</Pagination.Item>
	));

	const firstEntry = (currentPage - 1) * pageSize + 1;
	const lastEntry = firstEntry + pageSize - 1;
	if (totalPages !== 0)
		return (
			<>
				<Header>
					<div className="page-dropdown">
						{t("Hint.Show")}
						<Dropdown
							options={entryOptions ?? defaultEntryOptions}
							value={pageSize}
							onSelect={onSelectEntry}
						/>
						{t("Hint.Entries").toLowerCase()}
					</div>
					{headerComponent}
				</Header>

				{children}

				<Bottom>
					<div>
						{t("Hint.ShowingEntriesHint", {
							firstEntry,
							lastEntry:
								lastEntry > rowCount ? rowCount : lastEntry,
							rowCount: rowCount || 0
						})}
					</div>
					<Pagination className="d-flex justify-content-center float-end">
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
				</Bottom>
			</>
		);

	return null;
};

BasicPagination.defaultProps = {
	currentPage: 1,
	totalPages: 0,
	pageSize: 10,
	rowCount: 0,
	t: () => {},
	entryOptions: defaultEntryOptions,
	headerComponent: null
};

BasicPagination.propTypes = {
	currentPage: PropTypes.number,
	totalPages: PropTypes.number,
	clickPageNumber: PropTypes.func.isRequired,
	pageSize: PropTypes.number,
	rowCount: PropTypes.number,
	t: PropTypes.func,
	children: PropTypes.node.isRequired,
	onSelectEntry: PropTypes.func.isRequired,
	entryOptions: PropTypes.arrayOf(PropTypes.object),
	headerComponent: PropTypes.node
};

export { BasicPagination as Pagination };
