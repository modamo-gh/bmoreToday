import { FC, useState } from "react";
import { useEventContext } from "../contexts/EventContext";
import { SourcesSidebarProps } from "../types/SourcesSidebarProps";
import SourceFilterCheckbox from "./SourceFilterCheckbox";
import {
	FaArrowLeft,
	FaFilter,
	FaGears,
	FaSliders,
	FaSort
} from "react-icons/fa6";
import SourceSortRadio from "./SourceSortRadio";
import { usePreferencesContext } from "../contexts/PreferencesContext";

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

	const { setUse12Hours, setUseFahrenheit, use12Hours, useFahrenheit } =
		usePreferencesContext();

	const [expandedSection, setExpandedSection] = useState("");

	const radioOptions = [
		{ label: "Default", settingName: "default" },
		{ label: "A to Z", settingName: "aToZ" },
		{ label: "Z to A", settingName: "zToA" },
		{ label: "Earliest to Latest", settingName: "earliestToLatest" },
		{ label: "$ to $$$", settingName: "cheapestToMostExpensive" }
	];

	return (
		<div className="bg-[#232130] min-h-1/5 flex flex-row gap-4 lg:flex-col lg:max-h-full lg:w-1/5 items-center p-4 rounded-lg w-full">
			{width >= 1024 && (
				<div className="flex flex-row gap-4 items-center justify-center text-lg w-fit">
					<FaGears className="text-[#ff6a00]" />
					<h2 className="text-center text-[#f5f5f5]">Settings</h2>
				</div>
			)}
			{width < 768 && expandedSection && (
				<div className="flex items-center justify-center w-1/5" onClick={() => setExpandedSection("")}>
					<FaArrowLeft className="text-[#ff6a00]" />
				</div>
			)}
			<div
				className={`bg-[#1c1a29] cursor-pointer flex ${
					expandedSection === "Filter"
						? "flex-[8] max-w-4/5"
						: "flex-1"
				} ${
					expandedSection !== "Filter" && expandedSection !== ""
						? "hidden md:flex"
						: "flex"
				} items-center justify-center lg:min-w-full rounded-lg h-full`}
				onClick={() =>
					setExpandedSection((prev) =>
						prev !== "Filter" ? "Filter" : ""
					)
				}
			>
				{expandedSection !== "Filter" ? (
					<div className="flex flex-row gap-4 items-center justify-center text-lg w-fit">
						<FaFilter className="text-[#ff6a00]" />
						{width >= 768 && (
							<h2
								className={`${
									expandedSection === ""
										? "flex"
										: "hidden lg:flex"
								} text-center text-[#f5f5f5]`}
							>
								Filter
							</h2>
						)}
					</div>
				) : (
					<div className="flex flex-row flex-1 h-full lg:flex-col overflow-x-scroll min-w-full">
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
					expandedSection === "Sort"
						? "flex-[8] max-w-4/5"
						: "flex-1"
				} ${
					expandedSection !== "Sort" && expandedSection !== ""
						? "hidden md:flex"
						: "flex"
				} items-center justify-center lg:min-w-full rounded-lg h-full`}
				onClick={() =>
					setExpandedSection((prev) =>
						prev !== "Sort" ? "Sort" : ""
					)
				}
			>
				{expandedSection !== "Sort" ? (
					<div className="flex flex-row gap-4 items-center justify-center text-lg w-fit">
						<FaSort className="text-[#ff6a00]" />
						{width >= 768 && (
							<h2
								className={`${
									expandedSection === ""
										? "block"
										: "hidden lg:flex"
								} text-center text-[#f5f5f5]`}
							>
								Sort
							</h2>
						)}
					</div>
				) : (
					<div className="flex h-full lg:flex-col overflow-x-scroll">
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
					expandedSection === "Preferences"
						? "flex-[8] max-w-4/5"
						: "flex-1"
				} ${
					expandedSection !== "Preferences" && expandedSection !== ""
						? "hidden md:flex"
						: "flex"
				} items-center justify-center lg:min-w-full rounded-lg h-full`}
				onClick={() =>
					setExpandedSection((prev) =>
						prev !== "Preferences" ? "Preferences" : ""
					)
				}
			>
				{expandedSection !== "Preferences" ? (
					<div className="flex flex-row gap-4 items-center justify-center text-lg w-fit">
						<FaSliders className="text-[#ff6a00]" />
						{width >= 768 && (
							<h2
								className={`${
									expandedSection === ""
										? "block"
										: "hidden lg:flex"
								} text-center text-[#f5f5f5]`}
							>
								Preferences
							</h2>
						)}
					</div>
				) : (
					<div className="flex flex-row flex-1 h-full items-center justify-evenly lg:flex-col min-w-full">
						<div className="flex items-center justify-center">
							<label
								className="cursor-pointer flex items-center gap-2 h-fit"
								onClick={(event) => event.stopPropagation()}
							>
								<span className="text-center text-[#f5f5f5]">
									°C
								</span>
								<input
									checked={useFahrenheit}
									className="hidden"
									onChange={() =>
										setUseFahrenheit((prev) => !prev)
									}
									type="checkbox"
								/>
								<div className="bg-[#ff6a00] flex h-6 items-center p-1 rounded-full w-12">
									<div
										className={`bg-white h-4 rounded-full transition-transform ${
											useFahrenheit
												? "translate-x-6"
												: "translate-x-0"
										} w-4`}
									/>
								</div>
								<span className="text-center text-[#f5f5f5]">
									°F
								</span>
							</label>
						</div>
						<div className="flex items-center justify-center">
							<label
								className="cursor-pointer flex justify-center items-center gap-2 h-fit"
								onClick={(event) => event.stopPropagation()}
							>
								<span className="text-center text-[#f5f5f5]">
									12 hr
								</span>
								<input
									checked={use12Hours}
									className="hidden"
									onChange={() =>
										setUse12Hours((prev) => !prev)
									}
									type="checkbox"
								/>
								<div className="bg-[#ff6a00] flex h-6 items-center p-1 rounded-full w-12">
									<div
										className={`bg-white h-4 rounded-full transition-transform ${
											use12Hours
												? "translate-x-0"
												: "translate-x-6"
										} w-4`}
									/>
								</div>
								<span className="text-center text-[#f5f5f5]">
									24 hr
								</span>
							</label>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default SourcesSidebar;
