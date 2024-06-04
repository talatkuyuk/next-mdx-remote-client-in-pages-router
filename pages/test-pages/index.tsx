import Head from "next/head";
import Link from "next/link";

import VisitGithub from "@/components/VisitGithub";

export default function StaticBlog() {
  return (
    <>
      <Head>
        <title>Blog Pages</title>
      </Head>
      <div>
        <p>
          <strong>Welcome to test pages</strong>
        </p>
        <p>
          This part of the application is designed for supplying&nbsp;
          <code>
            <em>different options</em>
          </code>
          &nbsp;into <strong>next-mdx-remote-client</strong> to see its
          behaviour and understanding how to implement a blog page with{" "}
          <code>MDXClient</code> or <code>hydrate</code>.
        </p>
        <VisitGithub />
        <ul className="test-pages">
          <li>
            <strong>A blog page with disabled imports/exports</strong>
            <div className="test-pages-link-container">
              <Link href="/test-pages/test-basic">MDXClient</Link>
              {" or "}
              <Link href="/test-pages/test-basic/hydrate">hydrate</Link>
            </div>
          </li>
          <li>
            <strong>A blog page with MDXProvider and context providers</strong>
            <div className="test-pages-link-container">
              <Link href="/test-pages/test-provider">MDXClient</Link>
              {" or "}
              <Link href="/test-pages/test-provider/hydrate">hydrate</Link>
            </div>
          </li>
          <li>
            <strong>A blog page with an error</strong>
            <div className="test-pages-link-container">
              <Link href="/test-pages/test-error">MDXClient</Link>
              {" or "}
              <Link href="/test-pages/test-error/hydrate">hydrate</Link>
            </div>
          </li>
          <li>
            <strong>A blog page with Table of Content (TOC)</strong>
            <div className="test-pages-link-container">
              <Link href="/test-pages/test-toc">MDXClient</Link>
              {" or "}
              <Link href="/test-pages/test-toc/hydrate">hydrate</Link>
            </div>
          </li>
          <li>
            <strong>A blog page written in markdown not MDX</strong>
            <div className="test-pages-link-container">
              <Link href="/test-pages/test-markdown">MDXClient</Link>
              {" or "}
              <Link href="/test-pages/test-markdown/hydrate">hydrate</Link>
            </div>
          </li>
          <li>
            <strong>
              A blog page getting dynamic content not available at build time
            </strong>
            <div className="test-pages-link-container">
              <Link href="/test-pages/test-dynamic">MDXClient</Link>
              {" or "}
              <Link href="/test-pages/test-dynamic/hydrate">hydrate</Link>
            </div>
          </li>
          <li>
            <strong>A blog page with lazy loading</strong>
            <div className="test-pages-link-container">
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
