import { wallboardsActions } from '../actions/wallboards.action';

export const wallboardsUndoable = (reducer) => {
  const initialState = {
    past: [],
    present: reducer(undefined, {}),
    future: [],
    noOfSteptsForUndo: 0,
  };

  return function (state = initialState, action) {
    const { past, present, future } = state;

    switch (action.type) {
      case wallboardsActions.WALLBOARD_UNDO: {
        const previous = past[past.length - 1];
        const newPast = past.slice(0, past.length - 1);

        // if past. length === 0 return the actual state
        if (!state.noOfSteptsForUndo) return state;
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
          noOfSteptsForUndo: state.noOfSteptsForUndo - 1,
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
          noOfSteptsForUndo: state.noOfSteptsForUndo + 1,
        };
      }
      case wallboardsActions.CREATE_LOCAL_NEW_EMPTY_WALLBOARD: {
        const newPresent = reducer(present, action);
        return {
          past: [],
          present: newPresent,
          future: [],
          noOfSteptsForUndo: 0,
        };
      }
      // these changes we do not want to add to the past
      case wallboardsActions.FETCH_ALL_WALLBOARDS:
      case wallboardsActions.FETCH_ALL_WALLBOARDS_FAIL:
      case wallboardsActions.FETCH_ALL_WALLBOARDS_SUCCESS:
      case wallboardsActions.SAVE_WALLBOARD:
      case wallboardsActions.SAVE_WALLBOARD_FAIL:
      case wallboardsActions.SAVE_WALLBOARD_RESET_STATUS:
      case wallboardsActions.SAVE_WALLBOARD_SUCCESS: {
        const newPresent = reducer(present, action);
        if (present === newPresent) {
          return state;
        }
        return {
          past: past,
          present: newPresent,
          future: future,
          noOfSteptsForUndo: state.noOfSteptsForUndo,
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
          noOfSteptsForUndo: state.noOfSteptsForUndo + 1,
        };
      }
    }
  };
};
