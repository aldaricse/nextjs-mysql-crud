'use client'
import React from 'react'
import { Modal, Button } from "flowbite-react";
import { HiOutlineExclamationCircle } from "react-icons/hi";

const ModalConfirm = ({ message, show = false, popup = true, disabledSuccess = false, onSuccess = () => { }, onClose = () => { } }) => {
  return (
    <Modal
      show={show}
      size="md"
      popup={popup}
      onClose={onClose}
    >
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message}
          </h3>
          <div className="flex justify-center gap-4">
            <Button
              disabled={disabledSuccess}
              color="success"
              onClick={onSuccess}
            >
              Yes
            </Button>
            <Button
              color="gray"
              onClick={onClose}
            >
              No, cancel
            </Button>
          </div>
        </div>
      </Modal.Body>
    </Modal>
  )
}

export default ModalConfirm