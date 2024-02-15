import React, { useEffect } from 'react'
import {Navigation, Pagination, Scrollbar, Autoplay} from 'swiper/modules'
import {Swiper, SwiperSlide} from 'swiper/react'

import "swiper/css"
import "swiper/css/navigation"
import "swiper/css/pagination"
import "../css/components/ImgSwiper.css"
const ImgSwiper = ({width,height,images}) => {

 
  return (
    
    <div>
      <Swiper
        style={{width:`${width}px`, height:`${height}px`}}
        modules={[Navigation, Pagination, Scrollbar,Autoplay]}
        navigation
        pagination={{clickable:true}}
        loop={true}
        //autoplay={{delay: 2000, disableOnInteraction: false}}
        scrollbar={{draggable:true}}
      > 
        <SwiperSlide>
          <img style={{width:`${width}px`,height:`${height}px`}} src ={images[0]?.url} alt ='구장사진'/>
        </SwiperSlide>
        <SwiperSlide>
          <img style={{width:`${width}px`,height:`${height}px`}} src ={images[1]?.url} alt ='구장사진'/>
        </SwiperSlide>
        <SwiperSlide>
          <img style={{width:`${width}px`,height:`${height}px`}} src ={images[2]?.url} alt ='구장사진'/>
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default ImgSwiper
