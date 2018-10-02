import React, { Component } from 'react'
import Todo from "./Todo";
import { connect } from 'react-redux';


class TodoList extends Component {
    constructor(props){
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.removeTodo = this.removeTodo.bind(this);
        this.state = {
            task: ""
        }
    }
    
    handleSubmit(e){
        e.preventDefault();
        this.props.dispatch({
            type:"ADD_TODO",
            task: this.state.task
        })
        e.target.reset();
    }
    
    handleChange(e){
        this.setState({
            [e.target.name]: e.target.value
        })
    }
    
    removeTodo(id){
        debugger;
        this.props.dispatch({
            type: "REMOVE_TODO",
            id
        })
    }
    
    render(){
        let todos = this.props.todos.map((val, i) => {
            return <Todo removeTodo={this.removeTodo.bind(this, val.id)} task={val.task} key={i} />
        })
        return (
            <div>
            <form onSubmit={this.handleSubmit}>
                <label>Task</label>
                <input type="text" name="task" id="task" onChange={this.handleChange}/>
                <button>Add</button>
            </form>
                <ul>{todos}</ul>
            </div>
        )
    }
}

function mapStateToProps(reduxState){
    return {
        todos: reduxState.todos
    }
}

export default connect(mapStateToProps)(TodoList);