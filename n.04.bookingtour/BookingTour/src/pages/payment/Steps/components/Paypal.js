import { PayPalScriptProvider, PayPalButtons, usePayPalScriptReducer } from "@paypal/react-paypal-js";
import { useEffect } from "react";
import { payForTicket } from "../../store/action"
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
const style = { "layout": "vertical" }
const ButtonWrapper = ({ currency, showSpinner, amount, handleSetActiveStep, adultArray, childrenArray, hotel, flight }) => {
    const [{ isPending, options }, dispatch] = usePayPalScriptReducer()
    const tourDetail = useSelector(state => state.tour?.tourDetail)
    const userId = JSON.parse(localStorage.getItem("userDataUser"))._id
    const dispatchPart = useDispatch()
    const navigate = useNavigate()
    const state = JSON.parse(localStorage.getItem("state"))
    useEffect(() => {
        dispatch({
            type: "resetOptions",
            value: {
                ...options,
                currency: currency
            }
        })
    }, [currency, showSpinner])

    return (
        <>
            {showSpinner && isPending && <div className="spinner" />}
            <PayPalButtons
                style={style}
                disabled={false}
                forceReRender={[style, currency, amount]}
                fundingSource={undefined}
                createOrder={(data, actions) => actions.order.create({
                    purchase_units: [
                        {
                            amount: {
                                currency_code: currency,
                                value: amount
                            }
                        }
                    ]
                }).then(orderId => orderId)}
                onApprove={(data, actions) => {
                    actions.order.capture().then(async (response) => {
                        if (response.status === "COMPLETED") {
                            adultArray = JSON.stringify(adultArray)
                            childrenArray = JSON.stringify(childrenArray)
                            let newFlight = null
                            if (flight?.priceInfo) {
                                newFlight = JSON.stringify({
                                    depart: tourDetail?.pickUp,
                                    dest: tourDetail?.districtDes,
                                    carriers: flight?.nameRound1,
                                    total: flight?.priceInfo?.total,
                                    currency: flight?.priceInfo?.currency
                                })
                            }

                            let newHotel = null
                            if (hotel?.offers) {
                                newHotel = JSON.stringify({
                                    name: hotel?.hotel?.name,
                                    startDate: state?.departureDate,
                                    enday: state?.returnDate,
                                    category: hotel?.offers[0]?.room?.typeEstimated?.category,
                                    adults: adultArray.length,
                                    total: hotel?.offers[0]?.price?.total,
                                    currency: hotel?.offers[0]?.price?.currency
                                })
                            }

                            dispatchPart(payForTicket(
                                {
                                    tourId: tourDetail?._id,
                                    userId: userId,
                                    paymentId: response?.id,
                                    totalPrice: amount,
                                    arrayAdult: adultArray,
                                    arrayChild: childrenArray,
                                    flight: newFlight,
                                    hotel: newHotel
                                },
                                () => navigate("/unauthorized"),
                                () => handleSetActiveStep(4)
                            ))

                        }
                    })
                }}
            />
        </>
    )
}
const Paypal = ({ amount, handleSetActiveStep, adultArray, childrenArray, hotel, flight }) => {
    return (
        <PayPalScriptProvider options={"test"}>
            <ButtonWrapper
                showSpinner={false}
                currency={"USD"}
                amount={amount}
                handleSetActiveStep={handleSetActiveStep}
                adultArray={adultArray}
                childrenArray={childrenArray}
                hotel={hotel}
                flight={flight}
            />
        </PayPalScriptProvider>
    );
}

export default Paypal