import { img6 } from '../../../assets/home'
import { Col, Row } from "reactstrap"
const Description = ({ description, name, imgList }) => {

    return (
        <>
            <div className="tourDetail-tourname" >{name}</div>
            <div className="tourDetail-description">{description}</div>
            <div className="tourDetail-title">Tour Gallery</div>
            <Row className="tourDetail-gallery-wrapper">
                <Col lg={3} className="tourDetail-gallery-item" >
                    <img src={imgList ? `data:image/jpeg;base64, ${imgList[0]}` : img6} />
                </Col>
                <Col lg={3} className="tourDetail-gallery-item" >
                    <img src={imgList ? `data:image/jpeg;base64, ${imgList[1]}` : img6} />
                </Col>
                <Col lg={3} className="tourDetail-gallery-item" >
                    <img src={imgList ? `data:image/jpeg;base64, ${imgList[2]}` : img6} />
                </Col>
            </Row>
        </>
    );
}
export default Description