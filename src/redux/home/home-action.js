import axios from "../../config/axios";
import RefreshToken from "../../Utils/RefreshToken";
export const SET_SYMBOLS = "SET_SYMBOLS";
export const SET_DATA_CHART_AREA = "SET_DATA_CHART_AREA";
export const SET_DATA_CHART_CANDLE = "SET_DATA_CHART_CANDLE";
export const SET_FAVORITE_SYMBOL = "SET_FAVORITE_SYMBOL";
export const SET_LAST_DEALS = "SET_LAST_DEALS";
export const SET_SEARCH = "SET_SEARCH";
export const SET_DATA_SIDE = "SET_DATA_SIDE";
export const SET_COMMENTS = "SET_COMMENTS";
export const SET_SHOW_MODAL_ADD_COMMENTS = "SET_SHOW_MODAL_ADD_COMMENTS";
export const SET_CURRENT_SYMBOL_COMMENT = "SET_CURRENT_SYMBOL_COMMENT";
export const SET_SHOW_MODAL_COMMENTS = "SET_SHOW_MODAL_COMMENTS";
export const SET_SHOW_PROFILE = "SET_SHOW_PROFILE";
export const SET_SHOW_MESSAGE = "SET_SHOW_MESSAGE";
export const SET_SHOW_APPS = "SET_SHOW_APPS";
export const SET_SHOW_STATS = "SET_SHOW_STATS";
export const SET_CANDLE_SELECTED = "SET_CANDLE_SELECTED";
export const SET_LIMIT_SELECTED = "SET_LIMIT_SELECTED";
export const SET_DATA_CHART_AREA_SYMBOL = "SET_DATA_CHART_AREA_SYMBOL";

export function setShowApps(value) {
  return (dispatch) => {
    dispatch({
      type: SET_SHOW_APPS,
      payload: value,
    });
  };
}

//symbol
export function getSymbol() {
  return async (dispatch) => {
    const response = await axios.get("/tse/stocks_info/").catch((err) => {
      if (err.response.status === 401) {
        RefreshToken();
      }
    });
    dispatch({
      type: SET_SYMBOLS,
      payload: response.data,
    });
  };
}

//area
export function getDataChartArea() {
  return async (dispatch) => {
    const response = await axios
      .get(`/tse/overall_index_chart_data/`)
      .catch((err) => {
        if (err.response.status === 401) {
          RefreshToken();
        }
      });
    dispatch({
      type: SET_DATA_CHART_AREA,
      payload: response.data,
    });
    return response.data;
  };
}

//area chart for symbol
export function getDataChartAreaSymbol(insCode) {
  return async (dispatch) => {
    const response = await axios.get(``).catch((err) => {
      if (err.response.status === 401) {
        RefreshToken();
      }
    });
    dispatch({
      type: SET_DATA_CHART_AREA_SYMBOL,
      payload: response.data,
    });
    return response.data;
  };
}

//candle
export function getDataChartCandle(insCode) {
  return async (dispatch) => {
    const response = await axios
      .get(`/tse/stock_chart_data/${insCode}`)
      .catch((err) => {
        if (err.response.status === 401) {
          RefreshToken();
        }
      });
    return response.data;
  };
}

export function getCandleSelected(insCode) {
  return async (dispatch) => {
    const response = await axios
      .get(`/tse/stock_chart_data/${insCode}`)
      .catch((err) => {
        if (err.response.status === 401) {
          RefreshToken();
        }
      });
    return response.data;
  };
}

export function lastDealssync(insCode) {
  return async (dispatch) => {
    try {
      const { data } = await axios
        .get(`/tse/stock_limits/${insCode}`)
        .catch((err) => {
          if (err.response.status === 401) {
            RefreshToken();
          }
        });
      if (data.length > 0) {
        dispatch({
          type: SET_LAST_DEALS,
          payload: data,
        });
      }
    } catch (erorr) {
      console.log("error");
    }
  };
}

export function getLimitSelected(insCode) {
  return async (dispatch) => {
    try {
      const response = await axios
        .get(`/tse/stock_limits/${insCode}`)
        .catch((err) => {
          if (err.response.status === 401) {
            RefreshToken();
          }
        });
      dispatch({
        type: SET_LIMIT_SELECTED,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//overall-index-side
export function getDataSide() {
  return async (dispatch) => {
    try {
      const response = await axios
        .get("tse/market_activity_last")
        .catch((err) => {
          if (err.response.status === 401) {
            RefreshToken();
          }
        });
      dispatch({
        type: SET_DATA_SIDE,
        payload: response.data,
      });
    } catch (error) {
      console.log(error);
    }
  };
}

//search
export function getSearch() {
  return async (dispatch) => {
    try {
      const response = await axios.get("/tse/search").catch((err) => {
        if (err.response.status === 401) {
          RefreshToken();
        }
      });
      dispatch({
        type: SET_SEARCH,
        payload: response.data,
      });
    } catch (error) {}
  };
}

export function setShowStats(value) {
  return (dispatch) => {
    dispatch({
      type: SET_SHOW_STATS,
      payload: value,
    });
  };
}

export function setShowProfile(value) {
  return (dispatch) => {
    dispatch({
      type: SET_SHOW_PROFILE,
      payload: value,
    });
  };
}

export function setShowMessage(value) {
  return (dispatch) => {
    dispatch({
      type: SET_SHOW_MESSAGE,
      payload: value,
    });
  };
}

export function setShowModalComments(value) {
  return (dispatch) => {
    dispatch({
      type: SET_SHOW_MODAL_COMMENTS,
      payload: value,
    });
  };
}

export function setCurrentSymbolComment(value) {
  return (dispatch) => {
    dispatch({
      type: SET_CURRENT_SYMBOL_COMMENT,
      payload: value,
    });
  };
}

export function setComments(value) {
  return (dispatch) => {
    dispatch({
      type: SET_COMMENTS,
      payload: value,
    });
  };
}

export function setShowModalAddComments(value) {
  return (dispatch) => {
    dispatch({
      type: SET_SHOW_MODAL_ADD_COMMENTS,
      payload: value,
    });
  };
}

export function setDataSide(value) {
  return (dispatch) => {
    dispatch({
      type: SET_DATA_SIDE,
      payload: value,
    });
  };
}

export function setSearch(value) {
  return (dispatch) => {
    dispatch({
      type: SET_SEARCH,
      payload: value,
    });
  };
}

export function setSymbols(value) {
  return async (dispatch) => {
    dispatch({
      type: SET_SYMBOLS,
      payload: value,
    });
  };
}

export function setDataChartCandle(value) {
  return async (dispatch) => {
    dispatch({
      type: SET_DATA_CHART_CANDLE,
      payload: value,
    });
  };
}

export function setDataChartArea(value) {
  return async (dispatch) => {
    dispatch({
      type: SET_DATA_CHART_AREA,
      payload: value,
    });
  };
}

export function setFavoriteSymbol(value) {
  return async (dispatch) => {
    dispatch({
      type: SET_FAVORITE_SYMBOL,
      payload: value,
    });
  };
}

export function setLastDeals(value) {
  return async (dispatch) => {
    dispatch({
      type: SET_LAST_DEALS,
      payload: value,
    });
  };
}

export function setCandleSelected(value) {
  return async (dispatch) => {
    dispatch({
      type: SET_CANDLE_SELECTED,
      payload: value,
    });
  };
}

export function setLimitSelected(value) {
  return async (dispatch) => {
    dispatch({
      type: SET_LIMIT_SELECTED,
      payload: value,
    });
  };
}

export function setDataChartAreaSymbol(value) {
  return async (dispatch) => {
    dispatch({
      type: SET_DATA_CHART_AREA_SYMBOL,
      payload: value,
    });
  };
}
