import Header from "./header/Header";
import Form from "./form/Form";
import SidebarContainter from "@/components/sidebar/SidebarContainter";


const Layout = (): JSX.Element => {

  return (
    <div className='flex flex-row'>
        <div className='w-1/6'>
            <SidebarContainter />
        </div>
            <Header />
        <Form />
    </div>
  );
};

export default Layout;
