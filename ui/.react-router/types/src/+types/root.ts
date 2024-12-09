// React Router generated types for route:
// root.tsx

import type * as T from "react-router/route-module"



type Module = typeof import("../root")

export type Info = {
  parents: [],
  id: "root"
  file: "root.tsx"
  path: ""
  params: {}
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