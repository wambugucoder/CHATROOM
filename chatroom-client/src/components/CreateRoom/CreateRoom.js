import SockJsClient from 'react-stomp';
import { Form, Input, Button ,InputNumber,message,Row,Col} from 'antd';
import { MessageOutlined } from '@ant-design/icons';
import "./CreateRoom.css"
import {useSelector, useDispatch} from 'react-redux';
import { CleanUp, IncomingCreateRoomMessage } from '../../store/actions/Action';
import { useEffect} from 'react';

function CreateRoom(props){
    let clientRef = null;
    const auth=useSelector(state=>state.auth)
    const room=useSelector(state=>state.room)
    const dispatch=useDispatch()

  
    
useEffect(() => {
    if(room.createRoomMessage.messageType==="CREATE_ROOM"){
  
       message.info(room.createRoomMessage.content);
    }
    return () => {
      dispatch(CleanUp())
    };
   
}, [dispatch, room.createRoomMessage.content, room.createRoomMessage.messageType])  




const handleMessageReceived=(msg )=>{
   dispatch(IncomingCreateRoomMessage(msg))
}
const LoadingIndicator = () => {
  const hide = message.loading('Action in progress..', 0);
  // Dismiss manually and asynchronously
  setTimeout(hide, 500);
};

const CreateRoomForm=()=>{
    const onFinish = (values) => {
      console.log(values.limit)
      // SEND MESSAGE
       clientRef.sendMessage(`/user/${auth.user.Id}/createRoom`,
         JSON.stringify({roomName:values.roomName, description:values.description, total_users:parseInt(values.limit)}));
        //DISPLAY LOADING INDICATOR 
         LoadingIndicator()
          
    };
        return (
            <Form
              name="normal_login"
              className="login-form"
              initialValues={{ remember: true }}
              onFinish={onFinish}
            >
              <Form.Item
                name="roomName"
                rules={[{ required: true, message: 'Please input your Room Name!' }]}
              >
                <Input prefix={<MessageOutlined className="site-form-item-icon" />} placeholder="Room Name" />
              </Form.Item>
              <Form.Item
                name="description"
                rules={[{ required: true, message: 'Please input your Room Description!' }]}
              >
                 <Input prefix={<MessageOutlined className="site-form-item-icon" />} placeholder="Description" />
              </Form.Item>

              <Form.Item
                name="limit"
                rules={[{ 
                  required: true, message: 'Please input your Room Limit!' }
                  ,
                  () => ({
                    validator(_, value) {
                      if (!value) {
                        return Promise.reject();
                      }
                      if (isNaN(value)) {
                        return Promise.reject("Limit has to be a number.");
                      }
                      if (parseInt(value) < 1) {
                        return Promise.reject("Limit can't be less than 1");
                      }
                      if (parseInt(value) > 20) {
                        return Promise.reject("Limit can't be more than 20 ");
                      }
                      return Promise.resolve();
                    },
                  }),]}
              >
                  <InputNumber  style={{ width: "100%" }} min={1} max={20} keyboard={false}  placeholder="Input Limit"/>
              </Form.Item>
              
              <Form.Item>
                <Button type="primary" htmlType="submit" className="login-form-button">
                  Create Room
                </Button>
               
              </Form.Item>
            </Form>
    );
}
  return(
        
        <div>
           <SockJsClient url='http://localhost:3000/ws' topics={[`/topic/private/${auth.user.Id}`]}
           onMessage={(msg) =>handleMessageReceived(msg)}
           ref={(client) => {
           clientRef = client
         }}/>
         <div className="header">
           <p className="create-room-header">Create A ChatRoom</p>
         </div>
        <div className="create-room">
        <Row justify="center" align="center">
              <Col xs={{ span: 12, offset: 1 }} sm={{ span: 10, offset: 1 }} md={{ span: 8, offset: 1 }} lg={{ span: 6, offset: 1 }}>
             <CreateRoomForm/>
             </Col>
             </Row>
        </div>
        </div>
    );
}
export default CreateRoom;