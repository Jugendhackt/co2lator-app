import type { NextPage } from 'next';
import { useRouter } from 'next/dist/client/router';
import { useEffect, useState } from 'react';
import {
	CO2Data,
	CO2DataPointType,
	CO2DataPoint_Fortbewegung,
} from '../backend/data';
import addAnswerToStorage from '../backend/questions';
import Header from '../components/header';
import { GlobalStorageManager } from './_app';

const TestPage: NextPage = () => {
	// Datenspeicher
	const [storedData, setStoredData] = useState<CO2Data>(new CO2Data({}));

	// Zwischenspeicher für aktuelle Frage
	const [selectedQuestion, setSelectedQuestion] = useState(0);

	// aktueller Input
	const [input, setInput] = useState<any>(null);

	// Fehlermeldung, die angezeigt wird (sollte es eine geben)
	const [error, setError] = useState('');

	// berechneter Insgesamtemissionen
	const [emissionenSumme, setemissionenSumme] = useState(0);

	// Variable, ob das Quiz beendet wurde
	const [quizEnded, setQuizEnded] = useState(false);

	const router = useRouter();

	// Liste mit allen Fragen
	const questions: Question[] = [
		{
			index: 0,
			question: 'Fährst du ein E-Auto?',
			answertype: Question_AnswerType.boolean,
			type: CO2DataPointType.fortbewegung,
			calculate: async (value: boolean) => {
				addAnswerToStorage(value, Question_AnswerType.boolean, setError).then(
					() => {
						setStoredData((e) => {
							e.fortbewegung.auto_istEAuto = value;
							return e;
						});
					}
				);
			},
			/*calculate: async (value: boolean) => {
				return new Promise<void>((resolve, reject) => {
					setStoredData((e) => {
						e.fortbewegung.auto_istEAuto = value;
						return e;
					});
					return resolve();
				});
				/*console.log(storedData.points.map((e) => e.type));
				const point = storedData.points.find(
					(e) => e.type === CO2DataPointType.fortbewegung
				) as CO2DataPoint_Fortbewegung;
				point.auto_istEAuto = value;
			},*/
		},
		{
			index: 1,
			question: 'Wie viele Kilometer fährst du in der Woche mit dem Auto?',
			answertype: Question_AnswerType.text,
			type: CO2DataPointType.fortbewegung,
			calculate: async (value: string) => {
				return new Promise<void>((resolve, reject) => {
					if (!isNaN(parseInt(value)) && parseInt(value) >= 0) {
						setStoredData((e) => {
							e.fortbewegung.auto_KmProWoche = parseInt(value);
							return e;
						});
						return resolve();
					} else {
						reject('Der eingegebene Text ist keine Zahl');
					}
				});
				/*console.log(storedData.points.map((e) => e.type));
				const point = storedData.points.find(
					(e) => e.type === CO2DataPointType.fortbewegung
				) as CO2DataPoint_Fortbewegung;
				point.auto_KmProWoche = value;*/
			},
		},
		{
			index: 2,
			question: 'Wie viele Stunden fliegst du mit dem Flugzeug im Jahr?',
			answertype: Question_AnswerType.text,
			type: CO2DataPointType.fortbewegung,
			calculate: async (value: string) => {
				return new Promise<void>((resolve, reject) => {
					if (!isNaN(parseInt(value)) && parseInt(value) >= 0) {
						setStoredData((e) => {
							e.fortbewegung.flug_stdProJahr = parseInt(value);
							return e;
						});
						return resolve();
					} else {
						reject('Der eingegebene Text ist keine Zahl');
					}
				});
			},
		},
		{
			index: 3,
			question:
				'Wie viele Kilometer fährst du mit öffentlichen Verkehrsmitteln in der Woche?',
			answertype: Question_AnswerType.text,
			type: CO2DataPointType.fortbewegung,
			calculate: async (value: string) => {
				return new Promise<void>((resolve, reject) => {
					if (!isNaN(parseInt(value)) && parseInt(value) >= 0) {
						setStoredData((e) => {
							e.fortbewegung.opnv_kmProWoche = parseInt(value);
							return e;
						});
						return resolve();
					} else {
						reject('Der eingegebene Text ist keine Zahl');
					}
				});
			},
		},
	];

	useEffect(() => {
		if (localStorage.getItem('username') === null) {
			router.push('/');
		}
		// init data
		//storedData = new CO2Data();
		/*const fortbewegungPoint = new CO2DataPoint_Fortbewegung();
		storedData.addPoint(fortbewegungPoint);*/
	}, []);
	async function continueButtonPressed(skipped: boolean, _input: any | null) {
		if (!skipped) {
			const question = questions[selectedQuestion];
			question
				.calculate(_input != null ? _input : input)
				.then((_res) => {
					gotoNextQuestion();
				})
				.catch((err) => {
					setError(err);
				});
			// Datenpunkt hinzufügen
		} else {
			gotoNextQuestion();
		}
	}

	function calculate_emissionen() {
		setemissionenSumme(storedData.emissionen_berechnen());
	}

	function gotoNextQuestion() {
		setInput('');
		setError('');
		calculate_emissionen();
		// Überprüfen, ob eine weitere Frage existiert
		if (selectedQuestion + 1 === questions.length) {
			// Beenden
			GlobalStorageManager.store(storedData);
			setQuizEnded(true);
		} else {
			setSelectedQuestion(selectedQuestion + 1);
		}
	}

	function backButtonPressed() {
		setError('');

		setSelectedQuestion(selectedQuestion - 1);
	}

	function skipButtonPressed() {
		setError('');

		continueButtonPressed(true, null);
	}

	return (
		<div className="w-screen h-screen bg-gray-100 justify-center relative flex flex-col">
			<Header />
			<div className="flex justify-center mt-6 h-full relative">
				{quizEnded ? (
					<div className="justify-center content-center flex flex-col text-center">
						<img src="/icons/check-circle.svg" className="w-32 self-center" />
						<h1 className="text-3xl font-bold mt-2">Fertig!</h1>
						<p>Deine Emissionen liegen bei {emissionenSumme}kg im Jahr</p>
						<button
							className="rounded-lg px-4 p-2 bg-blue-500 text-white mt-4 w-auto"
							onClick={() => {
								router.push('/');
							}}
						>
							Zurück
						</button>
					</div>
				) : (
					<div className="h-full text-center flex flex-col justify-between">
						<div className="flex flex-col justify-center">
							<div className=" w-80 h-2 relative self-center mb-4">
								<div className="w-full h-full bg-gray-300 rounded absolute" />
								<div
									style={{
										width: `${(selectedQuestion / questions.length) * 100}%`,
									}}
									className={`bg-gradient-to-r from-red-400 ${
										selectedQuestion / questions.length > 0.75
											? 'via-yellow-300 to-green-400'
											: selectedQuestion / questions.length > 0.5
											? 'to-yellow-300'
											: selectedQuestion / questions.length > 0.25
											? 'to-yellow-600'
											: 'to-yellow-700'
									} h-2 rounded absolute`}
								></div>
							</div>
							<p>Emissionen: {emissionenSumme.toFixed(0)}kg/Jahr</p>
							<p className="italic content-center">
								Frage {selectedQuestion + 1} von {questions.length}:{' '}
								{questions[selectedQuestion].type}
							</p>
							<h1 className="text-xl font-bold">
								{questions[selectedQuestion].question}
							</h1>
						</div>
						<div className="">
							<div>
								{questions[selectedQuestion].answertype ===
								Question_AnswerType.text ? (
									<input
										className="border border-gray-400 rounded-xl px-4"
										value={input}
										placeholder={questions[selectedQuestion].question}
										onChange={(e) => {
											setInput(e.target.value);
										}}
									/>
								) : (
									<div></div>
								)}
								{questions[selectedQuestion].answertype ===
								Question_AnswerType.boolean ? (
									<div className="flex justify-center">
										<button
											className="px-8 bg-blue-500 rounded-lg mr-2 text-white text-lg p-2"
											onClick={() => {
												continueButtonPressed(false, true);
											}}
										>
											Ja
										</button>
										<button
											className="px-8 bg-blue-500 rounded-lg mr-2 text-white text-lg p-2"
											onClick={() => {
												continueButtonPressed(false, false);
											}}
										>
											Nein
										</button>
									</div>
								) : (
									<div></div>
								)}
							</div>
							{error !== '' ? (
								<div>
									<p className="text-red-500 mt-4">{error}</p>
								</div>
							) : (
								<div></div>
							)}
						</div>
						<div className="h-10 flex m-5 mb-10 justify-center">
							{selectedQuestion > 0 ? (
								<button
									className="px-4 bg-gray-300 rounded-xl mr-2"
									onClick={backButtonPressed}
								>
									Zurück
								</button>
							) : (
								<div></div>
							)}
							<button
								className="px-4 bg-gray-300 rounded-xl mr-2"
								onClick={skipButtonPressed}
							>
								Überspringen
							</button>
							{questions[selectedQuestion].answertype !==
							Question_AnswerType.boolean ? (
								<button
									className="px-4 bg-blue-500 rounded-xl mr-2 text-white"
									onClick={() => continueButtonPressed(false, null)}
								>
									{selectedQuestion + 1 === questions.length
										? 'Beenden'
										: 'Weiter'}
								</button>
							) : (
								<div></div>
							)}
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

interface Question {
	index: number;
	question: string;
	answertype: Question_AnswerType;
	answers?: Answer[];
	type: CO2DataPointType;
	calculate: (value: any) => Promise<void>;
}

enum Question_AnswerType {
	multiplechoice,
	text,
	select,
	boolean,
}

interface Answer {
	text: string;
	jumpto: number;
}

export default TestPage;
export { Question_AnswerType };
