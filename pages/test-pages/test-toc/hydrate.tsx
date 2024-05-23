import Head from "next/head";
import {
  serialize,
  type SerializeOptions,
  type SerializeResult,
} from "next-mdx-remote-client/serialize";
import { hydrate } from "next-mdx-remote-client";
import { readingTime } from "reading-time-estimator";

import type { Frontmatter, Scope } from "@/types";
import { getMarkdownExtension } from "@/utils";
import { plugins } from "@/utils/mdx";
import { getSource } from "@/utils/file";
import { components } from "@/mdxComponents";
import ErrorComponent from "@/components/ErrorComponent";

type Props = {
  mdxSource?: SerializeResult<Frontmatter, Scope>;
};

/**
 * implements getting a Table of Contents (TOC) of an article
 */
export default function TestPage({ mdxSource }: Props) {
  if (!mdxSource) {
    return <ErrorComponent error="The source could not found !" />;
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

export async function getStaticProps() {
  const file = "test-toc.mdx";
  const format = getMarkdownExtension(file);
  const source = await getSource(file);

  if (!source) return { props: {} };

  const options: SerializeOptions<Scope> = {
    disableImports: true,
    parseFrontmatter: true,
    scope: { readingTime: readingTime(source, 100).text },
    vfileDataIntoScope: ["toc"], // the "remark-flexible-toc" plugin produces vfile.data.toc
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
