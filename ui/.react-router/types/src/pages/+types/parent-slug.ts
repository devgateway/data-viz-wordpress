// React Router generated types for route:
// ./pages/parent-slug.tsx

import type * as T from "react-router/route-module"

import type { Info as Parent0 } from "../../+types/root"
import type { Info as Parent1 } from "../../+types/App"

type Module = typeof import("../parent-slug")

export type Info = {
  parents: [Parent0, Parent1],
  id: "pages/parent-slug"
  file: "./pages/parent-slug.tsx"
  path: ":parent/:slug"
  params: {"lan": string; "parent": string; "slug": string}
  module: Module
  loaderData: T.***REMOVED***<Module>
  actionData: T.***REMOVED***<Module>
}

export namespace Route {
  export type ***REMOVED*** = T.***REMOVED***
  export type LinksFunction = () => ***REMOVED***

  export type MetaArgs = T.***REMOVED***<Info>
  export type ***REMOVED*** = T.***REMOVED***
  export type MetaFunction = (args: MetaArgs) => ***REMOVED***

  export type HeadersArgs = T.HeadersArgs
  export type ***REMOVED*** = (args: HeadersArgs) => Headers | HeadersInit

  export type LoaderArgs = T.CreateServerLoaderArgs<Info>
  export type ***REMOVED*** = T.CreateClientLoaderArgs<Info>
  export type ActionArgs = T.CreateServerActionArgs<Info>
  export type ***REMOVED*** = T.CreateClientActionArgs<Info>

  export type ***REMOVED*** = T.CreateHydrateFallbackProps<Info>
  export type ***REMOVED*** = T.***REMOVED***<Info>
  export type ***REMOVED*** = T.CreateErrorBoundaryProps<Info>
}