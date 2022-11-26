import React from 'react'
import { AppProvider } from './app'
import { AuthProvider } from './auth'
import { HomeProvider } from './home'
import { MovieProvider } from './movie'

const GlobalProvider: (props: { children: JSX.Element }) => JSX.Element = ({ children }) => {
  return (
    <AppProvider>
      <AuthProvider>
          <HomeProvider>
            <MovieProvider>
              {children}
            </MovieProvider>
          </HomeProvider>
      </AuthProvider>
    </AppProvider>
  )
}

export default GlobalProvider