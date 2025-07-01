import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Body from "./Body";
import LoginLogout from "./LoginLogout";
import Feed from "./Feed";
import { Provider } from "react-redux";
import appstore from "../Utils/Appstore";
import EditProfile from "./EditProfile";
import Connections from "./Connections";
import { Invitations } from "./Invitations";
import Chat from "./Chat";
const App = () => {
  return (
    <Provider store={appstore}>
      <Router>
        <Routes>
          <Route path="/" element={<Body />}>
          
            <Route path="/login" element={<LoginLogout />} />
            <Route path="/user/feed" element={<Feed />} />
            <Route path="/update/profile" element={<EditProfile />} />
            <Route path="/user/Connections" element={<Connections />} />
            <Route path="/invitations" element={<Invitations />} />
            <Route path="/chat/:target_id" element={<Chat />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  );
};

export default App;
