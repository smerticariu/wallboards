import { QUEUE_LIST_COLUMN_OPTIONS } from '../defaults/modal.defaults';

export const sortQueueList = ({ sortBy, descending }, tableData) => {
  const sortedTableData = [...tableData].sort((call1, call2) => {
    let compareRespone = 0;
    switch (sortBy) {
      case QUEUE_LIST_COLUMN_OPTIONS.POSITION_IN_QUEUE:
        compareRespone = call1[QUEUE_LIST_COLUMN_OPTIONS.POSITION_IN_QUEUE] - call2[QUEUE_LIST_COLUMN_OPTIONS.POSITION_IN_QUEUE];
        break;
      case QUEUE_LIST_COLUMN_OPTIONS.CALLER_NAME:
        compareRespone = call1[QUEUE_LIST_COLUMN_OPTIONS.CALLER_NAME]
          .toUpperCase()
          .localeCompare(call2[QUEUE_LIST_COLUMN_OPTIONS.CALLER_NAME].toUpperCase());
        break;
      case QUEUE_LIST_COLUMN_OPTIONS.PRIORITY:
        compareRespone = call1[QUEUE_LIST_COLUMN_OPTIONS.PRIORITY] - call2[QUEUE_LIST_COLUMN_OPTIONS.PRIORITY];
        break;
      case QUEUE_LIST_COLUMN_OPTIONS.TIME_WAITING_IN_QUEUE:
        compareRespone = call2[QUEUE_LIST_COLUMN_OPTIONS.TIME_WAITING_IN_QUEUE] - call1[QUEUE_LIST_COLUMN_OPTIONS.TIME_WAITING_IN_QUEUE];
        break;
      case QUEUE_LIST_COLUMN_OPTIONS.DIAL_ATTEMPTS:
        compareRespone = call2[QUEUE_LIST_COLUMN_OPTIONS.DIAL_ATTEMPTS] - call1[QUEUE_LIST_COLUMN_OPTIONS.DIAL_ATTEMPTS];
        break;
      case QUEUE_LIST_COLUMN_OPTIONS.CALLER_NUMBER:
        compareRespone =
          +call2[QUEUE_LIST_COLUMN_OPTIONS.CALLER_NUMBER].replace(/\s/g, '') -
          +call1[QUEUE_LIST_COLUMN_OPTIONS.CALLER_NUMBER].replace(/\s/g, '');
        break;
      case QUEUE_LIST_COLUMN_OPTIONS.STATUS:
        compareRespone = call1[QUEUE_LIST_COLUMN_OPTIONS.STATUS]
          .toUpperCase()
          .localeCompare(call2[QUEUE_LIST_COLUMN_OPTIONS.STATUS].toUpperCase());
        break;
      case QUEUE_LIST_COLUMN_OPTIONS.AGENT_CONNECTED_TO:
        if (!call1[QUEUE_LIST_COLUMN_OPTIONS.AGENT_CONNECTED_TO]) compareRespone = 1;
        if (!call2[QUEUE_LIST_COLUMN_OPTIONS.AGENT_CONNECTED_TO]) compareRespone = -1;
        compareRespone = call1[QUEUE_LIST_COLUMN_OPTIONS.AGENT_CONNECTED_TO]
          .toUpperCase()
          .localeCompare(call2[QUEUE_LIST_COLUMN_OPTIONS.AGENT_CONNECTED_TO].toUpperCase());
        break;
      case QUEUE_LIST_COLUMN_OPTIONS.TIME_AT_HEAD_OF_QUEUE:
        compareRespone = call2[QUEUE_LIST_COLUMN_OPTIONS.TIME_AT_HEAD_OF_QUEUE] - call1[QUEUE_LIST_COLUMN_OPTIONS.TIME_AT_HEAD_OF_QUEUE];
        break;
      case QUEUE_LIST_COLUMN_OPTIONS.CALLBACK_REQUESTED:
        compareRespone =
          call1[QUEUE_LIST_COLUMN_OPTIONS.CALLBACK_REQUESTED] === call2[QUEUE_LIST_COLUMN_OPTIONS.CALLBACK_REQUESTED]
            ? 0
            : call1[QUEUE_LIST_COLUMN_OPTIONS.CALLBACK_REQUESTED]
            ? -1
            : 1;
        break;
      case QUEUE_LIST_COLUMN_OPTIONS.CALLBACK_ATTEMPTS:
        compareRespone = call2[QUEUE_LIST_COLUMN_OPTIONS.CALLBACK_ATTEMPTS] - call1[QUEUE_LIST_COLUMN_OPTIONS.CALLBACK_ATTEMPTS];

        break;
      default:
        compareRespone = 0;
    }
    if (descending) {
      return 0 - compareRespone;
    }
    return compareRespone;
  });
  return sortedTableData;
};
