import React from 'react';
import { BrowserRouter, Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';

//theme
import theme from '../theme/default';
import { MuiThemeProvider } from '@material-ui/core/styles';

import App from '../Pages/app';
import Login from '../Pages/login';

const PrivateRoute = ({ component: Component, logado, ...rest }) => {
    return(
        <Route {...rest} render={(props) => 
            logado ? (
                <Component {...props} />
            ):(
                <Redirect to={{ pathname: '/login', state: { from: props.location } }} />
            )}
        />
    )
};

const LoginRoute = ({ component: Component, logado, ...rest }) => {
    return(
        <Route {...rest} render={(props) => 
            logado ? (
                <Redirect to={{ pathname: '/app', state: { from: props.location } }} />
            ):(
                <Component {...props} />
            )}
        />
    )
};

class AppRoute extends React.Component {

    state = {
        valid: false
    }

    render(){
        const { location, logado } = this.props;

        if(location.pathname === '/'){
            if(logado){
                return <Redirect to='/app'/>
            }else{
                return <Redirect to='/login'/>
            }
        }

        return(
            <MuiThemeProvider theme={theme}>
                <div className="app-main">
                    <BrowserRouter>
                        <Switch>
                            <PrivateRoute path="/app" logado={logado} component={App}/>
                            <LoginRoute path="/login" logado={logado} component={Login}/>
                        </Switch>
                    </BrowserRouter>
                </div>
            </MuiThemeProvider>
        );
    }
}

const mapStateToProps = ({ usuario }) => {
    const { logado } = usuario;

    return{
        logado
    }
};
export default connect(mapStateToProps, {})(AppRoute);