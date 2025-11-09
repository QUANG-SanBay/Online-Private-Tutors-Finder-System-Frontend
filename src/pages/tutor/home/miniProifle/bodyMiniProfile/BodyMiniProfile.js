import avt from "~/assets/imgs/img.jpg";
import styles from "./BodyMiniProfile.module.scss";
import clsx from "clsx";
import { Grid } from "@mui/material";

function BodyMiniProfile() {
    //fake data
    const userData = {
        fullName: "Nguyễn Văn A",
        email: "nguyenvana@gmail.com",
        gender: "Nam",
        phone: "0123456789",
        address: "Đồng tháp",
        subjects: "Toán",
        educationLevel: "Đại học",
        certificates: "không",
        introduction: "Xin chào tôi là Nguyễn Văn A, tôi là gia sư dạy toán với hơn 5 năm kinh nghiệm giảng dạy. Tôi cam kết mang đến cho học sinh những phương pháp học tập hiệu quả và thú vị.",
        avatarUrl: avt, // URL ảnh đại diện
    };
    return ( 
        <Grid container className={styles.bodyMiniProfile}>
            <Grid item size={{ xs: 12, sm: 3, md: 3, lg: 2.5 }} className={styles.avatarContainer}>
                <div className={styles.avatarBox}>
                    <img src={userData.avatarUrl} alt="ảnh của bạn"/>
                </div>
            </Grid>
            <Grid item size={{ xs: 12, sm: 9, md: 9, lg: 9.5 }} className={styles.infoContainer}>
                <ul className={styles.infoList}>
                    <li>
                        <strong>Họ và tên:
                        </strong>
                        <span>{userData.fullName}</span>
                    </li>
                    <li>
                        <strong>email:
                        </strong>
                        <span>{userData.email}</span>
                    </li>
                    <li>
                        <strong>Giới tính:
                        </strong>
                        <span>{userData.gender}</span>
                    </li>
                    <li>
                        <strong>Số điện thoại:
                        </strong>
                        <span>{userData.phone}</span>
                    </li>
                    <li>
                        <strong>Địa chỉ:
                        </strong>
                        <span>{userData.address}</span>
                    </li>
                    <li>
                        <strong>Môn dạy:
                        </strong>
                        <span>{userData.subjects}</span>
                    </li>
                    <li>
                        <strong>Trình độ: 
                        </strong>
                        <span>{userData.educationLevel}</span>
                    </li>
                    <li>
                        <strong>Chứng chỉ:
                        </strong>
                        <span>{userData.certificates}</span>
                    </li>
                    <li className={styles.introduction}>
                        <strong>Giới thiệu:
                        </strong>
                        <span>
                            {userData.introduction}
                        </span>
                    </li>
                </ul>
            </Grid>
        </Grid>
     );
}

export default BodyMiniProfile;