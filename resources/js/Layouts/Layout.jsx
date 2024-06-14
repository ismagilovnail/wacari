import Aside from '@/Components/aside/Aside';
import Footer from '@/Components/footer/Footer';
import Header from '@/Components/header/Header';

export default function Layout({ children }) {

    return (
        <>
            <div className="wrapper">
                <Aside />
                <div className='aside-right'>
                    <Header />
                    {children}
                </div>
            </div>
            <Footer />
        </>
    );
}
