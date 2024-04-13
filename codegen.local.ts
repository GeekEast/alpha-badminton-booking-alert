import { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
  ignoreNoDocuments: true,
  debug: true,
  verbose: true,
  generates: {
    "./src/types/nestGQLCodeGen.d.ts": {
      // feel free to use local urls to get dev version of schema types
      // ! make sure vpn is open when use dev ones.
      schema: ["http://localhost:9199/api/ap-southeast-2/graphql"],
      documents: ["./src/**/*.graphql.ts"],
      plugins: ["typescript", "typescript-operations"]
    },
    "./src/types/gqlCodeGen.d.ts": {
      // feel free to use local urls to get dev version of schema types
      // ! make sure vpn is open when use dev ones.
      schema: [
        "http://localhost:9099/api/ap-southeast-2/graphql",
        "http://localhost:9088/api/ap-southeast-2/graphql"
        // "https://ph-phapi-idp.ap-southeast-2.dev.predictivehire.com/api/ap-southeast-2/graphql",
        // "https://ph-phapi-org.ap-southeast-2.dev.predictivehire.com/api/ap-southeast-2/graphql"
      ],
      documents: ["./src/**/*.gql.ts"],
      plugins: ["typescript", "typescript-operations"]
    }
  }
}

export default config
