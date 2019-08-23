import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Creators as ActionsUser } from '../../store/ducks/usuario';

import logo from '../../img/Softasks.svg';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPowerOff, faSearch, faThList, faSpinner, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

import NewBoard from '../board/newBoard';

import '../../Styles/header.scss';

class Header extends Component {
    state = {
        info: [
            {
                title: 'Pendente',
                icon: faThList,
                info: 'pendente'
            },
            {
                title: 'Em Andamento',
                icon: faSpinner,
                info: 'andamento'
            },
            {
                title: 'Finalizadas',
                icon: faCheckSquare,
                info: 'finalizado'
            }
        ]
    }
    handleLogout = () => {
        const { setLogout } = this.props;
        setLogout();
    }

    render(){
        const { info } = this.state;
        const { tasksInfo } = this.props;

        return (
            <div>
                <AppBar position="static">
                    <Toolbar color="secondary" className="toolbar">
                        <div>
                            <FontAwesomeIcon style={{ color: 'white' }} className='fa-1x' icon={faCheckCircle} />
                            <img width="124px" src={logo} alt="Logo Softasks"/>
                        </div>
                        <div className="d-flex">
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            <IconButton color="inherit" onClick={ this.handleLogout }>
                                <FontAwesomeIcon style={{ color: '#FF7E7E' }} className='fa-xs' icon={faPowerOff} />
                            </IconButton>
                        </div>
                    </Toolbar>

                    <div className="sub-toolbar d-flex">
                        <NewBoard />

                        {   info.map((item) => {
                            return (
                                <Tooltip title={item.title}>
                                    <div style={{ backgroundColor: '#ffffff3d', padding: '5px 10px', borderRadius: '5px', margin: '0px 5px 0px 0px' }}>
                                        <FontAwesomeIcon style={{ color: 'white', margin: '0px 5px' }} className='fa-sm' icon={item.icon} />
                                        { tasksInfo ? tasksInfo[item.info] : '0' }
                                    </div>
                                </Tooltip>
                            )
                        })}

                        <IconButton className="sub-button" color="inherit">
                            <FontAwesomeIcon style={{ color: 'white' }} size="xs" icon={faSearch} />
                        </IconButton>
                    </div>
                </AppBar>
            </div>
        );
    }
}

const mapStateToProps = ({ usuario }) => {
    const { user } = usuario;
    return {
        user
    }
}
const { setLogout } = ActionsUser;
export default connect(mapStateToProps, {
    setLogout
})(Header);