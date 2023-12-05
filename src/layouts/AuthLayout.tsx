import logo from '@assets/logobk.png';
import corner from '@assets/corner.png';
import { ILayout } from '@interfaces';

export const AuthLayout: ILayout = ({ children }) => {
  return (
    <div className='flex flex-col items-center w-full h-[100vh] gap-6 bg-[#F8F9FA] fixed'>
      <div className="bg-[url('./src/assets/header.png')] bg-no-repeat bg-cover bg-center py-5">
        <div className='flex items-center justify-center sm:justify-start sm:px-20'>
          <div className='w-[10%] mr-[5px] sm:w-[10%] lg:w-[5%]'>
            <img src={logo} alt='logo' />
          </div>
          <div className='flex flex-col items-center justify-center'>
            <p className='uppercase text-[#1488D8] text-[10px] sm:text-[12px] '>
              đại học quốc gia thành phố hồ chí minh
            </p>
            <p className='uppercase font-bold text-[#030391] text-[16px] sm:text-[20px]'>
              trường đại học bách khoa
            </p>
          </div>
        </div>
      </div>
      <div className='basis-1/2 flex justify-center items-start sm:items-center'>{children}</div>
      <div className='absolute bottom-0 left-[-250px] sm:left-[-200px] lg:left-0 lg:bottom-[-30px] '>
        <img src={corner} alt='corner' />
      </div>
    </div>
  );
};
