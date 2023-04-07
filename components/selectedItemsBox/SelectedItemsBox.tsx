// SelectedItemsBox.tsx
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { selectedItemsAtom } from "@/atom/selectedItemsAtom";
import {menuItems, MenuItemsType} from "@/components/sidebar/SubSidebarContainer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";

const SelectedItemsBox = (): JSX.Element => {
    const items: string[] = useRecoilValue(selectedItemsAtom);
    const setSelectedItems = useSetRecoilState(selectedItemsAtom);

    const removeItem = (index: number) => {
        setSelectedItems((prevItems) => prevItems.filter((_, i) => i !== index));
    };


    const getButtonColorClass = (item: string, menuItems: MenuItemsType): string => {
        for (const key in menuItems) {
            if (menuItems[key as keyof MenuItemsType].includes(item)) {
                switch (key) {
                    case "상의":
                        return "bg-teal-500";
                    case "아우터":
                        return "bg-green-500";
                    case "바지":
                        return "bg-pink-500";
                    case "원피스":
                        return "bg-red-500";
                    case "스커트":
                        return "bg-purple-500";
                    default:
                        return "bg-gray-500";
                }
            }
        }
        return "bg-gray-500";
    };



    return (
        <div className="flex flex flex-wrap p-4 bg-gray-100 rounded-lg mt-4 w-3/4">
            <div className="text-gray-500 text-sm ml-1 mb-4 w-full">선택된 아이템</div>
            <div>
                {items.map((item: string, index: number) => (
                    <div key={index} className="relative inline-block m-1">
                        <button
                            className={`${getButtonColorClass(item, menuItems)} text-white py-2 px-4 rounded-lg`}
                        >
                            {item}
                        </button>
                        <FontAwesomeIcon
                            icon={faCircleXmark}
                            className="absolute top-0 right-0 -mt-1 -mr-1 text-gray-700 cursor-pointer"
                            onClick={() => removeItem(index)}
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SelectedItemsBox;
