export const LOAD = 'redux-example/clients/LOAD';
export const LOAD_SUCCESS = 'redux-example/clients/LOAD_SUCCESS';
export const LOAD_FAIL = 'redux-example/clients/LOAD_FAIL';
export const SEARCH = 'redux-example/clients/SEARCH';
export const CHOOSE = 'redux-example/clients/CHOOSE';

export const initialState = {
  loading: false,
  loaded: false,
  clients: {},
  chosen: -1,
  searchQuery: '',
};

export default function reducer(state = initialState, action = {}) {
  switch (action.type) {
    case LOAD:
      return {
        ...state,
        loading: true
      };
    case LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        loaded: true,
        clients: action.payload,
        error: null
      };
    case LOAD_FAIL:
      return {
        ...state,
        loading: false,
        loaded: false,
        clients: null,
        error: action.error
      };
    case SEARCH:
      return {
        ...state,
        searchQuery: action.payload.query,
      };
    case CHOOSE:
      return {
        ...state,
        chosen: action.payload.index,
      };
    default:
      return state;
  }
}


export function load() {
  return {
    types: [LOAD, LOAD_SUCCESS, LOAD_FAIL],
    promise: (client) => client.get('/clients.json')
  };
}

export function choose(index) {
  return { type: CHOOSE, payload: {index} };
}

export function search(query) {
  return { type: SEARCH, payload: {query} };
}
