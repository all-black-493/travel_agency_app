import { SidebarComponent } from "@syncfusion/ej2-react-navigations";
import { Link } from "react-router";
import NavItems from "./NavItems";
import { useEffect, useRef } from "react";

const MobileSidebar = () => {
    const sidebarRef = useRef<SidebarComponent | null>(null);

    const toggleSidebar = () => {
        sidebarRef.current?.toggle();
    };

    useEffect(() => {
        if (sidebarRef.current) {
            sidebarRef.current.hide();
        }
    }, []);

    return (
        <div className="mobile-sidebar wrapper">
            <header>
                <Link to="/">
                    <img src="/assets/icons/logo.svg" alt="logo" className="size-[30px]" />
                    <h1>Touravel</h1>
                </Link>
                <button onClick={toggleSidebar}>
                    <img src="/assets/icons/menu.svg" alt="menu" className="size-7" />
                </button>
            </header>
            <SidebarComponent
                style={{ width: "270px" }}
                ref={(sidebar: SidebarComponent | null) => {
                    sidebarRef.current = sidebar;
                }}
                closeOnDocumentClick={true}
                showBackdrop={true}
                type="Over"
            >
                <NavItems handleClick={toggleSidebar} />
            </SidebarComponent>
        </div>
    );
};

export default MobileSidebar;