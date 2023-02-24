const { Sequelize } = require("sequelize");

const sequelize = new Sequelize("testdb", "postgres", "123", {
  host: "localhost",
  dialect: "postgres",
});

const initDB = async () => {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    console.log("Соединение с БД успешно установлено");
    // sequelize.close();
  } catch (error) {
    console.log("Невозможно выполнить подключение к БД: ", error);
    process.exit();
  }
};

module.exports = {
  sequelize,
  initDB,
};
