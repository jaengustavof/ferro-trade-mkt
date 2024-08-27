import { Outlet } from "react-router-dom";
import { NavBar } from "../components/global/NavBar";

export default function AppLayout() {

        return (
            <section className="app-layout">
                <NavBar />
                <main>
                    <Outlet />
                </main>
            </section>
        );
}