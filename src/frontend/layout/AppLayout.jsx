import { Outlet } from "react-router-dom";
import { NavBar } from "../components/global/NavBar";
import { useContext } from "react";
import { GlobalContext } from "../context/GlobalContext";
import { Footer } from "../components/global/Footer";

export default function AppLayout() {

    const { account } = useContext(GlobalContext);
    
        return (
            <main className="app-layout">
                <NavBar />
                <p style={{textAlign: 'center'}}>Quitar antes de hacer el deploy</p>
                {account ? <a 
                        href={`https://etherscan.io/address/${account}`}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="button nav-button btn-sm mx-4"
                        style={{ textAlign: 'center' }}
                    >
                        <div variant="outline-light">
                            {account}
                        </div>
                    </a> : <p style={{textAlign: 'center'}}>not connected</p>}
                <Outlet />     
                <Footer />
            </main>
        );
}