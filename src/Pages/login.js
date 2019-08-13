import React, { useState } from 'react';
import { connect } from 'react-redux';

import api from '../api/api';
import logo from '../img/Softasks.svg';

import { Creators as ActionsUser } from '../store/ducks/usuario';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';

import FormControl from '@material-ui/core/FormControl';
import IconButton from '@material-ui/core/IconButton';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import '../Styles/login.scss';

const Login = ({ setLogado }) => {
    const [values, setValues] = useState('');
    const [loading, setLoading] = useState(false);

    const handleChange = name => event => {
        setValues({ ...values, [name]: event.target.value });
    };

    const handleClickShowPassword = () => {
        setValues({ ...values, showPassword: !values.showPassword });
    };
    
    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const entrar = () => {
        setLoading(true);        
        api.post('/auth', {
            username: values.name,
            password: values.password
        }).then(res => {
            let data = res.data;
            setLogado(data);
            setLoading(false);
        })
    };

    return(
        <div className="body-bg">
            <div className="col-lg-4 col-sm-6 col-xs-12">
                <div class="area" >
                    <ul class="circles">
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                        <li></li>
                    </ul>
                </div>
                <div>
                    <FontAwesomeIcon style={{ color: 'white' }} className='fa-2x' icon={faCheckCircle} />
                    <img src={logo}/>
                </div>
                <div className="loginForm">
                    <TextField
                        id="standard-name"
                        label="Name"
                        value={values.name}
                        className="loginField"
                        fullWidth
                        onChange={handleChange('name')}
                        margin="normal"
                    />
                    <br />
                    <FormControl fullWidth >
                        <InputLabel htmlFor="adornment-password">Senha</InputLabel>
                        <Input
                            id="adornment-password"
                            type={values.showPassword ? 'text' : 'password'}
                            value={values.password}
                            onChange={handleChange('password')}
                            endAdornment={
                                <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {values.showPassword ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>
                    <Button variant="contained" disabled={loading ? true : false} color="primary" onClick={entrar}>
                        {loading ? 'Carregando...' : 'Entrar'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

const mapStateToProps = () => {}
const { setLogado } = ActionsUser;
export default connect(mapStateToProps, {
    setLogado
})(Login);
