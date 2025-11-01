import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function HeaderMiniProfile() {
    return ( 
        <div>
            <h2>Thông tin gia sư</h2>
            <p>
                <FontAwesomeIcon icon={faStar}/>
                <span>4.9</span>
            </p>
        </div>
     );
}

export default HeaderMiniProfile;