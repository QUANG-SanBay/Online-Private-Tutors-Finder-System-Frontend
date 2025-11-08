import Header from '../header/Header'
import Footer from '../footer/Footer'

function DefaultLayout({userType, children}){
    return(
        <>
            <Header userType={userType} showNotification ={false}/>
            <main style={{marginTop: '80px'}}>
                {children}
            </main>
            <Footer/>
        </>
    )
}
export default DefaultLayout;