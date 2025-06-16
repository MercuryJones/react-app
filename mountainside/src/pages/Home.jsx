import Navbar from '../components/Navbar';
import Banner from '../components/Banner';
import About from '../components/About';
import Gallery from '../components/Gallery';
import Restaurants from '../components/Restaurants';

function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Banner />
        <About />
        <Gallery />
        <Restaurants />
      </main>
    </>
  );
}

export default Home;
