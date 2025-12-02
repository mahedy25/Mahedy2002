"use client"

import { useState } from "react"
import Preloader from "./Preloader"

export default function LayoutShell({
  children,
}: {
  children: React.ReactNode
}) {
  const [ready, setReady] = useState(false)

  return (
    <>
      {!ready && <Preloader onFinish={() => setReady(true)} />}
      {ready && children}
    </>
  )
}
