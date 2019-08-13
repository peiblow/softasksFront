import React, { Component } from "react";
import { connect } from 'react-redux';
import api from '../api/api';
import io from 'socket.io-client';

import { Creators as ActionsBoard } from '../store/ducks/board';

import Toolbar from "../Components/Header/index";

import TaskList from '../Components/board/tasks';

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import "../Styles/app.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faChevronDown, faTimesCircle, faPenSquare,
} from "@fortawesome/free-solid-svg-icons";

class App extends Component {
    state = {
        tasks: {
            pendente: [],
            andamento: [],
            finalizado: []
        },

        taskSelecionada: [],
        boards: [],
        boardActive: '',
        info: {},
        anchorEl: null,
    };

    UNSAFE_componentWillMount() {
        const { user, setBoards } = this.props;
        const socket = io(process.env.DEV_URL ? process.env.DEV_URL : 'http://localhost:3001');

        api.get('/', {
            creator: user._id
        }).then(res => {
            if(res.data.length > 0) {
                let board = res.data[0];
                let boards = res.data.map((item) => {
                    return  { name: item.title, id: item._id, tasks: item.tasks }
                });
                setBoards({ board, boards })
                setBoardActive({ board }) 
            }else{
                setBoards({ board: {
                    title: '',
                    id: '',
                    tasks: [{ pendente: [], andamento: [], finalizado: [] }]
                }, boards: [] }); 
            }
        });

        socket.on('NewBoard', board => {
            const { boards, setBoards, setBoardActive } = this.props;
            setBoards({
                boards: [ ...boards, { name: board.title, id: board._id, tasks: [{ pendente: [], andamento: [], finalizado: [] }] } ],
                board: { name: board.title, id: board._id, tasks: [{ pendente: [], andamento: [], finalizado: [] }] }
            });
        });

        socket.on('NewTask', board => {
            const { boards, boardActive, setBoards } = this.props;
            
            boards.map((item) => {
                return item.id == board.board ? 
                    board.status == 'pendente' ? item.tasks[0].pendente.push(board) :
                    board.status == 'andamento' ? item.tasks[0].andamento.push(board) :
                    board.status == 'finalizado' ? item.tasks[0].finalizado.push(board) : ''
                : ''
            });

            setBoards({ boards, board: boardActive });
        });

        socket.on('taskRemoved', task => {
            const { boards, boardActive, setBoards } = this.props;
            
            let newBoard = []
            let newTask = []
            newBoard = boards.map((item) => {
                if(item.id == task.board){                
                    newTask = item.tasks[0][task.status].filter((item) => item._id !== task._id)
                    item.tasks[0][task.status] = newTask;
                    return item             
                }else{
                    return item
                }
            }); 

            setBoards({
                boards: newBoard,
                board: boardActive
            })
        })
    }

    handleChange = (value) => {
        const { boards, setBoardActive } = this.props;
        let boardSelect = value

        this.setState({ anchorEl: null })
        boards.map((item) => {
            return item.id === boardSelect ?                
                setBoardActive({ item })                
            : '';
        });
    }

    handleClick = (event) => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    handleNextStatus = async (task) => {
        const { boards, boardActive, setNextState, setBoards } = this.props;

        let nextStatus = ''
        switch(task.status) {
            case 'pendente':
                nextStatus = 'andamento'
                break;
            case 'andamento':
                nextStatus = 'finalizado'
                break;
            default:
                console.log('Error')
        }

        await setNextState({ task, nextStatus })
        await boards.map((item) => {
            return item.id === task.board ? 
                setBoards({                        
                    board: item,
                    boards
                }) : '';
        });
        
        api.put('/task/' + task.board,{
            taskId: task._id,
            payload: {
                status: nextStatus
            }
        })
    }

    handlePrevStatus = async (task) => {
        const { boards, setNextState, setBoards } = this.props;

        let nextStatus = ''
        switch(task.status) {
            case 'andamento':
                nextStatus = 'pendente'
                break;
            case 'finalizado':
                nextStatus = 'andamento'
                break;
            default:
                console.log('Error')
        }

        await setNextState({ task, nextStatus })
        boards.map((item) => {
            return item.id === task.board ? 
                setBoards({                        
                    board: item,
                    boards
                }) : '';
        });

        api.put('/task/' + task.board,{
            taskId: task._id,
            payload: {
                status: nextStatus
            }
        })
    }

    render() {
        const { tasks, anchorEl } = this.state;
        const { boards, boardActive, info } = this.props;

        return (
            <div className="app">
                <Toolbar tasksInfo={info} />
                { boards.length > 0 ? ( <div>
                <br/>
                <div className="d-flex justify-content-center">
                    <div className="d-flex board-select" style={{ margin: '0px 10px 0px 0px' }}>
                        <p>{boardActive.name}</p>
                        <div>
                            <Tooltip title="Selecionar Quadro">                        
                                <IconButton style={{ padding: '5px', margin: '0px 5px', outline: 'none !important' }} size="medium" color="inherit" onClick={this.handleClick}>
                                    <FontAwesomeIcon
                                        style={{ color: "teal" }}
                                        size="sm"
                                        icon={faChevronDown}
                                    />
                                </IconButton>
                            </Tooltip>
                            <Menu
                                id="simple-menu"
                                anchorEl={anchorEl}
                                open={Boolean(anchorEl)}
                                onClose={this.handleClose}                    
                            >
                                {   boards.map((item) => {
                                    return (
                                        <MenuItem value={item.id} onClick={this.handleChange.bind(this, item.id)}>{ item.name }</MenuItem>   
                                    )
                                })}
                            </Menu>
                        </div>
                    </div>
                    <div className="d-flex">
                        <Tooltip title="Editar Quadro">
                            <IconButton color="inherit" onClick={this.handleEditBoard}>
                                <FontAwesomeIcon
                                    color="primary"
                                    size="sm"
                                    icon={faPenSquare}
                                />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="Excluir Quadro">
                            <IconButton color="inherit" onClick={this.handleClose}>
                                <FontAwesomeIcon
                                    color="primary"
                                    size="sm"
                                    icon={faTimesCircle}
                                />
                            </IconButton>
                        </Tooltip>
                    </div>
                </div>

                <div>
                    <TaskList 
                        next={(item) => this.handleNextStatus(item)}
                        prev={(item) => this.handlePrevStatus(item)}
                    />
                </div>
            </div>):(<h4 style={{ margin: '50px', textAlign: 'center' }}>Você não possui quadros ainda, crie um agora mesmo :)</h4>)}
            </div>
        );
    }
}
const mapStateToProps = ({ usuario, board }) => {
    const { user } = usuario;
    const { boards, boardActive, info } = board
    return {
        user,
        boards,
        boardActive,
        info
    }
}
const { setBoards, setBoardActive, setNextState } = ActionsBoard
export default connect(mapStateToProps, {
    setBoards,
    setBoardActive,
    setNextState
})(App);
