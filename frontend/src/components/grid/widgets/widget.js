import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { DEFAULTS } from '../../../common/defaults/defaults';
import { fetchUsersCurrentCallTimeThunk } from '../../../store/thunk/agents.thunk';
import GridAgentList from './agent-list';
import GridCallStatus from './call-status';
const Widget = ({ widget, isEditMode, ...props }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    const agentsInterval = setInterval(() => {
      dispatch(fetchUsersCurrentCallTimeThunk());
    }, 2000);
    return () => clearInterval(agentsInterval);
    // eslint-disable-next-line
  }, []);

  return (
    <>
      {widget.type === DEFAULTS.WALLBOARDS.WIDGET_TYPE.AGENT_LIST && <GridAgentList isEditMode={isEditMode} widget={widget} />}
      {widget.type === DEFAULTS.WALLBOARDS.WIDGET_TYPE.CALL_STATUS && <GridCallStatus isEditMode={isEditMode} widget={widget} />}
    </>
  );
};
export default Widget;
