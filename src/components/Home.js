import React from 'react'
const Home = ()=>{
    return(
        <div>       
            <section className="page-banner">
                <div className="banner-overlay"></div>
                <h1 className="page__title">Welcome To Serve Me</h1>
            </section>
            <div className="page-background">
                <article className="page-para">
                    <p className="para-text">Food for us comes from our relatives, whether they have wings or fins or roots. That is how we consider food. Food has a culture. It has a history. It has a story. It has relationships. Food is symbolic of love when words are inadequate. Food brings people together on many different levels. It’s nourishment of the soul and body; it’s truly love. And here at <i>Serve Me</i> we serve love on plate.</p>
                </article>
            </div>

            <div className="page-background">
                <article className="page-para">
                    <p className="para-text">From a pop culture trend to the social experience of dining – there are so many reasons why food and the chefs responsible for preparing meals today are essential.
                    Chefs play a critical role in the kitchen. Their role extends beyond managing other cooks to also planning the menus, ensuring that presentation is on point and even developing new, creative recipes for those unique meals everyone craves.</p>
                </article>
            </div>

       
             <div className="page-background">
                <article className="page-para">
                    <p className="para-text">A good restaurant is like a vacation; it transports you, and it becomes a lot more than just about the food.
                    A great restaurant is one that just makes you feel like you're not sure whether you went out or you came home and confuses you. If it can do both of those things at the same time, you're hooked.
                    A great restaurant doesn't distinguish itself by how few mistakes it makes but by how well they handle those mistakes.</p>
                </article>
            </div>
            
        </div>
    )
}

export {Home as default}