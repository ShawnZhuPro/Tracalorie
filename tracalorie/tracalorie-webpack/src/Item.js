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

export { Meal, Workout };
