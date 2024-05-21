import Head from "next/head";
import Link from "next/link";

export default function StaticBlog() {
  return (
    <>
      <Head>
        <title>Blog Pages</title>
      </Head>
      <div>
        <strong>Wellcome to blog pages</strong>
        <ul>
          <li>
            👉{" "}
            <Link href="/blog-pages/test-basic">
              Test Disabled Imports/Exports
            </Link>{" "}
            <span>(Author: foofoo)</span>
          </li>
          <li>
            👉 <Link href="/blog-pages/test-context">Test Context</Link>{" "}
            <span>(Author: barbar)</span>
          </li>
          <li>
            👉 <Link href="/blog-pages/test-provider">Test Provider</Link>{" "}
            <span>(Author: foofoo)</span>
          </li>
          <li>
            👉 <Link href="/blog-pages/test-error">Test Error</Link>{" "}
            <span>(Author: errorr)</span>
          </li>
          <li>
            👉{" "}
            <Link href="/blog-pages/test-toc">
              Test Basic with Table of Content (TOC)
            </Link>{" "}
            <span>(Author: toctoc)</span>
          </li>
          <li>
            👉 <Link href="/blog-pages/test-markdown">Test Markdown File</Link>{" "}
            <span>(Author: markmark)</span>
          </li>
          <li>
            👉 <Link href="/blog-pages/test-lazy">Test Lazy Hydration</Link>{" "}
            <span>(Author: lazy)</span>
          </li>
        </ul>
      </div>
    </>
  );
}
