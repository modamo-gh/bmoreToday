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
		<div className="bg-[#232130] flex flex-col max-h-full items-center rounded-lg w-1/5">
			<h2 className="text-[#f5f5f5] text-lg p-4">Filter Sources</h2>
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
	);
};

export default SourcesSidebar;
