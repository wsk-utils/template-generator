const { setupAppEnvironment } = require("./lib/setup");
const { HOME_DIR } = require("./constants");
const inquirer = require("inquirer");
const path = require("path");

(async () => {
  // 필요한 입력 받기
  const { projectName } = await promptUser();

  // 프로젝트 초기화
  await setupAppEnvironment(projectName);

  console.log("\n✅ 템플릿 생성 완료!");

  const projectPath = path.join(HOME_DIR, projectName);
  console.log(`📁 위치: ${projectPath}`);
})();

async function promptUser() {
  const answers = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "프로젝트명을 입력하세요:",
    },
  ]);
  return answers;
}
