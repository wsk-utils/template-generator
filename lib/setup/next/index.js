const { execSync } = require("child_process");
const { gitInit, commitAll } = require("../../git");
const { generateReadme } = require("../../readme");
const { fixOwnership } = require("../../util");
const { OUTPUT_DIR, TEMPLATE_DIR } = require("../../../constants");
const { NEXT_DEPENDENCIES, NEXT_README } = require("./config");
const inquirer = require("inquirer");
const fs = require("fs-extra");
const path = require("path");

async function setupNextApp(projectName) {
  // 템플릿 복사
  console.log("🚀 Next.js 템플릿 생성 중...");
  const templateDir = path.join(TEMPLATE_DIR, "next");
  const targetDir = path.join(OUTPUT_DIR, projectName);
  await fs.copy(templateDir, targetDir, {
    overwrite: true,
    errorOnExist: false,
  });
  await gitInit(targetDir);
  await commitAll(targetDir, "🎉 프로젝트 생성");

  // README 생성
  const readme = NEXT_README;
  await generateReadme(targetDir, projectName, readme);
  await commitAll(targetDir, "📝 README 생성");

  // 추가 의존성 설치
  const { additionalDeps } = await promptDependencies();
  if (additionalDeps && additionalDeps.length > 0) {
    console.log("📦 추가 의존성 설치 중...", additionalDeps);
    execSync(`npm install ${additionalDeps.join(" ")}`, {
      cwd: targetDir,
      stdio: "inherit",
    });
    await commitAll(targetDir, "📦 추가 의존성 설치");
  }

  // 폴더 소유자 변경
  await fixOwnership(targetDir);
}

async function promptDependencies() {
  const answer = await inquirer.prompt([
    {
      type: "checkbox",
      name: "additionalDeps",
      message: "추가로 설치할 의존성을 선택하세요:",
      choices: NEXT_DEPENDENCIES,
    },
  ]);
  return answer;
}

module.exports = {
  setupNextApp,
};
