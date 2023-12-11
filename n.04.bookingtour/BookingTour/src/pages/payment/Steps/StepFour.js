import Paypal from "./components/Paypal"
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Col, Row } from "reactstrap"
import { useEffect } from "react";
import { useState } from "react";
const StepFour = ({ handleSetActiveStep, adultArray, childrenArray, hotel, flight }) => {
    const state = JSON.parse(localStorage.getItem("state"))
    const [flightPrice, setFlightPrice] = useState(flight.priceInfo ? Number(flight?.priceInfo?.total) : 0)
    const [hotelPrice, setHotelPrice] = useState(hotel.offers ? Number(hotel?.offers[0].price?.total) : 0)
    useEffect(() => {
        setFlightPrice(flight.priceInfo ? Number(flight?.priceInfo?.total) : 0)
        setHotelPrice(hotel.offers ? Number(hotel?.offers[0]?.price?.total) : 0)
    }, [flightPrice, hotelPrice])
    const amount =
        Math.round(((
            state?.numberAdult * state?.adultPrice +
            state?.numberChildren * state?.childPrice +
            hotelPrice +
            flightPrice
        ) / 24205) * 100) / 100
    const data = [{
        id: 1, ticket: "Adult Ticket", number: state?.numberAdult, price: state?.numberAdult * state?.adultPrice
    },
    {
        id: 2, ticket: "Children Ticket", number: state?.numberChildren, price: state?.numberChildren * state?.childPrice
    },
    ]
    const dataFacility = [{
        id: 1, facility: "Hotel", price: hotelPrice
    },
    {
        id: 2, facility: "Flight", price: flightPrice
    }
    ]
    return (
        <div id="stepFour">
            <div className="wrapper my-4">
                <Row>
                    <Col lg={6} className="checkout text-center">
                        <h4>Ticket</h4>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 550 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Ticket</TableCell>
                                        <TableCell align="center">Number of tickets</TableCell>
                                        <TableCell align="center">Total price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {data.map((row) => {
                                        return (
                                            row.number !== 0 && <TableRow
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">{row.ticket}</TableCell>
                                                <TableCell align="center">{row.number}</TableCell>
                                                <TableCell align="center">{row.price}</TableCell>
                                            </TableRow>
                                        )
                                    }
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                        <h4 className="pt-3">Facilities</h4>
                        <TableContainer component={Paper}>
                            <Table sx={{ minWidth: 550 }} aria-label="simple table">
                                <TableHead>
                                    <TableRow>
                                        <TableCell align="center">Facilities</TableCell>
                                        <TableCell align="center">Price</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {dataFacility.map((row) => {
                                        return (
                                            row.price !== 0 && <TableRow
                                                key={row.id}
                                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                            >
                                                <TableCell align="center">{row.facility}</TableCell>
                                                <TableCell align="center">{row.price}</TableCell>
                                            </TableRow>
                                        )
                                    }
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </Col>
                    <Col lg={6}>
                        <div className="amount my-2 text-success">
                            Amount: {
                                state?.numberAdult * state?.adultPrice +
                                state?.numberChildren * state?.childPrice +
                                hotelPrice +
                                flightPrice
                            } VND ~ {amount} USD
                        </div>
                        <Paypal
                            amount={amount}
                            handleSetActiveStep={handleSetActiveStep}
                            adultArray={adultArray}
                            childrenArray={childrenArray}
                            hotel={hotel}
                            flight={flight}
                        />
                    </Col>
                </Row>
            </div>
        </div>
    );
}
export default StepFour