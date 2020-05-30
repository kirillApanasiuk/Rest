const doWork = async () => {
  const sum = await add(1, 99);
  const sum2 = await add(sum, 59);
  const sum3 = await add(sum2, -59);
  return sum3;
};

const add = (a, b) => {
  return new Promise((res, rej) => {
    setTimeout(() => {
      if (a < 0 || b < 0) {
        rej("Numbers must be non-negative");
      }
      res(a + b);
    }, 2000);
  });
};

doWork()
  .then((data) => {
    console.log(data);
  })
  .catch((error) => {
    console.log("Error ", error);
  });
