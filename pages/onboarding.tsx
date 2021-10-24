import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import Footer from '../components/footer';

const OnboardingPage: NextPage = () => {
	const router = useRouter();
	const [username, setUsername] = useState('');
	const [error, setError] = useState('');

	// submit username
	function submit() {
		// validate that username is not empty
		if (username.length < 1) {
			setError('Username is required');
		} else {
			// store usernae and start test
			localStorage.setItem('username', username);
			router.push('/test');
		}
	}

	useEffect(() => {
		// get username from local storage
		const storedUsername = localStorage.getItem('username');
		if (storedUsername !== null) {
			// set username if it exists
			setUsername(storedUsername);
		}
	}, []);

	return (
		<div className="w-screen h-screen flex flex-col bg-gray-100 justify-center content-center">
			<div className="self-center text-center">
				<h1 className="font-bold text-5xl">Willkommen!</h1>
				<p>
					Willkommen bei CO2lator! Um anzufangen, bitte gib deinen Namen ein
					(oder einen Nickname)
				</p>
				<input
					value={username}
					className="bg-gray-200 rounded-xl p-4 mt-4"
					placeholder="Nickname"
					onChange={(e) => {
						setUsername(e.target.value);
					}}
				/>

				<div className="mt-4">
					<button
						className="bg-blue-500 rounded-xl text-white p-4 px-6 hover:bg-blue-600"
						onClick={submit}
					>
						Test starten
					</button>
				</div>
				{error != '' ? (
					<div>
						<p className="text-red-500 mt-4">{error}</p>
					</div>
				) : (
					<div></div>
				)}
			</div>
			<div className="h-16">
				<Footer />
			</div>
		</div>
	);
};

export default OnboardingPage;
