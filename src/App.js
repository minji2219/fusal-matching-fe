import "./App.css";
import MenuBar from "./components/MenuBar";
import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import ListPage from "./pages/ListPage";
import DetailPage from "./pages/DetailPage";
import ReservePage from "./pages/ReservePage";
import MyPage from "./pages/MyPage";
import LoginPage from "./pages/LoginPage";
import MembershipPage from "./pages/MembershipPage";
import PwFindPage from "./pages/PwfindPage";

const Layout = () => {
  return (
    <>
      <MenuBar />
      <Outlet />
    </>
  );
};
function App() {
  const accessToken = localStorage.getItem("access_token");
  return (
    <div className="App">
      <link
        rel="stylesheet"
        href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@48,400,0,0"
      />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<ListPage />} />
          <Route path="/info/:index" element={<DetailPage />} />
          <Route path="/reserve" element={<ReservePage />} />
          {accessToken ? (
            <>
              <Route path="/mypage" element={<MyPage />} />{" "}
              <Route path="*" element={<Navigate replace to="/" />} />
            </>
          ) : (
            <>
              <Route path="/login" element={<LoginPage />} />
              <Route path="/membership" element={<MembershipPage />} />
              <Route path="/pwfind" element={<PwFindPage />} />
              <Route path="*" element={<Navigate replace to="/" />} />
            </>
          )}
        </Route>
      </Routes>
    </div>
  );
}

export default App;
