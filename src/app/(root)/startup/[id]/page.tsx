import { client } from "@/sanity/lib/client";
import {
  PLAYLIST_BY_SLUG_QUERY,
  STARTUP_BY_ID_QUERY,
} from "@/sanity/lib/queries";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import markdownit from "markdown-it";
import View from "@/components/View";
import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDate } from "@/lib/utils";
import StartupCard, { StartupCardType } from "@/components/StartupCard";
// export const experimental_ppr = true;

const md = markdownit();

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const { id } = await params;
  const [post, { select: editorPosts }] = await Promise.all([
    client.fetch(STARTUP_BY_ID_QUERY, { id }),
    client.fetch(PLAYLIST_BY_SLUG_QUERY, { slug: "editor-picks" }),
  ]);
  if (!post) return notFound;
  const parsedMarkdown = md.render(post?.pitch || "");
  return (
    <>
      <section className="pink_container !min-h-[230px]">
        <p className="tag">{formatDate(post._createdAt)}</p>
        <h1 className="heading text-3xl">{post.title}</h1>
        <p className="sub-heading max-w-5xl">{post.description}</p>
      </section>

      <section className="section_container">
        <img
          src={post.image!}
          className="w-full h-auto rounded-xl"
          alt="thumbnail"
        />
        <div className="space-y-5 mt-10 max-w-4xl mx-auto">
          <div className="flex-between gap-5">
            <Link
              href={`/user/${post.author?._id}`}
              className="flex items-center gap-5 mb-3"
            >
              <Image
                src={post.author?.image!}
                alt={post.author?.username || ""}
                width={64}
                height={64}
                className="rounded-full drop-shadow-lg"
              />
              <div>
                <p className="text-20-medium ">{post.author?.name}</p>
                <p className="text-16-medium !text-black-300 ">
                  @{post.author?.username}
                </p>
              </div>
            </Link>
            <p className="category-tag">{post.category}</p>
          </div>
          <h3 className="text-30-bold">Startup Details</h3>
          {parsedMarkdown ? (
            <article
              dangerouslySetInnerHTML={{ __html: parsedMarkdown }}
              className="prose max-w-4xl font-work-sans break-words"
            />
          ) : (
            <p className="no-result"> No details provided</p>
          )}
        </div>
        <hr className="divider" />
        {editorPosts?.length > 0 && (
          <>
            <div className="max-w-4xl m-auto">
              <p className="text-30-bold ">Editor Picks</p>
              <ul className="mt-7 card_grid-sm">
                {editorPosts.map((post: StartupCardType) => (
                  <StartupCard post={post} key={post?._id} />
                ))}
              </ul>
            </div>
          </>
        )}
        <Suspense fallback={<Skeleton className="view_skeleton" />}>
          <div className="fixed right-2 bottom-2 bg-primary-100 rounded-xl  sm:max-w-sm  ">
            <View id={post._id} />
          </div>
        </Suspense>
      </section>
    </>
  );
};

export default page;
