import { List, Avatar, Space,Row,Col,Tooltip,Button } from 'antd';
import { UserOutlined,AntDesignOutlined,MessageTwoTone } from '@ant-design/icons';
import "./Dashboard.css";
import React from 'react';
import { Card } from 'antd';
import SockJsClient from 'react-stomp';
import { useDispatch } from 'react-redux';
import { RetrieveAllRooms } from '../../store/actions/Action';



function Dashboard(){
    let clientRef = null;
    

    const dispatch=useDispatch()

    const handleMessageReceived=(msg )=>{
        dispatch(RetrieveAllRooms(msg))
     }
    
    const listData = [];
    for (let i = 0; i < 23; i++) {
      listData.push({
        href: 'https://ant.design',
        title: `ant design part ${i}`,
        avatar: 'https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png',
        description:
          'Ant Design, a design language for background applications, is refined by Ant UED Team.',
        content:
          'We supply a series of design principles, practical patterns and high quality design resources (Sketch and Axure), to help people create their product prototypes beautifully and efficiently.',
      });
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
        pagination={{
          onChange: page => {
            console.log(page);
          },
          pageSize: 3,
        }}
        dataSource={listData}
        renderItem={item => (
          <List.Item
            key={item.title}
           
            
          >
             <Card className="specific-room"
             >
                 <div className="room-name">
                     <IconText icon={MessageTwoTone}text={"school stuff"}/>
                 </div>
                 
                 <p>This is the group Description</p>
                 <Button className="join-button" type="primary" shape="round" size="default" >Join Room</Button> 
                 {/*
                 <div className="join-room">
                 <Button className="join-button" type="primary" shape="round" size="default" >Join Room</Button> 
                 </div>
                 */
                 }
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
            <SockJsClient url='http://localhost:3000/ws' topics={[`/topic/public/rooms`]}
           onMessage={(msg) =>handleMessageReceived(msg)}
           ref={(client) => {
           clientRef = client
         }}/>
             <Row justify="center" align="center">
             <Col xs={{ span: 25, offset:1 }} sm={{ span: 25, offset: 1 }} md={{ span: 35, offset: 1 }} lg={{ span: 16, offset: 2 }}>
            <RenderRooms/>
            </Col>
            </Row>
            </div>
    )
}
export default Dashboard;