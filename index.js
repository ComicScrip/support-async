const fetch = require("node-fetch-commonjs");
const db = require("./db");
const GitHubRepoEntity = require("./GitHubRepo.entity");

async function run() {
  console.log(new Date(), "start initializing db...");
  console.time("init db");
  await db.initialize();
  console.timeEnd("init db");

  console.log(new Date(), "clearing db data...");
  console.time("clear db data");
  await db.getRepository(GitHubRepoEntity).clear();
  console.timeEnd("clear db data");

  console.log(new Date(), "getting most popular repos from github API...");
  console.time("fetch repos");
  const res = await fetch(
    "https://api.github.com/search/repositories?q=stars:%3E1&sort=stars"
  );
  console.timeEnd("fetch repos");

  const { items: mostPopularRepos } = await res.json();
  const reposToInsert = mostPopularRepos.map(({ name, stargazers_count }) => {
    return {
      name,
      stars: stargazers_count,
    };
  });

  console.log(new Date(), "saving most popular repos to database");
  console.time("save repos");

  await db.getRepository(GitHubRepoEntity).save(reposToInsert);
  console.timeEnd("save repos");
}

run();
