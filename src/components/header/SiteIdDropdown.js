import React, { useContext, useEffect } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useSelectSiteId } from "../../hook";
import { allSiteListContext } from "../context";

const SiteIdDropdown = () => {
	const { allSiteList, siteId, setSiteId } = useContext(allSiteListContext);

	const {
		selected: siteIdSelected,
		OnSelect: onSiteIdSelect,
		options: siteIdOptions
	} = useSelectSiteId({
		allSiteList,
		defaultSelectFirst: true
	});

	const handleSiteIdClick = option => () => {
		onSiteIdSelect(option);
	};

	const title = siteIdSelected?.displayText || "";

	useEffect(() => {
		if (siteIdSelected?.value !== siteId) {
			setSiteId(siteIdSelected?.value);
		}
	}, [siteIdSelected?.value, siteId]);

	return (
		<DropdownButton title={title} style={{ marginRight: "8px" }}>
			{siteIdOptions.map(option => (
				<Dropdown.Item
					key={option.value}
					onClick={handleSiteIdClick(option)}>
					{option.displayText}
				</Dropdown.Item>
			))}
		</DropdownButton>
	);
};

export { SiteIdDropdown };
