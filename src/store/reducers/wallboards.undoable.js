import { wallboardsActions } from '../actions/wallboards.action';
import { FetchStatus } from './wallboards.reducer';

export const wallboardsUndoable = (reducer) => {
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: [],
  };

  return function (state = initialState, action) {
    const { past, present, future } = state;

    switch (action.type) {
      case wallboardsActions.WALLBOARD_UNDO: {
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);

        // if past. length === 0 return the actual state
        if (!past.length || previous.activeWallboard?.fetchStatus !== FetchStatus.SUCCESS) return state;
        return {
          past: newPast,
          present: {
            ...previous,
            activeWallboard: {
              ...previous.activeWallboard,
              wallboardInitialValues: {
                ...present.activeWallboard.wallboardInitialValues,
              },
            },
          },
          future: [present, ...future],
        };
      }
      case wallboardsActions.WALLBOARD_REDO: {
        const next = future[0];
        const newFuture = future.slice(1);
        if (!future.length) return state;

        return {
          past: [...past, present],
          present: next,
          future: newFuture,
        };
      }

      case wallboardsActions.SAVE_WALLBOARD_SUCCESS: {
        const newPresent = reducer(present, action);
        if (present === newPresent) {
          return state;
        }
        return {
          past: [],
          present: newPresent,
          future: [],
        };
      }

      // these changes we do not want to add to the past
      case wallboardsActions.FETCH_ALL_WALLBOARDS:
      case wallboardsActions.FETCH_ALL_WALLBOARDS_FAIL:
      case wallboardsActions.FETCH_ALL_WALLBOARDS_SUCCESS: {
        const newPresent = reducer(present, action);
        if (present === newPresent) {
          return state;
        }
        return {
          past: past,
          present: newPresent,
          future: future,
        };
      }

      default: {
        const newPresent = reducer(present, action);
        if (present === newPresent) {
          return state;
        }
        return {
          past: [...past, present],
          present: newPresent,
          future: [],
        };
      }
    }
  };
};
