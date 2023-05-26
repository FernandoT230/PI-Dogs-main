const intialState = {
  dogs: [],
  temperaments: [],
  alldogs: [],
  detail: [],
};

export default function rootReducer(state = intialState, action) {
  switch (action.type) {
    case "GET_DOGS":
      return {
        ...state,
        dogs: action.payload,
        alldogs: action.payload,
      };

    case "GET_TEMPERAMENTS_LIST":
      return {
        ...state,
        temperaments: action.payload,
      };
    case "GET_DOGS_BY_TEMP":
      return {
        ...state,
        dogs: action.payload,
      };
    case "GET_DOGS_BY_NAME":
      return {
        ...state,
        dogs: action.payload,
      };
    case "FILTER_CREATED":
      const dogsCatch = state.alldogs;
      const allDogs =
        action.payload === "created"
          ? state.dogs.filter((dog) => dog.created_in_db)
          : state.dogs.filter((dog) => !dog.created_in_db);
      return {
        ...state,
        dogs: action.payload === "all" ? dogsCatch : allDogs,
      };
    case "ORDER_BY_WEIGHT":
      const sortedWeight =
        action.payload === "asc"
          ? [...state.dogs].sort(function (a, b) {
              if (a.weight_min === null) {
                return 0;
              }
              if (a.weight_min < b.weight_min) {
                return 1;
              }
              if (b.weight_min < a.weight_min) {
                return -1;
              }
              return 0;
            })
          : [...state.dogs].sort(function (a, b) {
              if (a.weight_min === null) {
                return 0;
              }
              if (a.weight_min < b.weight_min) {
                return -1;
              }
              if (b.weight_min < a.weight_min) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        allDogs: sortedWeight,
      };
    case "FILTER_BY_MAX_WEIGHT":
      const everyDog = state.allDogs;
      const weightMAXFiltered =
        action.payload === "all"
          ? everyDog
          : everyDog.filter((el) => el.weight_max <= action.payload);
      return {
        ...state,
        allDogs: weightMAXFiltered,
      };
    case "FILTER_BY_MIN_WEIGHT":
      const allDoguis = state.allDogs;
      const weightMINFiltered =
        action.payload === "all"
          ? allDoguis
          : allDoguis.filter((el) => el.weight_min >= action.payload);
      return {
        ...state,
        allDogs: weightMINFiltered,
      };
    case "POST_CHARACTER":
      return {
        ...state,
      };
    case "GET_DETAILS":
      return {
        ...state,
        detail: action.payload,
      };
    case "RESET_DETAIL":
      return {
        ...state,
        detail: [],
      };
    case "ORDER_BY_NAME":
      let sortedArr =
        action.payload === "asc"
          ? state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return 1;
              }
              if (b.name > a.name) {
                return -1;
              }
              return 0;
            })
          : state.dogs.sort(function (a, b) {
              if (a.name > b.name) {
                return -1;
              }
              if (b.name > a.name) {
                return 1;
              }
              return 0;
            });
      return {
        ...state,
        dogs: sortedArr,
      };
    default:
      return state;
  }
}
