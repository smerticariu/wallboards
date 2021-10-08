import axios from 'axios';
import {
  fetchAllWallboardsAC,
  fetchAllWallboardsFailAC,
  fetchAllWallboardsSuccessAC,
  fetchWallboardByIdAC,
  fetchWallboardByIdFailAC,
  fetchWallboardByIdSuccessAC,
} from '../actions/wallboards.action';

export const fetchWallboardByIdThunk = (wallboardId) => async (dispatch, getState) => {
  try {
    dispatch(fetchWallboardByIdAC());

    const options = {
      method: 'get',
      url: `http://localhost:3004/wallboards/${wallboardId}`,
    };

    const response = await axios(options);

    dispatch(fetchWallboardByIdSuccessAC(response.data));
  } catch (error) {
    dispatch(fetchWallboardByIdFailAC());
    console.log(error);
  }
};

export const fetchAllWallboardsThunk = () => async (dispatch, getState) => {
  try {
    dispatch(fetchAllWallboardsAC());

    const options = {
      method: 'get',
      url: `http://localhost:3004/wallboards/`,
    };

    const response = await axios(options);

    dispatch(fetchAllWallboardsSuccessAC(response.data));
  } catch (error) {
    dispatch(fetchAllWallboardsFailAC());
    console.log(error);
  }
};
