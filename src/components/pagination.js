import React from "react";
import PropTypes from "prop-types";
import { Pagination } from "react-bootstrap";
import styled from "styled-components";
import Dropdown from "./dropdown";

const Wrapper = styled.div`
	> div {
		&:first-child {
			align-items: center;
			display: flex;
		}
	}
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
	totalEntries,
	onSelectEntry,
	entryOptions
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
			clickPageNumber(page);
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
			<Wrapper>
				<div>
					{t("Hint.Show")}
					<div className="btn-group">
						<Dropdown
							options={entryOptions ?? defaultEntryOptions}
							value={pageSize}
							onSelect={onSelectEntry}
						/>
					</div>
					{t("Hint.Entries").toLowerCase()}
				</div>

				{children}

				<div>
					{t("Hint.ShowingEntriesHint", {
						firstEntry,
						lastEntry:
							lastEntry > totalEntries ? totalEntries : lastEntry,
						totalEntries: totalEntries || 0
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
			</Wrapper>
		);

	return null;
};

BasicPagination.defaultProps = {
	currentPage: 1,
	totalPages: 0,
	pageSize: 10,
	totalEntries: 0,
	t: () => {},
	entryOptions: defaultEntryOptions
};

BasicPagination.propTypes = {
	currentPage: PropTypes.number,
	totalPages: PropTypes.number,
	clickPageNumber: PropTypes.func.isRequired,
	pageSize: PropTypes.number,
	totalEntries: PropTypes.number,
	t: PropTypes.func,
	children: PropTypes.node.isRequired,
	onSelectEntry: PropTypes.func.isRequired,
	entryOptions: PropTypes.arrayOf(PropTypes.object)
};

export { BasicPagination as Pagination };
