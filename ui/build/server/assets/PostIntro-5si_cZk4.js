import { jsx } from "react/jsx-runtime";
import { e as connect_default, p as postLoaded } from "./server-build-C_g_IF5C.js";
import "react";
import "react-compiler-runtime";
import { P as PostIntro$1 } from "./PostIntro-aMWZI1YM.js";
const Connected = (props) => {
  return /* @__PURE__ */ jsx(PostIntro$1, { onLoad: props.onLoad, ...props });
};
const ***REMOVED*** = (state, ownProps) => {
  return {};
};
const ***REMOVED*** = {
  onLoad: postLoaded
};
const PostIntro = connect_default(***REMOVED***, ***REMOVED***)(Connected);
export {
  PostIntro as P
};
