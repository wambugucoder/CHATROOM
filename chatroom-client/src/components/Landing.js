import {Row,Card,Col,Button} from 'antd';
import {GithubOutlined,GoogleOutlined } from '@ant-design/icons';
import "./Landing.css";
import { GITHUB_AUTH_URL } from '../constants/constants';
import {useSelector} from 'react-redux';
import {useHistory} from 'react-router-dom';
import { useEffect } from 'react';


function Landing(){
const auth= useSelector(state=>state.auth)
const history=useHistory();
    
useEffect(() => {
  if(auth.isAuthenticated){
    history.push("/dashboard");
   }
 
}, [auth.isAuthenticated, history])

const OnGithubClick=()=>{
    window.location.href=GITHUB_AUTH_URL
      }

    return(
    <div className="landing-container">
        <ul class="background">
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
   <li></li>
</ul>
<Row justify='center' align='center'>
        <div className="site-statistic-demo-card">
        <Col span={12}>
        <Card className="intro-card"
        style={{ width: 350 }}
        cover={<img alt="example" src="https://cdn.dribbble.com/users/420317/screenshots/6195864/friend.jpg?compress=1&resize=400x300" />}
  >
    <p className="card-header">Welcome To The ChatApp</p>
    <p>By Logging In you agree to our Terms and Conditions.</p>
      <p>  
          <Button className="oauth-button" icon={<GithubOutlined />} size="large"  onClick={OnGithubClick}>
         SignIn with Github 
        </Button>
        </p>
      <p>
      <Button className="oauth-button"  icon={<GoogleOutlined />} size="large">
         SignIn with Google
        </Button>
      </p>
  </Card>
        </Col>
        </div>
</Row>

    </div>

        
    );
}

export default Landing;