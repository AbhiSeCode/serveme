import React from 'react';
import ImageGallery from 'react-image-gallery';

const Home = ()=>{
    const image = [{
        original: '/img/Dosa.jpg',
        originalAlt: 'Dosa',
        originalTitle: 'Dosa'         
    },{
        original: '/img/Beans.jpg',
        originalAlt: 'Beans',
        originalTitle: 'Beans' 
    },{
        original: '/img/Punjabi_Cuisine.jpg',
        originalAlt: 'Punjabi Cuisine',
        originalTitle: 'Punjabi Cuisine'  
    },{
        original: '/img/Paneer.jpg',
        originalAlt: 'Paneer',
        originalTitle: 'Paneer' 
    },{
        original: '/img/Lunch_Thali.jpg',
        originalAlt: 'Lunch Thali',
        originalTitle: 'Lunch Thali' 
    },{
        original: '/img/Paneer_with_Peas.jpg',
        originalAlt: 'Paneer_with_Peas',
        originalTitle: 'Paneer_with_Peas' 
    },{
        original: '/img/Rice_and_curry.jpg',
        originalAlt: 'Rice and Curry',
        originalTitle: 'Rice and Curry' 
    },{
        original: '/img/South_Indian_Cuisine.jpg',
        originalAlt: 'South Indian Cuisine',
        originalTitle: 'South Indian Cuisine' 
    },{
        original: '/img/Salad.jpg',
        originalAlt: 'Salad',
        originalTitle: 'Salad' 
    },{
        original: '/img/Salad_Rolled.jpg',
        originalAlt: 'Salad Rolled',
        originalTitle: 'Salad Rolled' 
    }]
    return(
        <div>
            <h1 className="page__title">Welcome To Serve Me</h1>
            
            <div  >
                <ImageGallery className="gallery" slideInterval={4000} showFullscreenButton={false}  items={image} autoPlay={true} showThumbnails={false} showPlayButton={false} showBullets={true}/>
            </div> 
            
            <div className="page__content">
                <p className="page__text">This is just random text to fill up the page because I can't come up with any idea so here I go.
                    This is my first project which was not so good before but now it's pretty good. 
                    Today is seventeenth of july. 
                    You might be asking why I'have written seventeen in letters and not in number, because I think number will attract unwanted attention. 
                    One more important thing, we serve food. Happy Hunting! </p>
            </div>
        </div>
    )
}

export {Home as default}