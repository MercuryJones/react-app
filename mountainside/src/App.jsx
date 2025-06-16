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

const App = () => {
  return (
    <div style={{ padding: '2rem', backgroundColor: 'white' }}>
      <h1>✅ It works!</h1>
      <p>Your React app is now properly rendering through GitHub Pages.</p>
    </div>
  );
};

export default App;

