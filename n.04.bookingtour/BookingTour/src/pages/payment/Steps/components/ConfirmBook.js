import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Typography,
} from "@mui/material";
import React from "react";

const ConfirmBook = ({ open, title, content, handleClose, handleOk }) => {
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title" className="text-center">
                <Typography variant="h6" fontWeight={"bold"}>
                    {title || "CONFIRM BOOKING"}
                </Typography>
            </DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    <Typography variant="subtitle1">
                        {content ||
                            "Are you sure to book? This action is irreversible."}
                    </Typography>
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button
                    onClick={handleClose}
                    variant="outlined"
                    color="error"
                    size="small"
                >
                    Disagree
                </Button>
                <Button autoFocus onClick={handleOk} size="small" variant="contained">
                    Agree
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmBook;
