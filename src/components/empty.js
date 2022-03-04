import React from "react";
import { Box } from "react-bootstrap-icons";
import styled from "styled-components";

const EmptyWrapper = styled.div`
	margin: 0px 8px;
	height: 160px;
	display: flex;
	flex-direction: column;
	justify-content: center;
	align-items: center;
`;

const Empty = () => (
	<EmptyWrapper>
		<Box className="text-secondary fs-2" />
		<p className="fs-6">No Data</p>
	</EmptyWrapper>
);

export { Empty };
