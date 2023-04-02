import React, {useEffect} from "react";
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

export const menuItems: MenuItemsType = {
    '상의': ["니트 / 스웨터", "후드", "스웻셔츠", "긴소매 티셔츠", "반소매 티셔츠", "셔츠", "블라우스", "PK 티셔츠", "민소매 티셔츠"],
    '아우터': ["후드 집업", "블레이저", "카디건", "트레이닝 자켓", "블루종", "코치 자켓", "코트", "패딩"],
    '바지': ["청바지", "코튼 팬츠", "숏팬츠" ,"슬렉스", "조거팬츠", "레깅스"],
    '원피스': ["미니 원피스", "롱 원피스", "미디 원피스"],
    '스커트': ["롱 스커트", "숏 스커트", "미디 스커트"],
};


const SubSidebarContainer = ({ selectedItem }: ISubSidebarContainer): JSX.Element => {

    const renderItems = (selectedItem: MenuItemKey) => {
        return menuItems[selectedItem];
    };
    const items = renderItems(selectedItem);

    const setSelectedItems = useSetRecoilState(selectedItemsAtom);

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

    return <SubSidebarComponent selectedItem={selectedItem} items={items} onSubItemClick={onSubItemClick} />;
};

export default SubSidebarContainer;
