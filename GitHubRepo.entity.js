const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "githubRepo",
  columns: {
    id: {
      generated: true,
      type: "int",
      primary: true,
    },
    name: {
      type: "varchar",
    },
    stars: {
      type: "int",
    },
  },
});
