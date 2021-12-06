import React, { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { handleWallboardActiveModalAC } from 'src/store/actions/modal.action';
import { DEFAULTS } from '../../../common/defaults/defaults';
import { MODAL_NEW_WALLBOARD_SECITONS } from '../../../common/defaults/modal.defaults';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';
import { FetchStatus } from '../../../store/reducers/wallboards.reducer';
import { fetchAllWallboardsThunk } from '../../../store/thunk/wallboards.thunk';

const ModalNewWallboard = ({ ...props }) => {
  const modalRef = useRef(null);
  const [selectedListItem, setSelectedListItem] = useState();
  const dispatch = useDispatch();
  const [newWbFilter, setNewWbFilter] = useState('');
  const { userInfo } = useSelector((state) => state.login);

  const { fetchStatus, wallboards } = useSelector((state) => state.wallboards.present.allWallboards);
  const [activeSectionValue, setActiveSectionValue] = useState(MODAL_NEW_WALLBOARD_SECITONS.WALLBOARDS);
  useEffect(() => {
    // dispatch(syncWallboardsWithConfig()); // import and use it when needed - do not delete
    dispatch(fetchAllWallboardsThunk());
    // eslint-disable-next-line
  }, []);

  const closeModal = () => {
    dispatch(handleWallboardActiveModalAC(null));
  };
  useOnClickOutside(modalRef, () => closeModal());

  const handleLeftSidebar = () => {
    const handleClick = (e, category) => {
      setActiveSectionValue(category);
    };

    return (
      <div className="c-modal--new-wallboard__categories">
        <div className="c-modal--new-wallboard__header">{DEFAULTS.MODAL.NEW_WALLBOARD.SELECT_COMPONENT}</div>
        {DEFAULTS.MODAL.NEW_WALLBOARD.SECTIONS.map((navItem) => (
          <div
            key={navItem.value}
            className={`c-modal--new-wallboard__nav-item ${
              activeSectionValue === navItem.value ? 'c-modal--new-wallboard__nav-item--selected' : ''
            }`}
            onClick={(e) => handleClick(e, navItem.value)}
          >
            {navItem.text}
          </div>
        ))}
      </div>
    );
  };

  const handleList = () => {
    const handleSelectedItem = (name) => {
      setSelectedListItem(name);
    };

    const filtredWallboards = wallboards
      .filter((wb) => wb.natterboxUserId === userInfo.natterboxUserId && wb.name.toUpperCase().includes(newWbFilter.toUpperCase()))
      .sort((wb1, wb2) => wb2.lastView - wb1.lastView);
    return (
      <div className="c-modal--new-wallboard__list">
        {filtredWallboards.map((wallboard) => (
          <div
            key={wallboard.id}
            onClick={() => handleSelectedItem(wallboard.id)}
            className={`c-modal--new-wallboard__list-item ${
              selectedListItem === wallboard.id ? 'c-modal--new-wallboard__list-item--selected' : ''
            }`}
          >
            <div className="c-modal--new-wallboard__list-title">{wallboard.name}</div>
            <div className="c-modal--new-wallboard__list-subtitle">
              <div className="c-modal--new-wallboard__list-text">{wallboard.description}</div>
            </div>
          </div>
        ))}
        {fetchStatus !== FetchStatus.SUCCESS ? (
          <div className="empty-message">{DEFAULTS.MODAL.MESSAGES.IN_PROGRESS}</div>
        ) : (
          !filtredWallboards.length && <div className="empty-message">{DEFAULTS.MODAL.MESSAGES.NO_RESULTS}</div>
        )}
      </div>
    );
  };

  const handleFilterInput = () => {
    const updateFilterInput = (e) => {
      setNewWbFilter(e.target.value);
    };

    return (
      <input
        className="c-input"
        value={newWbFilter}
        placeholder={DEFAULTS.MODAL.ADD_COMPONENT.PLACEHOLDER.SEARCH_LIST}
        type="text"
        onChange={(e) => updateFilterInput(e)}
      />
    );
  };

  const handleCancelButton = () => {
    const onClickCancelButton = (e) => {
      closeModal();
    };

    return (
      <>
        <button className="c-button" onClick={onClickCancelButton}>
          Cancel
        </button>
      </>
    );
  };

  const handleSelectButton = () => {
    const onClickSelectButton = (e) => {};

    return (
      <>
        <button
          className={`c-button c-button--m-left ${selectedListItem ? 'c-button--blue' : 'c-button--disabled'}`}
          onClick={onClickSelectButton}
        >
          Select
        </button>
      </>
    );
  };

  return (
    <div className={`c-modal c-modal--new-wallboard c-modal--open`}>
      <div ref={modalRef} className="c-modal__container c-modal__container--new-wallboard">
        <div className="c-modal__content">
          <div className="c-modal__header">
            <div className="c-modal__title">{DEFAULTS.MODAL.NEW_WALLBOARD.SELECT_COMPONENT}</div>
          </div>

          <div className="c-modal__body c-modal__body--new-wallboard">
            {handleLeftSidebar()}
            <div className="c-modal--new-wallboard__form">
              {handleFilterInput()}
              {handleList()}
              <div className="c-modal__buttons">
                {handleCancelButton()}
                {handleSelectButton()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalNewWallboard;
