import { Action, ***REMOVED*** } from "redux";
import Immutable from "immutable";
import { getUnexpectedInvocationParameterMessage } from "./utils";

export const ***REMOVED*** = <S extends Immutable.Map<string, any>>(
  reducers: ***REMOVED***<any, any>,
  ***REMOVED***: () => S
): ((inputState: S | undefined, action: Action) => S) => {
  const reducerKeys = Object.keys(reducers);

  // eslint-disable-next-line space-infix-ops
  return (inputState: S | undefined, action: Action): S => {
    if (typeof inputState === "undefined") {
      inputState = ***REMOVED***();
    }

    // eslint-disable-next-line no-process-env
    if (process.env.NODE_ENV !== "production") {
      const ***REMOVED*** = getUnexpectedInvocationParameterMessage(
        inputState,
        reducers,
        action
      );

      if (***REMOVED***) {
        // eslint-disable-next-line no-console
        console.error(***REMOVED***);
      }
    }

    return inputState.withMutations(***REMOVED*** => {
      reducerKeys.forEach(reducerName => {
        const reducer = reducers[reducerName];
        const ***REMOVED*** = ***REMOVED***.get(reducerName);
        const ***REMOVED*** = reducer(***REMOVED***, action);

        if (***REMOVED*** === undefined) {
          throw new Error(
            'Reducer "' +
              reducerName +
              '" returned undefined when handling "' +
              action.type +
              '" action. To ignore an action, you must explicitly return the previous state.'
          );
        }

        ***REMOVED***.set(reducerName, ***REMOVED***);
      });
    });
  };
};