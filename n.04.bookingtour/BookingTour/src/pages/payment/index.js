import React, { useEffect, useState } from "react"
import StepOne from "./Steps/StepOne"
import StepTwo from "./Steps/StepTwo"
import StepThree from "./Steps/StepThree"
import StepFour from "./Steps/StepFour"
import StepFive from "./Steps/StepFive"
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepButton from '@mui/material/StepButton';
import "./styles/Payment.scss"
import Banner from "../../components/Banner";
import { banner } from "../../assets"
const steps = [
  {
    key: 1,
    title: "Contact Details",
    content: <StepOne />
  },
  {
    key: 2,
    title: "Choose hotel",
    content: <StepTwo />
  },
  {
    key: 3,
    title: "Choose flight",
    content: <StepThree />
  },
  {
    key: 4,
    title: "Choose method",
    content: <StepFour />
  },
  {
    key: 5,
    title: "Complete",
    content: <StepFive />
  }
]
const Payment = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [adultArray, setAdultArray] = useState([])
  const [childrenArray, setChildrenArray] = useState([])
  const [hotel, setHotel] = useState({})
  const [flight, setFlight] = useState({})
  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  return (
    <div id="payment" className="sect">
      <Banner banner={banner} title={"Payment"} subtitle={"Payment"} />
      <Box className="my-4" sx={{ width: '100%' }}>
        <Stepper activeStep={activeStep} alternativeLabel>
          {steps.map((item, index) => (
            <Step key={index}>
              <StepButton color="inherit" onClick={handleStep(index)}>
                <StepLabel>{item.title}</StepLabel>
              </StepButton>
            </Step>
          ))}
        </Stepper>
        {activeStep === 0 &&
          <StepOne
            handleSetActiveStep={setActiveStep}
            adultArray={adultArray}
            setAdultArray={setAdultArray}
            childrenArray={childrenArray}
            setChildrenArray={setChildrenArray}
          />}
        {activeStep === 1 &&
          <StepTwo
            handleSetActiveStep={setActiveStep}
            setHotel={setHotel}
          />}
        {activeStep === 2 &&
          <StepThree
            handleSetActiveStep={setActiveStep}
            setFlight={setFlight}
          />}
        {activeStep === 3 &&
          <StepFour
            handleSetActiveStep={setActiveStep}
            adultArray={adultArray}
            childrenArray={childrenArray}
            hotel={hotel}
            flight={flight}
          />}
        {activeStep === 4 && <StepFive />}
      </Box>
    </div >
  );
}
export default Payment