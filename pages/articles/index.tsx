import Link from "next/link";
import Head from "next/head";

import type { Post } from "@/types";
import { getPostInformation, getMarkdownFiles } from "@/utils/file";

type Props = { posts: Post[] };

export default function DynamicBlog({ posts }: Props) {
  return (
    <>
      <Head>
        <title>Articles</title>
      </Head>
      <div>
        <p>
          <strong>Welcome to articles</strong>
        </p>
        <ul className="articles">
          {posts.map((post) => (
            <li key={post.title}>
              <strong>
                <Link href={`/articles/${post.slug}`}>{post.title}</Link>
              </strong>
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

  const article = (f: string) => f.includes("article");

  // "getPostInformation" uses "getFrontmatter" utility without compiling the source !
  const posts = files.filter(article).map(getPostInformation);

  return { props: { posts } };
};