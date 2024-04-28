import { prisma } from "~/lib/prisma.server";
import { customers } from "@prisma/client";
import { tCustomer, tMaterial } from "~/lib/formTypes";

//#region ? ---------- CUSTOMER QUERIES ----------
export const allCustomers = async () => {
	return await prisma.customers.findMany({});
};

export const findCustomer = async (search: string | number) => {
	const data = await prisma.customers.findMany({
		where: {
			OR: [
				{
					customerName: {
						contains: search as string,
					},
				},
				{
					ID: search as number,
				},
			],
		},
	});
	return data as tCustomer[];
};

export const customer = async (customerID: number) => {
	const data = await prisma.customers.findFirst({
		where: {
			ID: customerID,
		},
	});
	return data as tCustomer;
};

export const updateCustomer = async (customer: customers) => {
	const data: tCustomer = await prisma.customers.update({
		where: {
			ID: customer.ID,
		},
		data: {
			customerName: customer.customerName,
			address1: customer.address1,
			address2: customer.address2,
			city: customer.city,
			state: customer.state,
			zip: customer.zip,
		},
	});

	return data as tCustomer;
};
// #endregion ? --------------------

//#region ? ---------- MATERIAL QUERIES ----------
export const allMaterials = async () => {
	const data = {
		materials: await prisma.materials.findMany({}),
	};
	return data.materials as tMaterial[];
};
// #endregion ? --------------------
