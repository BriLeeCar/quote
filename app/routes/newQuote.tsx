// #region ? ---------- Imports/Utilities ----------
// * -------------------- FRAMEWORK
import { LinksFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import React from "react";
// * -------------------- STYLES
import styles from "~/styles/css/global.css";
import stylesAccentEls from "~/styles/css/accentEls.css";
import stylesNewQuote from "~/styles/css/newQuote.css";
// * -------------------- QUERIES
import {
	allCustomers as customerList,
	allMaterials as materialList,
} from "../lib/getCustomers";
// * -------------------- COMPONENTS, TYPES, CLASSES
import { Quote, prepareUpdate } from "~/lib/Quotes";
import { tCustomer, tMaterial } from "~/lib/formTypes";
import { SectionDetails } from "~/components/quoteElements";
import { OnClickCancel } from "~/components/accentEls";

export const links: LinksFunction = () => [
	{ rel: "stylesheet", href: styles.toString() },
	{ rel: "stylesheet", href: stylesAccentEls.toString() },
	{ rel: "stylesheet", href: stylesNewQuote.toString() },
];
// #endregion ? --------------------

// #region ? ---------- LOADERS ----------
export async function loader() {
	const customers = await customerList();
	const materials = await materialList();
	const quote = await prisma.quotes.findFirst({
		orderBy: {
			ID: "desc",
		},
		select: {
			ID: true,
		},
	});
	return {
		customers,
		materials,
		quote,
	};
}
// #endregion ? --------------------

const thisQuote = (ID: number) => new Quote(ID + 1);

export default function NewQuote() {
	// #region ! -------------------- LOADER DATA -------------------- */
	const data: {
		customers: tCustomer[];
		materials: tMaterial[];
		quote: {
			ID: number;
		};
	} = useLoaderData<typeof loader>();
	//#endregion

	// #region ! -------------------- STATE -------------------- */
	const [quote, updateQuote] = React.useState(thisQuote(data.quote.ID));
	const [notes, setNotes] = React.useState();
	const [formData, setFormData] = React.useState({
		customerSrc: "",
		materialSrc: "",
		customer: quote.customer,
		material: quote.material,
		process: [],
		addedQty: 0,
		notes: [],
	});
	const newQuote = prepareUpdate(quote);
	//#endregion

	// #region ! -------------------- HANDLE BUTTON CLICKS -------------------- */
	function handleQtyChanges(
		type: string,
		params?: { newValue: number; index: number; qtys: any }
	) {
		let qtyQuote = prepareUpdate(newQuote);
		switch (type) {
			case "add":
				qtyQuote.addQTY(formData.addedQty);
				break;
			case "update":
				qtyQuote.updateQTY(params!.index, params!.newValue);
		}
		updateQuote(qtyQuote);
	}
	function handlePriceChanges({
		index,
		newValue,
	}: {
		index: number;
		newValue: number;
	}) {
		let priceUpdate = prepareUpdate(quote);
		priceUpdate.updateQtyPrice(index, newValue);
		updateQuote(priceUpdate);
	}
	function handleQtyCancel(index: number) {
		let qtyCancel = prepareUpdate(quote);
		qtyCancel.removeQty(index);
		updateQuote(qtyCancel);
	}
	//#endregion

	// #region ! ---------- COMPONENT DISPLAY ----------
	return (
		<main id="newQuote">
			<h2>New Quote</h2>
			<form>
				{
					// #region ←⎯⎯⎯⎯⎯⎯⎯ DETAILS ⎯⎯⎯⎯⎯⎯⎯→
				}
				<fieldset>
					<span id="dateCreated">
						<b>Created:</b>
						{newQuote.dateCreated.toLocaleDateString()}
					</span>
					<span id="quoteNumber">
						<b>ID:</b>
						{newQuote.ID}
					</span>
					<span id="salesRep">
						<b>Rep:</b>{" "}
					</span>
				</fieldset>
				{
					//#endregion -
				}
				{
					// #region ←⎯⎯⎯⎯⎯⎯⎯ CUSTOMER ⎯⎯⎯⎯⎯⎯⎯→
				}
				<SectionDetails
					quote={quote}
					updateQuote={updateQuote}
					newQuote={newQuote}
					type="customer"
				/>
				{
					//#endregion
				}
				{
					// TODO product structures
					// #region ←⎯⎯⎯⎯⎯⎯⎯ MATERIAL ⎯⎯⎯⎯⎯⎯⎯→
				}
				<SectionDetails
					quote={quote}
					updateQuote={updateQuote}
					newQuote={newQuote}
					type="material"
				/>
				{
					//#endregion
				}
				{
					// #region ←⎯⎯⎯⎯⎯⎯⎯ MACHINES/PROCESS ⎯⎯⎯⎯⎯⎯⎯→
				}
				<details id="processDetails">
					<summary>
						Details
						<span>
							<button id="btnAddProcess" type="button">
								+ Add Process
							</button>
							<button id="btnAddMachine" type="button">
								+ Add Machine
							</button>
						</span>
					</summary>
					<div id="addedProcessList"></div>
				</details>
				{
					//#endregion
				}
				{
					// #region ←⎯⎯⎯⎯⎯⎯⎯ QUANTITIES ⎯⎯⎯⎯⎯⎯⎯→
				}
				<details id="addQtyDetails" open={newQuote.quantities ? true : false}>
					<summary>
						Quantities
						<span>
							<input
								id="addQty"
								name="addQty"
								type="number"
								min="1"
								placeholder="Qty"
								step="1"
								className="minWidth"
								onChange={(e) => {
									let newData = Object.assign({}, formData);
									newData.addedQty = parseInt(e.target.value);
									setFormData(newData);
								}}
							/>
							<button
								id="btnAddQty"
								type="button"
								onClick={() => handleQtyChanges("add")}
							>
								+ Add
							</button>
						</span>
					</summary>
					<div id="addedQtyList">
						{quote.quantities.map((qtys, index) => (
							<span key={index}>
								<OnClickCancel
									clickInner="X"
									clickFunction={() => handleQtyCancel(index)}
								/>
								<input
									type="number"
									min="1"
									placeholder="Qty"
									step="1"
									className="minWidth"
									defaultValue={qtys.amount}
									onChange={(e) => {
										const newValue = parseInt(e.target.value);
										handleQtyChanges("update", { index, newValue, qtys });
									}}
								/>
								<input
									type="number"
									min="0"
									placeholder="$0.000"
									step=".0001"
									className="minWidth"
									onChange={(e) => {
										const newValue = parseFloat(e.target.value);
										handlePriceChanges({ index, newValue });
									}}
								/>
							</span>
						))}
					</div>
				</details>
				{
					//#endregion
				}
				{
					// #region ←⎯⎯⎯⎯⎯⎯⎯ NOTES ⎯⎯⎯⎯⎯⎯⎯→
				}
				<details open id="notesDetails">
					<summary>Notes</summary>
					<textarea
						id="notes"
						name="notes"
						placeholder="Enter Notes Here..."
					></textarea>
				</details>
				{
					//#endregion
				}
			</form>
		</main>
	);

	// #endregion ! --------------------
}
