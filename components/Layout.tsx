import Header from "./header/Header";
import Form from "./form/Form";
import SidebarContainter from "@/components/sidebar/SidebarContainer";
import SelectedItemsBox from "@/components/selectedItemsBox/SelectedItemsBox";


const Layout = (): JSX.Element => {

  return (
    <div className='flex flex-row'>
        <section className='min-w-[550px]'>
            <SidebarContainter />
        </section>
        <section>
            <Header />
            <Form />
            <SelectedItemsBox />
        </section>

    </div>
  );
};

export default Layout;
