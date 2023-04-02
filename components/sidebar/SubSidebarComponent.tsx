import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";

export interface ISubSidebarComponent {
    selectedItem: string;
    items: string[];
    onSubItemClick: (item: string) => void;
}

const SubSidebarComponent = ({selectedItem, items, onSubItemClick}: ISubSidebarComponent): JSX.Element => {

    return (
        <aside className="fixed top-0 left-[256px] z-40 w-64 h-screen">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-400 rounded-xl bg-opacity-70">
                <ul className="space-y-2 font-medium">
                    {items.map((item, index) => (
                        <li key={index}>
                            <a href="#"
                               onClick={(e) => {
                                   e.preventDefault();
                                   onSubItemClick(item);
                               }}
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <FontAwesomeIcon icon={faCircleArrowRight}
                                                 className="ml-1 flex self-center"
                                />
                                <span className="flex-1 ml-3 whitespace-nowrap">{item}</span>
                            </a>
                        </li>
                    ))}
                </ul>
            </div>
        </aside>
    );
};

export default SubSidebarComponent;
