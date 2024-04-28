import { customers, materials } from "@prisma/client";

export type searchType = "customerName" | "customerID";

export type tFormData = {
	customerSrc: string;
	materialSrc: string;
	customer: tCustomer;
	material: tMaterial[];
	process: tProcess[];
	addedQty: number;
	notes: never[];
};

// #region ! ---------- QUOTE TYPES ----------
export type tCustomer = customers;
export type tMaterial = materials;
export type tQty = {
	amount: number;
	price: number;
};
export type tProcess = any;
// #endregion ! --------------------

export type tUOMKey =
	| "FT"
	| "LFT"
	| "LYD"
	| "SQFT"
	| "SQYD"
	| "SHT"
	| "EACH"
	| "";

class FT {
	key: tUOMKey;
	base: number; // to LFT Conversion
	constructor() {
		this.key = "FT";
		this.base = 1;
	}

	/**
	 * TODO LIST
	 * - [ ] to lft
	 * - [ ] to sqft
	 * - [ ] to sqyd
	 * - [ ] to sht
	 */
	toLFT() {}
}
