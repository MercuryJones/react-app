import React from 'react';
import Banner from '../components/Banner';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Restaurants from '../components/Restaurants';

// const Home = () => {
//   return (
//     <>
//       <Banner />
//       <About />
//       <Gallery />
//       <Restaurants />
//     </>
//   );
// };

const Home = () => {
    return (
      <div style={{ padding: '2rem' }}>
        <h1>Hello from Home!</h1>
        <p>If you see this, routing is working.</p>
      </div>
    );
  };
  
export default Home;
