import React, { Component } from "react";

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from '@material-ui/core/Zoom';

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import Button from "@material-ui/core/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faTrash
} from "@fortawesome/free-solid-svg-icons";

import api from '../../api/api';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom direction="up" ref={ref} {...props} />;
});

class deleteTask extends Component {
    state = {
        open: false,
        maxWidth: "sm"
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ open: false });
    };

    handleSubmit = () => {
        const { task } = this.props;
        api.get('/task/' + task.board, {
            taskId: task._id
        }).then(res => {
            this.setState({ open: false });
        })
    }

    render() {
        const { open, maxWidth } = this.state;
        const { task } = this.props;
        return (
            <div>
                <Tooltip title="Excluir Tarefa">
                    <IconButton color="inherit" onClick={this.handleOpen}>
                        <FontAwesomeIcon
                            style={{ color: "teal" }}
                            size="sm"
                            icon={faTrash}
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
                                <div className="task-title">{task.title}</div>
                                <div>
                                    <Tooltip title="Fechar">
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
                            <div className="task-description d-flex">
                                <h5 style={{ margin: '0px 20px 0px 0px' }}> 
                                    Você realmente deseja excluir essa task? 
                                </h5>
                                <Button size="small" color="primary" variant="contained" onClick={this.handleSubmit}>
                                    Remover
                                </Button>
                            </div>
                        </DialogContent>
                    </div>
                </Dialog>
            </div>
        );
    }
}

export default deleteTask;
