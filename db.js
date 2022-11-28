const { DataSource } = require("typeorm");
const GitHubRepoEntity = require("./GitHubRepo.entity");

module.exports = new DataSource({
  type: "sqlite",
  synchronize: true,
  database: "./repos-db.sqlite",
  entities: [GitHubRepoEntity],
  //logging: ["query", "error"],
});
