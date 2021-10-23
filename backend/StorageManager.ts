import { CO2Data } from './data';

class StorageManager {
	load(): StoredDataAllTime {
		const data = localStorage.getItem('co2data');
		if (data !== null) {
			const parsedData: StoredDataAllTime = new StoredDataAllTime(
				JSON.parse(data)
			);
			return parsedData;
		} else {
			return new StoredDataAllTime({ entries: [] });
		}
	}

	store(data: CO2Data) {
		const existingDataString = localStorage.getItem('co2data');
		const existingData: StoredDataAllTime =
			existingDataString !== null
				? new StoredDataAllTime(JSON.parse(existingDataString))
				: new StoredDataAllTime({ entries: [] });

		existingData.addEntry(
			new StoredData({ value: data, timestamp: Date.now() })
		);
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
