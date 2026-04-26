// =====================================
// MONGOOSE CHECKPOINT - FULL SOLUTION
// =====================================

// Load environment variables
require("dotenv").config();

// Import mongoose
const mongoose = require("mongoose");

// ===============================
// DATABASE CONNECTION
// ===============================

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Connection confirmation
mongoose.connection.once("open", () => {
  console.log("✅ MongoDB Connected Successfully");
});

// ===============================
// PERSON SCHEMA
// ===============================

const personSchema = new mongoose.Schema({
  name: { type: String, required: true },
  age: Number,
  favoriteFoods: [String],
});

// Create Model
const Person = mongoose.model("Person", personSchema);

// ===============================
// 1. CREATE & SAVE ONE PERSON
// ===============================

const createAndSavePerson = (done) => {
  const person = new Person({
    name: "Fazil",
    age: 22,
    favoriteFoods: ["Pizza", "Burger"],
  });

  person.save((err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// ===============================
// 2. CREATE MANY PEOPLE
// ===============================

const createManyPeople = (arrayOfPeople, done) => {
  Person.create(arrayOfPeople, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// ===============================
// 3. FIND BY NAME
// ===============================

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// ===============================
// 4. FIND ONE BY FOOD
// ===============================

const findOneByFood = (food, done) => {
  Person.findOne({ favoriteFoods: food }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// ===============================
// 5. FIND BY ID
// ===============================

const findPersonById = (personId, done) => {
  Person.findById(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// ===============================
// 6. FIND - EDIT - SAVE
// ===============================

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

  Person.findById(personId, (err, person) => {
    if (err) return done(err);

    person.favoriteFoods.push(foodToAdd);

    person.save((err, updatedPerson) => {
      if (err) return done(err);
      done(null, updatedPerson);
    });
  });
};

// ===============================
// 7. FIND ONE AND UPDATE
// ===============================

const findAndUpdate = (personName, done) => {
  Person.findOneAndUpdate(
    { name: personName },
    { age: 20 },
    { new: true },
    (err, data) => {
      if (err) return done(err);
      done(null, data);
    }
  );
};

// ===============================
// 8. DELETE BY ID
// ===============================

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// ===============================
// 9. DELETE MANY (MODERN METHOD)
// ===============================

const removeManyPeople = (done) => {
  Person.deleteMany({ name: "Mary" }, (err, data) => {
    if (err) return done(err);
    done(null, data);
  });
};

// ===============================
// 10. CHAIN QUERY HELPERS
// ===============================

const queryChain = (done) => {
  Person.find({ favoriteFoods: "burritos" })
    .sort("name")
    .limit(2)
    .select("-age")
    .exec((err, data) => {
      if (err) return done(err);
      done(null, data);
    });
};