import { json, useLoaderData } from "@remix-run/react";
import {
	allCustomers as customerList,
	allMaterials as materialList,
} from "~/lib/getCustomers";

export const customers = async () => {
	//const data = await customerList();
	//return json(data);
};

export async function loader({ params }: any) {
	//const getCustomers = findCustomer(params.searchString);
	//const customers = await customerList();
	const materials = await materialList();
	return {
		//getCustomers,
		customers,
		materials,
	};
}
function search(type: "customer" | "material") {
	switch (type) {
		case "customer":
			return {
				searchBy: "customerName",
				returnBy: "customerName",
			};
		case "material":
			return {
				searchBy: "materialName",
				returnBy: "materialName",
			};
	}
}
export function SearchDataList(searchString: any) {
	//const QUERY = useLoaderData<typeof loader>();

	if (searchString) {
		if (searchString.length >= 3) {
			queryCustomers(searchString);
			/* QUERY.filter((ea: any) =>
				ea[searchParams.searchBy].includes(searchString)
			);

			return QUERY.map((ea: any) => (
				<option key={ea.ID} label={ea[searchParams.searchBy]}>
					{ea[searchParams.searchBy]}
				</option>
			)); */
		}
	}
}

function queryCustomers(searchString: string) {
	//const QUERY = useLoaderData<typeof loader>();
	//console.log(QUERY.getCustomers);
}
