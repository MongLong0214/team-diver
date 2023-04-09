import React, { useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowRight } from "@fortawesome/free-solid-svg-icons";
import suit from "../../public/assets/suit.jpeg";
import hip from "../../public/assets/hip.jpeg";
import sports from "../../public/assets/sports.jpeg";
import y2k from "../../public/assets/y2k.jpeg";

import blackLeather from "../../public/assets/blackLeather.png"
import blacksuit from "../../public/assets/blacksuit.png"
import graysuit from "../../public/assets/graysuit.png"
import jumpsuit from "../../public/assets/jumpsuit.png"
import stud from "../../public/assets/stud.png"
import training from "../../public/assets/training.png"
import yoga from "../../public/assets/yoga.png"
import vintageCoat from "../../public/assets/vintagecoat.png"





export interface ISubSidebarComponent {
    selectedItem: string;
    items: string[];
    onSubItemClick: (item: string) => void;

    setStyleItems: any;
    styleItems: any;
    onStyleItemClick: (styleType: string, styleKey: string) => void;
}

const SubSidebarComponent = ({selectedItem, items, onSubItemClick, setStyleItems, styleItems, onStyleItemClick}: ISubSidebarComponent): JSX.Element => {


    return (
        <aside className="fixed top-0 left-[256px] z-40 w-64 h-screen">
            <div className="h-full px-3 py-4 overflow-y-auto bg-gray-200 rounded-xl">
                <ul className="space-y-2 font-medium">
                    {items.map((item, index) => (
                        <li key={index}>
                            <a href="#"
                               onClick={(e) => {
                                   e.preventDefault();
                                   onSubItemClick(item);
                               }}
                               className="flex items-center p-2 text-gray-800 rounded-lg dark:text-gray-800 hover:bg-gray-100 dark:hover:bg-orange-200">
                                <FontAwesomeIcon icon={faCircleArrowRight}
                                                 className="ml-1 flex self-center"
                                />
                                <span className="flex-1 ml-3 whitespace-nowrap">{item}</span>
                            </a>
                        </li>
                    ))}
                </ul>

                <section className="grid grid-cols-2 gap-2 mt-4">
                    <button
                        className="w-full h-10 rounded bg-cover bg-center relative"
                        style={{
                            backgroundImage: `url(/assets/suit.jpeg)`
                        }}
                        onClick={() => setStyleItems("suit")}
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg bg-black opacity-70">
                            SUIT
                        </div>
                    </button>

                    <button
                        className="w-full h-10 rounded bg-cover bg-center relative"
                        style={{
                            backgroundImage: `url(/assets/hip.jpeg)`
                        }}
                        onClick={() => setStyleItems("hip")}
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg  bg-black opacity-70">
                            HIP
                        </div>
                    </button>

                    <button
                        className="w-full h-10 rounded bg-cover bg-center relative"
                        style={{
                            backgroundImage: `url(/assets/sports.jpeg)`
                        }}
                        onClick={() => setStyleItems("sports")}
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg  bg-black opacity-70">
                            SPORTS
                        </div>
                    </button>

                    <button
                        className="w-full h-10 rounded bg-cover bg-center relative"
                        style={{
                            backgroundImage: `url(/assets/y2k.jpeg)`
                        }}
                        onClick={() => setStyleItems("y2k")}
                    >
                        <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-lg  bg-black opacity-70">
                            Y2K
                        </div>
                    </button>



                </section>

                <section className="flex flex-col space-y-2 mt-4">
                    {styleItems === "suit" && (
                        <>
                            <button
                                onClick={() => onStyleItemClick("suitMenuItems", "style1")}
                                className="w-full h-12 bg-gray-800 rounded flex items-center justify-center">
                                <div className="flex items-center">
                                    <img src="/assets/blacksuit.png" alt="blacksuit" className="w-8 h-8 object-cover" />
                                    <span className="text-white font-bold ml-2">Black Suit Style</span>
                                </div>
                            </button>

                            <button
                                onClick={() => onStyleItemClick("suitMenuItems", "style2")}
                                className="w-full h-12 bg-gray-800 rounded flex items-center justify-center">
                                <div className="flex items-center">
                                    <img src="/assets/graysuit.png" alt="graysuit" className="w-8 h-8 object-cover" />
                                    <span className="text-white font-bold ml-2">Gray Suit Style</span>
                                </div>
                            </button>
                        </>
                    )}

                    {styleItems === "hip" && (
                        <>
                            <button
                                onClick={() => onStyleItemClick("hipMenuItems", "style1")}
                                className="w-full h-12 bg-gray-800 rounded flex items-center justify-center">
                                <div className="flex items-center">
                                    <img src="/assets/stud.png" alt="stud" className="w-8 h-8 object-cover" />
                                    <span className="text-white font-bold ml-2">Grunge Style</span>
                                </div>
                            </button>

                            <button
                                onClick={() => onStyleItemClick("hipMenuItems", "style2")}
                                className="w-full h-12 bg-gray-800 rounded flex items-center justify-center">
                                <div className="flex items-center">
                                    <img src="/assets/blackLeather.png" alt="blackLeather" className="w-8 h-8 object-cover" />
                                    <span className="text-white font-bold ml-2">Leather style</span>
                                </div>
                            </button>
                        </>
                    ) }

                    {styleItems === "sports" && (
                        <>
                            <button
                                onClick={() => onStyleItemClick("sportsMenuItems", "style1")}
                                className="w-full h-12 bg-gray-800 rounded flex items-center justify-center">
                                <div className="flex items-center">
                                    <img src="/assets/yoga.png" alt="yoga" className="w-8 h-8 object-cover" />
                                    <span className="text-white font-bold ml-2">Yoga style</span>
                                </div>
                            </button>

                            <button
                                onClick={() => onStyleItemClick("sportsMenuItems", "style2")}
                                className="w-full h-12 bg-gray-800 rounded flex items-center justify-center">
                                <div className="flex items-center">
                                    <img src="/assets/training.png" alt="training" className="w-8 h-8 object-cover" />
                                    <span className="text-white font-bold ml-2">Running style</span>
                                </div>
                            </button>
                        </>
                    )}

                    {styleItems === "y2k" && (
                        <>
                            <button
                                onClick={() => onStyleItemClick("y2kMenuItems", "style1")}

                                className="w-full h-12 bg-gray-800 rounded flex items-center justify-center">
                                <div className="flex items-center">
                                    <img src="/assets/jumpsuit.png" alt="jumpsuit" className="w-8 h-8 object-cover" />
                                    <span className="text-white font-bold ml-2">Retro JumpSuit Style</span>
                                </div>
                            </button>

                            <button
                                onClick={() => onStyleItemClick("y2kMenuItems", "style2")}
                                className="w-full h-12 bg-gray-800 rounded flex items-center justify-center">
                                <div className="flex items-center">
                                    <img src="/assets/vintagecoat.png" alt="vintagecoat" className="w-8 h-8 object-cover" />
                                    <span className="text-white font-bold ml-2">Trench Coat Style</span>
                                </div>
                            </button>
                        </>
                    )}

                </section>

            </div>
        </aside>
    );
};

export default SubSidebarComponent;
