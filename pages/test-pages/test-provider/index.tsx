import Head from "next/head";
import {
  serialize,
  type SerializeOptions,
  type SerializeResult,
} from "next-mdx-remote-client/serialize";
import { MDXClient, MDXProvider } from "next-mdx-remote-client";
import { readingTime } from "reading-time-estimator";

import type { Frontmatter, Scope } from "@/types";
import { getMarkdownExtension } from "@/utils";
import { plugins } from "@/utils/mdx";
import { getSource } from "@/utils/file";
import { components } from "@/mdxComponents";
import ErrorComponent from "@/components/ErrorComponent";
import DemoStateProvider from "@/contexts/DemoStateProvider";

type Props = {
  mdxSource?: SerializeResult<Frontmatter, Scope>;
};

/**
 * implements MDXProvider and a Context Provider usage
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
      <MDXProvider
        components={{
          ComponentFromOuterProvider: () => {
            return (
              <div className="outer-content">
                <p style={{ color: "var(--secondary)" }}>
                  I am a component coming from outer MDXProvider
                </p>
              </div>
            );
          },
        }}
      >
        <MDXProvider components={components}>
          <DemoStateProvider>
            <MDXClient {...mdxSource} onError={ErrorComponent} />
          </DemoStateProvider>
        </MDXProvider>
      </MDXProvider>
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
