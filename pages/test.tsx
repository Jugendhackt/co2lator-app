import type { NextPage } from 'next';
import { useState } from 'react';
import Header from '../components/header';

const TestPage: NextPage = () => {
	const [questions, setquestions] = useState<Question[]>();
    
	return (
		<div className="w-screen h-screen bg-gray-100 justify-center">
			<Header />
			<div className="flex">
				<p>aaa</p>
			</div>
		</div>
	);
};

interface Question {
	index: number;
	question: string;
	answers: Answer[];
}

interface Answer {
	text: string;
	jumpto: number;
export default TestPage;

export default TestPage;
