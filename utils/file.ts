import fs from "fs";
import path from "path";
import { getFrontmatter } from "next-mdx-remote-client/utils";

import type { Post, Frontmatter } from "@/types";
import {
  getMarkdownExtension,
  replaceLastDashWithDot,
  replaceLastDotWithDash,
} from ".";

export const RE = /\.mdx?$/u; // Only .md(x) files
// text.replace(RE, "")

export const getSource = async (
  filename: string
): Promise<string | undefined> => {
  const sourcePath = path.join(process.cwd(), "data", filename);
  if (!fs.existsSync(sourcePath)) return;
  return await fs.promises.readFile(sourcePath, "utf8");
};

export const getSourceSync = (filename: string): string | undefined => {
  const sourcePath = path.join(process.cwd(), "data", filename);
  if (!fs.existsSync(sourcePath)) return;
  return fs.readFileSync(sourcePath, "utf8");
};

export const getMarkdownFiles = (): string[] => {
  return fs
    .readdirSync(path.join(process.cwd(), "data"))
    .filter((filePath: string) => RE.test(filePath));
};

export const getMarkdownFile = async (
  slug: string
): Promise<
  | {
      source: string;
      format: "md" | "mdx";
    }
  | undefined
> => {
  if (!/-mdx?$/.test(slug)) return;

  const filename = replaceLastDashWithDot(slug) as
    | `${string}.md`
    | `${string}.mdx`;

  const fullPath = path.join(process.cwd(), "data", filename);

  if (fs.existsSync(fullPath)) {
    const source = await getSource(filename);

    if (!source) return;

    return {
      source,
      format: getMarkdownExtension(filename),
    };
  }
};

export const getPostInformation = (filename: string): Post | undefined => {
  const source = getSourceSync(filename);

  if (!source) return;

  const frontmatter = getFrontmatter<Frontmatter>(source).frontmatter;

  const post: Post = {
    ...frontmatter,
    slug: replaceLastDotWithDash(filename),
  };

  return post;
};
