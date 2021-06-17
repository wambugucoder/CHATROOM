import { Link, useHistory } from "react-router-dom"
import { PageHeader, Menu,Avatar,Space } from 'antd';
import { MailOutlined,HomeOutlined,EditOutlined, UserOutlined,CalendarOutlined, LogoutOutlined } from '@ant-design/icons';
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import moment from "moment";
import {LogOutUser} from '../../store/actions/Action';

const { SubMenu } = Menu;




function Header(){

const dispatch=useDispatch();
const history=useHistory()
const[current,setCurrent]=useState("home")

const IconText = ({ icon, text }) => (
  <Space>
    {React.createElement(icon)}
    {text}
  </Space>
);

const HandleClick = e => {
    console.log('click ', e);
    setCurrent(e.key);
 };
      const auth=useSelector(state=>state.auth)

const RenderAvatar=()=>{
    return(<Avatar shape ="circle"  src={auth.user.Avatar}/>)
   }

const RenderPageHeader=()=>{
    if(auth.isAuthenticated===true){
        const createdAt= moment(auth.user.CreatedAt).format("LLLL");
     return(
        <PageHeader style={{position: "sticky",top:0,zIndex:1001}}
        ghost={false}
        onBack={() => history.goBack()}
        title="ChatApp"
        subTitle=""
        extra={[
          <Menu onClick={HandleClick} selectedKeys={[current]} mode="horizontal" >
          <Menu.Item key="home" icon={<HomeOutlined />}>
          <Link to="/dashboard">
            Home
              </Link>
          </Menu.Item>
          <Menu.Item key="create-room"  icon={<EditOutlined/>}>
          <Link to="/create_room">
            Create Room
              </Link>
          </Menu.Item>
          <SubMenu key="SubMenu"  title={<RenderAvatar/>}>
          <Menu.ItemGroup style={{fontWeight:'bold'}} title="Profile">
          <Menu.Item key="setting:1"><IconText icon={UserOutlined} text={auth.user.UserName}/></Menu.Item>
          <Menu.Item key="setting:2"><IconText icon={CalendarOutlined} text={createdAt}/></Menu.Item>
          </Menu.ItemGroup>
          <Menu.ItemGroup style={{fontWeight:'bold'}} title="Logout">
          <Menu.Item key="setting:3" onClick={()=>{dispatch(LogOutUser())}}><IconText icon={LogoutOutlined} text={"Exit"}/></Menu.Item>
           </Menu.ItemGroup>
          </SubMenu>
          </Menu>,
        ]}
      ></PageHeader>  
        )   
    }
    
    else{
        return(
        <div></div>
        );
    }
}
    return(
       <RenderPageHeader/>
     );
        
}
export default Header;