import React, { Component } from "react";
import { connect } from 'react-redux';
import { Creators as ActionsBoard } from '../../store/ducks/board';

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from '@material-ui/core/Zoom';
import Chip from '@material-ui/core/Chip';

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";
import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckCircle,
  faPlusSquare,
  faExternalLinkAlt,
  faPenSquare
} from "@fortawesome/free-solid-svg-icons";

import api from '../../api/api';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom direction="up" ref={ref} {...props} />;
});

class OpenedTask extends Component {
    state = {
        open: false,
        taskSelecionada: [],
        maxWidth: "sm",
        edit: false,
        values: {}
    }

    handleOpen = (task) => {
        this.setState({ 
            taskSelecionada: task, 
            open: true,
            values: {
                title: task.title,
                description: task.description
            }
        });
    };

    handleClose = () => {
        this.setState({ taskSelecionada: [], open: false, edit: false });
    };

    handleEdit = () => {
        this.setState({ edit: true })
    }

    handleChange = name => event => {
        const { values } = this.state;
        this.setState({  values: { ...values, [name]: event.target.value } });
    };

    handleSubmitEdit = () => {
        const { values } = this.state;
        const { task, onAtualizar, setBoards, boards, boardActive } = this.props;

        let payload = {
            title: values.title,
            description: values.description
        }

        api.put('/task/' + task.board, {
            taskId: task._id,
            payload: {
                title: values.title,
                description: values.description
            }
        }).then(async res => {
            await onAtualizar({
                payload,
                task
            })

            await setBoards({
                boards,
                board: boardActive
            })

            this.setState({
                edit: false,
                taskSelecionada: {
                    ...task,
                    ...payload
                }
            });
        })
    }

    render() {
        const { open, taskSelecionada, maxWidth, edit, values } = this.state;
        const { task } = this.props
        return (
            <div>
                <Tooltip title="Abrir Task">
                    <IconButton size="medium" color="inherit" onClick={this.handleOpen.bind(this, task)}>
                        <FontAwesomeIcon
                            style={{ color: "teal" }}
                            size="xs"
                            icon={faExternalLinkAlt}
                        />
                    </IconButton>
                </Tooltip>

                <Dialog
                    open={open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    maxWidth={maxWidth}
                    fullWidth
                >
                    <div className="dialog-content">
                        <DialogContent style={{ padding: "0px" }}>
                            <div className="headerDialog d-flex">
                                <div className="task-title">
                                    {edit == false ?
                                        taskSelecionada.title
                                    :(
                                        <TextField
                                            id="standard-name"
                                            label="Titulo"
                                            value={values.title}
                                            onChange={this.handleChange('title')}
                                            margin="normal"
                                            style={{ marginTop: '0px' }}
                                        />
                                    )}                                                                   
                                </div>
                                    <div>
                                        <Tooltip title="Editar tarefa">
                                            <IconButton color="inherit" onClick={this.handleEdit}>
                                                <FontAwesomeIcon
                                                    style={{ color: "white" }}
                                                    size="sm"
                                                    icon={faPenSquare}
                                                />
                                            </IconButton>
                                        </Tooltip>

                                        <Tooltip title="Fechar tarefa">
                                            <IconButton color="inherit" onClick={this.handleClose}>
                                                <FontAwesomeIcon
                                                style={{ color: "white" }}
                                                size="sm"
                                                icon={faTimesCircle}
                                                />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                </div>
                                <div className="task-labels">
                                    {taskSelecionada.labels
                                        ? taskSelecionada.labels.map(item => {
                                            return (
                                            <Chip
                                                style={{ borderColor: "white", color: "white" }}
                                                label={item}
                                                variant="outlined"
                                            />
                                            );
                                        })
                                        : ""}

                                    <Tooltip title="Adicionar Label">
                                        <IconButton
                                        color="inherit"
                                        size="medium"
                                        onClick={this.handleDrawerClose}
                                        >
                                        <FontAwesomeIcon
                                            style={{ color: "white" }}
                                            size="sm"
                                            icon={faPlusSquare}
                                        />
                                        </IconButton>
                                    </Tooltip>
                                </div>
                            <div className="task-description">                                
                                {edit == false ?
                                    taskSelecionada.description
                                :(
                                    <TextField
                                        id="standard-name"
                                        label="Description"
                                        value={values.description}
                                        fullWidth
                                        multiline
                                        onChange={this.handleChange('description')}
                                        margin="normal"
                                        style={{ marginTop: '0px' }}
                                    />
                                )} 
                            </div>
                            {edit == true ?(
                                <div className="edit-action-task d-flex justify-content-end">
                                    <Button style={{ color: 'white', margin: '5px 0px', padding: '5px 10px'  }} onClick={() => this.setState({ edit:false })}>
                                        Cancelar
                                    </Button>
                                    <Button style={{ color: 'green', margin: '5px 10px 5px 0px', padding: '5px 10px'  }} onClick={this.handleSubmitEdit}>
                                        Salvar
                                    </Button>
                                </div>
                            ):(
                                ''
                            )}
                        </DialogContent>
                    </div>
                </Dialog>
            </div>
        );
    }
}

const mapStateToProps = ({ board }) => {
    const { boards, boardActive } = board

    return {
        boards,
        boardActive
    }
}
const { onAtualizar, setBoards } = ActionsBoard;
export default connect(mapStateToProps, {
    onAtualizar,
    setBoards
})(OpenedTask);
