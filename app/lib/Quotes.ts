import { Decimal } from "@prisma/client/runtime/library";
import { tMaterial, tCustomer, tQty, tProcess, tUOMKey } from "./formTypes";
import { Prisma } from "@prisma/client";

export class Quote {
	ID: number;
	dateCreated: Date;
	customer: tCustomer | null;
	material: tMaterial[] | null;
	process: tProcess[] | null;
	quantities: {
		amount: number;
		price: number;
	}[];
	constructor(
		quoteID: number,
		date?: Date,
		customer?: tCustomer,
		material?: tMaterial[],
		process?: tProcess[],
		quantities?: tQty[]
	) {
		this.ID = quoteID;
		this.dateCreated = date ? date : new Date();
		this.quantities = quantities ? quantities : [];
		this.material = material ? material : [];
		this.customer = customer ? customer : null;
		this.process = process ? process : [];
	}

	//#region ? ---------- CUSTOMER ----------
	clearCustomer() {
		this.customer = null;
	}

	setCustomer(customer: string) {
		//
	}

	// #endregion ? --------------------

	//#region ? ---------- MATERIAL ----------
	clearMaterial() {
		this.material = [];
	}

	addMaterial(material: tMaterial) {
		if (this.material == null) {
			this.material = [];
		}
		this.material.push(material);
	}

	removeMaterial(index: number) {
		if (this.material != null) {
			const newMaterialList = this.material.slice(0, index);
			this.material = newMaterialList;
		}
	}
	// #endregion ? --------------------

	//#region ? ---------- PROCESS ----------

	// #endregion ? --------------------

	//#region ? ---------- QUANTITIES ----------
	updateQTY(id: number, quantity: number) {
		this.quantities[id].amount = quantity;
	}

	addQTY(qty: number) {
		this.quantities.push({ amount: qty, price: 0 });
	}

	removeQty(id: number) {
		this.quantities = this.quantities.filter(
			(qty) => qty !== this.quantities[id]
		);
	}

	updateQtyPrice(id: number, price: number) {
		this.quantities[id].price = price;
	}
	// #endregion ? --------------------
}

export const prepareUpdate = (oldQuote: Quote): Quote => {
	const updated = Object.assign(
		new Quote(oldQuote.ID, oldQuote.dateCreated),
		oldQuote
	);

	return updated;
};

export class Material implements tMaterial {
	ID: number;
	material: string;
	materialType: string;
	description: string;
	width: string;
	uom: tUOMKey;
	supplier: string | null;
	costPer: Prisma.Decimal;
	constructor(
		ID: number,
		material: string,
		materialType?: string,
		width?: string,
		uom?: tUOMKey,
		costPer?: Prisma.Decimal,
		description?: string,
		supplier?: string
	) {
		this.ID = ID;
		this.material = material;
		this.materialType = materialType ? materialType : "";
		this.description = description ? description : "";
		this.width = width ? width : "";
		this.uom = uom ? uom : "";
		this.supplier = supplier ? supplier : null;
		this.costPer = costPer
			? new Prisma.Decimal(costPer)
			: new Prisma.Decimal(0.0);
	}
}
