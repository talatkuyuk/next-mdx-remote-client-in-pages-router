import Head from "next/head";
import { MDXClient } from "next-mdx-remote-client";
import {
  serialize,
  type SerializeOptions,
  type SerializeResult,
} from "next-mdx-remote-client/serialize";
import { readingTime } from "reading-time-estimator";

import { plugins } from "@/utils/mdx";
import { getSource } from "@/utils/file";
import { getMarkdownExtension } from "@/utils";
import { components } from "@/mdxComponents";
import type { Frontmatter, Scope } from "@/types";
import ErrorComponent from "@/components/ErrorComponent";
import DemoStateProvider from "@/contexts/DemoStateProvider";

type Props = {
  mdxSource?: SerializeResult<Frontmatter, Scope>;
};

/**
 * For demonstration purpose, the both "hydrate" and "MDXClient" to be rendered
 *
 * implements a Context Provider usage
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

export async function getStaticProps() {
  const file = "test-context.mdx";
  const format = getMarkdownExtension(file);
  const source = await getSource(file);

  if (!source) return { props: {} };

  const options: SerializeOptions<Scope> = {
    disableImports: true,
    parseFrontmatter: true,
    scope: { readingTime: readingTime(source, 100).text },
    mdxOptions: {
      format,
      ...plugins,
    },
  };

  const mdxSource = await serialize<Frontmatter, Scope>({
    source,
    options,
  });

  return { props: { mdxSource } };
}
