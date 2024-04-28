import { useLoaderData } from "@remix-run/react";
import { loader } from "~/routes";
import { Customer } from "./Customers";
import { Component } from "react";

export class CustomerList extends Component {
	customers: Customer[];
	constructor(props: {}) {
		super(props);
		this.customers = useLoaderData<typeof loader>();
	}
	selectList() {
		this.render();
		return {};
	}
}
