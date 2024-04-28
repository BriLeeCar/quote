import { json } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { prisma } from "~/lib/prisma.server";

export async function loader() {
	const feed = await prisma.customers.findMany({
		select: {
			ID: true,
			customerName: true,
		},
	});

	return json({ feed });
}

export default function Index() {
	const { feed } = useLoaderData<typeof loader>();
	return (
		<div className="page">
			<main>
				{feed.map((x: any) => {
					return (
						<div key={x.ID} className="post">
							{x.customerName}
						</div>
					);
				})}
			</main>
		</div>
	);
}
