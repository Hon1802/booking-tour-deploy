import {
  PAY_FOR_TICKET,
  GET_FLIGHT_BY_CITY,
  GET_HOTEL_BY_CITY,
  GET_HOTEL_BY_ID
} from "../action"

// ** Initial State
const initialState = {
  users: [],
  ticket: null,
  flights: [],
  hotels: [],
  hotelDetail: null
}

const payment = (state = initialState, action) => {
  switch (action.type) {
    case PAY_FOR_TICKET:
      return {
        ...state,
        ticket: action.ticket
      }
    case GET_FLIGHT_BY_CITY:
      return {
        ...state,
        flights: action.flights
      }
    case GET_HOTEL_BY_CITY:
      return {
        ...state,
        hotels: action.hotels
      }
    case GET_HOTEL_BY_ID:
      return {
        ...state,
        hotelDetail: action.hotelDetail
      }
    default:
      return { ...state }
  }
}
export default payment
