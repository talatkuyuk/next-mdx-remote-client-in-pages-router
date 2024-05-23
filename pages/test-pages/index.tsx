import Head from "next/head";
import Link from "next/link";

export default function StaticBlog() {
  return (
    <>
      <Head>
        <title>Blog Pages</title>
      </Head>
      <div>
        <p>
          <strong>Welcome to blog pages</strong>
        </p>
        <p>
          This part of the application is designed for supplying
          <code>
            <em> different options </em>
          </code>
          into <strong>next-mdx-remote-client</strong> to see its behaviour and
          understanding how to implement a blog page with <code>MDXClient</code>{" "}
          or <code>hydrate</code>.
        </p>
        <ul className="test-pages">
          <li>
            <strong>A blog page with disabled imports/exports</strong>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link href="/test-pages/test-basic">MDXClient</Link>
              {" or "}
              <Link href="/test-pages/test-basic/hydrate">hydrate</Link>
            </div>
          </li>
          <li>
            <strong>A blog page with MDXProvider and context providers</strong>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link href="/test-pages/test-provider">MDXClient</Link>
              {" or "}
              <Link href="/test-pages/test-provider/hydrate">hydrate</Link>
            </div>
          </li>
          <li>
            <strong>A blog page with an error</strong>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link href="/test-pages/test-error">MDXClient</Link>
              {" or "}
              <Link href="/test-pages/test-error/hydrate">hydrate</Link>
            </div>
          </li>
          <li>
            <strong>A blog page with Table of Content (TOC)</strong>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link href="/test-pages/test-toc">MDXClient</Link>
              {" or "}
              <Link href="/test-pages/test-toc/hydrate">hydrate</Link>
            </div>
          </li>
          <li>
            <strong>A blog page written in markdown not MDX</strong>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link href="/test-pages/test-markdown">MDXClient</Link>
              {" or "}
              <Link href="/test-pages/test-markdown/hydrate">hydrate</Link>
            </div>
          </li>
          <li>
            <strong>A blog page with lazy loading</strong>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <Link href="/test-pages/test-lazy">MDXClientLazy</Link>
              {" or "}
              <Link href="/test-pages/test-lazy/hydrate">hydrateLazy</Link>
            </div>
          </li>
        </ul>
      </div>
    </>
  );
}
