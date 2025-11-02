import { faBell, faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import BoxInfor from "./boxInfor/BoxInfor";
import MiniProfile from "./miniProifle/MiniProfile";
import Grid from '@mui/material/Grid';
function TutorHome() {
    return ( 
        <div>
            <section>
                <Grid container spacing={2} columns={12}>
                    <Grid item xs={12} size={{xs:12, sm:6, md:8, lg:8}}>
                        <MiniProfile></MiniProfile>
                    </Grid>
                    <Grid item xs={12} size={{xs:12, sm:6, md:4, lg:4}}>
                        <Grid container spacing={0} columns={12}>
                            <Grid item size={{xs:12, sm:12, md:12, lg:12}}>
                                <BoxInfor type="primary" title="LỊCH DẠY CỦA BẠN" quanity="5" path="/tutor/schedule" icon={faCalendarDays} />
                            </Grid>
                            <Grid item size={{xs:12, sm:12, md:12, lg:12}}>
                                <BoxInfor title="YÊU CẦU MỚI" quanity="6" path="/tutor/parent-requests" icon={faBell} />
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
            </section>
        </div>
     );
}

export default TutorHome;