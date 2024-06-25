

import Logo from '../../assets/logo.png';
import { ConstantApp } from '../../constant/constant';

function Navbar(props: any) {
  return (
    <nav className="bg-white fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className=" flex flex-wrap items-center justify-center md:justify-between mx-auto p-5">
        <div className={'flex'}>
          <img src={Logo} alt="" className={'h-12 w-12 md:mr-5'} />
          <a
            href="/"
            className="flex items-center space-x-3 rtl:space-x-reverse"
          >
            <span className="self-center text-2xl font-semibold whitespace-nowrap">
              {ConstantApp.NAME}
            </span>
          </a>
        </div>
        {props.actions}
      </div>
    
    </nav>
  );
}

export default Navbar;


