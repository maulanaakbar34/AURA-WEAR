
import { useLocation, Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

function MainLayout() {
  const location = useLocation();
  const isHomePage = location.pathname === "/";

  return (
    <>
      {!isHomePage && <Navbar />}

      <main
        className={
          isHomePage
            ? "main-content home-main-content"
            : "main-content"
        }
      >
        <Outlet />
      </main>
    </>
  );
}

export default MainLayout;
