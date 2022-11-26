const Employee = require("./models/EMPLOYEE");

const main = async () => {
  try {
    const data = Employee.findAll({
      where: {
        EMPLOYEE_NAME: "Liem",
      },
      include: ["position"],
    });
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
main();
