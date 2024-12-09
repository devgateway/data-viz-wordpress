import { jsx } from "react/jsx-runtime";
import { e as connect_default, b as PostContent$1, p as postLoaded } from "./server-build-C_g_IF5C.js";
import "react";
import "react-compiler-runtime";
const Connected = (props) => {
  return /* @__PURE__ */ jsx(PostContent$1, { onLoad: props.onLoad, ...props });
};
const ***REMOVED*** = (state, ownProps) => {
  return {};
};
const ***REMOVED*** = {
  onLoad: postLoaded
};
const PostContent = connect_default(***REMOVED***, ***REMOVED***)(Connected);
export {
  PostContent as P
};
