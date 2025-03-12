import { FC, useState } from "react";
import { useEventContext } from "../contexts/EventContext";
import { SourcesSidebarProps } from "../types/SourcesSidebarProps";
import SourceFilterCheckbox from "./SourceFilterCheckbox";
import { FaFilter, FaGears, FaSliders, FaSort } from "react-icons/fa6";

const SourcesSidebar: FC<SourcesSidebarProps> = ({ width }) => {
	const {
		isBaltimoreBeatChecked,
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isEnochPrattLibraryChecked,
		setIsBaltimoreBeatChecked,
		setIsBaltimoreMagazineChecked,
		setIsBaltimoreShowplaceChecked,
		setIsEnochPrattLibraryChecked,
		setSortSetting,
		sortSetting
	} = useEventContext();

	const [expandedSection, setExpandedSection] = useState("");

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
						<label className="flex flex-1 gap-2 items-center px-4 w-full">
							<input
								checked={sortSetting === "default"}
								onClick={(event) => {
									event.stopPropagation();
									setSortSetting("default");
								}}
								type="radio"
							/>
							<span className="flex-1 text-[#f5f5f5]">
								Default
							</span>
						</label>
						<label className="flex flex-1 gap-2 items-center px-4 w-full">
							<input
								checked={sortSetting === "aToZ"}
								onClick={(event) => {
									event.stopPropagation();
									setSortSetting("aToZ");
								}}
								type="radio"
							/>
							<span className="flex-1 text-[#f5f5f5]">
								A to Z
							</span>
						</label>
						<label className="flex flex-1 gap-2 items-center px-4 w-full">
							<input
								checked={sortSetting === "zToA"}
								onClick={(event) => {
									event.stopPropagation();
									setSortSetting("zToA");
								}}
								type="radio"
							/>
							<span className="flex-1 text-[#f5f5f5]">
								Z to A
							</span>
						</label>
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
