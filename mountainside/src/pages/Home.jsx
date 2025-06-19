import Navbar from "../components/Navbar";
import Banner from "../components/Banner";
import About from "../components/About";
import Amenities from "../components/Amenities";
import Gallery from "../components/Gallery";
import Restaurants from "../components/Restaurants";

const Home = () => {
  return (
    <main>
      <Navbar />
      <Banner />
      <About />
      <Amenities />
      <Gallery />
      <Restaurants />
    </main>
  );
};

export default Home;