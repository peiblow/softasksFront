import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Creators as ActionsUser } from '../../store/ducks/usuario';

import logo from '../../img/Softasks.svg';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from "@material-ui/core/Button";
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import Avatar from '@material-ui/core/Avatar';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faPowerOff, faSearch, faThList, faSpinner, faCheckSquare } from '@fortawesome/free-solid-svg-icons';

import NewBoard from '../board/newBoard';

import '../../Styles/header.scss';

class Header extends Component {
    handleLogout = () => {
        const { setLogout } = this.props;
        setLogout();
    }

    render(){
        const { tasksInfo } = this.props;

        return (
            <div>
                <AppBar position="static">
                    <Toolbar color="secondary" className="toolbar">
                        <div>
                            <FontAwesomeIcon style={{ color: 'white' }} className='fa-1x' icon={faCheckCircle} />
                            <img width="124px" src={logo}/>
                        </div>
                        <div className="d-flex">
                            <Avatar alt="Remy Sharp" src="https://material-ui.com/static/images/avatar/1.jpg" />
                            <IconButton color="inherit" onClick={ this.handleLogout }>
                                <FontAwesomeIcon style={{ color: '#FF7E7E' }} className='fa-xs' icon={faPowerOff} />
                            </IconButton>
                        </div>
                    </Toolbar>

                    <div className="sub-toolbar d-flex">                        
                        {/* <Button style={{ color: 'white', margin: '0px 15px 0px 0px', padding: '0px 10px'  }}>
                            + Criar novo quadro
                        </Button> */}
                        <NewBoard />
                        <Tooltip title="Pendente">
                            <div style={{ backgroundColor: '#ffffff3d', padding: '5px 10px', borderRadius: '5px', margin: '0px 5px 0px 0px' }}>
                                <FontAwesomeIcon style={{ color: 'white', margin: '0px 5px' }} className='fa-sm' icon={faThList} />
                                { tasksInfo ? tasksInfo.pendente : '0' }
                            </div>
                        </Tooltip>

                        <Tooltip title="Em Andamento">
                            <div style={{ backgroundColor: '#ffffff3d', padding: '5px 10px', borderRadius: '5px', margin: '0px 5px 0px 0px' }}>
                                <FontAwesomeIcon style={{ color: 'white', margin: '0px 5px' }} className='fa-sm' icon={faSpinner} />
                                { tasksInfo ? tasksInfo.andamento : '0' }
                            </div>
                        </Tooltip>

                        <Tooltip title="Finalizadas">
                            <div style={{ backgroundColor: '#ffffff3d', padding: '5px 10px', borderRadius: '5px', margin: '0px 20px 0px 0px' }}>
                                <FontAwesomeIcon style={{ color: 'white', margin: '0px 6px' }} className='fa-sm' icon={faCheckSquare} />
                                { tasksInfo ? tasksInfo.finalizado : '0' }
                            </div>
                        </Tooltip>

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