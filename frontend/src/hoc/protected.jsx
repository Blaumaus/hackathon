import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import routes from '../constants/routes'

export const auth = {
  authenticated: {
    auth: true,
    redirectPath: routes.HOME,
  },
  notAuthenticated: {
    auth: false,
    redirectPath: routes.AUQARIUM,
  },
}

export const withAuthentication = (WrappedComponent, authParam) => {
  const WithAuthentication = (props) => {
    const { authenticated, loading } = useContext(UserContext)
    const navigate = useNavigate()

    useEffect(() => {
      if (loading) {
        return
      }

      if (authenticated === authParam.auth) {
        navigate(authParam.redirectPath)
      }
    }, [loading, authenticated])

    if (loading) {
      return null
    }

    return <WrappedComponent {...props} />
  }

  return WithAuthentication
}
