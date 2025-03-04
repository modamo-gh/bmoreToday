import { useEventContext } from "../contexts/EventContext";

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
			<label className="flex flex-1 gap-2 items-center">
				<input
					checked={isBaltimoreMagazineChecked}
					className="accent-[#ff6a00] cursor-pointer h-5 rounded w-5"
					onChange={() => {
						setIsBaltimoreMagazineChecked((prev) => !prev);
					}}
					type="checkbox"
				/>
				<span className="text-[#f5f5f5]">Baltimore Magazine</span>
			</label>
			<label className="flex flex-1 gap-2 items-center">
				<input
					checked={isBaltimoreShowplaceChecked}
					className="accent-[#ff6a00] cursor-pointer h-5 rounded w-5"
					onChange={() => {
						setIsBaltimoreShowplaceChecked((prev) => !prev);
					}}
					type="checkbox"
				/>
				<span className="text-[#f5f5f5]">Baltimore Showplace</span>
			</label>
			<label className="flex flex-1 gap-2 items-center">
				<input
					checked={isEnochPrattLibraryChecked}
					className="accent-[#ff6a00] cursor-pointer h-5 rounded w-5"
					onChange={() => {
						setIsEnochPrattLibraryChecked((prev) => !prev);
					}}
					type="checkbox"
				/>
				<span className="text-[#f5f5f5]">Enoch Pratt Library</span>
			</label>
		</div>
	);
};

export default SourcesSidebar;
