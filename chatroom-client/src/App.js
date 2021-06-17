import { Provider } from 'react-redux';
import {Route,BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import jwt_decode from 'jwt-decode';
import Landing from './components/Landing';
import { LogOutUser } from './store/actions/Action';
import { LOGIN_USER } from './store/actions/ActionType';
import store from './store/store';
import Oauth2Receiver from './components/Oauth2Receiver/Oauth2Receiver';
import Dashboard from './components/Dashboard/Dashboard';
import Header from './components/Header/Header';
import CreateRoom from './components/CreateRoom/CreateRoom';
import Chat from './components/ChatComponent/Chat';



if(localStorage.chatToken){
  const token=localStorage.chatToken

  //decode
  const decoded=jwt_decode(token)
  //call store to keep user authenticated and in session
  store.dispatch({
    type:LOGIN_USER,
    payload:decoded
  })
  
  
   // Check for expired token
   const currentTime= Date.now()/1000;
   if (decoded.exp < currentTime) {
  //remove token
    localStorage.removeItem("chatToken");
     // Logout user
    window.location.href="/"
    store.dispatch(LogOutUser())
   }
  }
function App() {
  return (
    <Provider store={store}>
      <div className="App">
      
      <Router>
      <Header/>
        <Route exact path="/" component={Landing}/>
        <Route exact path="/oauth2/redirect" component={Oauth2Receiver}/>
        <Route exact path="/dashboard" component={Dashboard}/>
        <Route exact path="/create_room" component={CreateRoom}/>
        <Route exact path="/chat/:pollid" component={Chat}/>
      </Router>
      </div>
     

    </Provider>
      
    
  
  );
}

export default App;
