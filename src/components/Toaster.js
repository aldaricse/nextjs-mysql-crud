'use client'
import dynamic from 'next/dynamic'

export const ToastContainer = dynamic(async () => {
  const { ToastContainer } = await import('react-toastify')
  return ToastContainer
}, {
  ssr: false
})