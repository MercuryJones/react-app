// import React from 'react';
// import Banner from '../components/Banner';
// import About from '../components/About';
// import Gallery from '../components/Gallery';
// import Restaurants from '../components/Restaurants';

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

// export default Home;


import React from 'react';
import Banner from '../components/Banner';
// import About from '../components/About';
// import Gallery from '../components/Gallery';
// import Restaurants from '../components/Restaurants';

const Home = () => {
  return (
    <>
      <div style={{ padding: '2rem', background: 'white' }}>
        <h1>Testing Render</h1>
        <p>If you see this message, Home is rendering correctly.</p>
      </div>

      <Banner />
    </>
  );
};

export default Home;
