import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";

// const CaloriesWrapper = styled.div`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: space-evenly;
//   height: 100vh;
//   font-size: 4em;
//   background-image: url(${images});
//   background-size: cover;
//   color: lightblue;
//   text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
//     1px 1px 0 #000;

//   h1 {
//     font-size: 4em;
//   }

//   .button {
//     font-size: 5em;
//     color: lightblue;
//   }
// `;

class calories extends Component {
  state = {
    calories: {}
  };

  componentDidMount = () => {
    axios.get(`/calories/${this.props.match.params.id}`).then(res => {
      console.log(res.data);
      this.setState({ calories: res.data });
    });
  };

  updateCalories = () => {
    axios
      .patch(`/calories/${this.props.match.params.id}`, this.state.calories)
      .then(res => {
        this.setState({ calories: res.data, isEditFormDisplayed: false });
      });
  };

  createCalories = () => {
    axios.post("/calories", {
      description: this.state.calories,
      item: this.state.calories.description
    });
  };

  onCaloriesChange = event => {
    let calories = event.target.value;
    this.setState({ calories: calories });
  };

  handleChange = event => {
    let caloriesClone = this.state.calories;
    const value = event.target.value;

    caloriesClone.description = value;
    this.setState({ calories: caloriesClone });
  };

  render() {
    return (
        <div>
        <h1>Calories</h1>
        <div>
          {this.state.calories.description}

          <div key={calories._id}>
            <form>
              <textarea
                name="description"
                onChange={this.handleChange}
                value={this.state.calories.description}
              />
            </form>

            <Link to={`/`}>
              <button onClick={() => this.updateCalories(calories._id)}>
                Update
              </button>
            </Link>

            <textarea name="calories" onChange={this.onCaloriesChange}>
              {this.state.calories}
            </textarea>
            <Link to="/calories">
              <button onClick={this.createCalories}>Calories</button>
            </Link>
          </div>
        </div>
        </div>
    );
  }
}

export default calories;
