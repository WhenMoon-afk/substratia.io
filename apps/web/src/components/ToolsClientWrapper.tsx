'use client'

import { ReactNode } from 'react'
import ToolErrorBoundary from './ToolErrorBoundary'
import { ToastProvider } from './Toast'

interface Props {
  children: ReactNode
}

export default function ToolsClientWrapper({ children }: Props) {
  return (
    <ToastProvider>
      <ToolErrorBoundary>{children}</ToolErrorBoundary>
    </ToastProvider>
  )
}
