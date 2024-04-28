import { useLoaderData } from "@remix-run/react";
import { Quote, prepareUpdate } from "~/lib/Quotes";
import { tCustomer, tMaterial } from "~/lib/formTypes";
import {
	allCustomers as customerList,
	allMaterials as materialList,
} from "~/lib/getCustomers";
import React from "react";
import { OnClickHeader } from "./accentEls";

export async function loader() {
	const customers = await customerList();
	const materials = await materialList();
	return {
		customers,
		materials,
	};
}

function typeChoices(type: string) {
	switch (type) {
		case "customer":
			return {
				by: "customerName",
				id: "customerDetails",
				summary: "Customer",
			};
		case "material":
			return {
				by: "material",
				id: "materialDetails",
				summary: "Material",
			};
		default:
			throw new Error(`Invalid type: ${type}`);
	}
}

const searchQuery = (
	filterData: { by: string | number; search: string },
	searchList: any[]
) => {
	try {
		return searchList.filter((item: any) =>
			item[filterData.by]
				.toLowerCase()
				.includes(filterData.search.toLowerCase())
		);
	} catch (e) {
		console.log(e, searchList);
		return [];
	}
};

function duplicateCheck(
	area: "material" | "customer",
	entry: any,
	quote: Quote
): boolean {
	if (area === "material") {
		return quote.material!.some((mat) => mat.material === entry.material)
			? true
			: false;
	}
	if (area === "customer") {
		return quote.customer!.customerName === entry.customerName ? true : false;
	} else {
		return false;
	}
}

export function SectionDetails({
	quote,
	updateQuote,
	newQuote,
	type,
}: {
	quote: Quote;
	updateQuote: (quote: Quote) => void;
	newQuote: Quote;
	type: string;
}) {
	const data: {
		customers: tCustomer[];
		materials: tMaterial[];
	} = useLoaderData<typeof loader>();

	try {
		const { by, id, summary } = typeChoices(type);
		const searchList = data[(type + "s") as keyof typeof data];
		const [searchString, setSearchString] = React.useState("");
		const [searchData, filterData] = React.useState(searchList);

		const handleSearch = (thisSearch: string) => {
			setSearchString(thisSearch);
			if (thisSearch.length >= 2) {
				filterData(searchQuery({ by: by, search: thisSearch }, searchList));
			}
		};

		const handleBlur = (thisPick: any) => {
			const selection = searchQuery({ by: by, search: thisPick }, searchList);
			if (
				!duplicateCheck(type as "material" | "customer", selection[0], quote)
			) {
				let blurPick = prepareUpdate(quote);
				if (selection.length === 1) {
					type === "customer"
						? (blurPick.customer = selection[0])
						: blurPick.addMaterial(selection[0]);
					updateQuote(blurPick);
				} else if (thisPick.length == 0) {
					type === "customer" ? blurPick.clearCustomer() : null;
					updateQuote(blurPick);
				}
			}
		};

		return (
			<details id={id} open={quote[type as keyof Quote] ? true : false}>
				<summary>
					{summary}
					<span>
						<input
							type="search"
							id={type + "Search"}
							name={type + "Search"}
							list={type + "SrcList"}
							placeholder={"Current " + type[0].toUpperCase() + type.slice(1)}
							onBlur={(e) => {
								handleBlur(e.target.value);
							}}
							onChange={(e) => handleSearch(e.target.value)}
							defaultValue={""}
						/>
						<datalist id={type + "SrcList"}>
							{searchString.length >= 2 ? (
								<SearchDataList data={searchData} by={by} />
							) : null}
							{/*
								//todo 1. Advanced Search.
								Search By: Material Type, Duro
								
										*/}
						</datalist>
						<button id="btnNewCustomer" type="button" className="addNew">
							+ New
						</button>
					</span>
				</summary>
				{type === "customer" ? (
					<CustomerSelection customer={quote.customer} />
				) : (
					<MaterialSelection
						quote={quote}
						newQuote={newQuote}
						updateQuote={updateQuote}
						material={quote.material}
					/>
				)}
			</details>
		);
	} catch (e) {
		console.error(e);
	}
}

function SearchDataList({
	data,
	by,
}: {
	data: tCustomer[] | tMaterial[];
	by: string;
}) {
	return data.map((ea: any) => (
		<option key={ea.ID} label={ea[by as keyof typeof ea]}>
			{ea[by as keyof typeof ea]}
		</option>
	));
}

function CustomerSelection({ customer }: { customer: tCustomer | null }) {
	if (!customer) return null;
	return (
		<div>
			<h3>{customer.customerName}</h3>
			<p>
				{customer.address1}
				<br />
				{customer.address2}
			</p>
			<p>
				{customer.city}, {customer.state} {customer.zip}
			</p>
		</div>
	);
}

function MaterialSelection({
	quote,
	newQuote,
	updateQuote,
	material,
}: {
	quote: Quote;
	newQuote: Quote;
	updateQuote: (quote: Quote) => void;
	material: tMaterial[] | null;
}) {
	const [per, setPer] = React.useState(false);
	function handleRemoveMaterial(index: number) {
		let removeMat = prepareUpdate(newQuote);
		removeMat.removeMaterial(index);
		updateQuote(removeMat);
	}
	if (!material) return null;
	if (material.length >= 1) {
		return material.map((item: tMaterial, index: number) => {
			return (
				<div key={index}>
					<OnClickHeader
						className="headerMat"
						headerText={item.material}
						clickInner="X"
						clickFunction={() => handleRemoveMaterial(index)}
					/>

					<span className="descMat">{item.description}</span>
					<span className="detMat">
						<b>Supplier:</b> {item.supplier}
						<b>Width:</b> {item.width}
						<b>Cost:</b> ${item.costPer.toString()} per {item.uom}
					</span>
					<ProductStructure index={index} uom={item.uom} per1000={setPer} />
				</div>
			);
		});
	} else return null;
}

function ProductStructure({
	index,
	uom,
	per1000,
}: {
	index: number;
	uom: string;
	per1000: React.Dispatch<React.SetStateAction<boolean>>;
}) {
	function handleCB(thisPer: HTMLInputElement) {
		thisPer.checked ? per1000(false) : per1000(true);
	}
	return (
		<span className="pdMat">
			<label id={`lbl${index}Per1000`}>
				Per 1,000
				<input
					type="checkbox"
					defaultChecked={false}
					onClick={() => handleCB}
				/>
			</label>
			<label itemID={`lbl${index}Math`}>
				<input
					type="text"
					itemID=""
					placeholder={`${uom} per ${uom}`}
					onInput={() => {
						/* todo MATH EVENT */
					}}
				/>
			</label>
		</span>
	);
}
