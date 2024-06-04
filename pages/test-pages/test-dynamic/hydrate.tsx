import { useState, useEffect } from "react";
import Head from "next/head";
import { hydrate, type SerializeResult } from "next-mdx-remote-client";

import type { Frontmatter, Scope } from "@/types";
import { components } from "@/mdxComponents";
import ErrorComponent from "@/components/ErrorComponent";
import LoadingComponent from "@/components/LoadingComponent";

/**
 * implements getting dynamic content not available at build time
 */
export default function TestPage() {
  const [mdxSource, setMdxSource] = useState<SerializeResult<
    Frontmatter,
    Scope
  > | null>(null);

  useEffect(() => {
    // Fetch the MDX content from API
    const fetchData = async () => {
      const res = await fetch("/api/mdx-content");
      const data = await res.json();
      setMdxSource(data);
    };
    fetchData();
  }, []);

  if (!mdxSource) {
    return <LoadingComponent />;
  }

  if ("error" in mdxSource) {
    return <ErrorComponent error={mdxSource.error} />;
  }

  const { content, mod, error } = hydrate({
    ...mdxSource,
    components,
  });

  // "mod" object refers to the exports from MDX
  console.log(mod.num); // expect it to be 6

  return (
    <>
      <Head>
        <title>{mdxSource.frontmatter.title}</title>
      </Head>

      {error ? <ErrorComponent error={error} /> : content}
    </>
  );
}
