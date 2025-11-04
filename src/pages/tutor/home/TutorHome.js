import { faBell, faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import Grid from '@mui/material/Grid';
import BoxInfor from "./boxInfor/BoxInfor";
import MiniProfile from "./miniProifle/MiniProfile";
import styles from './TutorHome.module.scss';
import ListClasses from "./listClasses/ListClasses";
function TutorHome() {
    return ( 
        <div>
            <section>
                <Grid container spacing={2} columns={12}>
                    <Grid item xs={12} size={{xs:12, sm:12, md:8, lg:8}}>
                        <MiniProfile></MiniProfile>
                    </Grid>
                    <Grid item xs={12} size={{xs:12, sm:12, md:4, lg:4}}>
                        <div className={styles.boxInfor}>
                            <Grid container spacing={0} columns={12} >
                                <Grid item size={{xs:12, sm:6, md:12, lg:12}}>
                                    <BoxInfor type="primary" title="LỊCH DẠY CỦA BẠN" quanity="5" path="/tutor/schedule" icon={faCalendarDays} />
                                </Grid>
                                <Grid item size={{xs:12, sm:6, md:12, lg:12}}>
                                    <BoxInfor title="YÊU CẦU MỚI" quanity="6" path="/tutor/parent-requests" icon={faBell} />
                                </Grid>
                            </Grid>
                        </div>
                    </Grid>
                </Grid>
            </section>
            <section>
                <ListClasses />
            </section>
        </div>
     );
}

export default TutorHome;