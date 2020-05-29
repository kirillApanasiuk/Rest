"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var validator_1 = __importDefault(require("validator"));
mongoose_1.default.connect("mongodb://127.0.0.1:27017/task-manager-api", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
});
var User = mongoose_1.default.model("Users", {
    name: {
        type: String,
        required: true,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        validate: function (value) {
            console.log(value);
            if (!validator_1.default.isEmail(value)) {
                throw new Error("Invalid email");
            }
        },
    },
    age: {
        type: Number,
        validate: function (value) {
            if (value < 0) {
                throw new Error("Age must be a positive number");
            }
        },
    },
});
var me = new User({
    name: "Tanya",
    age: 20,
    email: "milidanex@gmail.com",
});
me.save()
    .then(function (data) {
    console.log("ok");
})
    .catch(function (error) {
    console.log("error");
    console.log(error);
});
// const Task = mongoose.model("Tasks", {
//   description: {
//     type: String,
//     required: true,
//   },
//   completed: {
//     type: Boolean,
//   },
// });
// const task = new Task({
//   description: "I must end this section of course",
//   completed: false,
// });
// task
//   .save()
//   .then((data) => {
//     console.log("All ok");
//     console.log(data);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
//# sourceMappingURL=mongoose.js.map