import Banner from "./banner/Banner";
import Bennefits from "./benefits/Bennefits";
import Progress from "./progress/Progress";
import TopTutor from "./topTutor/TopTutor";
import EBookDB from "./books/E-BooksDB";
function Dashboard() {
    return ( 
        <div>
            <Banner />
            <Progress />
            <TopTutor />
            <Bennefits />
            <EBookDB />
        </div>
     );
}

export default Dashboard;