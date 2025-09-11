


import './home.css';
import Header from './components/header';
import Sidebartwo from './components/sidebar2';
import { Outlet } from 'react-router-dom';

function Home() {
  return (
    <div className="home-background">

    {/* <div className='home-sidebar'> */}
      <Sidebartwo/>
    {/* </div> */}
    <div className='home-rightbox'></div>


      {/* <Header />
      <div className="home-body">
        <Sidebartwo />
        <div className="home-content">
          <Outlet />
        </div>
      </div> */}
    </div>
  );
}

export default Home;

