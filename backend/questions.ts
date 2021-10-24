import { Dispatch, SetStateAction } from 'react';
import { CO2Data, CO2DataPointType } from './data';

class QuestionStorage {
	setStoredData: Dispatch<SetStateAction<CO2Data>>;
	setError: Dispatch<SetStateAction<string>>;

	questions: Question[] = [
		{
			index: 0,
			question: 'Hast du ein Auto?',
			answertype: Question_AnswerType.select,
			type: CO2DataPointType.fortbewegung,
			answers: [
				{
					text: 'Ja',
					value: 1,
					jumpto: 1,
				},
				{
					text: 'Nein',
					value: 0,
					jumpto: 3,
				},
			],
			calculate: async (value: string) => {
				return new Promise<number>((resolve, reject) => {
					checkInput_Number(value)
						.then(() => {
							var jumpto: number = value == '1' ? 1 : 3;
							return resolve(jumpto);
						})
						.catch((err) => {
							return reject(err);
						});
				});
			},
		},
		{
			index: 1,
			question: 'Fährst du ein E-Auto?',
			answertype: Question_AnswerType.boolean,
			type: CO2DataPointType.fortbewegung,
			calculate: async (value: boolean) => {
				return new Promise<number>((resolve, reject) => {
					addAnswerToStorage(
						value,
						Question_AnswerType.boolean,
						this.setError
					).then(() => {
						this.setStoredData((e) => {
							e.fortbewegung.auto_istEAuto = value;
							return e;
						});
						resolve(2);
					});
				});
			},
		},
		{
			index: 2,
			question: 'Wie viele Kilometer fährst du in der Woche mit dem Auto?',
			answertype: Question_AnswerType.text,
			type: CO2DataPointType.fortbewegung,
			calculate: async (value: string) => {
				return new Promise<number>((resolve, reject) => {
					addAnswerToStorage(
						value,
						Question_AnswerType.text,
						this.setError
					).then(() => {
						this.setStoredData((e) => {
							e.fortbewegung.auto_KmProWoche = parseInt(value);
							return e;
						});
						resolve(3);
					});
				});
			},
		},
		{
			index: 3,
			question: 'Wie viele Stunden fliegst du mit dem Flugzeug im Jahr?',
			answertype: Question_AnswerType.text,
			type: CO2DataPointType.fortbewegung,
			calculate: async (value: string) => {
				return new Promise<number>((resolve, reject) => {
					addAnswerToStorage(
						value,
						Question_AnswerType.text,
						this.setError
					).then(() => {
						this.setStoredData((e) => {
							e.fortbewegung.flug_stdProJahr = parseInt(value);
							return e;
						});
						resolve(4);
					});
				});
			},
		},
		{
			index: 4,
			question:
				'Wie viele Kilometer fährst du mit öffentlichen Verkehrsmitteln in der Woche?',
			answertype: Question_AnswerType.text,
			type: CO2DataPointType.fortbewegung,
			calculate: async (value: string) => {
				return new Promise<number>((resolve, reject) => {
					addAnswerToStorage(
						value,
						Question_AnswerType.text,
						this.setError
					).then(() => {
						this.setStoredData((e) => {
							e.fortbewegung.opnv_kmProWoche = parseInt(value);
							return e;
						});
						resolve(5);
					});
				});
			},
		},

		{
			index: 5,

			question: 'Bist du Veganer, Vegetarier oder Omnivor',

			answertype: Question_AnswerType.select,

			type: CO2DataPointType.meat,
			answers: [
				{
					text: 'Veganer',
					value: 0,
					jumpto: 7,
				},
				{
					text: 'Vegetarier',
					value: 1,
					jumpto: 7,
				},
				{
					text: 'Omnivor',
					value: 2,
					jumpto: 6,
				},
			],
			calculate: async (value: string) => {
				return new Promise<number>((resolve, reject) => {
					checkInput_Number(value)
						.then(() => {
							var jumpto: number = value == '0' ? 7 : value == '1' ? 7 : 6;
							return resolve(jumpto);
						})
						.catch((err) => {
							return reject(err);
						});
				});
			},
		},

		{
			index: 6,

			question: 'Wie oft in der Woche isst du Fleisch?',

			answertype: Question_AnswerType.text,

			type: CO2DataPointType.meat,
			calculate: async (value: string) => {
				return new Promise<number>((resolve, reject) => {
					addAnswerToStorage(
						value,
						Question_AnswerType.text,
						this.setError
					).then(() => {
						this.setStoredData((e) => {
							e.fleisch.fleisch_pro_woche = parseInt(value);
							return e;
						});
						resolve(7);
					});

					/*checkInput_Number(value)
						.then(() => {
							return resolve(6);
						})
						.catch((err) => {
							return reject(err);
						});*/
				});
			},
		},

		{
			index: 7,

			question: 'Isst du eher regionale Lebensmittel oder exotische?',

			answertype: Question_AnswerType.select,
			answers: [
				{
					text: 'Regional',
					value: 1,
					jumpto: 8,
				},
				{
					text: 'Exotisch',
					value: 0,
					jumpto: 8,
				},
			],

			type: CO2DataPointType.meat,
			calculate: async (value: string) => {
				return new Promise<number>((resolve, reject) => {
					console.log(value);
					addAnswerToStorage(
						value,
						Question_AnswerType.select,
						this.setError
					).then(() => {
						this.setStoredData((e) => {
							e.fleisch.essen_regional = parseInt(value) == 1 ? true : false;
							return e;
						});
						resolve(8);
					});
				});
			},
		},
	];

	constructor(
		setStoredData: Dispatch<SetStateAction<CO2Data>>,
		setError: Dispatch<SetStateAction<string>>
	) {
		this.setStoredData = setStoredData;
		this.setError = setError;
	}
}
// function to add the answer to the `storedData` object
function addAnswerToStorage(
	value: any,
	answertype: Question_AnswerType,
	setError: Dispatch<SetStateAction<string>>
) {
	return new Promise<void>((resolve, reject) => {
		if (answertype === Question_AnswerType.boolean) {
			if (typeof value === 'boolean') {
				resolve();
			} else {
				const error = 'Invalid value type';
				setError(error);
				reject(error);
			}
		} else if (Question_AnswerType.text) {
			checkInput_Number(value)
				.then(() => {
					resolve();
				})
				.catch((err) => {
					setError(err);
					reject(err);
				});
		}
	});
}

// Check if input is a valid positive number
const checkInput_Number = (value: string) => {
	return new Promise<void>((resolve, reject) => {
		if (value === '') {
			reject('Please enter a number');
		}
		if (isNaN(Number(value))) {
			reject('Please enter a valid number');
		}
		if (Number(value) < 0) {
			reject('Please enter a positive number');
		}
		resolve();
	});
};

interface Question {
	index: number;
	question: string;
	answertype: Question_AnswerType;
	answers?: Answer[];
	type: CO2DataPointType;
	calculate: (value: any) => Promise<number>;
}

enum Question_AnswerType {
	multiplechoice,
	text,
	select,
	boolean,
}

interface Answer {
	text: string;
	value: number;
	jumpto: number;
}

export default addAnswerToStorage;

export { checkInput_Number, QuestionStorage, Question_AnswerType };
