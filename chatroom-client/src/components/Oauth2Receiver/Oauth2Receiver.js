import { useDispatch } from "react-redux";
import { Redirect} from "react-router";
import { OauthSuccess } from "../../store/actions/Action";

function Oauth2Receiver(props){
    const dispatch=useDispatch();
    const query=new URLSearchParams(props.location.search);
    const token=query.get("token");
    const error=query.get("error");

   

    if(token){
        dispatch(OauthSuccess(token));
        return <Redirect to="/dashboard"/>
    }
    if(error){
       
        return  <Redirect to={{
            pathname: "/",
            state: { 
                from: props.location,
                error: error 
            }
        }}/>;  
    }
}
export default  Oauth2Receiver;