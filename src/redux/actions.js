import { ARRIVED_CAR, LEFT_CAR, NUMBER_PLACES, CREATE_PARKING, ARRIVED_BUS } from "./types";

export function arrivedCar(car) {
  return {
    type: ARRIVED_CAR,
    car,
  };
}
export function leftCar(car) {
  return {
    type: LEFT_CAR,
    car,
  };
}
export function numberPlaces(number) {
  return {
    type: NUMBER_PLACES,
    number,
  };
}
export function createParking(places) {
  return {
    type: CREATE_PARKING,
    places,
  };
}
export function arrivedBus(arr) {
  return {
    type: ARRIVED_BUS,
    arr,
  };
}
