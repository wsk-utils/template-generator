const simpleGit = require("simple-git");

async function gitInit(targetDir) {
  const git = simpleGit(targetDir);
  await git.init();
  console.log(`✅ 저장소 초기화 완료`);
}

async function commitAll(targetDir, message) {
  const git = simpleGit(targetDir);
  await git.add(".");
  await git.commit(message);
  console.log(`✅ 커밋 완료: ${message}`);
}

module.exports = {
  gitInit,
  commitAll,
};
