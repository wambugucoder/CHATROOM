import { List, Avatar, Space,Row,Col,Tooltip,Button } from 'antd';
import { UserOutlined,AntDesignOutlined,MessageTwoTone } from '@ant-design/icons';
import "./Dashboard.css";
import React from 'react';
import { Card } from 'antd';
import SockJsClient from 'react-stomp';
import { useDispatch , useSelector} from 'react-redux';
import { RetrieveAllRooms } from '../../store/actions/Action';
import {useHistory} from 'react-router-dom';



function Dashboard(){
  
    
    const room=useSelector(state=>state.room)
    const dispatch=useDispatch()
    const history=useHistory();

    const handleMessageReceived=(msg )=>{
        dispatch(RetrieveAllRooms(msg))
     }
    
   
 const IconText = ({ icon, text }) => (
      <Space>
        {React.createElement(icon)}
        {text}
      </Space>
    );
const RenderRooms=()=>{
    return(
        <List
        itemLayout="vertical"
        size="large"
        dataSource={room.rooms}
        renderItem={item => (
          <List.Item
            key={item.id}
           
            
          >
             <Card className="specific-room"
             >
                 <div className="room-name">
                     <IconText icon={MessageTwoTone}text={item.name}/>
                 </div>
                 
                 <p style={{fontSize:23,fontWeight:400}}>{item.description}</p>
                 <Button className="join-button"  size="default" onClick={()=>{history.push(`/chat/${item.id}`)}} >Join Room</Button> 
                
                 <div className="room-footer">
                 <Avatar.Group>
      <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
      <Avatar style={{ backgroundColor: '#f56a00' }}>K</Avatar>
      <Tooltip title="Ant User" placement="top">
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
      </Tooltip>
      <Avatar style={{ backgroundColor: '#1890ff' }} icon={<AntDesignOutlined />} />
    </Avatar.Group>
                 </div>
  </Card>
          </List.Item>
        )}
      />
    );
}
    return(
        <div className="chat-rooms">
            <SockJsClient url='http://localhost:3000/ws' topics={["/topic/public/rooms"]}
           onMessage={(msg) =>handleMessageReceived(msg)}
          />
             <Row justify="center" align="center">
             <Col xs={{ span: 25, offset:1 }} sm={{ span: 25, offset: 1 }} md={{ span: 35, offset: 1 }} lg={{ span: 16, offset: 2 }}>
            <RenderRooms/>
            </Col>
            </Row>
            </div>
    )
}
export default Dashboard;