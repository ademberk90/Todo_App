import React from 'react'
import Toast from 'react-bootstrap/Toast';
import ToastContainer from 'react-bootstrap/ToastContainer';

const ToastMessage = ({toastType, toastMessage, setIsShowToast, isShowToast}) => {
  return (
    <ToastContainer className="p-3" position="top-center">
    <Toast onClose={() => setIsShowToast(false)} show={isShowToast} delay={3000} bg={toastType} autohide >
          <Toast.Body>{toastMessage}</Toast.Body>
        </Toast>
        </ToastContainer>
  )
}

export default ToastMessage