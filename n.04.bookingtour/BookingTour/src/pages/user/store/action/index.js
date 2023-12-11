// import axios from 'axios'
import { configHeader } from "../../../../@core/plugin/configHeader"
import axios from "axios"
export const GET_USER_INFO_BY_ID = "GET_USER_INFO_BY_ID"

export const getUserInfoById = (id, handleError) => {
  return async (dispatch) => {
    await axios.post(`/api/personal`, { id: id }, configHeader).then((response) => {
      dispatch({
        type: GET_USER_INFO_BY_ID,
        userInfo: response?.data?.userData,
      })
      localStorage.setItem("userDataUser", JSON.stringify(response?.data?.userData))
    })
      .catch(e => {
        if (e.response.status === 403) {
          handleError()
        }
        else if (e.response.status === 400 && e.response.data?.message === "token is expired") {
          handleError()
        }
      })

  }
}
