import { createActions, createReducer } from 'reduxsauce';

export const { Types, Creators } = createActions({
    setBoards: [ 'payload' ],
    setBoardActive: [ 'payload' ],
    setNextState: [ 'payload' ],
    onAtualizar: [ 'payload' ]
});

const INITIAL_STATE = {
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

export const setBoards = (state = INITIAL_STATE, action) => {
    const { board, boards } = action.payload;
    
    let tasks,
        info,
        boardActive = []

    boards.forEach((item) => {
        return item.id === board.id || item.id === board._id ? (
            tasks = {
                pendente: item.tasks[0].pendente,
                andamento: item.tasks[0].andamento,
                finalizado: item.tasks[0].finalizado
            },
        
            info = {
                pendente: item.tasks[0].pendente.length,
                andamento: item.tasks[0].andamento.length,
                finalizado: item.tasks[0].finalizado.length
            },
            
            boardActive = {
                name: item.title || item.name,
                id: item._id || item.id,
                tasks: item.tasks
            }
        ):(
            tasks = {
                pendente: item.tasks[0].pendente,
                andamento: item.tasks[0].andamento,
                finalizado: item.tasks[0].finalizado
            },
        
            info = {
                pendente: item.tasks[0].pendente.length,
                andamento: item.tasks[0].andamento.length,
                finalizado: item.tasks[0].finalizado.length
            },
            
            boardActive = {
                name: item.title || item.name,
                id: item._id || item.id,
                tasks: item.tasks
            }
        );
    });

    return {
        ...state,
        tasks,
        info,
        boardActive,
        boards
    }
};

export const setBoardActive = (state = INITIAL_STATE, action) => {
    const { item } = action.payload;
    
    return {
        ...state,
        tasks: item.tasks[0],
        info:{
            pendente: item.tasks[0] && item.tasks[0].pendente.length,
            andamento:  item.tasks[0] && item.tasks[0].andamento.length,
            finalizado:  item.tasks[0] && item.tasks[0].finalizado.length,
        },
        boardActive: item,
    }
}

export const setNextState = (state = INITIAL_STATE, action) => {
    const { task, nextStatus } = action.payload;
    const boards = state.boards;

    let filterBoard = '';
    boards.map((item) => {
        if(item.id == task.board){                
            filterBoard = item.tasks[0][task.status].filter((item) => item._id !== task._id)
            item.tasks[0][task.status] = filterBoard;
            return item             
        }else{
            return item
        }
    });

    let newTask = {
        ...task,
        status: nextStatus
    }
    let newBoards = [];
    newBoards = boards.map((item) => {
        if(item.id == task.board){
            if(newTask.status == 'pendente' )
                item.tasks[0].pendente.push(newTask)

            if(newTask.status == 'andamento')
                item.tasks[0].andamento.push(newTask)

            if(newTask.status == 'finalizado')
                item.tasks[0].finalizado.push(newTask)
            
            return item
        }else{
            return item
        }
    });

    return {
        ...state,
        boards: newBoards
    }
}

export const onAtualizar = (state = INITIAL_STATE, action) => {
    const { task, payload } = action.payload;
    const boards = state.boards;
    
    let filterBoard = '';
    boards.map((item) => {
        if(item.id == task.board){                
            filterBoard = item.tasks[0][task.status].filter((item) => item._id !== task._id)
            item.tasks[0][task.status] = filterBoard;
            return item             
        }else{
            return item
        }
    });

    let newTask = {
        ...task,
        ...payload
    }

    let newBoards = [];
    newBoards = boards.map((item) => {
        if(item.id == task.board){
            if(newTask.status == 'pendente' )
                item.tasks[0].pendente.push(newTask)

            if(newTask.status == 'andamento')
                item.tasks[0].andamento.push(newTask)

            if(newTask.status == 'finalizado')
                item.tasks[0].finalizado.push(newTask)
            
            return item
        }else{
            return item
        }
    });

    return {
        ...state,
        boards: newBoards
    }
}

export const HANDLERS = {
    [Types.SET_BOARDS]: setBoards,
    [Types.SET_BOARD_ACTIVE]: setBoardActive,
    [Types.SET_NEXT_STATE]: setNextState,
    [Types.ON_ATUALIZAR]: onAtualizar
}

export default createReducer(INITIAL_STATE, HANDLERS)