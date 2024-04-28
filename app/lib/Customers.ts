export type Customer = {
	id: number;
	company: string;
	contact: string;
	email: string;
};

export type Contact = {
	id: number;
	company: Customer;
	name: string;
	email: string;
	phone: {
		area: number;
		prefix: number;
		number: number;
		extension: number;
		type: string;
	}[];
	type: string;
};
