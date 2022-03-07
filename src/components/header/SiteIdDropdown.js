import React, { useContext } from "react";
import { Dropdown, DropdownButton } from "react-bootstrap";
import { useSelectSiteId } from "../../hook";
import { allSiteListContext } from "../context";

const SiteIdDropdown = () => {
	const { allSiteList, setSiteId } = useContext(allSiteListContext);

	const {
		selected: siteIdSelected,
		OnSelect: onSiteIdSelect,
		options: siteIdOptions
	} = useSelectSiteId({
		allSiteList,
		defaultSelectFirst: true
	});

	const handleSiteIdClick = option => () => {
		setSiteId(option.value);
		onSiteIdSelect(option);
	};

	const title = siteIdSelected?.displayText || "";

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
