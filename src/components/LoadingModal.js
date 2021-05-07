import React from 'react';
import Modal from 'react-modal';

const LoadingModal = () =>{
    return(
        <Modal isOpen={true}
        contentLabel="Loading"
        className="loading-modal"
        ariaHideApp= {false}>
            <img src="/img/loader-2_food.gif" alt="Loading"/>
        </Modal>
    )
}

export {LoadingModal as default}