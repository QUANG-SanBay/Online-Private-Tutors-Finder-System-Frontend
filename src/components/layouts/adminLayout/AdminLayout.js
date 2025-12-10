import Footer from "../footer/Footer";
import Header from "../header/Header";
import DrawerLayout from "../drawer/DrawerLayout";
import AdminDrawerList from "./adminDrawerList/AdminDrawerList";

function AdminLayout({children}) {
    return ( 
        <>
            <Header showNavbar={false} userType="admin" showNotification={false} />
            <DrawerLayout DrawerList={AdminDrawerList} />
            <main style={{marginTop: '100px', display: 'flex'}}>
                {children}
            </main>
            <Footer />
        </>
     );
}

export default AdminLayout;