import React from 'react';
import Modal from 'react-modal';

const LoadingModal = () =>{
    return(
        <Modal isOpen={true}
        contentLabel="Loading"
        className="modal"
        ariaHideApp= {false}
        >
            <img src="/img/loading.gif" alt="Loading"/>
        </Modal>
    )
}

export {LoadingModal as default}