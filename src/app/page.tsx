import Link from "next/link";

import prisma from '@/db';

export default async function Home() {
	const blogPosts = await prisma.blogPost.findMany();

	const items = [
		{ id: 1, content: "item 1" },
	];

    return (
        <main className="p-4 flex flex-col gap-4 items-start">
            <h1 className="text-2xl">parallel route bug</h1>

            <Link href="/is-open" className="button">
                click to open the modal
            </Link>

            <div>
                <h2 className="text-xl">expected behavior</h2>
                <p>TODO</p>
            </div>

            <div>
                <h2 className="text-xl">steps to reproduce</h2>
                <ol className="list-decimal list-inside">
                    <li>click the link above to open the modal</li>
                    <li>TODO</li>
                </ol>
            </div>

            <div>
                <h2 className="text-xl">current data</h2>
                <ul className="list-disc list-inside">
                    {blogPosts.map((blogPost) => (
                        <li key={blogPost.id}>content: {blogPost.content}</li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
