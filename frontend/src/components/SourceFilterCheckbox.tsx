import { FC } from "react";
import { SourceFilterCheckboxType } from "../types/SourceFilterCheckboxType";

const SourceFilterCheckbox: FC<SourceFilterCheckboxType> = ({
	checked,
	disabled,
	label,
	onChange,
	width
}) => {
	return width > 425 ? (
		<label className="flex flex-1 gap-2 items-center px-4 w-full">
			<input
				disabled={disabled}
				checked={checked}
				className="accent-[#ff6a00] cursor-pointer h-5 rounded w-5"
				onChange={onChange}
				onClick={(event) => event.stopPropagation()}
				type="checkbox"
			/>
			<span className="flex-1 text-[#f5f5f5]">{label}</span>
		</label>
	) : (
		<p
			className={`${
				checked ? "bg-[#ff6a00]" : "bg-[#232130]"
			} p-1 rounded-sm ${checked ? "text-[#232130]" : "text-[#f5f5f5]"}`}
			onClick={onChange}
		>
			{label}
		</p>
	);
};

export default SourceFilterCheckbox;
