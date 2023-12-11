import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { Label } from 'reactstrap';
import { convertDateDefault } from '../../../../utility/ConvertDate';
import FormControl from "@mui/material/FormControl";

import "./styles/ticket.scss";
import 'react-datepicker/dist/react-datepicker-cssmodules.css'
import { useNavigate } from 'react-router-dom';
const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));


const ChooseTicketPopup = (props) => {
    const [numberAdult, setNumberAdult] = useState(0);
    const [numberChildren, setNumberChildren] = useState(0);
    const [value, setValue] = React.useState(null);
    const navigate = useNavigate();


    Date.prototype.addDays = function (days) {
        var date = new Date(this.valueOf());
        date.setDate(date.getDate() + days);
        return date;
    }

    const handleSubmit = () => {
        if (value < new Date(props.openTime) || value > new Date(props.closeTime)) {
            alert("Date is not available")
            return;
        }
        if (numberAdult !== 0 || numberChildren !== 0) {
            const state = {
                numberAdult: numberAdult,
                numberChildren: numberChildren,
                adultPrice: props.adultPrice,
                childPrice: props.childPrice,
                departureDate: convertDateDefault(value),
                returnDate: convertDateDefault(new Date(value).addDays(props?.duration))
            }
            localStorage.setItem("state", JSON.stringify(state))
            navigate(`/payment/${props.tourId}`)

        }
        else alert("Please choose ticket")
    }

    return (
        <div id="ticket">
            <BootstrapDialog
                onClose={props.handleClose}
                aria-labelledby="customized-dialog-title"
                open={props.open}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Reserve your spot
                </DialogTitle>
                <IconButton
                    aria-label="close"
                    onClick={props.handleClose}
                    sx={{
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: (theme) => theme.palette.grey[500],
                    }}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <div className='mb-3'>
                        <FormControl>
                            <Label>
                                Choose available date
                            </Label>
                            <DatePicker
                                minDate={new Date(props.openTime).getTime() <= new Date().getTime() ? new Date() : new Date(props.openTime)}
                                maxDate={new Date(props.closeTime)}
                                dateFormat="dd-MM-yyyy"
                                selected={value}
                                placeholderText='dd-MM-yyyy'
                                onChange={(date) => setValue(date)}
                            />
                        </FormControl>
                    </div>
                    <Label>
                        Select ticket
                    </Label>
                    <div className='ticket-box mb-3'>
                        <Label>
                            Adults (12-99)
                            <p>{props.adultPrice} VND</p>
                        </Label>

                        <Button
                            variant="contained"
                            onClick={() => setNumberAdult(numberAdult - 1)}
                            className='mx-1'
                            disabled={numberAdult === 0 ? true : false}>-</Button>
                        {numberAdult}
                        <Button
                            variant="contained"
                            className='mx-1'
                            onClick={() => setNumberAdult(numberAdult + 1)}>+</Button>
                    </div>
                    <div className='ticket-box mb-3'>
                        <Label>
                            Children (4-11)
                            <p>{props.childPrice} VND</p>
                        </Label>
                        <Button
                            variant="contained"
                            onClick={() => setNumberChildren(numberChildren - 1)}
                            className='mx-1'
                            disabled={numberChildren === 0 ? true : false}>-</Button>
                        {numberChildren}
                        <Button
                            variant="contained"
                            className='mx-1'
                            onClick={() => setNumberChildren(numberChildren + 1)}>+</Button>
                    </div>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus type="submit" onClick={handleSubmit}>
                        Confirm
                    </Button>
                    <Button autoFocus onClick={props.handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </div >
    );
}

export default ChooseTicketPopup