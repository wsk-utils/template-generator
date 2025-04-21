const { TEMPLATE_DIR } = require("../constants");
const fs = require("fs");
const path = require("path");

function generateReadme(targetDir, projectName, readme) {
  return new Promise((resolve, reject) => {
    const templatePath = path.join(TEMPLATE_DIR, "TEMPLATE_README.md");
    const outputPath = path.join(targetDir, "README.md");

    fs.readFile(templatePath, "utf-8", (err, template) => {
      if (err) return reject(err);

      const description = readme.DESCRIPTION;
      const requirements = readme.REQUIREMENTS.map((r) => `- ${r}`).join("\n");
      const installation = readme.INSTALLATION.join("\n\n");

      const replaced = template
        .replace("{README_PROJECT_NAME}", projectName)
        .replace("{README_DESCRIPTION}", description)
        .replace("{README_REQUIREMENTS}", requirements)
        .replace("{README_INSTALLATION}", installation);

      fs.writeFile(outputPath, replaced, (err) => {
        if (err) return reject(err);
        console.log("📄 README.md 생성 완료");
        resolve();
      });
    });
  });
}

module.exports = {
  generateReadme,
};
