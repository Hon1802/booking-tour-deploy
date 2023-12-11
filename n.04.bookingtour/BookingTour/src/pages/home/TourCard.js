import React from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/material/styles';
import { img4 } from "../../assets/home";
import Tooltip from '@mui/material/Tooltip';
const CardInfo = styled(CardContent)(({ theme }) => ({
    '&:last-child': {
        paddingBottom: theme.spacing(2),
    }
}));

const TourCard = ({ tour }) => {
    return (
        <Card sx={{ maxWidth: "98%", position: "relative", cursor: "pointer" }}>
            <Box sx={{ position: 'relative' }}>
                <CardMedia
                    component="img"
                    height="300"
                    image={`data:image/jpeg;base64, ${tour?.urlImageN1}`}
                    alt={tour?.name} />
            </Box>

            <CardInfo>
                <Tooltip title={tour?.name}>
                    <Typography variant="h6" className='text-truncate' gutterBottom component="div">
                        {tour?.name}
                    </Typography>
                </Tooltip>
                <Typography mb={0} variant="subtitle1" gutterBottom component="div">
                    Tickets Sold: {tour?.bookingsCount}
                </Typography>
            </CardInfo>
        </Card>
    )
}


export default TourCard;