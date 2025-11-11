import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

const HeroSection = () => {
    return (
        <div>
            <Swiper
                spaceBetween={30}
                centeredSlides={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                pagination={{
                    clickable: true,
                }}
                navigation={true}
                modules={[Autoplay, Pagination, Navigation]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <div
                        className="relative w-full rounded-lg overflow-hidden"
                        style={{
                            height: "400px", 
                            backgroundImage: "url('https://social-activity.cmsmasters.studio/wp-content/uploads/2014/08/bg-slider-3-41.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                            <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg text-center">
                                MARCH FOR FREEDOM
                            </h1>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div
                        className="relative w-full rounded-lg overflow-hidden"
                        style={{
                            height: "400px",
                            backgroundImage: "url('https://social-activity.cmsmasters.studio/wp-content/uploads/2014/08/bg-slider1.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="absolute inset-0 flex items-center justify-center text-white">
                            <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg text-center">
                               THE CHAINS OF INJUSTICE
                            </h1>
                        </div>
                    </div>
                </SwiperSlide>

                <SwiperSlide>
                    <div
                        className="relative w-full rounded-lg overflow-hidden"
                        style={{
                            height: "400px",
                            backgroundImage: "url('https://sdgactioncampaign.org/wp-content/uploads/2024/08/summitforsocialdevelopement-1024x464.jpg')",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                        }}
                    >
                        <div className="absolute inset-0 bg-black/30"></div>
                        <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                            <h1 className="text-3xl md:text-4xl font-bold drop-shadow-lg text-center">
                                IT IS YOUR LEGAL WEAPON
                            </h1>
                        </div>
                    </div>
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default HeroSection;