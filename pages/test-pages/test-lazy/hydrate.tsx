import Head from "next/head";
import {
  serialize,
  type SerializeOptions,
  type SerializeResult,
} from "next-mdx-remote-client/serialize";
import { hydrateLazy } from "next-mdx-remote-client";
import { readingTime } from "reading-time-estimator";

import type { Frontmatter, Scope } from "@/types";
import { getMarkdownExtension } from "@/utils";
import { plugins } from "@/utils/mdx";
import { expect } from "@/utils/expect";
import { getSource } from "@/utils/file";
import { components } from "@/mdxComponents";
import ErrorComponent from "@/components/ErrorComponent";

type Props = {
  mdxSource?: SerializeResult<Frontmatter, Scope>;
};

/**
 *
 * lazy loading with hydrateLazy
 */
export default function TestPage({ mdxSource }: Props) {
  if (!mdxSource) {
    return <ErrorComponent error="The source could not found !" />;
  }

  if ("error" in mdxSource) {
    return <ErrorComponent error={mdxSource.error} />;
  }

  const { content, mod, error } = hydrateLazy({
    ...mdxSource,
    components,
  });

  // just for testing exports from MDX source
  // "mod" object refers to the exports from MDX
  // this check is necessary due to lazy loading
  if (Object.keys(mod).length > 0) {
    expect((mod.factorial as Function)?.(mod.num)).toEqual(720);
  }

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
  const file = "test-basic.mdx";
  const format = getMarkdownExtension(file);
  const source = await getSource(file);

  if (!source) return { props: {} };

  const options: SerializeOptions<Scope> = {
    disableImports: true,
    parseFrontmatter: true,
    scope: {
      readingTime: readingTime(source, 100).text,
      props: { foo: "props in scope is working" },
    },
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
