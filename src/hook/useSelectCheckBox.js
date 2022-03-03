import { useState } from "react";

const useSelectCheckBox = props => {
	const { datas } = props;

	const [selected, setSelected] = useState({
		selectAll: false,
		datas: {}
	});

	const OnSelect = e => {
		const { value } = e.target;
		setSelected(prev => {
			const stateDatas = { ...prev.datas };
			if (stateDatas[value]) {
				delete stateDatas[value];
			} else {
				stateDatas[value] = value;
			}

			return {
				selectAll: Object.keys(stateDatas).length === datas.length,
				datas: stateDatas
			};
		});
	};

	const OnSelectAll = () => {
		setSelected(prev => {
			const selectAll = !prev.selectAll;
			const stateDatas = {};

			if (selectAll) {
				datas?.forEach(d => {
					stateDatas[d] = d;
				});
			}

			return { selectAll, datas: stateDatas };
		});
	};

	const GetSelected = () =>
		Object.keys(selected.datas).map(key => selected.datas[key]);
	const IsSelected = value => selected?.datas[value] !== undefined;
	const IsSelectAll = () => selected?.selectAll;

	return { GetSelected, OnSelect, OnSelectAll, IsSelected, IsSelectAll };
};

export { useSelectCheckBox };
