import Footer from "../footer/Footer";
import Header from "../header/Header";

function DefaultLayout({ children, userType = "learner", showNavbar = true }) {
  return (
    <>
      <Header userType={userType} showNavbar={showNavbar} showNotification={true} />
      <main style={{ marginTop: "80px" }}>{children}</main>
      <Footer />
    </>
  );
}

export default DefaultLayout;
