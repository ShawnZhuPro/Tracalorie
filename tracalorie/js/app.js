class CalorieTracker {
  constructor() {
    this._calorieLimit = 2000;
    this._totalCalories = 0;
    this._meals = [];
    this._workouts = [];

    this._displayCaloriesLimit();
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }

  // Public Methods/API //

  addMeal(meal) {
    this._meals.push(meal);
    this._totalCalories += meal.calories;
    this._render();
  }

  addWorkout(workout) {
    this._workouts.push(workout);
    this._totalCalories -= workout.calories;
    this._render();
  }

  // Private Methods //

  _displayCaloriesTotal() {
    const totalCaloriesEl = document.getElementById("calories-total");
    totalCaloriesEl.innerHTML = this._totalCalories;
  }

  _displayCaloriesLimit() {
    const calorieLimitEl = document.getElementById("calories-limit");
    calorieLimitEl.innerHTML = this._calorieLimit;
  }

  _displayCaloriesConsumed() {
    const caloriesConsumedEl = document.getElementById("calories-consumed");

    // Loops through the meal array and accumulates the calories in "total"
    const consumed = this._meals.reduce(
      (total, meal) => total + meal.calories,
      0
    );

    caloriesConsumedEl.innerHTML = consumed;
  }

  _displayCaloriesBurned() {
    const caloriesBurnedEl = document.getElementById("calories-burned");

    // Loops through the workout array and accumulates the calories in "total"
    const burned = this._workouts.reduce(
      (total, workout) => total + workout.calories,
      0
    );

    caloriesBurnedEl.innerHTML = burned;
  }

  _displayCaloriesRemaining() {
    const caloriesRemainingEl = document.getElementById("calories-remaining");
    const progressEl = document.getElementById("calorie-progress");

    const remaining = this._calorieLimit - this._totalCalories;
    caloriesRemainingEl.innerHTML = remaining;

    if (remaining < 0) {
      // Goes to the div with the class of card to toggle "bg-light" to "bg-danger"
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        "bg-light"
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add(
        "bg-danger"
      );
      // Changes from green to red progress bar
      progressEl.classList.remove("bg-success");
      progressEl.classList.add("bg-danger");
    } else {
      // Toggles "bg-danger" to "bg-light"
      caloriesRemainingEl.parentElement.parentElement.classList.remove(
        "bg-danger"
      );
      caloriesRemainingEl.parentElement.parentElement.classList.add("bg-light");
    }
    // Changes from red to green progress bar
    progressEl.classList.remove("bg-danger");
    progressEl.classList.add("bg-success");
  }

  _displayCaloriesProgress() {
    const progressEl = document.getElementById("calorie-progress");
    const percentage = (this._totalCalories / this._calorieLimit) * 100;

    // Visually updates the progress bar with "width" using bootstrap 5 in CSS
    const width = Math.min(percentage, 100);
    progressEl.style.width = `${width}%`;
  }

  _render() {
    this._displayCaloriesTotal();
    this._displayCaloriesConsumed();
    this._displayCaloriesBurned();
    this._displayCaloriesRemaining();
    this._displayCaloriesProgress();
  }
}

class Meal {
  constructor(name, calories) {
    // ID contains all characters after the first 2 in hexadecimal
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class Workout {
  constructor(name, calories) {
    // ID contains all characters after the first 2 in hexadecimal
    this.id = Math.random().toString(16).slice(2);
    this.name = name;
    this.calories = calories;
  }
}

class App {
  constructor() {
    this._tracker = new CalorieTracker();

    document
      .getElementById("meal-form")
      // bind() is used to make "this" pertain to the tracker object, not the window object
      .addEventListener("submit", this._newMeal.bind(this));

    document
      .getElementById("workout-form")
      // bind() is used to make "this" pertain to the tracker object, not the window object
      .addEventListener("submit", this._newWorkout.bind(this));
  }

  _newMeal(e) {
    // Prevents page reload
    e.preventDefault();

    const name = document.getElementById("meal-name");
    const calories = document.getElementById("meal-calories");

    // Validate inputs
    if (name.value === "" || calories.value === "") {
      alert("Please fill in all fields");
      return;
    }

    // We use "+" for converting a String to a number
    const meal = new Meal(name.value, +calories.value);

    this._tracker.addMeal(meal);

    // Clears the form
    name.value = "";
    calories.value = "";

    // Collapse the form
    const collapseMeal = document.getElementById("collapse-meal");
    const bsCollapse = new bootstrap.Collapse(collapseMeal, {
      toggle: true,
    });
  }

  _newWorkout(e) {
    // Prevents page reload
    e.preventDefault();

    const name = document.getElementById("workout-name");
    const calories = document.getElementById("workout-calories");

    // Validate inputs
    if (name.value === "" || calories.value === "") {
      alert("Please fill in all fields");
      return;
    }

    // We use "+" for converting a String to a number
    const workout = new Workout(name.value, +calories.value);

    this._tracker.addWorkout(workout);

    // Clears the form
    name.value = "";
    calories.value = "";

    // Collapse the form
    const collapseWorkout = document.getElementById("collapse-workout");
    const bsCollapse = new bootstrap.Collapse(collapseWorkout, {
      toggle: true,
    });
  }
}

// Starts the entire application
const app = new App();
