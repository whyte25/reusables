import { Index } from "@/__registry__";
import { notFound } from "next/navigation";

export type Style = {
  name: string;
  type: string;
  registryDependencies?: string[];
  files: string[];
  component: React.LazyExoticComponent<any>;
  source: string;
  category: string;
  subcategory: string;
  chunks: string[];
};

export const DEFAULT_REGISTRY_STYLE = "default";

const memoizedIndex: typeof Index = Object.fromEntries(
  Object.entries(Index).map(([style, items]) => [style, { ...items }])
);

export function getRegistryComponent(
  name: string,
  style: string = DEFAULT_REGISTRY_STYLE
) {
  return memoizedIndex[style][name]?.component;
}

export function getRegistryItem(
  name: string,
  style: string = DEFAULT_REGISTRY_STYLE
) {
  return memoizedIndex[style][name];
}

export function validateRegistryComponent(name: string) {
  const Component = getRegistryComponent(name);

  if (!Component) {
    return notFound();
  }

  return Component;
}
