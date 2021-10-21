export const MODAL_NEW_WALLBOARD_SECITONS = {
  QUEUES: 'QUEUES',
  CALLS: 'CALLS',
  USERS: 'USERS',
};

export const MODAL_NEW_WALLBOARD_DEFAULTS = [
  {
    text: 'Queues',
    value: MODAL_NEW_WALLBOARD_SECITONS.QUEUES,
  },
  {
    text: 'Calls',
    value: MODAL_NEW_WALLBOARD_SECITONS.CALLS,
  },
  {
    text: 'Users',
    value: MODAL_NEW_WALLBOARD_SECITONS.USERS,
  },
];
export const MODAL_ADD_COMPONENT_OPTIONS = {
  [MODAL_NEW_WALLBOARD_SECITONS.QUEUES]: [
    {
      NAME: 'Agent list',
      STATUS: 'Natterbox Admin',
      DATE: '19/03/2021 at 14:19',
      SERVICE: 'Customer Service Calls',
    },
    {
      NAME: 'Queue list',
      STATUS: 'Natterbox Admin',
      DATE: '19/03/2021 at 14:19',
      SERVICE: 'Customer Service Calls',
    },
    {
      NAME: 'Queue tracking',
      STATUS: 'Natterbox Admin',
      DATE: '19/03/2021 at 14:19',
      SERVICE: 'Customer Service Calls',
    },
    {
      NAME: 'Queue status',
      STATUS: 'Natterbox Admin',
      DATE: '19/03/2021 at 14:19',
      SERVICE: 'Customer Service Calls',
    },
  ],
  [MODAL_NEW_WALLBOARD_SECITONS.CALLS]: [
    {
      NAME: 'Call status',
      STATUS: 'Natterbox Admin',
      DATE: '19/03/2021 at 14:19',
      SERVICE: 'Customer Service Calls',
    },
    {
      NAME: 'Call tracking',
      STATUS: 'Natterbox Admin',
      DATE: '19/03/2021 at 14:19',
      SERVICE: 'Customer Service Calls',
    },
  ],
  [MODAL_NEW_WALLBOARD_SECITONS.USERS]: [
    {
      NAME: 'Agent login',
      STATUS: 'Natterbox Admin',
      DATE: '19/03/2021 at 14:19',
      SERVICE: 'Customer Service Calls',
    },
    {
      NAME: 'Agent status',
      STATUS: 'Natterbox Admin',
      DATE: '19/03/2021 at 14:19',
      SERVICE: 'Customer Service Calls',
    },
  ],
};

export const WALLBOARD_MODAL_NAMES = {
  SELECT_COMPONENT: 'SELECT_COMPONENT',
  ADD_COMPONENT: 'ADD_COMPONENT',
  SAVE_WALLBOARD: 'SAVE_WALLBOARD',
  CONFIRM_SAVE_WALLBOARD: 'CONFIRM_SAVE_WALLBOARD',
  DELETE_WALLBOARD: 'DELETE_WALLBOARD',
  EDIT_WALLBOARD: 'EDIT_WALLBOARD',
  DELETE_WALLBOARD_COMPONENT: 'DELETE_WALLBOARD_COMPONENT',
};
