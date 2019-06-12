import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

// const TodoWrapper = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: space-evenly;
//     height: 100vh;
//     font-family: 'Indie Flower', cursive;
//     background-color: darkgreen;
//     background-image: url(${images});
//     background-size: cover;
//     color: white;
//     text-decoration-line: underline;
//     text-shadow:
//     -1px -1px 0 #000,
//     1px -1px 0 #000,
//     -1px 1px 0 #000,
//      1px 1px 0 #000;

//     h1 {
//       font-size: 4em;
//     }

//     a {
//       font-size: 2em;
//       color: white;
//     }

//     .bback{
//     font-size: 1.5em;
//     background: transparent;
//     border-radius: 35%;
//     outline: .5em;
//     }
// `

class users extends Component {
  state = {
    users: [],
    newUser: {
      description: ""
    }
  };

  componentDidMount = () => {
    axios.get("/users").then(res => {
      console.log(res.data);
      this.setState({ users: res.data });
    });
  };

  handleChange = e => {
    const cloneNewUser = { ...this.state.newUser };
    cloneNewUser[e.target.name] = e.target.value;
    this.setState({ newUser: cloneNewUser });
  };

  createUser = e => {
    e.preventDefault();
    axios
      .post("/users", {
        name: this.state.newUser.name,
        description: this.state.newUser.description
      })
      .then(res => {
        const userList = [...this.state.user];
        userList.unshift(res.data);
        this.setState({
          newUser: {
            // name: "",
            description: ""
          },
          // isTodoItemDisplayed: false,
        //   user: user
        });
      });
  };

  deleteUser = userId => {
    axios.delete(`/users/${userId}`).then(res => {
      const userClone = this.state.user.filter(item => item._id !== userId);

      this.setState({ user: userClone });
    });
  };

  render() {
    return (
      <div>
        <h1>Users</h1>
        {this.state.users.map(user => {
          return (
            <div key={user._id}>
              <Link to={`/${user._id}`}>{user.description}</Link>
              <button
                className="bback"
                onClick={() => this.deleteUser(user._id)}
              >
                ✅
              </button>
            </div>
          );
        })}
        {/* <button onClick={this.toggleTodoItemForm}>+ New TodoItem</button> */}
        {/* {this.state.isTodoItemDisplayed ? ( */}
        <form onSubmit={this.createUser}>
          {/* <div>
              <label htmlFor="name">Name</label>
              <input
                id="name"
                type="text"
                // name="name"
                onChange={this.handleChange}
                defaultValue={this.state.newTodoItem.value}
              />
            </div> */}
          <div>
            <label htmlFor="description">Users</label>
            <textarea
              id="description"
              type="text"
              name="description"
              onChange={this.handleChange}
              value={this.state.newUser.description}
            />
          </div>
          <button>Add Task</button>
        </form>
        {/* ) : null} */}
      </div>
    );
  }
}

export default users;
