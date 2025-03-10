import { FC, useState } from "react";
import { useEventContext } from "../contexts/EventContext";
import { SourcesSidebarProps } from "../types/SourcesSidebarProps";
import SourceFilterCheckbox from "./SourceFilterCheckbox";

const SourcesSidebar: FC<SourcesSidebarProps> = ({ width }) => {
	const {
		isBaltimoreBeatChecked,
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isEnochPrattLibraryChecked,
		setIsBaltimoreBeatChecked,
		setIsBaltimoreMagazineChecked,
		setIsBaltimoreShowplaceChecked,
		setIsEnochPrattLibraryChecked
	} = useEventContext();

	const [expandedSection, setExpandedSection] = useState("");

	return (
		<div className="bg-[#232130] flex flex-row gap-4 lg:flex-col lg:max-h-full lg:w-1/5 items-center p-4 rounded-lg w-full">
			{width >= 768 && (
				<h2 className="text-center text-[#f5f5f5] text-lg p-4">
					Settings
				</h2>
			)}
			<div
				className={`bg-[#1c1a29] cursor-pointer flex ${
					expandedSection === "Filter" ? "flex-[8]" : "flex-1"
				} items-center justify-center rounded-lg w-full`}
				onClick={() =>
					setExpandedSection((prev) =>
						prev !== "Filter" ? "Filter" : ""
					)
				}
			>
				<h3 className="text-center text-[#f5f5f5] text-lg">Filter</h3>
			</div>
			<div
				className={`bg-[#1c1a29] cursor-pointer flex ${
					expandedSection === "Sort" ? "flex-[8]" : "flex-1"
				} items-center justify-center rounded-lg w-full`}
				onClick={() =>
					setExpandedSection((prev) =>
						prev !== "Sort" ? "Sort" : ""
					)
				}
			>
				<h3 className="text-center text-[#f5f5f5] text-lg">Sort</h3>
			</div>
			<div
				className={`bg-[#1c1a29] cursor-pointer flex ${
					expandedSection === "Preferences" ? "flex-[8]" : "flex-1"
				} items-center justify-center rounded-lg w-full`}
				onClick={() =>
					setExpandedSection((prev) =>
						prev !== "Preferences" ? "Preferences" : ""
					)
				}
			>
				<h3 className="text-center text-[#f5f5f5] text-lg">
					Preferences
				</h3>
			</div>
			{/* <div
				className={`flex flex-row gap-2 h-full md:gap-0 lg:flex-col lg:overflow-x-hidden overflow-x-scroll whitespace-nowrap`}
			>
				<SourceFilterCheckbox
					checked={isBaltimoreBeatChecked}
					disabled={false}
					label={"Baltimore Beat"}
					onChange={() => {
						setIsBaltimoreBeatChecked((prev) => !prev);
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
			</div> */}
		</div>
	);
};

export default SourcesSidebar;
