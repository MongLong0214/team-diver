import React, { useState } from "react";
import SidebarComponent from "./SidebarComponent";
import SubSidebarContainer from "./SubSidebarContainer";
import { MenuItemKey } from "./SubSidebarContainer";

const SidebarContainer = (): JSX.Element => {
    const [selectedItem, setSelectedItem] = useState<MenuItemKey | null>(null);

    return (
        <>
            <SidebarComponent setSelectedItem={setSelectedItem} />
            {selectedItem && <SubSidebarContainer selectedItem={selectedItem} />}
        </>
    );
};

export default SidebarContainer;
