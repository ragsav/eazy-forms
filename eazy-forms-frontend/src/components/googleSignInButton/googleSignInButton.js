import "./style.scss";
import gicon from "../../assets/google-icon.png";
const GoogleSignInButton = ({onClick}) =>{
    return <button className="g-btn" onClick={onClick}>
        <img src={gicon}></img>
        {/* <p>Signin</p> */}
        <span className="w-100 text-center">Sign in with Google</span>
    </button>
}
export default GoogleSignInButton;