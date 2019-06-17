import React, { Component } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import styled from "styled-components";
import image1 from '../images/arm-flex-icon-1.jpeg';
import image2 from '../images/arm-flex-icon-2.jpeg';

const CaloriesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Indie Flower", cursive;
  margin-top: 5em;
  /* text-shadow: -1px -1px 0 #000, 1px -1px 0 #000, -1px 1px 0 #000,
    1px 1px 0 #000; */

    .form {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20em;
}
`;



const WeightWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-family: "Indie Flower", cursive;
  padding-top: 16em;

  
  
  h1 {
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    font-family: "Teko", sans-serif;
    font-size: 5em;
    position: absolute;
    z-index: -1;
    margin-top: 3em;
  }

  /* .title{
    display: flex;
    justify-content: center;
    text-transform: uppercase;
    font-family: "Teko", sans-serif;
    font-size: 5em;

  } */
 
  h2 {
    display: flex;
    justify-content: center;
    font-family: "Teko", sans-serif;
    
  }


  /* .aside-1 {
    display: { order: 1;}
  }

  .aside-2 {
    display: { order: 2;}
  } */
  /* p {
    display: flex;
    justify-content: row;
  } */

  /* label {
    display: flex;
    justify-content: row;
  }

  input {
    display: flex;
    justify-content: center;
  } */
`

const UserWrapper = styled.div`
  font-family: "Teko", sans-serif;
`;

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
      caloriesNeeded: 3000,
      caloriesConsumed: 0,
      userId: this.props.user._id
    }
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
        caloriesNeeded: 3000,
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
      <UserWrapper>
        {this.props.user.email} - {this.props.user.name}
        <button onClick={this.props.onUserDeleted}>Delete My Account</button>
        <this.WeightComponent />
        <this.CaloriesComponent />
      </UserWrapper>
    );
  }
  //A way to create comonents within another component
  CaloriesComponent = () => (
    <CaloriesWrapper>
      {/* <h1>Calories</h1> */}

      {/* Diplay all the calories */}
      {this.state.calories.map(calories => (
        <div key={calories._id}>
          <h2>Calories</h2>
          <div>
            {/* <aside class="aside aside-1">{image1}</aside>
            <aside class="aside aside-2">{image2}</aside> */}
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
    </CaloriesWrapper>
  );

  WeightComponent = () => (
    <WeightWrapper>
      {/* <h1 className="title">GAINS</h1> */}
    
      <h1><img src={image1}/>GAINS<img src={image2}/></h1>
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
      <div className="form">
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
    </WeightWrapper>
  );

  EditWeightForm = () => (
    <div>
      <h2>Edit Weight</h2>
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
