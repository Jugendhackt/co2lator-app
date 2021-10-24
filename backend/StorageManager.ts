import { CO2Data } from './data';

class StorageManager {
	// Load CO2 data from local storage
	load(): StoredDataAllTime {
		// fetch data from local storage
		const data = localStorage.getItem('co2data');
		// check if data exists
		if (data !== null) {
			// parse data
			const parsedData: StoredDataAllTime = new StoredDataAllTime(
				JSON.parse(data)
			);
			return parsedData;
		} else {
			// create new data object
			return new StoredDataAllTime({ entries: [] });
		}
	}

	// Store CO2 data in local storage
	store(data: CO2Data) {
		// get existing data
		const existingDataString = localStorage.getItem('co2data');
		// parse existing data
		const existingData: StoredDataAllTime =
			existingDataString !== null
				? new StoredDataAllTime(JSON.parse(existingDataString))
				: new StoredDataAllTime({ entries: [] });

		// add new data to existing data
		existingData.addEntry(
			new StoredData({ value: data, timestamp: Date.now() })
		);

		// set new data in local storage
		localStorage.setItem('co2data', JSON.stringify(existingData));
	}
}

class StoredDataAllTime {
	entries: StoredData[];

	constructor(json: object) {
		this.entries =
			// @ts-ignore
			json['entries'].map((e: any) => {
				console.log(e);
				return new StoredData(e);
			}) || [];
	}
	addEntry(entry: StoredData) {
		this.entries.push(entry);
	}
}

class StoredData {
	timestamp: number;
	value: CO2Data;

	constructor(json: object) {
		// @ts-ignore
		console.log(json['timestamp']);
		// @ts-ignore
		this.value = new CO2Data(json['value']);
		// @ts-ignore
		this.timestamp = parseInt(json['timestamp']) ?? Date.now();
	}
}

export default StorageManager;

export { StoredDataAllTime };
