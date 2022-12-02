const { Sequelize } = require("sequelize");
const db = new Sequelize("Manager", "lspau95_SQLLogin_1", "ba8jfoc5gc", {
  host: "Manager.mssql.somee.com",
  dialect: "mssql",
});
const connectDB2 = async () => {
  try {
    await db.authenticate();
    console.log("Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
module.exports = {
  db,
  connectDB2,
};
