import { CO2Data } from './data';

class StorageManager {
	load() {}

	store() {}
}

interface StoredData {
	timstamp: number;
	value: CO2Data;
}

export default StorageManager;
