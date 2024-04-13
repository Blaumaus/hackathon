import React, { useContext, useEffect } from 'react'
import { UserContext } from '../context/userContext'
import { useNavigate } from 'react-router-dom'
import routes from '../constants/routes'

export const auth = {
  authenticated: {
    selector: (state) => state,
    redirectPath: routes.HOME,
  },
  notAuthenticated: {
    selector: (state) => !state,
    redirectPath: routes.AUQARIUM,
  },
}

export const withAuthentication = (WrappedComponent, authParam) => {
  const WithAuthentication = (props) => {
    const { authenticated, loading } = useContext(UserContext)
    const auth = authParam.selector(authenticated)
    const navigate = useNavigate()

    useEffect(() => {
      if (loading) {
        return
      }

      if (!auth) {
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
