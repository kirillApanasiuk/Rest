import { connectToDB } from "./../src/db/mongoose";
import { Task } from "./../src/db/models/task.model";
import { User, IUSerSchema } from "./../src/db/models/user.model";

// connectToDB
//   .then(() => {
//     console.log("Successfully connected to DB");
//     Task.findByIdAndDelete("5ed293647d55344c3c1accf5")
//       .then((data) => {
//         if (!data) {
//           return Promise.reject("Can not find this))");
//         }
//         console.log("First promise return", data);
//         return Task.countDocuments({ completed: true });
//       })
//       .then((anotherData) => {
//         console.log("Second promise return", anotherData);
//       })
//       .catch((error) => {
//         console.log("Error . Something goes wrong with query.", error);
//       });
//   })
//   .catch(() => {
//     console.log("Something goes wrong with DB!");
//   });

// connectToDB
//   .then(() => {
//     const updateAgeAndCount = async (id: string, age: number) => {
//       console.log(id);
//       const user: IUSerSchema | null = await User.findByIdAndUpdate(id, {
//         age,
//       });
//       console.log(user);
//       if (!user) {
//         throw new Error("Can not find user");
//       }
//       const count: number = await User.countDocuments({ age });
//       return count;
//     };

//     updateAgeAndCount("5ed15c40fc77d671cb809bb6", 10)
//       .then((data) => {
//         console.log(data);
//       })
//       .catch((error) => {
//         console.log("Error ", error);
//       });
//   })
//   .catch(() => {
//     console.log("Something goes wrong with DB!");
//   });

const deleteTaskAndCount = async (id: string): Promise<number> => {
  const deleted = await Task.findByIdAndDelete(id);
  if (!deleted) {
    console.log("Can not find task!");
    throw new Error("Its error baby!");
  }
  const count: number = await Task.countDocuments({ completed: true });
  return count;
};

connectToDB
  .then(() => {
    deleteTaskAndCount("5ed2a3a47d55344c3c1accf6")
      .then((count) => {
        console.log(count);
      })
      .catch((error) => {
        console.log(error);
      });
  })
  .catch(() => {
    console.log("Something goes wrong with DB!");
  });
