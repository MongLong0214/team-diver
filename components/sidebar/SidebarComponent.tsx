import React, { useState } from "react";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { MenuItemKey } from "./SubSidebarContainer";

export interface ISidebarComponent {
    setSelectedItem: (item: MenuItemKey) => void;
}


const SidebarComponent = ({ setSelectedItem }: ISidebarComponent): JSX.Element => {
    const [activeItem, setActiveItem] = useState<MenuItemKey | null>(null);

    const onItemClick = (item: MenuItemKey) => {
        setSelectedItem(item);
        setActiveItem(item);
    };

    const itemClass = (item: MenuItemKey) => `flex items-center p-2 text-gray-900 rounded-lg dark:text-white ${activeItem === item ? 'bg-gray-700' : ''} hover:bg-gray-100 dark:hover:bg-gray-700`;

    return (
        <>
            <aside id="default-sidebar"
                   className="fixed top-0 left-0 z-40 w-64 h-screen -translate-x-full translate-x-0"
                   aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-orange-300 rounded-xl bg-opacity-70">
                    <ul className="space-y-2 font-medium">
                        {(["상의", "아우터", "바지", "원피스", "스커트"] as MenuItemKey[]).map(item => (
                            <li key={item}>
                                <a href="#"
                                   onClick={() => onItemClick(item)}
                                   className={itemClass(item)}>
                                    <FontAwesomeIcon icon={faCircleArrowRight}
                                                     className="ml-1 flex self-center"
                                    />
                                    <span className="ml-3">{item}</span>
                                </a>
                            </li>
                        ))}
                    </ul>
                </div>
            </aside>
        </>
    )
}
export default SidebarComponent;
