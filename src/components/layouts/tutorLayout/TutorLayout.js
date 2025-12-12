import Footer from "../footer/Footer";
import Header from "../header/Header";

function TutorLayout({ children, userType = "tutor", showNavbar = true }) {
  return (
    <>
      <Header userType={userType} showNavbar={showNavbar} showNotification={true} />
      <main style={{ marginTop: "100px", display: "flex" }}>{children}</main>
      <Footer />
    </>
  );
}

export default TutorLayout;
