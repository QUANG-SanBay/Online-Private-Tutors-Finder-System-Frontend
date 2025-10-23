import Header from '../header/Header'
import Footer from '../footer/Footer'

function DefaultLayout({children}){
    return(
        <>
            <Header/>
                {children}
            <Footer/>
        </>
    )
}
export default DefaultLayout;