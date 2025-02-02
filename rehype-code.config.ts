import type { RehypeCodeOptions } from "fumadocs-core/mdx-plugins";

export const rehypeCodeOptions: RehypeCodeOptions = {
  themes: {
    light: "github-light",
    dark: "github-dark",
  },
  inline: "tailing-curly-colon",
  defaultColor: false,
};
