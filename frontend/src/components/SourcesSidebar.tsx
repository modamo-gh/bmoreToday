import { useEventContext } from "../contexts/EventContext";
import SourceFilterCheckbox from "./SourceFilterCheckbox";

const SourcesSidebar = () => {
	const {
		isBaltimoreMagazineChecked,
		isBaltimoreShowplaceChecked,
		isEnochPrattLibraryChecked,
		setIsBaltimoreMagazineChecked,
		setIsBaltimoreShowplaceChecked,
		setIsEnochPrattLibraryChecked
	} = useEventContext();

	return (
		<div className="bg-[#232130] flex flex-row lg:flex-col lg:max-h-full lg:w-1/5 items-center rounded-lg w-full">
			<h2 className="text-center text-[#f5f5f5] text-lg p-4">
				Filter Sources
			</h2>
			<div className="flex flex-row h-full lg:flex-col lg:overflow-x-hidden overflow-x-scroll whitespace-nowrap">
				<SourceFilterCheckbox
					checked={isBaltimoreMagazineChecked}
					disabled
					label={"Baltimore Beat"}
					onChange={() => {
						setIsBaltimoreMagazineChecked((prev) => !prev);
					}}
				/>
				<SourceFilterCheckbox
					checked={isBaltimoreMagazineChecked}
					disabled={false}
					label={"Baltimore Magazine"}
					onChange={() => {
						setIsBaltimoreMagazineChecked((prev) => !prev);
					}}
				/>
				<SourceFilterCheckbox
					checked={isBaltimoreShowplaceChecked}
					disabled={false}
					label={"Baltimore Showplace"}
					onChange={() => {
						setIsBaltimoreShowplaceChecked((prev) => !prev);
					}}
				/>
				<SourceFilterCheckbox
					checked={isBaltimoreMagazineChecked}
					disabled
					label={"Bmore Art"}
					onChange={() => {
						setIsBaltimoreMagazineChecked((prev) => !prev);
					}}
				/>
				<SourceFilterCheckbox
					checked={isEnochPrattLibraryChecked}
					disabled={false}
					label={"Enoch Pratt Library"}
					onChange={() => {
						setIsEnochPrattLibraryChecked((prev) => !prev);
					}}
				/>
			</div>
		</div>
	);
};

export default SourcesSidebar;
