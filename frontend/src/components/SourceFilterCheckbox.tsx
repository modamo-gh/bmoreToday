import { FC } from "react";
import { SourceFilterCheckboxType } from "../types/SourceFilterCheckboxType";

const SourceFilterCheckbox: FC<SourceFilterCheckboxType> = ({
	checked,
	disabled,
	label,
	onChange
}) => {
	return (
		<label className="flex flex-1 gap-2 items-center px-4 md:max-w-fit w-full">
			<input
				disabled={disabled}
				checked={checked}
				className="accent-[#ff6a00] cursor-pointer h-5 rounded w-5"
				onChange={onChange}
				onClick={(event) => event.stopPropagation()}
				type="checkbox"
			/>
			<span className="flex-1 text-nowrap lg:text-wrap max-w-fit text-[#f5f5f5]">
				{label}
			</span>
		</label>
	);
};

export default SourceFilterCheckbox;
