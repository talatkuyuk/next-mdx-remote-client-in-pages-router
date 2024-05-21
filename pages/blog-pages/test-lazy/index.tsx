import Head from "next/head";
import {
  serialize,
  type SerializeOptions,
} from "next-mdx-remote-client/serialize";
import {
  hydrateLazy,
  MDXClientLazy,
  type SerializeResult,
} from "next-mdx-remote-client/csr";
import { readingTime } from "reading-time-estimator";

import { getMarkdownExtension } from "@/utils";
import { plugins } from "@/utils/mdx";
import { getSource } from "@/utils/file";
import { components } from "@/mdxComponents";
import type { Frontmatter, Scope } from "@/types";
import ErrorComponent from "@/components/ErrorComponent";

type Props = {
  mdxSource?: SerializeResult<Frontmatter, Scope>;
};

/**
 * This page is experimental for importing a module specified in the mdx on the client side
 *
 * For demonstration purpose, the both "hydrate" and "MDXClient" to be rendered
 */
export default function TestPage({ mdxSource }: Props) {
  if (!mdxSource) {
    return <ErrorComponent error="The source could not found !" />;
  }

  if ("error" in mdxSource) return <ErrorComponent error={mdxSource.error} />;

  const { content, mod, error } = hydrateLazy({
    ...mdxSource,
    components,
  });

  return (
    <>
      <Head>
        <title>{mdxSource.frontmatter.title}</title>
      </Head>

      <>
        {error ? <ErrorComponent error={error} /> : content}

        <MDXClientLazy
          {...mdxSource}
          components={components}
          onError={ErrorComponent}
        />
      </>
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
