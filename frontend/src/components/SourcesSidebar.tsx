import { FC, useState } from "react";
import { useEventContext } from "../contexts/EventContext";
import { SourcesSidebarProps } from "../types/SourcesSidebarProps";
import SourceFilterCheckbox from "./SourceFilterCheckbox";
import { FaFilter, FaGears, FaSliders, FaSort } from "react-icons/fa6";
import SourceSortRadio from "./SourceSortRadio";

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

	const radioOptions = [
		{ label: "Default", settingName: "default" },
		{ label: "A to Z", settingName: "aToZ" },
		{ label: "Z to A", settingName: "zToA" }
	];

	return (
		<div className="bg-[#232130] flex flex-row gap-4 lg:flex-col lg:max-h-full lg:w-1/5 items-center p-4 rounded-lg w-full">
			{width >= 768 && (
				<div className="flex flex-row items-center justify-center text-lg">
					<FaGears className="text-[#ff6a00]" />
					<h2 className="text-center text-[#f5f5f5] p-4">Settings</h2>
				</div>
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
				{expandedSection !== "Filter" ? (
					<div className="flex flex-row items-center justify-center text-lg">
						<FaFilter className="text-[#ff6a00]" />
						<h2 className="text-center text-[#f5f5f5] p-4">
							Filter
						</h2>
					</div>
				) : (
					<div className="h-full flex flex-col">
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
					</div>
				)}
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
				{expandedSection !== "Sort" ? (
					<div className="flex flex-row items-center justify-center text-lg">
						<FaSort className="text-[#ff6a00]" />
						<h2 className="text-center text-[#f5f5f5] p-4">Sort</h2>
					</div>
				) : (
					<div className="h-full flex flex-col">
						{radioOptions.map((option) => (
							<SourceSortRadio
								label={option.label}
								settingName={option.settingName}
							/>
						))}
					</div>
				)}
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
				{expandedSection !== "Preferences" ? (
					<div className="flex flex-row items-center justify-center text-lg">
						<FaSliders className="text-[#ff6a00]" />
						<h2 className="text-center text-[#f5f5f5] p-4">
							Preferences
						</h2>
					</div>
				) : null}
			</div>
		</div>
	);
};

export default SourcesSidebar;
