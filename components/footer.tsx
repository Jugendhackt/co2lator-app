import { FunctionComponent, useState } from 'react';

const Footer: FunctionComponent = () => {
	const [footerText, setFooterText] = useState('Made by CO2lator');
	const [footerTextClicks, setFooterTextClicks] = useState(0);

	function clickedFooterText() {
		setFooterTextClicks(footerTextClicks + 1);
		if (footerTextClicks == 10) {
			setFooterText('Lory was here c:');
		}
	}
	return (
		<div className="bottom-0 m-0 absolute w-full h-16 bg-gray-100 dark:bg-dark-tertiary justify-between flex items-center pl-4 rounded-t-xl shadow-xl">
			<button
				onClick={() => {
					clickedFooterText();
				}}
			>
				<p className="text-sm text-gray-500">{footerText}</p>
			</button>

			<div className="mr-4">
				<a
					className="underline text-blue-500 text-sm"
					href="https://github.com/rainloreley/co2lator-app"
					target="_blank"
				>
					Source Code
				</a>
			</div>
		</div>
	);
};

export default Footer;
