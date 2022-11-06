import {
  SET_SYMBOLS,
  SET_DATA_CHART_AREA,
  SET_DATA_CHART_CANDLE,
  SET_FAVORITE_SYMBOL,
  SET_LAST_DEALS,
  SET_SEARCH,
  SET_DATA_SIDE,
  SET_COMMENTS,
  SET_SHOW_MODAL_ADD_COMMENTS,
  SET_CURRENT_SYMBOL_COMMENT,
  SET_SHOW_MODAL_COMMENTS,
  SET_SHOW_PROFILE,
  SET_SHOW_MESSAGE,
  SET_SHOW_APPS,
  SET_SHOW_STATS,
  SET_CANDLE_SELECTED,
} from "./home-action";

const initialState = {
  symbols: [],
  chartArea: [],
  chartCandle: [],
  favorite: [],
  lastDeals: [
    {
      insCode: 0,
      numberOfDemand: 0,
      demandVolume: 0,
      demandPrice: 0,
      numberOfSupply: 0,
      supplyVolume: 0,
      supplyPrice: 0,
    },
    {
      insCode: 0,
      numberOfDemand: 0,
      demandVolume: 0,
      demandPrice: 0,
      numberOfSupply: 0,
      supplyVolume: 0,
      supplyPrice: 0,
    },
    {
      insCode: 0,
      numberOfDemand: 0,
      demandVolume: 0,
      demandPrice: 0,
      numberOfSupply: 0,
      supplyVolume: 0,
      supplyPrice: 0,
    },
    {
      insCode: 0,
      numberOfDemand: 0,
      demandVolume: 0,
      demandPrice: 0,
      numberOfSupply: 0,
      supplyVolume: 0,
      supplyPrice: 0,
    },
    {
      insCode: 0,
      numberOfDemand: 0,
      demandVolume: 0,
      demandPrice: 0,
      numberOfSupply: 0,
      supplyVolume: 0,
      supplyPrice: 0,
    },
  ],
  search: "",
  side: {},
  comments: [],
  modalAddComments: false,
  modalComments: false,
  currentSymbol: {},
  showProfile: false,
  showMessage: false,
  showApps: false,
  showStats: false,
  candleSelected: "",
  limitSelected: "",
};

export const HomeReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SYMBOLS:
      return {
        ...state,
        symbols: action.payload,
      };
    case SET_DATA_CHART_AREA:
      return {
        ...state,
        chartArea: action.payload,
      };
    case SET_SHOW_STATS:
      return {
        ...state,
        showStats: action.payload,
      };
    case SET_SHOW_APPS:
      return {
        ...state,
        showApps: action.payload,
      };
    case SET_SHOW_MESSAGE:
      return {
        ...state,
        showMessage: action.payload,
      };
    case SET_SHOW_PROFILE:
      return {
        ...state,
        showProfile: action.payload,
      };
    case SET_SHOW_MODAL_COMMENTS:
      return {
        ...state,
        modalComments: action.payload,
      };
    case SET_CURRENT_SYMBOL_COMMENT:
      return {
        ...state,
        currentSymbol: action.payload,
      };
    case SET_SHOW_MODAL_ADD_COMMENTS:
      return {
        ...state,
        modalAddComments: action.payload,
      };
    case SET_COMMENTS:
      return {
        ...state,
        comments: action.payload,
      };
    case SET_DATA_SIDE:
      return {
        ...state,
        side: action.payload,
      };
    case SET_SEARCH:
      return {
        ...state,
        search: action.payload,
      };
    case SET_LAST_DEALS:
      return {
        ...state,
        lastDeals: action.payload,
      };

    case SET_DATA_CHART_CANDLE:
      return {
        ...state,
        chartCandle: action.payload,
      };
    case SET_FAVORITE_SYMBOL:
      return {
        ...state,
        favorite: action.payload,
      };
    case SET_CANDLE_SELECTED:
      return {
        ...state,
        candleSelected: action.payload,
      };

    default:
      return state;
  }
};
