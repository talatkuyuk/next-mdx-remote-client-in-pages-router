import Link from "next/link";
import Head from "next/head";

import type { Post } from "@/types";
import { getPostInformation, getMarkdownFiles } from "@/utils/file";

type Props = { posts: Post[] };

export default function DynamicBlog({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Dynamic Blog</title>
      </Head>
      <div>
        <p>
          <strong>Welcome to dynamic blog</strong>
        </p>
        <ul>
          {posts.map((post) => (
            <li key={post.title}>
              <Link href={`/dynamic-blog/${post.slug}`}>{post.title}</Link>
              <p>
                <span>{String(post.date)}, </span>
                <span>
                  written by <strong>{post.author}</strong>
                </span>
              </p>
              <p>{post.summary}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export const getStaticProps = () => {
  const files = getMarkdownFiles();

  const posts = files.map(getPostInformation);

  return { props: { posts } };
};
