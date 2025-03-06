import { FC } from "react";
import { HeaderProps } from "../types/HeaderProps";

const Header: FC<HeaderProps> = ({headerRef}) => {
	return (
		<div
			className="flex gap-8 items-baseline text-[#F5F5F5] w-full"
			ref={headerRef}
		>
			<div className="flex flex-1 justify-center">
				<h1 className="semibold text-3xl w-fit">Bmore Today</h1>
			</div>
			<h2 className="flex-4 text-lg">Go Outside and Bmore Today</h2>
		</div>
	);
};

export default Header;
