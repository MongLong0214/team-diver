import React, { useState } from "react";
import {faCircleArrowRight} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

const SidebarComponent = (): JSX.Element => {
    return (
        <>
            <aside id="default-sidebar"
                   className="fixed top-0 left-0 z-40 w-64 h-screen -translate-x-full translate-x-0"
                   aria-label="Sidebar">
                <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <FontAwesomeIcon icon={faCircleArrowRight}
                                                 className="ml-1 flex self-center"
                                />
                                <span className="ml-3">상의</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <FontAwesomeIcon icon={faCircleArrowRight}
                                                 className="ml-1 flex self-center"
                                />
                                <span className="flex-1 ml-3 whitespace-nowrap">아우터</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <FontAwesomeIcon icon={faCircleArrowRight}
                                                 className="ml-1 flex self-center"
                                />
                                <span className="flex-1 ml-3 whitespace-nowrap">하의</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <FontAwesomeIcon icon={faCircleArrowRight}
                                                 className="ml-1 flex self-center"
                                />
                                <span className="flex-1 ml-3 whitespace-nowrap">원피스</span>
                            </a>
                        </li>
                        <li>
                            <a href="#"
                               className="flex items-center p-2 text-gray-900 rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700">
                                <FontAwesomeIcon icon={faCircleArrowRight}
                                                 className="ml-1 flex self-center"
                                />
                                <span className="flex-1 ml-3 whitespace-nowrap">스커트</span>
                            </a>
                        </li>
                    </ul>
                </div>
            </aside>
        </>
    )
}
export default SidebarComponent