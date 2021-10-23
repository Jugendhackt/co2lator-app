import { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect } from 'react';

const IndexPage: NextPage = () => {
	const router = useRouter();

	useEffect(() => {
		const storedUsername = localStorage.getItem('username');
		const storedData = localStorage.getItem('co2data');

		if (storedUsername !== null && storedData !== null) {
			router.push('/home');
		} else {
			router.push('/onboarding');
		}
	});
	return (
		<div className="w-screen h-screen flex bg-gray-100 justify-center">
			<p className="font-bold text-3xl self-center">Loading...</p>
		</div>
	);
};

export default IndexPage;
