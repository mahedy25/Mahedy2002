import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import '../globals.css'
import { ClerkProvider } from '@clerk/nextjs'
import { ThemeProvider } from '../../components/ThemeProvider'
import { SidebarInset, SidebarProvider } from '../../components/ui/sidebar'
import { FloatingDock } from '../../components/FloatingDock'
import { ModeToggle } from '../../components/DarkModeToggle'
import { SanityLive } from '../../sanity/lib/live'


const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Mahedy Hasan',
  description: 'This is the portfolio website of Mahedy Hasan',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang='en' suppressHydrationWarning>
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          <ThemeProvider
            attribute='class'
            defaultTheme='system'
            enableSystem
            disableTransitionOnChange
          >
            <SidebarProvider>
              <SidebarInset>{children}</SidebarInset>
              <FloatingDock />
              <div className='fixed bottom-6 right-6 z-99'>
                <div className='w-10 h-10 md:w-12 md:h-12'>
                  <ModeToggle />
                </div>
              </div>
            </SidebarProvider>

            <SanityLive />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
