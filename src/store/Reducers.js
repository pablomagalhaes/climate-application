const initialState = {
  isLoading: false,
  hasObservation: false,
  observation: {},
  reports: []
};

const temperatures = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_DATA':
      return {
        ...state,
        isLoading: true
      };
    case 'STORE_FETCHED_OBSERVATION':
      return { 
        ...state,
        isLoading: false,
        hasObservation: true,
        observation: action.newObservation
      };
    case 'OBSERVATION_FETCHING_ERROR':
      return initialState;
    case 'STORE_OBSERVATIONS':
      return {
        ...state,
        isLoading: false,
        reports: [...action.newObservations]
      };
    default:
      return state;
  }
};

export default temperatures;
