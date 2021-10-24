// TODO: 1 Baum = 10kg

import type { NextPage } from 'next';
import { useEffect, useState } from 'react';
import Header from '../components/header';
import { useRouter } from 'next/dist/client/router';
import { GlobalStorageManager } from './_app';
import { StoredDataAllTime } from '../backend/StorageManager';
import { Line } from 'react-chartjs-2';
import moment from 'moment';
import Footer from '../components/footer';

const Home: NextPage = () => {
	// React router for navigation
	const router = useRouter();

	// State variables
	const [username, setUsername] = useState('');
	const [treesSaved, setTreesSaved] = useState(2);
	const [savedData, setSavedData] = useState(
		new StoredDataAllTime({ entries: [] })
	);
	const [loadedData, setLoadedData] = useState(false);
	const [tips, setTips] = useState<Tip[]>([
		{
			content: 'Verwende dein Handy 2 Stunden weniger',
			icon: '/icons/smartphone.svg',
		},

		{
			content: 'Benutze Ecosia als deine Suchmaschine, um Bäume zu pflanzen',
			icon: '/icons/bookmark.svg',
		},
		{
			content:
				'Du kannst die Geräte im Haushalt, die du nicht benutzt, ausschalten.',
			icon: '/icons/zap.svg',
		},
		{
			content: 'Verzichte wenn möglich auf Strohhalme',
			icon: '/icons/coffee.svg',
		},
	]);

	// code to run on page load
	useEffect(() => {
		if (
			localStorage.getItem('username') === null ||
			localStorage.getItem('co2data') === null
		) {
			router.push('/');
		}
		setUsername(localStorage.getItem('username') ?? '');
		setSavedData(GlobalStorageManager.load());

		setLoadedData(true);
	}, []);

	return (
		<div className="w-screen h-screen flex relative flex-col bg-gray-100 justify-center overflow-scroll">
			<Header />
			<div className="overflow-scroll">
				<div className="h-full">
					{loadedData ? (
						<div className="flex flex-col">
							<div className="text-center mt-14 mx-2">
								<h1 className="text-3xl font-semibold">
									Willkommen zurück, {username}
								</h1>
								<h2>
									Du hast <p className="text-green-600">{treesSaved}</p> Bäume
									gerettet
								</h2>
							</div>
							<button
								className="p-4 rounded-xl bg-blue-500 text-white w-auto self-center mt-4"
								onClick={() => {
									router.push('/test');
								}}
							>
								Test wiederholen
							</button>

							<Line
								width={100}
								height={20}
								data={{
									labels: savedData.entries.map((e) =>
										moment(e.timestamp).fromNow()
									),
									datasets: [
										{
											label: 'CO2-Emissionen',
											showLine: true,
											data: savedData.entries.map((e) => {
												return parseInt(
													e.value.emissionen_berechnen().toFixed(0)
												);
											}),
										},
									],
								}}
							/>
							<div className="mx-4 mt-4">
								<h2 className="font-bold text-xl">Tipps</h2>
								<div className="mx-4 bg-gray-50 rounded-xl my-2">
									{tips.map((tip, index) => (
										<div key={tip.content}>
											<div className="flex p-4">
												<img src={tip.icon} />
												<p className="ml-4">{tip.content}</p>
											</div>
											{index !== tips.length - 1 ? (
												<div className="h-0.5 bg-gray-200" />
											) : (
												<div></div>
											)}
										</div>
									))}
								</div>
							</div>
						</div>
					) : (
						<div className="flex justify-center content-center h-full">
							<p className="self-center font-bold text-3xl">Lade Daten...</p>
						</div>
					)}
				</div>
			</div>

			<div className="h-16">
				<Footer />
			</div>
		</div>
	);
};

interface Tip {
	content: string;
	icon: string;
}

export default Home;
