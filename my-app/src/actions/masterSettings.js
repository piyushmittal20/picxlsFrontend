import axios from "axios";

import {
  ADMIN_ADDCOUNTRY_REQUEST,
  ADMIN_ADDCOUNTRY_SUCCESS,
  ADMIN_ADDCOUNTRY_FAIL,
  ADMIN_ADDSTATE_REQUEST,
  ADMIN_ADDSTATE_SUCCESS,
  ADMIN_ADDSTATE_FAIL,
  ADMIN_COUNTRYLIST_SUCCESS,
  ADMIN_COUNTRYLIST_FAIL,
  ADMIN_COUNTRYDETAIL_REQUEST,
  ADMIN_COUNTRYDETAIL_SUCCESS,
  ADMIN_COUNTRYDETAIL_FAIL,
  ADMIN_UPDATECOUNTRY_REQUEST,
  ADMIN_UPDATECOUNTRY_SUCCESS,
  ADMIN_UPDATECOUNTRY_FAIL,
  ADMIN_STATELIST_REQUEST,
  ADMIN_STATELIST_SUCCESS,
  ADMIN_STATELIST_FAIL,
  ADMIN_STATEDETAIL_REQUEST,
  ADMIN_STATEDETAIL_SUCCESS,
  ADMIN_STATEDETAIL_FAIL,
  ADMIN_DELETESTATE_REQUEST,
  ADMIN_DELETESTATE_SUCCESS,
  ADMIN_DELETESTATE_FAIL,
  ADMIN_UPDATESTATE_REQUEST,
  ADMIN_UPDATESTATE_SUCCESS,
  ADMIN_UPDATESTATE_FAIL,
  ADMIN_CITYLIST_REQUEST,
  ADMIN_CITYLIST_SUCCESS,
  ADMIN_CITYLIST_FAIL,
  ADMIN_CITYDETAIL_REQUEST,
  ADMIN_CITYDETAIL_SUCCESS,
  ADMIN_CITYDETAIL_FAIL,
  ADMIN_ADDCITY_REQUEST,
  ADMIN_ADDCITY_SUCCESS,
  ADMIN_ADDCITY_FAIL,
  ADMIN_DELETECITY_REQUEST,
  ADMIN_DELETECITY_SUCCESS,
  ADMIN_DELETECITY_FAIL,
  ADMIN_UPDATECITY_REQUEST,
  ADMIN_UPDATECITY_SUCCESS,
  ADMIN_UPDATECITY_FAIL,
  ADMIN_COUNTRYSTATUS_REQUEST,
  ADMIN_COUNTRYSTATUS_SUCCESS,
  ADMIN_COUNTRYSTATUS_FAIL,
  ADMIN_STATESTATUS_REQUEST,
  ADMIN_STATESTATUS_SUCCESS,
  ADMIN_STATESTATUS_FAIL,
  ADMIN_CITYSTATUS_REQUEST,
  ADMIN_CITYSTATUS_SUCCESS,
  ADMIN_CITYSTATUS_FAIL,
  ADMIN_COUNTRYLIST_REQUEST,
} from "../constants/adminConstants";
import {
  addCity,
  addcountry,
  addState,
  detailCity,
  detailCountry,
  detailState,
  editCity,
  editCountry,
  editState,
  listCity,
  listCountry,
  listState,
} from "../service";

export const getAllCountries = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_COUNTRYLIST_REQUEST });

    const {
      data: { countries },
    } = await axios.get(`${listCountry}/country`);

    dispatch({
      type: ADMIN_COUNTRYLIST_SUCCESS,
      payload: countries,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_COUNTRYLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCountry = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_COUNTRYDETAIL_REQUEST });

    const {
      data: { country },
    } = await axios.get(`${detailCountry}/country/${id}`);

    dispatch({
      type: ADMIN_COUNTRYDETAIL_SUCCESS,
      payload: country,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_COUNTRYDETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCountry = (newCountry) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_ADDCOUNTRY_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { savedCountry },
    } = await axios.post(`${addcountry}/country`, newCountry, config);

    dispatch({
      type: ADMIN_ADDCOUNTRY_SUCCESS,
      payload: savedCountry,
    });
  } catch (error) {
    console.log(error.response.data);
    dispatch({
      type: ADMIN_ADDCOUNTRY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCountry =
  (updatedCountry, id) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_UPDATECOUNTRY_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const {
        data: { savedCountry },
      } = await axios.put(
        `${editCountry}/country/${id}`,
        updatedCountry,
        config
      );

      dispatch({ type: ADMIN_UPDATECOUNTRY_SUCCESS });
      dispatch({
        type: ADMIN_COUNTRYDETAIL_SUCCESS,
        payload: savedCountry,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_UPDATECOUNTRY_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const updateCountryStatus =
  (country, id) => async (dispatch, getState) => {
    try {
      dispatch({ type: ADMIN_COUNTRYSTATUS_REQUEST });

      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.put(
        `https://picxls-testing.herokuapp.com/api/admin/countryStatus/${id}`,
        country,
        config
      );

      dispatch({
        type: ADMIN_COUNTRYSTATUS_SUCCESS,
        payload: data,
      });
    } catch (error) {
      dispatch({
        type: ADMIN_COUNTRYSTATUS_FAIL,
        payload:
          error.response && error.response.data.message
            ? error.response.data.message
            : error.message,
      });
    }
  };

export const getAllStates = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_STATELIST_REQUEST });

    const {
      data: { states },
    } = await axios.get(`${listState}/state`);

    dispatch({
      type: ADMIN_STATELIST_SUCCESS,
      payload: states,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_STATELIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createState = (newState) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_ADDSTATE_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { state },
    } = await axios.post(`${addState}/state`, newState, config);

    dispatch({
      type: ADMIN_ADDSTATE_SUCCESS,
      payload: state,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ADDSTATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getState = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_STATEDETAIL_REQUEST });

    const {
      data: { state },
    } = await axios.get(`${detailState}/state/${id}`);

    dispatch({
      type: ADMIN_STATEDETAIL_SUCCESS,
      payload: state,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_STATEDETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteState = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_DELETESTATE_REQUEST });

    const {
      data: { state },
    } = await axios.delete(
      `https://picxls-testing.herokuapp.com/api/admin/state/${id}`
    );

    dispatch({
      type: ADMIN_DELETESTATE_SUCCESS,
      payload: state,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETESTATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateStateStatus = (state, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_STATESTATUS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `https://picxls-testing.herokuapp.com/api/admin/stateStatus/${id}`,
      state,
      config
    );

    dispatch({
      type: ADMIN_STATESTATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_STATESTATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateState = (updatedState) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_UPDATESTATE_REQUEST });

    const config = {
      "Content-Type": "application/json",
    };

    const {
      data: { savedState },
    } = await axios.put(
      `${editState}/state/${updatedState._id}`,
      updatedState,
      config
    );

    console.log(savedState);

    dispatch({ type: ADMIN_UPDATESTATE_SUCCESS });
    dispatch({
      type: ADMIN_STATEDETAIL_SUCCESS,
      payload: savedState,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATESTATE_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCities = () => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_CITYLIST_REQUEST });

    const {
      data: { cities },
    } = await axios.get(`${listCity}/city`);

    dispatch({
      type: ADMIN_CITYLIST_SUCCESS,
      payload: cities,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CITYLIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const getCity = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_CITYDETAIL_REQUEST });

    const {
      data: { city },
    } = await axios.get(`${detailCity}/city/${id}`);

    dispatch({
      type: ADMIN_CITYDETAIL_SUCCESS,
      payload: city,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CITYDETAIL_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const createCity = (newCity) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_ADDCITY_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { savedCity },
    } = await axios.post(`${addCity}/city`, newCity, config);

    dispatch({
      type: ADMIN_ADDCITY_SUCCESS,
      payload: savedCity,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_ADDCITY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const deleteCity = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_DELETECITY_REQUEST });

    const { data } = await axios.delete(
      `https://picxls-testing.herokuapp.com/api/admin/city/${id}`
    );

    dispatch({
      type: ADMIN_DELETECITY_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_DELETECITY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCityStatus = (city, id) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_CITYSTATUS_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const { data } = await axios.put(
      `https://picxls-testing.herokuapp.com/api/admin/cityStatus/${id}`,
      city,
      config
    );

    dispatch({
      type: ADMIN_CITYSTATUS_SUCCESS,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_CITYSTATUS_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

export const updateCity = (city) => async (dispatch, getState) => {
  try {
    dispatch({ type: ADMIN_UPDATECITY_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };

    const {
      data: { savedCity },
    } = await axios.put(`${editCity}/city/${city._id}`, config, city);

    dispatch({ type: ADMIN_UPDATECITY_SUCCESS });
    dispatch({
      type: ADMIN_CITYDETAIL_SUCCESS,
      payload: savedCity,
    });
  } catch (error) {
    dispatch({
      type: ADMIN_UPDATECITY_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};
