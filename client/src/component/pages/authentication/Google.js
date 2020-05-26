import React from 'react'
import { GoogleLogin } from 'react-google-login';
import { useDispatch } from 'react-redux';
import { loginGoogle } from '../../../actions/auth';

const Google = () => {
    const dispatch = useDispatch();
    const responseGoogle = (response) => {
        dispatch(loginGoogle(response.googleId, response.tokenId));
    }

    return (
        <div>
            <GoogleLogin
                clientId={`${process.env.REACT_APP_GOOGLE_CLIENT_ID}`}
                buttonText=""
                icon="fab fa-google"
                className=""
                render={renderProps => (
                    <span onClick={renderProps.onClick} disabled={renderProps.disabled}>
                        <img className="avatar-35 pointer" src={require('../../../images/icon/google-plus.png')} alt="f" />
                    </span>
                )}
                autoLoad={false}
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
            />
        </div>
    )
}

export default Google
