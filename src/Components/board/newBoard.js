import React, { Component } from "react";
import { connect } from 'react-redux';

import IconButton from "@material-ui/core/IconButton";
import Tooltip from "@material-ui/core/Tooltip";
import Zoom from '@material-ui/core/Zoom';

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@material-ui/core/DialogContent";

import TextField from '@material-ui/core/TextField';
import Button from "@material-ui/core/Button";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTimesCircle,
  faCheckCircle
} from "@fortawesome/free-solid-svg-icons";

import { addBoard } from '../../api/board';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom direction="up" ref={ref} {...props} />;
});

class newBoard extends Component {
    state = {
        open: false,
        maxWidth: "sm",
        values: { title: '', description: '' }
    }

    handleOpen = () => {
        this.setState({ open: true });
    };

    handleClose = () => {
        this.setState({ values: { title: '', description: '' }, open: false });
    };

    handleChange = name => event => {
        const { values } = this.state;
        this.setState({  values: { ...values, [name]: event.target.value } });
    };

    handleSubmit = () => {
        const { values } = this.state;
        const { user } = this.props;
        let dados = {
            title: values.title,
            description: values.description,
            creator: user._id,
            status: 'pendente'
        }
        
        addBoard(dados).then(res => {
            this.setState({  values: { title: '', description: '' }, open: false });
        })
    }

    render() {
        const { open, maxWidth, values } = this.state;
        return (
            <div>
                <Button style={{ color: 'white', margin: '0px 15px 0px 0px', padding: '5px 10px'  }} onClick={this.handleOpen}>
                    + Criar novo quadro
                </Button>

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
                                    <TextField
                                        id="standard-name"
                                        label="Titulo"
                                        value={values.title}
                                        onChange={this.handleChange('title')}
                                        margin="normal"
                                        style={{ marginTop: '0px' }}
                                    />
                                </div>
                                <div>
                                    <Tooltip title="Criar Board">
                                        <IconButton color="inherit" onClick={this.handleSubmit}>
                                            <FontAwesomeIcon
                                            style={{ color: "white" }}
                                            size="sm"
                                            icon={faCheckCircle}
                                            />
                                        </IconButton>
                                    </Tooltip>

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
                            <div className="task-description">
                                <TextField
                                    id="standard-name"
                                    label="Descrição"
                                    value={values.description}
                                    multiline
                                    fullWidth
                                    onChange={this.handleChange('description')}
                                    margin="normal"
                                    style={{ marginTop: '0px' }}
                                />
                            </div>
                        </DialogContent>
                    </div>
                </Dialog>
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

export default connect(mapStateToProps, {})(newBoard);
