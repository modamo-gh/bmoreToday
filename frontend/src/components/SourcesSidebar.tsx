import { FC } from "react";
import { useEventContext } from "../contexts/EventContext";
import { SourcesSidebarProps } from "../types/SourcesSidebarProps";
import SourceFilterCheckbox from "./SourceFilterCheckbox";

const SourcesSidebar: FC<SourcesSidebarProps> = ({ width }) => {
	const {
		isBaltimoreBeatChecked,
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isEnochPrattLibraryChecked,
		setIsBaltimoreMagazineChecked,
		setIsBaltimoreShowplaceChecked,
		setIsEnochPrattLibraryChecked
	} = useEventContext();

	return (
		<div className="bg-[#232130] flex flex-row lg:flex-col lg:max-h-full lg:w-1/5 items-center rounded-lg w-full">
			{width >= 768 && (
				<h2 className="text-center text-[#f5f5f5] text-lg p-4">
					Filter Sources
				</h2>
			)}
			<div
				className={`flex flex-row gap-2 h-full md:gap-0 lg:flex-col lg:overflow-x-hidden overflow-x-scroll whitespace-nowrap`}
			>
				<SourceFilterCheckbox
					checked={isBaltimoreBeatChecked}
					disabled={false}
					label={"Baltimore Beat"}
					onChange={() => {
						setIsBaltimoreMagazineChecked((prev) => !prev);
					}}
					width={width}
				/>
				<SourceFilterCheckbox
					checked={isBaltimoreMagazineChecked}
					disabled={false}
					label={"Baltimore Magazine"}
					onChange={() => {
						setIsBaltimoreMagazineChecked((prev) => !prev);
					}}
					width={width}
				/>
				<SourceFilterCheckbox
					checked={isBaltimoreShowplaceChecked}
					disabled={false}
					label={"Baltimore Showplace"}
					onChange={() => {
						setIsBaltimoreShowplaceChecked((prev) => !prev);
					}}
					width={width}
				/>
				<SourceFilterCheckbox
					checked={false}
					disabled
					label={"Bmore Art"}
					onChange={() => {}}
					width={width}
				/>
				<SourceFilterCheckbox
					checked={isEnochPrattLibraryChecked}
					disabled={false}
					label={"Enoch Pratt Library"}
					onChange={() => {
						setIsEnochPrattLibraryChecked((prev) => !prev);
					}}
					width={width}
				/>
			</div>
		</div>
	);
};

export default SourcesSidebar;
