import Link from "next/link";

import prisma from '@/db';
import { revalidatePath } from "next/cache";

export default function Page() {
	async function createItem() {
		"use server";

		// create a new blog post
		await prisma.blogPost.create({
			data: {
				content: "item created at " + new Date().toISOString(),
			},
		});

		// make sure all the data on the page reloads
		revalidatePath('/', 'layout');
	}

	return (
		<dialog open className="border-solid border-2 border-indigo-600 shadow-xl min-w-[500px] min-h-[500px]">
			<h1>{`i'm a modal`}</h1>

			<br />

			<form action={createItem}>
				<button type="submit" className="button">CREATE NEW BLOG POST</button>
			</form>

			<br />

			<Link href="/" className="text-blue-500 underline">
				LINK BACK TO HOME PAGE
			</Link>
		</dialog>
	);
}
