import Footer from "../footer/Footer";
import Header from "../header/Header";

function DefaultLayout({ children, userType = "admin", showNavbar = true }) {
  return (
    <>
      <Header userType={userType} showNavbar={showNavbar} showNotification={true} />
      <main style={{ marginTop: "100px" }}>{children}</main>
      <Footer />
    </>
  );
}

export default DefaultLayout;
