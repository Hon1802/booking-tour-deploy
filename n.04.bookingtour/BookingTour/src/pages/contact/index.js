
import { banner } from '../../assets'
import Banner from '../../components/Banner'
import { Button } from '@mui/material'
const Home = () => {
    return (
        <div id="contact">
            <Banner title="Contact Us" subtitle="Contact" banner={banner} />
            <div className='container my-1'>
                <div className='info-wrapper'>
                    <div className='info'>
                        <div className='info-item'>
                            <h3>Contact</h3>
                            <p>0906941877</p>

                        </div>
                        <div className='info-item'>
                            <h3>Email</h3>
                            <p>20110415@student.hcmute.edu.vn</p>
                        </div>
                        <div className='info-item'>
                            <h3>Destination</h3>
                            <p>HCM city, Viet Nam</p>
                        </div>
                    </div>
                </div>
                <div className='contact-form'>
                    <div className='form-name'>Get In Touch</div>
                    <input type="text" name="name" className="box" id="name" placeholder="name" required="" value=""></input>
                    <input type="email" name="email" className="box" id="email" placeholder="email" required="" value=""></input>
                    <input type="text" name="subject" className="box" id="subject" placeholder="subject" value=""></input>
                    <textarea cols="30" rows="4" name="comment" id="comment" className="box" placeholder="message"></textarea>
                    <Button variant="contained" type="submit">Submit</Button>
                </div>
            </div>
        </div>
    )
}
export default Home;