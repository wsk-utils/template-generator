const { setupNextApp } = require("./next");
const inquirer = require("inquirer");

async function setupAppEnvironment(projectName) {
  // 환경 입력받기
  const { applicationEnv } = await promptApplicationEnv();

  // 입력받은 환경에 해당하는 템플릿 생성
  switch (applicationEnv) {
    case "Next.js":
      await setupNext(projectName);
      break;
  }
}

async function promptApplicationEnv() {
  const answer = inquirer.prompt([
    {
      type: "list",
      name: "applicationEnv",
      message: "어떤 앱 환경을 설치할까요?",
      choices: ["Next.js"],
    },
  ]);
  return answer;
}

async function setupNext(projectName) {
  console.log("🚀 Next.js 템플릿 생성 중...");
  await setupNextApp(projectName);
}

module.exports = {
  setupAppEnvironment,
};
