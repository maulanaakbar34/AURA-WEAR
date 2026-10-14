
import { useLocation, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function MainLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      <Navbar />

      <main className="main-content">
        <Outlet />
      </main>

      {isHomePage && <Footer />}
    </>
  );
}

export default MainLayout;
