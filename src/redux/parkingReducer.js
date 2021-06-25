import { ARRIVED_CAR, LEFT_CAR, NUMBER_PLACES, CREATE_PARKING, ARRIVED_BUS } from "./types";
const initialState = {
  number: '',
  places: [],
};
export const parkingReducer = (state = initialState, action) => {
  switch (action.type) {
    case ARRIVED_CAR:
      const newState = state.places.map((el) => {
        if (Number(action.car.place) === Number(el.place)) {
          return {
            ...el,
            state: "Занято",
            car: { number: action.car.number, color: action.car.color },
          };
        } else {
          return el;
        }
      });
      return { ...state, places: newState };
    case LEFT_CAR:
      const newState2 = state.places.map((el) => {
        if (action.car.number.toLowerCase() === el.car.number.toLowerCase()) {
          return {
            ...el,
            state: "Свободно",
            car: { number: "", color: "" },
          };
        } else {
          return el;
        }
      });
      return { ...state, places: newState2 };
    case NUMBER_PLACES:
      return { ...state, number: action.number };
    case CREATE_PARKING:
      return { ...state, places: action.places };
    case ARRIVED_BUS:
      return { ...state, places: action.arr };
    default:
      return state;
  }
};
