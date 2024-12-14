import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import './App.css';
import Navbar from './components/Navbar';
import Game from './pages/Game';
import Footer from './components/Footer';
import MyAccount from './pages/MyAccount';
import Refferal from './pages/Refferal';
import Activity from './pages/Activity';
import HowItWorks from './pages/HowItWorks';
import { AppKitProvider } from './wagmiConfig';
import AdminPanel from './pages/AdminPanel';
import ViewGames from './pages/ViewGames';
import Reffered from './pages/Reffered';
import { BalanceProvider } from './Context/BalanceContext';

function App() {
  return (
    <>
      <AppKitProvider>
        <BalanceProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/create-games" element={<AdminPanel />} />
              <Route path="/admin" element={<ViewGames />} />

              <Route path="/activity" element={<Activity />} />
              <Route path="/game/:gameId" element={<Game />} />
              <Route path="/" element={<Home />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/my-account" element={<MyAccount />} />

              <Route path="/referred/:refferalId" element={<Reffered />} />
              <Route path="/referrals" element={<Refferal />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </BalanceProvider>
      </AppKitProvider>
    </>
  );
}

export default App;
