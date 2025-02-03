import "./App.css";
// import RoomList from "./components/room/roomListComponent";
import { BrowserRouter } from "react-router-dom";
import Router from "./routes/indexRouter";

const App = () => {
  return (
    <BrowserRouter>
      <Router />
    </BrowserRouter>
  );
};

export default App;
