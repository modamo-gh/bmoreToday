import { FC } from "react";
import { SourceFilterCheckboxType } from "../types/SourceFilterCheckboxType";

const SourceFilterCheckbox: FC<SourceFilterCheckboxType> = ({ checked, label, onChange }) => {
	return (
		<label className="flex flex-1 gap-2 items-center">
			<input
				checked={checked}
				className="accent-[#ff6a00] cursor-pointer h-5 rounded w-5"
				onChange={onChange}
				type="checkbox"
			/>
			<span className="text-[#f5f5f5]">{label}</span>
		</label>
	);
};

export default SourceFilterCheckbox;
