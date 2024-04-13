import React, { useContext } from 'react'
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
    const { authenticated } = useContext(UserContext)
    const auth = authParam.selector(authenticated)
    const navigate = useNavigate()

    if (!auth) {
      return () => {
        navigate(authParam.redirectPath)
        return null
      }
    }

    return <WrappedComponent {...props} />
  }

  return WithAuthentication
}
