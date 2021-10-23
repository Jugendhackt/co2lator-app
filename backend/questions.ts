import { Dispatch, SetStateAction } from 'react';
import { Question_AnswerType } from '../pages/test';
import { CO2Data } from './data';

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

export default addAnswerToStorage;

export { checkInput_Number };
