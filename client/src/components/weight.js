import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
// import styled from "styled-components";

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

class Weight extends Component {
  state = {
    weight: [],
    newWeight: {
      weightGoal: 135,
      currentWeight: 125,
      weightGained: 0,
      weightLost: 0,
      userId: this.props.user._id
    },
    isEditDisplayed: false,
    editWeight: {
      weightGoal: 0,
      currentWeight: 0,
      weightGained: 0,
      weightLost: 0,
      userId: this.props.user._id
    },

    calories: [],
    newCalories: {
      caloriesNeeded: 2000,
      caloriesConsumed: 0,
      userId: this.props.user._id

    },
  };

  componentDidMount = async () => {
    await this.refreshPage();
  };

  refreshPage = async () => {
    const weightListResponse = await axios.get(
      `/users/${this.props.user._id}/weight`
    );
    const caloriesResponse = await axios.get(
      `/users/${this.props.user._id}/calories`
    );
    this.setState({
      weight: weightListResponse.data,
      newWeight: {
        weightGoal: 135,
        currentWeight: 125,
        weightGained: 0,
        weightLost: 0,
        userId: this.props.user._id
      },
      editWeight: {
        weightGoal: 0,
        currentWeight: 0,
        weightGained: 0,
        weightLost: 0,
        userId: this.props.user._id
      },
      isEditDisplayed: false,

      calories: caloriesResponse.data,
      newCalories: {
        caloriesNeeded: 2000,
        caloriesConsumed: 0,
        userId: this.props.user._id
      }    
    });
  };


  //New calories for change
  handleCaloriesChange = e => {
    const cloneNewCalories = { ...this.state.newCalories };
    cloneNewCalories[e.target.name] = e.target.value;
    this.setState({ newCalories: cloneNewCalories });
  };

  createCalories = async e => {
    e.preventDefault();
    await axios.post("/calories", this.state.newCalories);
    await this.refreshPage();
  };

  deleteCalories = async caloriesId => {
    await axios.delete(`/calories/${caloriesId}`);
    await this.refreshPage();
  };


  //This is so we can view the weight edit form
  onEditEnabled = weight => {
    this.setState({ editWeight: weight, isEditDisplayed: true });
  };


  //New Weight form change so we can type in the form
  handleChange = e => {
    const cloneNewWeight = { ...this.state.newWeight };
    cloneNewWeight[e.target.name] = e.target.value;
    this.setState({ newWeight: cloneNewWeight });
  };


  //So we can edit the weight
  handleEditChange = e => {
    const cloneEditWeight = { ...this.state.editWeight };
    cloneEditWeight[e.target.name] = e.target.value;
    this.setState({ editWeight: cloneEditWeight });
  };

  //Saves to the backend
  editWeight = async e => {
    e.preventDefault();
    await axios.patch(
      `/weight/${this.state.editWeight._id}`,
      this.state.editWeight
    );
    await this.refreshPage();
  };

  createWeight = async e => {
    e.preventDefault();
    await axios.post("/weight", this.state.newWeight);
    await this.refreshPage();
  };

  
  deleteweight = async weightId => {
    await axios.delete(`/weight/${weightId}`);
    await this.refreshPage();
  };

  render() {
    return (
      <div>
        {this.props.user.email} - {this.props.user.name}
        <button onClick={this.props.onUserDeleted}>Delete My Account</button>
        <this.WeightComponent />
        <this.CaloriesComponent />
      </div>
    );
  }


  //A way to create comonents within another component
  CaloriesComponent = () => (
    <div>
      <h1>Calories</h1>

      {/* Diplay all the calories */}
      {this.state.calories.map(calories => (
        <div key={calories._id}>
          <h2>Calories Entry</h2>
          <div>
            <p>Needed : {calories.caloriesNeeded}</p>
            <p>Consumed: {calories.caloriesConsumed}</p>
          </div>
          <button onClick={() => this.deleteCalories(calories._id)}>
            Remove
          </button>
        </div>
      ))}
      <form onSubmit={this.createCalories}>
        <label htmlFor="caloriesNeeded">Needed</label>
        <input
          type="number"
          id="caloriesNeeded"
          name="caloriesNeeded"
          value={this.state.newCalories.caloriesNeeded}
          onChange={this.handleCaloriesChange}
        />
        <label htmlFor="caloriesConsumed">Consumed</label>
        <input
          type="number"
          id="caloriesConsumed"
          name="caloriesConsumed"
          value={this.state.newCalories.caloriesConsumed}
          onChange={this.handleCaloriesChange}
        />
        <button>Add</button>
      </form>
    </div>
  );

  WeightComponent = () => (
    <div>
      <h1>Weight Gains</h1>
      {this.state.isEditDisplayed && <this.EditWeightForm />}

      {/* Display all the weights */}
      {this.state.weight.map(weight => (
        <div key={weight._id}>
          <h2>Weight Entry</h2>
          <div>
            <p>Goal: {weight.weightGoal}</p>
            <p>Weight: {weight.currentWeight}</p>
            <p>Gained: {weight.weightGained}</p>
            <p>Lost: {weight.weightLost}</p>

            <button onClick={() => this.onEditEnabled(weight)}>Edit</button>
          </div>
          <button onClick={() => this.deleteweight(weight._id)}>Remove</button>
        </div>
      ))}
      <form onSubmit={this.createWeight}>
        <label htmlFor="weightGoal">Weight Goal</label>
        <input
          type="number"
          id="weightGoal"
          name="weightGoal"
          value={this.state.newWeight.weightGoal}
          onChange={this.handleChange}
        />

        <label htmlFor="currentWeight">Current Weight</label>
        <input
          type="number"
          id="currentWeight"
          name="currentWeight"
          value={this.state.newWeight.currentWeight}
          onChange={this.handleChange}
        />

        <label htmlFor="weightGained">Weight Gained</label>
        <input
          type="number"
          id="weightGained"
          name="weightGained"
          value={this.state.newWeight.weightGained}
          onChange={this.handleChange}
        />

        <label htmlFor="weightLost">Weight Lost</label>
        <input
          type="number"
          id="weightLost"
          name="weightLost"
          value={this.state.newWeight.weightLost}
          onChange={this.handleChange}
        />
        <button>Add</button>
      </form>
    </div>
  );

  EditWeightForm = () => (
    <div>
      <h2>Edit Weight Entry</h2>
      <form onSubmit={this.editWeight}>
        <label htmlFor="weightGoal">Weight Goal</label>

        <input
          type="number"
          id="weightGoal"
          name="weightGoal"
          value={this.state.editWeight.weightGoal}
          onChange={this.handleEditChange}
        />

        <label htmlFor="currentWeight">Current Weight</label>
        <input
          type="number"
          id="currentWeight"
          name="currentWeight"
          value={this.state.editWeight.currentWeight}
          onChange={this.handleEditChange}
        />

        <label htmlFor="weightGained">Weight Gained</label>
        <input
          type="number"
          id="weightGained"
          name="weightGained"
          value={this.state.editWeight.weightGained}
          onChange={this.handleEditChange}
        />

        <label htmlFor="weightLost">Weight Lost</label>
        <input
          type="number"
          id="weightLost"
          name="weightLost"
          value={this.state.editWeight.weightLost}
          onChange={this.handleEditChange}
        />
        <button>Save</button>
      </form>
    </div>
  );
}

export default Weight;
