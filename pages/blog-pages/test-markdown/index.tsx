import Head from "next/head";
import { MDXClient } from "next-mdx-remote-client";
import {
  serialize,
  type SerializeOptions,
  type SerializeResult,
} from "next-mdx-remote-client/serialize";
import { readingTime } from "reading-time-estimator";

import { plugins, remarkRehypeOptions } from "@/utils/mdx";
import { getSource } from "@/utils/file";
import { getMarkdownExtension } from "@/utils";
import { components } from "@/mdxComponents";
import type { Frontmatter, Scope } from "@/types";
import ErrorComponent from "@/components/ErrorComponent";

type Props = {
  mdxSource?: SerializeResult<Frontmatter, Scope>;
};

/**
 * For demonstration purpose, the both "hydrate" and "MDXClient" to be rendered
 */
export default function TestPage({ mdxSource }: Props) {
  if (!mdxSource) {
    return <ErrorComponent error="The source could not found !" />;
  }

  if ("error" in mdxSource) {
    return <ErrorComponent error={mdxSource.error} />;
  }

  return (
    <>
      <Head>
        <title>{mdxSource.frontmatter.title}</title>
      </Head>

      <MDXClient
        {...mdxSource}
        components={components}
        onError={ErrorComponent}
      />
    </>
  );
}

export async function getStaticProps() {
  const file = "test-markdown.md";
  const format = getMarkdownExtension(file);
  const source = await getSource(file);

  if (!source) return { props: {} };

  const options: SerializeOptions<Scope> = {
    disableExports: true,
    disableImports: true,
    parseFrontmatter: true,
    scope: { readingTime: readingTime(source, 100).text },
    mdxOptions: {
      format,
      ...plugins,
      remarkRehypeOptions,
    },
  };

  const mdxSource = await serialize<Frontmatter, Scope>({
    source,
    options,
  });

  return { props: { mdxSource } };
}
