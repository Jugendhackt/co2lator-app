import { FunctionComponent } from "react";

const Header: FunctionComponent = () => {
    return (
        <div className="w-full border-b-2 flex justify-between">
				<div className="w-6 ml-2" />
				<img src="/icons/logo.png" className="w-10 m-1" />
				<button className="w-6 mr-2"><img src="/icons/settings.svg" /></button>
			</div>
    )
}

export default Header;