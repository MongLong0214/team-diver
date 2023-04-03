// import Header from "./header/Header";
import Form from "@/components/form/Form";
import SidebarContainter from "@/components/sidebar/SidebarContainer";
import SelectedItemsBox from "@/components/selectedItemsBox/SelectedItemsBox";


const Layout = (): JSX.Element => {

  return (
    <div className='flex flex-row min-h-screen'>
        <section className='min-w-[550px]'>
            <SidebarContainter />
        </section>
        <section className='min-w-[650px]'>
            {/* <Header /> */}
            <Form />
            <SelectedItemsBox />
        </section>
    </div>
  );
};

export default Layout;
