import Head from "next/head";
import { MDXClient } from "next-mdx-remote-client";
import {
  serialize,
  type SerializeOptions,
  type SerializeResult,
} from "next-mdx-remote-client/serialize";
import { readingTime } from "reading-time-estimator";

import { plugins, remarkRehypeOptions } from "@/utils/mdx";
import { getMarkdownFile, getMarkdownFiles } from "@/utils/file";
import { replaceLastDotWithDash } from "@/utils";
import { components } from "@/mdxComponents";
import type { Frontmatter, Scope } from "@/types";
import ErrorComponent from "@/components/ErrorComponent";
import DemoStateProvider from "@/contexts/DemoStateProvider";

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

      <DemoStateProvider>
        <MDXClient
          {...mdxSource}
          components={components}
          onError={ErrorComponent}
        />
      </DemoStateProvider>
    </>
  );
}

export async function getStaticPaths() {
  const files = getMarkdownFiles();

  const paths = files.map((filename) => ({
    params: { slug: replaceLastDotWithDash(filename) },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }: { params: { slug: string } }) {
  const result = await getMarkdownFile(params.slug);

  if (!result) return { props: {} };

  const { source, format } = result;

  const options: SerializeOptions<Scope> = {
    disableImports: true, // import statements in MDX don't work in pages router
    parseFrontmatter: true,
    scope: {
      readingTime: readingTime(source, 100).text,
      props: { foo: "props in scope is working" },
    },
    vfileDataIntoScope: "toc", // the "remark-flexible-toc" plugin produces vfile.data.toc
    mdxOptions: {
      format,
      ...plugins,
      remarkRehypeOptions: format === "md" ? remarkRehypeOptions : undefined,
    },
  };

  const mdxSource = await serialize<Frontmatter, Scope>({
    source,
    options,
  });

  return { props: { mdxSource } };
}