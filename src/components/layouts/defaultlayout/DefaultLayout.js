import Header from '../header/Header'
import Footer from '../footer/Footer'

function DefaultLayout({children}){
    return(
        <>
            <Header/>
            <main style={{marginTop: '80px'}}>
                {children}
            </main>
            <Footer/>
        </>
    )
}
export default DefaultLayout;