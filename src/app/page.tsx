import prisma from "@/db";
import Link from "next/link";

export default async function Home() {
    const blogPosts = await prisma.blogPost.findMany();

    return (
        <main className="p-4 flex flex-col gap-4 items-start">
            <h1 className="text-2xl">parallel route bug</h1>

            <div>
                <h2 className="text-xl">description of bug</h2>
                <p>
                    <strong>
                        the data in-browser and router navigation completely breaks
                    </strong>
                </p>
                <p>
                    if you navigate to a parallel route and perform a server action that
                    does data revalidation.
                </p>
            </div>

            <div>
                <h2 className="text-xl">steps to reproduce</h2>
                <ol className="list-decimal list-inside">
                    <li>
						{'click this button: '}
                        <Link href="/is-open" className="button">
                            click to open the modal
                        </Link>
						{' — it will navigate to a parallel route path that renders a '}
                        <code>&lt;dialog&gt;</code>
                    </li>

                    <li>{'click the '}<code>CREATE NEW BLOG POST</code>{' button within the dialog'}</li>

                    <li>{'💩 the router is now broken'}</li>
                    <li>{'💩 go ahead, click the '}<code>CLOSE DIALOG</code>{' (it will not do anything in this state, but works fine if you land directly on the dialog and click the button)'}</li>
                    <li>{`💩 the data on the page in the background should have updated as well — notice that it has not updated with the new post and will not update until you reload the page. (it works if you land on the parallel route directly and click the create button)`}</li>
                </ol>
            </div>

			<div>
				<h2 className="text-xl">other notes</h2>
				<ul className="list-disc list-inside">
					<li>{'the bug is NOT present if you navigate directly to '}<code>/is-open</code>{' — you must navigate to the parallel route'}</li>
					<li>{`the CREATE button and BACK TO HOME link both work fine when navigating directly to `}<code>/is-open</code></li>
				</ul>
			</div>

            <div>
                <h2 className="text-xl">current data</h2>
                <ul className="list-disc list-inside">
					{blogPosts.length === 0 && <li>no blog posts yet</li>}

                    {blogPosts.map((blogPost) => (
                        <li key={blogPost.id}>content: {blogPost.content}</li>
                    ))}
                </ul>
            </div>
        </main>
    );
}
