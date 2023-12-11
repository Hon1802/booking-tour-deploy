
import Hot from "./Hot";
import Banner from "./Banner";
import Latest from "./Latest";
import TourList from "./TourList";
import Counting from "./Counting";
const Home = () => {
    return (
        <div id="home">
            <div className="main-wrapper">
                <Banner />
                <Hot />
                <Counting />
                <Latest />
                <TourList />
            </div>
        </div>
    )
}
export default Home;