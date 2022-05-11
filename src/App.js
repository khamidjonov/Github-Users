import { BrowserRouter, Route, Routes } from 'react-router-dom';

import Footer from './Components/Layouts/Footer';
import Navbar from './Components/Layouts/Navbar';

import { AlertProvider } from './Context/Alert/AlertContext';
import { GithubProvider } from './Context/Github/GithubContext';

import About from './Pages/About';
import Alert from './Pages/Alert';
import Home from './Pages/Home';
import NotFound from './Pages/NotFound';
import User from './Pages/User';

function App() {
  return (
    <GithubProvider>
      <AlertProvider>
        <BrowserRouter>
          <div className="flex flex-col justify-between h-screen">
            <Navbar />

            <main className="container mx-auto px-3 pb-12">
              <Alert />
              <Routes>
                <Route path="/about" element={<About />} />
                <Route path="/" element={<Home />} />
                <Route path="/user/:login" element={<User />} />
                <Route path="/notfound" element={<NotFound />} />
                <Route path="/*" element={<NotFound />} />
              </Routes>
            </main>

            <Footer />
          </div>
        </BrowserRouter>
      </AlertProvider>
    </GithubProvider>
  );
}

export default App;
