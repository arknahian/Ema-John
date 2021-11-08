import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router';
import { userContext } from "./../../App";

const PrivateRoute = ({children, ...rest}) => {
    const [loggedInUser] = useContext(userContext);
    return (
        <Route {...rest} render={props => (
            loggedInUser.isSignedIn ? (
              children
            ) : (
              <Redirect to={{
                pathname: '/login',
                state: {from: props.location}
              }}/>
            )
          )}
          />
    );
};
      


export default PrivateRoute;