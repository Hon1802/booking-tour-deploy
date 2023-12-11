// import axios from 'axios'
import { configHeader } from "../../../../@core/plugin/configHeader"
import axios from "axios"
import FailNotificationToast from '../../../../components/toast/ToastFail';
import toast from 'react-hot-toast';
export const PAY_FOR_TICKET = "PAY_FOR_TICKET"
export const GET_FLIGHT_BY_CITY = "GET_FLIGHT_BY_CITY"
export const GET_HOTEL_BY_CITY = "GET_HOTEL_BY_CITY"
export const GET_HOTEL_BY_ID = "GET_HOTEL_BY_ID"
export const payForTicket = (params, handleError, handleSuccess) => {
  return async (dispatch) => {
    await axios.post(`/api/create-booking`, params, configHeader).then((response) => {
      dispatch({
        type: PAY_FOR_TICKET,
        ticket: response?.data?.userData?.data
      })
      handleSuccess()
    })
      .catch(e => {
        if (e.response.status === 403) {
          handleError()
        }
        else if (e.response.status === 400 && e.response.data?.message === "token is expired") {
          handleError()
        } else {
          toast.error(<FailNotificationToast message={e?.response?.data?.userData?.errMessage} />)
        }
      })

  }
}

export const getFlightByCity = (params) => {
  return async (dispatch) => {
    await axios.post(`/api/get-flight-list`, params).then((response) => {
      dispatch({
        type: GET_FLIGHT_BY_CITY,
        flights: response?.data?.data
      })
      return response
    })
  }
}

export const getHotelByCity = (params) => {
  return async (dispatch) => {
    await axios.post(`/api/get-hotel-by-city`, params).then((response) => {
      dispatch({
        type: GET_HOTEL_BY_CITY,
        hotels: response?.data?.data
      })
      return response
    })
  }
}

export const getHotelById = (params) => {
  return async (dispatch) => {
    await axios.post(`/api/get-hotel-offers-search`, params).then((response) => {
      dispatch({
        type: GET_HOTEL_BY_ID,
        hotelDetail: response?.data?.data
      })
      return response
    }).catch(e => {
      if (e.response.status === 400 && e.response.data?.message === "There are no partner hotels at this location") {
        return null
      }
    })

  }
}