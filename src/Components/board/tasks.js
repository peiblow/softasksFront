import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Creators as ActionsBoard } from '../../store/ducks/board';

import Paper from "@material-ui/core/Paper";
import OpenedTask from '../task/openTask';
import NewTask from '../task/newTask';
import DeleteTask from '../task/deleteTask';

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from '@material-ui/core/Zoom';
import Chip from '@material-ui/core/Chip';

import "../../Styles/app.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronLeft,
  faChevronRight
} from "@fortawesome/free-solid-svg-icons";

class TasksList extends Component {
    render(){
        const {
            tasks,
            boardActive,
            next,
            prev
        } = this.props;
        return(
            <div className="content-app flex-wrap">                    
                <div className="col-lg-3 col-md-12 col-sm-12 pendente">
                    <div className="pendente-title d-flex justify-content-between">
                        <p>Pendente</p>
                        <NewTask boardActive={boardActive} status="pendente"/>
                    </div>                      
                    { tasks.pendente.length > 0 ? (
                        <div className="pendente-content">{
                            tasks.pendente.map(item => {
                                return (
                                    <Zoom in={item}>
                                        <Paper
                                            className="task"
                                        >
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <h3>{item.title}</h3>
                                                    <Chip style={{ margin: '10px 0px', borderColor: 'red', color: 'red' }} variant="outlined" size="small" label={item.status.toUpperCase()} />
                                                </div>
                                                <div className="d-flex">
                                                    <DeleteTask task={item} />
                                                    <OpenedTask task={item} />
                                                </div>
                                            </div>
                                            <div className="task-navigation d-flex justify-content-end">
                                                <Tooltip title="Avançar Tarefa">
                                                    <IconButton color="inherit" onClick={() => next(item)}>
                                                        <FontAwesomeIcon
                                                            style={{ color: "white" }}
                                                            size="sm"
                                                            icon={faChevronRight}
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </Paper>
                                    </Zoom>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="no-tasks">
                            <p>Sem dados para exibir</p>
                            <NewTask boardActive={boardActive} status="pendente"/>
                        </div>
                    )}
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 andamento">
                    <div className="andamento-title d-flex justify-content-between">
                        <p>Andamento</p>
                        <NewTask boardActive={boardActive} status="andamento"/>
                    </div>
                    {tasks.andamento.length > 0 ? (
                        <div className="andamento-content">{
                            tasks.andamento.map(item => {
                                return (
                                    <Zoom in={item}>
                                        <Paper
                                            className="task"
                                        >
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <h3>{item.title}</h3>
                                                    <Chip style={{ margin: '10px 0px', borderColor: 'orange', color: 'orange' }} variant="outlined" size="small" label={item.status.toUpperCase()} />
                                                </div>
                                                <div className="d-flex">
                                                    <DeleteTask task={item} />
                                                    <OpenedTask task={item} />
                                                </div>
                                            </div>
                                            <div className="task-navigation d-flex justify-content-between">
                                                <Tooltip title="Voltar Tarefa">
                                                    <IconButton color="inherit" onClick={() => prev(item)}>
                                                        <FontAwesomeIcon
                                                            style={{ color: "white" }}
                                                            size="sm"
                                                            icon={faChevronLeft}
                                                        />
                                                    </IconButton>
                                                </Tooltip>

                                                <Tooltip title="Avançar Tarefa">
                                                    <IconButton color="inherit" onClick={() => next(item)}>
                                                        <FontAwesomeIcon
                                                            style={{ color: "white" }}
                                                            size="sm"
                                                            icon={faChevronRight}
                                                        />
                                                    </IconButton>
                                                </Tooltip>
                                            </div>
                                        </Paper>
                                    </Zoom>
                                );
                            })}
                        </div>
                    ) : (
                        <div className="no-tasks">
                            <p>Sem dados para exibir</p>
                            <NewTask boardActive={boardActive} status="andamento"/>
                        </div>
                    )}
                </div>
                <div className="col-lg-3 col-md-12 col-sm-12 concluido">
                    <div className="concluido-title d-flex justify-content-between">
                        <p>Concluido</p>
                        <NewTask boardActive={boardActive} status="finalizado"/>
                    </div>
                    {tasks.finalizado.length > 0 ? (
                        <div className="concluido-content">{
                            tasks.finalizado.map(item => {
                                return (
                                    <Zoom in={item}>
                                        <Paper
                                                className="task"
                                        >
                                            <div className="d-flex justify-content-between">
                                                <div>
                                                    <h3>{item.title}</h3>
                                                    <Chip style={{ margin: '10px 0px', borderColor: 'green', color: 'green' }} variant="outlined" size="small" label={item.status.toUpperCase()} />
                                                </div>
                                                <div className="d-flex">
                                                    <DeleteTask task={item} />
                                                    <OpenedTask task={item} />
                                                </div>
                                            </div>
                                            <div className="task-navigation d-flex justify-content-start">
                                                <Tooltip title="Voltar Tarefa">
                                                    <IconButton color="inherit" onClick={() => prev(item)}>
                                                        <FontAwesomeIcon
                                                            style={{ color: "white" }}
                                                            size="sm"
                                                            icon={faChevronLeft}
                                                        />
                                                     </IconButton>
                                                </Tooltip>
                                            </div>
                                        </Paper>
                                    </Zoom>
                                );
                            })}
                        </div>
                    ):(
                        <div className="no-tasks">
                            <p>Sem dados para exibir</p>
                            <NewTask boardActive={boardActive} status="finalizado"/>
                        </div>
                    )}
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ board }) => {
    const { 
        tasks,
        boards,
        boardActive
    } = board;

    return {
        tasks,
        boards,
        boardActive
    }
}
const { setBoards } = ActionsBoard;

export default connect(mapStateToProps, {
    setBoards
})(TasksList);