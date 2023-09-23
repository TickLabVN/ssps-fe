import { Orders, Slides } from '@components/home';
import printerPicture from '@assets/printer.jpg';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { useEffect, useState } from 'react';

export function HomePage() {
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      try {
        const result = await axios.get('http://localhost:3002/orders');
        setOrders(result.data);
      } catch (e) {
        console.log(e);
      }
    };
    getOrders();
  }, []);
  const slidePictures = [
    {
      src: 'https://e-learning.hcmut.edu.vn/theme/boost/images/slbktv.jpg?1695219022292',
      alt: 'slide1'
    },
    {
      src: 'https://e-learning.hcmut.edu.vn/theme/boost/images/slbk.jpg?1695219022805',
      alt: 'slide2'
    },
    {
      src: 'https://static.tuoitre.vn/tto/i/s626/2016/04/05/dai-hoc-bach-khoa-tp-hcm-cong-bo-phuong-an-tuyen-sinh-2015jpg-1459820200.jpg',
      alt: 'slide3'
    },
    {
      src: 'https://we25.vn/media2018/Img_News/2020/06/08/khuon-vien-dh-bach-khoa-tp-hcm-khien-dan-tinh-me-man-voi-nhung-hanh-cay-xanh-tham-toa-bong-mat-quanh-nam-14_20200608150159.jpg',
      alt: 'slide4'
    }
  ];
  return (
    <div className='p-6 lg:py-5 lg:px-56'>
      <div className='mb-4 lg:mb-6'>
        <h4 className='text-[#1488D8] text-base lg:text-2xl'>
          Student Smart Printing Service (SSPS)
        </h4>
        <h3 className='text-[#030391] text-xl lg:text-4xl font-bold'>Welcome Username!</h3>
      </div>
      <Slides children={slidePictures} />
      <div className='flex p-4 bg-[#1488D8] rounded-lg items-center mb-16 lg:mb-24 lg:h-[120px] lg:px-6 relative'>
        <div className='p-[10px] rounded-full bg-white mr-4'>
          <img src={printerPicture} />
        </div>
        <span className='text-white font-bold lg:text-2xl'>Order printing</span>
        <ArrowRightIcon className='w-4 text-white absolute top-50 right-[24px] lg:w-6' />
      </div>
      <Orders orders={orders} />
    </div>
  );
}
