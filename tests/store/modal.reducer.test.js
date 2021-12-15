import { handleModalAgentListDataAC, handleWallboardActiveModalAC } from '../../src/store/actions/modal.action';
import { modalInitialState, modalReducer } from '../../src/store/reducers/modal.reducer';
import '@testing-library/jest-dom/extend-expect';
import createMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { DEFAULTS } from '../../src/common/defaults/defaults';

const mockStore = createMockStore([thunk]);

describe('modal reducer', () => {
  const initialState = {
    modal: { ...modalInitialState },
  };
  test('should return the initial state', () => {
    expect(modalReducer(undefined, {})).toEqual(modalInitialState);
  });
  const store = mockStore(initialState);
  it('should create an action', () => {
    expect(store.getActions().length).toBe(0);
    const action = handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.AGENT_LIST);
    store.dispatch(action);
    expect(store.getActions()[0]).toEqual(action);
  });

  it('should change active modal name', () => {
    const action = handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.ADD_COMPONENT);
    expect(modalReducer(modalInitialState, action).activeModalName).toBe(DEFAULTS.MODAL.MODAL_NAMES.ADD_COMPONENT);
  });

  it('should change widget form data', () => {
    const changedFormData = {
      ...modalInitialState.agentList,
      mainViewing: DEFAULTS.MODAL.ADD_COMPONENT.MAIN_VIEWING_OPTIONS.TABLE,
    };
    const action = handleModalAgentListDataAC(changedFormData);
    const newState = modalReducer(modalInitialState, action);
    expect(newState.agentList.mainViewing).toEqual(DEFAULTS.MODAL.ADD_COMPONENT.MAIN_VIEWING_OPTIONS.TABLE);
  });
});
