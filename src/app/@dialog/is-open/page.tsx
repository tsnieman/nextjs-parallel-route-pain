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
		revalidatePath('/', 'page');
	}

	return (
		<dialog open className="border-solid border-2 border-indigo-600 shadow-xl min-w-[500px] min-h-[500px]">
			<h1>{`i'm a modal`}</h1>

			<p>hi</p>

			<form action={createItem}>
				<button type="submit" className="button">click to create new blog post</button>
			</form>

			<Link href="/">
				click to close the modal
			</Link>
		</dialog>
	);
}
