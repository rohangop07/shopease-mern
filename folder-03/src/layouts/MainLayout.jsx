import {Outlet} from "react-router-dom";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";


function MainLayout(){
    return(
        <>
        <Navbar>Navbar</Navbar>

        <main>
            <Outlet/>
        </main>

        <Footer/>
        </>
    );
}


export default MainLayout;