import { defineConfig } from "orval";

export default defineConfig({
  blogApi: {
    input: "src/lib/swagger.yaml",
    output: {
      target: "src/lib/generated/blog-api.ts",
      client: "react-query",
      prettier: true,
      override: {
        mutator: {
          path: "src/lib/generated/fetcher.ts",
          name: "customFetcher",
        },
      },
    },
  },
});

