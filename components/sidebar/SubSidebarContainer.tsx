import React, {useEffect, useState} from "react";
import SubSidebarComponent from "./SubSidebarComponent";
import { useSetRecoilState } from "recoil";
import { selectedItemsAtom } from "@/atom/selectedItemsAtom"
import Swal from "sweetalert2";


export type MenuItemKey = "상의" | "아우터" | "바지" | "원피스" | "스커트";

interface ISubSidebarContainer {
    selectedItem: MenuItemKey;
}

export type MenuItemsType = {
    [key in MenuItemKey]: string[];
};

type MenuItems = {
    style1: string[];
    style2: string[];
};


export const menuItems: MenuItemsType = {
    '상의': ["니트 / 스웨터", "후드", "스웻셔츠", "긴소매 티셔츠", "반소매 티셔츠", "셔츠", "블라우스", "피케이 티셔츠", "민소매 티셔츠"],
    '아우터': ["블레이저", "카디건", "트레이닝 자켓", "블루종", "코치 자켓", "코트", "패딩"],
    '바지': ["청바지", "코튼 팬츠", "숏팬츠" ,"슬렉스", "조거팬츠", "레깅스"],
    '원피스': ["미니 원피스", "롱 원피스", "미디 원피스"],
    '스커트': ["롱 스커트", "숏 스커트", "미디 스커트"],
};

export const hipMenuItems: MenuItems = {
    style1: ["Grunge-inspired denim jacket with studs, black pants, white shirts"],
    style2: ["black leather jacket, white long dress"],
};

export const sportsMenuItems: MenuItems = {
    style1: ["The style of sportswear when exercising"],
    style2: ["The style of sportswear when during yoga"],
};

export const suitMenuItems: MenuItems = {
    style1: ["Sophisticated black-tie tuxedo with a tailored fit and satin lapels"],
    style2: ["Men's gray color casual blazer jacket, black top coordinations"],
};

export const y2kMenuItems: MenuItems = {
    style1: ["Retro 1970s jumpsuit with bold prints and flared legs"],
    style2: ["Retro and Vintage trench coat"],
};




const SubSidebarContainer = ({ selectedItem }: ISubSidebarContainer): JSX.Element => {

    const renderItems = (selectedItem: MenuItemKey) => {
        return menuItems[selectedItem];
    };
    const items = renderItems(selectedItem);

    const setSelectedItems = useSetRecoilState(selectedItemsAtom);

    const [styleItems, setStyleItems] = useState<string[]>([]);

    const handleStyleSelection = (styleType: string, styleKey: string) => {
        console.log(styleType, styleKey);
        if (styleType === "hipMenuItems") {
            setSelectedItems(hipMenuItems[styleKey as keyof MenuItems]);
        } else if (styleType === "sportsMenuItems") {
            setSelectedItems(sportsMenuItems[styleKey as keyof MenuItems]);
        } else if (styleType === "suitMenuItems") {
            setSelectedItems(suitMenuItems[styleKey as keyof MenuItems]);
        } else if (styleType === "y2kMenuItems") {
            setSelectedItems(y2kMenuItems[styleKey as keyof MenuItems]);
        }
    };


    const onSubItemClick = (item: string) => {
        setSelectedItems((prevItems) => {
            // check if the item is already selected
            if (prevItems.includes(item)) {
                return prevItems;
            }

            const newItemCategory = Object.entries(menuItems).find(([, items]) => items.includes(item))?.[0];

            if (!newItemCategory) {
                return prevItems;
            }

            if (prevItems.some((prevItem) => /[a-zA-Z]/.test(prevItem))) {
                return [item];
            }

            // Condition 1: One-piece category can only be selected if none of the tops, pants, or skirts are selected
            if (newItemCategory === '원피스' && prevItems.some((prevItem) => ['상의', '바지', '스커트'].includes(Object.entries(menuItems).find(([, items]) => items.includes(prevItem))?.[0]))) {
                Swal.fire('원피스 카테고리와 상의, 바지, 스커트 카테고리는 동시에 선택 할 수 없습니다.', '', 'warning');
                return prevItems;
            }

            // Condition 2: Pants and skirt categories cannot overlap each other
            if (newItemCategory === '바지' && prevItems.some((prevItem) => Object.entries(menuItems).find(([, items]) => items.includes(prevItem))?.[0] === '스커트')) {
                Swal.fire('바지와 스커트 카테고리는 동시에 선택할 수 없습니다.', '', 'warning');
                return prevItems;
            }

            // Condition 2: tops categories cannot overlap One-piece category
            if (newItemCategory === '상의' && prevItems.some((prevItem) => Object.entries(menuItems).find(([, items]) => items.includes(prevItem))?.[0] === '원피스')) {
                Swal.fire('상의 카테고리와 원피스 카테고리는 동시에 선택 할 수 없습니다.', '', 'warning').then(r => console.log(r));
                return prevItems;
            }

            // Condition 2: pants categories cannot overlap One-piece category
            if (newItemCategory === '바지' && prevItems.some((prevItem) => Object.entries(menuItems).find(([, items]) => items.includes(prevItem))?.[0] === '원피스')) {
                Swal.fire('바지 카테고리와 원피스 카테고리는 동시에 선택 할 수 없습니다.', '', 'warning').then(r => console.log(r));
                return prevItems;
            }
            // Condition 2: skirts categories cannot overlap One-piece category
            if (newItemCategory === '스커트' && prevItems.some((prevItem) => Object.entries(menuItems).find(([, items]) => items.includes(prevItem))?.[0] === '원피스')) {
                Swal.fire('스커트 카테고리와 원피스 카테고리는 동시에 선택 할 수 없습니다.', '', 'warning').then(r => console.log(r));
                return prevItems;
            }

            if (newItemCategory === '스커트' && prevItems.some((prevItem) => Object.entries(menuItems).find(([, items]) => items.includes(prevItem))?.[0] === '바지')) {
                Swal.fire('스커트 카테고리와 바지 카테고리는 동시에 선택 할 수 없습니다.', '', 'warning').then(r => console.log(r));
                return prevItems;
            }

            // Existing logic
            const existingItemInCategory = prevItems.find((prevItem) => {
                const prevItemCategory = Object.entries(menuItems).find(([, items]) => items.includes(prevItem))?.[0];
                return prevItemCategory === newItemCategory;
            });

            if (existingItemInCategory) {
                Swal.fire({
                    title: `각 카테고리 당 하나의 아이템만 선택 할 수 있습니다. 변경하시겠습니까?`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "네!",
                    cancelButtonText: "아니요",
                }).then((result) => {
                    if (result.isConfirmed) {
                        const updatedItems = prevItems.filter((prevItem) => {
                            const prevItemCategory = Object.entries(menuItems).find(([, items]) => items.includes(prevItem))?.[0];
                            return prevItemCategory !== newItemCategory;
                        });

                        setSelectedItems([...updatedItems, item]);
                    }
                });
                return prevItems;
            }

            const updatedItems = prevItems.filter((prevItem) => {
                const prevItemCategory = Object.entries(menuItems).find(([, items]) => items.includes(prevItem))?.[0];
                return prevItemCategory !== newItemCategory;
            });

            return [...updatedItems, item];
        });
    };

    useEffect(() => {
        console.log(selectedItem);
    }, [selectedItem]);

    return <SubSidebarComponent selectedItem={selectedItem} items={items} onSubItemClick={onSubItemClick}  setStyleItems={setStyleItems} styleItems={styleItems} onStyleItemClick={handleStyleSelection}/>;
};

export default SubSidebarContainer;
