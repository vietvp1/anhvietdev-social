import React from 'react'
import { useDispatch } from 'react-redux'
import { loginFacebook } from '../../../actions/auth'
import FacebookLogin from 'react-facebook-login/dist/facebook-login-render-props'

const Facebook = () => {
    const dispatch = useDispatch();
    const componentClicked = () => console.log("clicked");
    const responseFacebook =  response => {
        dispatch(loginFacebook(response.userID, response.accessToken));
    };
    
    return (
        <div>
            <FacebookLogin
                appId={`${process.env.REACT_APP_FACEBOOK_APP_ID}`}
                autoLoad={false}
                fields="name,email,picture"
                onClick={componentClicked}
                callback={responseFacebook}
                render={renderProps => (
                    <span onClick={renderProps.onClick}>
                        <img className="avatar-35 pointer" src={require('../../../images/icon/facebook.png')} alt="f" />
                    </span>
                )}
            />
        </div>
    )
}

export default Facebook
