/* 
Haus pro Jahr
Flug pro Stunde
Handy pro Tag

E-Auto:
   	- Produktion: 8000kg
   	- emissionen: 1120kg/Jahr
Verbrenner:
	- Produktion: 1900kg
	- emissionen: 2100kg/Jahr
// 1900kg -> 1 Jahr E-Auto (1t pro Jahr)
// 2,76t pro Jahr -> 14000km Vernbrenner

=> Pro Jahr
*/

import standard_data from './data.json';

class CO2Data {
	fortbewegung: CO2DataPoint_Fortbewegung;
	//points: CO2DataPoint[];

	constructor(json: object) {
		// @ts-ignore
		this.fortbewegung =
			// @ts-ignore
			typeof json['fortbewegung'] === 'object'
				? // @ts-ignore
				  new CO2DataPoint_Fortbewegung(json['fortbewegung'])
				: new CO2DataPoint_Fortbewegung({});
		//this.points = [];
	}

	emissionen_berechnen(): number {
		const emissionen_fortbewegung = this.fortbewegung.emissionen_berechnen();
		const summe = emissionen_fortbewegung;
		return summe;
	}

	// Datenpunkt hinzufügen
	/*addPoint(point: CO2DataPoint) {
		this.points.push(point);
	}*/
}

class CO2DataPoint {
	type: CO2DataPointType;

	emissionen: number;
	emissionen_berechnen: () => number;

	// Einrichtung eines Datenpunktes
	constructor(type: CO2DataPointType) {
		this.type = type;
		this.emissionen_berechnen = () => {
			return 0;
		};
		this.emissionen = 0;
	}
}

class CO2DataPoint_House extends CO2DataPoint {
	person_count: number;
	eco: boolean;

	constructor(person_count: number, eco: boolean, standard_emissionen: number) {
		super(CO2DataPointType.house);
		this.person_count = person_count;
		this.eco = eco;
	}

	// berechne den emissionen anhand der existierenden Daten * Personenanzahl
	emissionen_berechnen = () => {
		// Standardwert für emissionen holen
		const standard_emissionen: number =
			standard_data['standard_daten']['haus']['value'];

		// Insgesamten emissionen berechnen
		this.emissionen = standard_emissionen * this.person_count;
		// TODO: `eco` als Variable einbauen

		return this.emissionen;
	};
}

/*class CO2DataPoint_Flight extends CO2DataPoint {
	flugstunden_count: number;

	constructor(flugstunden: number) {
		super(CO2DataPointType.flight);
		this.flugstunden_count = flugstunden;
	}

	emissionen_berechnen = () => {
		const standard_emissionen: number =
			standard_data['standard_daten']['flug']['value'];

		this.emissionen = standard_emissionen * this.flugstunden_count;
		return 0;
	};
}*/

class CO2DataPoint_Phone extends CO2DataPoint {
	stunden_am_tag: number;

	constructor(stunden: number) {
		super(CO2DataPointType.phone);
		this.stunden_am_tag = stunden;
	}

	emissionen_berechnen = () => {
		const standard_emissionen: number =
			standard_data['standard_daten']['handy']['value'];

		this.emissionen = standard_emissionen * this.stunden_am_tag;
		return 0;
	};
}

class CO2DataPoint_Fortbewegung extends CO2DataPoint {
	auto_istEAuto: boolean;
	auto_KmProWoche: number;
	flug_stdProJahr: number;
	opnv_kmProWoche: number;

	constructor(json: any) {
		super(CO2DataPointType.fortbewegung);
		this.auto_istEAuto = json['auto_istEAuto'] ?? false;
		this.auto_KmProWoche = json['auto_KmProWoche'] ?? 0;
		this.flug_stdProJahr = json['flug_stdProJahr'] ?? 0;
		this.opnv_kmProWoche = json['opnv_kmProWoche'] ?? 0;
	}
	emissionen_berechnen = () => {
		/* E-Auto emissionen: 80g/km;
		Verbrenner emissionen: 150g/km;
		*/
		const _emissionen_auto_pro_km = this.auto_istEAuto ? 0.08 : 0.15;

		// Berechnung emissionen vom Auto im Jahr mit angegebener Kilometeranzahl
		const emissionen_auto_pro_jahr =
			_emissionen_auto_pro_km * this.auto_KmProWoche * 52;

		// 0.5kg/Person/Std. im Flugzeug
		const emissionen_flug_pro_jahr = 0.5 * this.flug_stdProJahr;

		// Berechnung emissionen von ÖPNV im Jahr mit angegebener Kilometeranzahl
		const emissionen_opnv = 0.143 * this.opnv_kmProWoche * 52;

		// Gebrauch speichern und zurückgeben
		this.emissionen =
			emissionen_auto_pro_jahr + emissionen_flug_pro_jahr + emissionen_opnv;
		return this.emissionen;
	};
}

enum CO2DataPointType {
	car = 'Automolitität',
	phone = 'Handy',
	//heating,
	house = 'Wohnen',
	meat = 'Fleisch',

	fortbewegung = 'Fortbewegung',
}

export { CO2Data, CO2DataPointType, CO2DataPoint, CO2DataPoint_Fortbewegung };
