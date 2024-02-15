import logo from './logo.svg';
import './App.css';
import MenuBar from './components/MenuBar';
import { Outlet, Route, Routes } from 'react-router-dom';
import ListPage from './pages/ListPage';
import InfoPage from './pages/InfoPage';
import ReservePage from './pages/ReservePage';
import MyPage from './pages/MyPage';
import LoginPage from './pages/LoginPage';
import MembershipPage from './pages/MembershipPage';
import FindPage from './pages/FindPage';


const Layout =()=>{
  return(
    <>
    <MenuBar/>
    <Outlet/>
    </>
  )
}
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<ListPage/>}/>
          <Route path="/info/:index" element={<InfoPage/>}/>
          <Route path='/reserve' element={<ReservePage/>}/>
          <Route path='/mypage' element={<MyPage/>}/>
          <Route path='/login' element={<LoginPage/>}/>
          <Route path='/membership' element={<MembershipPage/>}/>
          <Route path='/pwfind' element={<FindPage/>}/>
        </Route>
      </Routes>
    </div>
  );
}

export default App;
