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
		<div className="bg-[#232130] flex flex-col flex-1 items-center rounded-lg">
			<h2 className="text-[#f5f5f5] text-lg p-4">Filter Sources</h2>
			<SourceFilterCheckbox
				checked={isBaltimoreMagazineChecked}
				label={"Baltimore Magazine"}
				onChange={() => {
					setIsBaltimoreMagazineChecked((prev) => !prev);
				}}
			/>
			<SourceFilterCheckbox
				checked={isBaltimoreShowplaceChecked}
				label={"Baltimore Showplace"}
				onChange={() => {
					setIsBaltimoreShowplaceChecked((prev) => !prev);
				}}
			/>
			<SourceFilterCheckbox
				checked={isEnochPrattLibraryChecked}
				label={"Enoch Pratt Library"}
				onChange={() => {
					setIsEnochPrattLibraryChecked((prev) => !prev);
				}}
			/>
		</div>
	);
};

export default SourcesSidebar;
