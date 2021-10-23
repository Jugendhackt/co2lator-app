import type { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import Header from '../components/header';

const Home: NextPage = () => {
	// TODO: add name
	const username = 'Johnny Ive';
	const [treesSaved, setTreesSaved] = useState(0);
	const [tips, setTips] = useState<Tip[]>([
		{
			content: 'Verwende dein Handy 2 Stunden weniger',
			icon: '/icons/zap.svg',
		},
		{
			content: 'Verwende dein Handy 2 Stunden weniger',
			icon: '/icons/zap.svg',
		},
	]);

	return (
		<div className="w-screen flex flex-col bg-gray-100 justify-center overflow-scroll">
			<Header />
			<div className="text-center mt-14 mx-2">
				<h1 className="text-3xl font-semibold">
					Willkommen zurück, {username}
				</h1>
				<h2>Du hast {treesSaved} Bäume gerettet</h2>
			</div>
			<button className="p-4 rounded-xl bg-blue-500 text-white w-auto self-center mt-4">
				Test wiederholen
			</button>
			<div className="mx-4 mt-4">
				<h2 className="font-bold text-xl">Tipps</h2>
				<div className="mx-4 bg-gray-50 rounded-xl mt-2">
					{tips.map((tip, index) => (
						<div key={tip.content}>
							<div className="flex p-4">
								<img src={tip.icon} />
								<p className="ml-4">{tip.content}</p>
							</div>
							{index != tips.length - 1 ? (
								<div className="h-0.5 bg-gray-200" />
							) : (
								<div></div>
							)}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

interface Tip {
	content: string;
	icon: string;
}

export default Home;
