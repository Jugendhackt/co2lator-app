import standard_data from './data.json';

interface CO2Data {
	points: CO2DataPoint[];
}

class CO2DataPoint {
	type: CO2DataPointType;

	verbrauch: number;
	verbrauch_berechnen: () => void;

	// Einrichtung eines Datenpunktes
	constructor(type: CO2DataPointType) {
		this.type = type;
		this.verbrauch_berechnen = () => {};
		this.verbrauch = 0;
	}
}

class CO2DataPoint_House extends CO2DataPoint {
	person_count: number;
	eco: boolean;

	constructor(person_count: number, eco: boolean, standard_verbrauch: number) {
		super(CO2DataPointType.house);
		this.person_count = person_count;
		this.eco = eco;
	}

	// berechne den Verbrauch anhand der existierenden Daten * Personenanzahl
	verbrauch_berechnen = () => {
		// Standardwert für Verbrauch holen
		const standard_verbrauch: number =
			standard_data['standard_daten']['haus']['value'];

		// Insgesamten Verbrauch berechnen
		this.verbrauch = standard_verbrauch * this.person_count;
		// TODO: `eco` als Variable einbauen

		return this.verbrauch;
	};
}

class CO2DataPoint_Flight extends CO2DataPoint {
	flugstunden_count: number;

	constructor(flugstunden: number) {
		super(CO2DataPointType.flight);
		this.flugstunden_count = flugstunden;
	}

	verbrauch_berechnen = () => {
		const standard_verbrauch: number =
			standard_data['standard_daten']['flug']['value'];

		this.verbrauch = standard_verbrauch * this.flugstunden_count;
	};
}

class CO2DataPoint_Phone extends CO2DataPoint {
	stunden_am_tag: number;

	constructor(stunden: number) {
		super(CO2DataPointType.phone);
		this.stunden_am_tag = stunden;
	}

	verbrauch_berechnen = () => {
		const standard_verbrauch: number =
			standard_data['standard_daten']['handy']['value'];

		this.verbrauch = standard_verbrauch * this.stunden_am_tag;
	};
}

class CO2DataPoint_Car extends CO2DataPoint {}

enum CO2DataPointType {
	flight,
	bus,
	car,
	phone,
	//heating,
	house,
	meat,
}

export type { CO2Data };
