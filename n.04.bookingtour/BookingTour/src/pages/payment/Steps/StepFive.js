import { CheckCircle } from "react-feather"
const StepFive = () => {
    return (
        <div id="stepFive" className="wrapper">
            <div className="success-container">
                <div className="success-icon">
                    <CheckCircle className="icon" size={100} />
                </div>
                <div className="success-content">
                    Successfully Booked
                </div>
            </div>
        </div>
    )
}
export default StepFive