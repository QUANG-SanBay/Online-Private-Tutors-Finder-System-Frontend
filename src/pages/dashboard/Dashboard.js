import Banner from "./banner/Banner";
import Bennefits from "./benefits/Bennefits";
import Progress from "./progress/Progress";
import TopTutor from "./topTutor/TopTutor";

function Dashboard() {
    return ( 
        <div>
            <Banner />
            <Progress />
            <TopTutor />
            <Bennefits />
        </div>
     );
}

export default Dashboard;