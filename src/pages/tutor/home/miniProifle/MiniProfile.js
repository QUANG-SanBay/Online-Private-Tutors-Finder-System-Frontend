import HeaderMiniProfile from "./headerMiniProfile/HeaderMiniProfile";
import BodyMiniProfile from "./bodyMiniProfile/BodyMiniProfile";

function MiniProfile({className}) {
    return ( 
        <div className={className}>
            <HeaderMiniProfile></HeaderMiniProfile>
            <BodyMiniProfile></BodyMiniProfile>
        </div>
     );
}

export default MiniProfile;