import React from 'react';

const Gallery = () => {
    return (
       <div className='m-3 max-w-7xl mx-auto'>
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-8 mt-4 text-center">
          OUR GALLERY
        </h1>
         <div className="grid grid-cols-2 gap-2">
            <div>
                <img 
                    className="h-[380px] max-w-full rounded-lg " 
                    src="https://www.worldbank.org/content/dam/photos/780x439/2018/mar-2/uz-preschool-7-780.JPG" 
                    alt="Gallery image 1" 
                />
            </div>
            <div>
                <img 
                    className="h-[380px]  max-w-full rounded-lg" 
                    src="https://ecdn.dhakatribune.net/contents/cache/images/900x0x1/uploads/dten/2019/03/web-mayor-atiqul-cleaning-garbage-bt-1552840218949.jpg" 
                    alt="Gallery image 2" 
                />
            </div>
            <div>
                <img 
                    className="h-[380px]  max-w-full rounded-lg" 
                    src="https://basmah-bd.org/wp-content/uploads/2025/02/Food-for-Hungry-13.2.2025-4.jpg" 
                    alt="Gallery image 3" 
                />
            </div>
            <div>
                <img 
                    className="h-[380px] w-[600px] max-w-full rounded-lg" 
                    src="https://images.unsplash.com/photo-1488521787991-ed7bbaae773c?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8aGVscGluZyUyMHBvb3J8ZW58MHx8MHx8fDA%3D&fm=jpg&q=60&w=3000" 
                    alt="Gallery image 4" 
                />
            </div>
        </div>
       </div>
    );
};

export default Gallery;