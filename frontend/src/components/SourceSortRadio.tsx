import { FC } from "react";
import { SourceSortRadioType } from "../types/SourceSortRadioType";
import { useEventContext } from "../contexts/EventContext";

const SourceSortRadio: FC<SourceSortRadioType> = ({ label, settingName }) => {
	const { setSortSetting, sortSetting } = useEventContext();

	return (
		<label className="flex flex-1 gap-2 items-center px-4 w-full">
			<input
				checked={sortSetting === settingName}
				onClick={(event) => {
					event.stopPropagation();
					setSortSetting(settingName);
				}}
				type="radio"
			/>
			<span className="flex-1 text-[#f5f5f5]">{label}</span>
		</label>
	);
};

export default SourceSortRadio;
