import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import images from "../images/clear-road.png";

// const weightWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-evenly;
//   height: 100vh;
//   font-family: "Indie Flower", cursive;
//   background-color: darkgreen;
//   background-image: url(${images});
//   background-size: cover;
//   color: white;
//   text-decoration-line: underline;
//   text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
//     1px 1px 0 #000;

//   h1 {
//     font-size: 4em;
//   }

//   a {
//     font-size: 2em;
//     color: white;
//   }

//   .bback {
//     font-size: 1.5em;
//     background: transparent;
//     border-radius: 35%;
//     outline: 0.5em;
//   }
// `;

class weight extends Component {
  state = {
    weight: [],
    newWeight: {
      description: ""
    }
  };

  componentDidMount = () => {
    axios.get("/weight").then(res => {
      console.log(res.data);
      this.setState({ weight: res.data });
    });
  };

  handleChange = e => {
    const cloneNewWeight = { ...this.state.newWeight };
    cloneNewWeight[e.target.name] = e.target.value;
    this.setState({ newWeight: cloneNewWeight });
  };

  createWeight = e => {
    e.preventDefault();
    axios
      .post("/weight", {
        name: this.state.newWeight.name,
        description: this.state.newWeight.description
      })
      .then(res => {
        const weightList = [...this.state.weight];
        weightList.unshift(res.data);
        this.setState({
          newWeight: {
            // name: "",
            description: ""
          },
          // isweightDisplayed: false,
          weight: weightList
        });
      });
  };

  deleteweight = weightId => {
    axios.delete(`/weight/${weightId}`).then(res => {
      const weightClone = this.state.weight.filter(
        item => item._id !== weightId
      );

      this.setState({ weight: weightClone });
    });
  };

  render() {
    return (
      <WeightWrapper>
        <h1>Weight Gains</h1>
        {this.state.weight.map(weight => {
          return (
            <div key={weight._id}>
              <Link to={`/${weight._id}`}>{weight.description}</Link>
              <button
                className="bback"
                onClick={() => this.deleteweight(weight._id)}
              >
                ✅
              </button>
            </div>
          );
        })}

        <form onSubmit={this.createWeight}>
          <div>
            <label htmlFor="description">New To-do Task</label>
            <textarea
              id="description"
              type="text"
              name="description"
              onChange={this.handleChange}
              value={this.state.newWeight.description}
            />
          </div>
          <button>Add Task</button>
        </form>
      </WeightWrapper>
    );
  }
}

export default weight;
