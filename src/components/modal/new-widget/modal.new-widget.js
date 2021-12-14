import React, { useRef, useState } from 'react';
import { useDispatch } from 'react-redux';
import { handleWallboardActiveModalAC } from 'src/store/actions/modal.action';
import { DEFAULTS } from '../../../common/defaults/defaults';
import { MODAL_NEW_WIDGET_SECITONS, WIDGET_TYPE } from '../../../common/defaults/modal.defaults';
import useOnClickOutside from '../../../common/hooks/useOnClickOutside';

const ModalNewWidget = ({ ...props }) => {
  const modalRef = useRef(null);
  const [newWbFilter, setNewWbFilter] = useState('');

  const [activeSectionValue, setActiveSectionValue] = useState(MODAL_NEW_WIDGET_SECITONS.QUEUES);

  const [selectedListItem, setSelectedListItem] = useState();
  const dispatch = useDispatch();

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
        <div className="c-modal--new-wallboard__header">{DEFAULTS.MODAL.NEW_WIDGET.CATEGORIES}</div>
        {DEFAULTS.MODAL.NEW_WIDGET.SECTIONS.map((navItem) => (
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
    const filtredOptions = DEFAULTS.MODAL.NEW_WIDGET.ADD_COMPONENT_OPTIONS[activeSectionValue].filter((option) =>
      option.NAME.toLowerCase().includes(newWbFilter.toLowerCase())
    );
    return (
      <div className="c-modal--new-wallboard__list">
        {filtredOptions.map((option) => (
          <div
            key={option.ID}
            onClick={() => handleSelectedItem(option.ID)}
            className={`c-modal--new-wallboard__list-item ${
              selectedListItem === option.ID ? 'c-modal--new-wallboard__list-item--selected' : ''
            }`}
          >
            <div className="c-modal--new-wallboard__list-title">{option.NAME}</div>
            <div className="c-modal--new-wallboard__list-subtitle">
              <div className="c-modal--new-wallboard__list-text">{option.DESCRIPTION}</div>
            </div>
          </div>
        ))}
        {!filtredOptions.length && <div className="empty-message">{DEFAULTS.MODAL.MESSAGES.NO_RESULTS}</div>}
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
    const onClickSelectButton = (e) => {
      switch (selectedListItem) {
        case WIDGET_TYPE.AGENT_LIST: {
          return dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.AGENT_LIST));
        }
        case WIDGET_TYPE.CALL_STATUS: {
          return dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.CALL_STATUS));
        }
        case WIDGET_TYPE.QUEUE_TRACKING: {
          return dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.QUEUE_TRACKING));
        }
        case WIDGET_TYPE.QUEUE_STATUS: {
          return dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.QUEUE_STATUS));
        }
        case WIDGET_TYPE.CALL_TRACKING: {
          return dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.CALL_TRACKING));
        }
        case WIDGET_TYPE.AGENT_LOGIN: {
          return dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.AGENT_LOGIN));
        }
        case WIDGET_TYPE.AGENT_STATUS: {
          return dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.AGENT_STATUS));
        }
        case WIDGET_TYPE.QUEUE_LIST: {
          return dispatch(handleWallboardActiveModalAC(DEFAULTS.MODAL.MODAL_NAMES.QUEUE_LIST));
        }
        default:
          return;
      }
    };

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
            <div className="c-modal__title">{DEFAULTS.MODAL.NEW_WIDGET.SELECT_COMPONENT}</div>
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
export default ModalNewWidget;