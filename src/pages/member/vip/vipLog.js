import React, { useEffect, useState, useContext } from "react";
import Wrapper from "../../../components/memberDetail/wrapper";

export function VipLog(props) {
	const custId = props?.match?.params?.id;

	console.log(props);
	return (
		<Wrapper custId={custId}>
			<div>Hi</div>
		</Wrapper>
	);
}
