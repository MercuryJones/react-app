// import React from 'react';
// import { BrowserRouter, Routes, Route } from 'react-router-dom';
// import Navbar from './components/Navbar';
// import Home from './pages/Home';
// import Contact from './pages/Contact';
// import './App.css';

// const App = () => {
//   return (
//     <BrowserRouter basename={process.env.PUBLIC_URL}>
//       <Navbar />
//       <Routes>
//         <Route path="/" element={<Home />} />
//         <Route path="/contact" element={<Contact />} />
//       </Routes>
//     </BrowserRouter>
//   );
// };

// export default App;


import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

const App = () => {
  return (
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Routes>
        <Route
          path="/"
          element={
            <div style={{ padding: '2rem', backgroundColor: 'white' }}>
              <h1>✅ Router works!</h1>
              <p>This is being rendered by the default route.</p>
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
