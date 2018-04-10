import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import logo from './image/logo.svg'

class Checkbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isChecked: true,
        };
    }
    toggleChange = () => {
        this.setState({
            isChecked: !this.state.isChecked,
        });
    }
    render() {
        return (
            <label>
                <input type="checkbox"
                    checked={this.state.isChecked}
                    onChange={this.toggleChange}
                />
                <span></span>
            </label>
        );
    }
}

class Task extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            editing: false
        };
    }
    edit = () => {
        this.setState({ editing: true });
    }
    save = () => {
        this.props.updateTaskName(this.refs.newTaskName.value, this.props.index);
        this.setState({ editing: false });
    }
    remove = () => {
        this.props.deleteTaskfromList(this.props.index);
    }
    renderNormal() {
        return (
            <li>
                <div>
                    <Checkbox />
                    <label className="labelTaskName">{this.props.taskName}</label>
                    <button className='waves-effect waves-light btn' onClick={this.edit}><i className="material-icons">create</i></button>
                    <button className='waves-effect waves-light btn' onClick={this.remove}><i className="material-icons">delete</i></button>
                </div>
            </li>
        )
    }
    renderForm() {
        return (
            <li>
                <div>
                    <Checkbox />
                    <input className="inputTaskName" type="text" ref="newTaskName" value={this.props.taskName} />
                    <button className='waves-effect waves-light btn' onClick={this.save}><i className="material-icons">save</i></button>
                    <button className='waves-effect waves-light btn' onClick={this.remove}><i className="material-icons">delete</i></button>
                </div>
            </li>
        )
    }
    render() {
        if (this.state.editing) {
            return this.renderForm();
        } else {
            return this.renderNormal();
        }
    }
}

class TaskList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            tasks: [
                "hoi"
            ]
        };

        this.addTask = this.addTask.bind(this);
        this.updateTask = this.updateTask.bind(this);
        this.deleteTask = this.deleteTask.bind(this);
        this.getTasks = this.getTasks.bind(this);
    }

    addTask(createTaskName) {
        console.log('Add a Task: ' + createTaskName);
        var arr = this.state.tasks;
        arr.push(createTaskName);
        this.setState({ tasks: arr })
    }
    updateTask(newTaskName, i) {
        console.log('Update Task: ' + i + 'to: ' + newTaskName)
        var arr = this.state.tasks;
        arr[i] = newTaskName;
        this.setState({ tasks: arr });
    }
    deleteTask(i) {
        console.log('Removing Task: ' + i)
        var arr = this.state.tasks;
        arr.splice(i, 1);
        this.setState({ tasks: arr });
    }
    getTasks(taskname, i) {
        return (
            <Task key={i} index={i} taskName={taskname} updateTaskName={this.updateTask} deleteTaskfromList={this.deleteTask} />
        );
    }

    render() {

        return (
            <div>
                <div className="taskAddForm">
                    <form>
                        <input type="text" ref="createTaskName" />
                        <button className='btn' onClick={this.addTask}><i className="material-icons">add</i></button>
                    </form>
                </div>
                <hr />
                <div className="taskList">
                    <ul>
                        {this.state.tasks.map(this.getTasks)}
                    </ul>
                </div>

            </div>
        );
    }
}

class App extends React.Component {
    render() {
        return (
            <div className="app">
                <header className="app-header">
                    <img src={logo} className="app-logo" alt="logo" />
                    <h1 className="app-title">Welcome to React ToDo</h1>
                </header>
                <div className="container">
                    <p className="app-intro">
                        Vul de naam van je todo in en druk op de + button
                    </p>
                    <TaskList />
                </div>
            </div>
        );
    }
}

ReactDOM.render(<App />, document.getElementById('root'));