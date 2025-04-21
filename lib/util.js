const { execSync } = require("child_process");

function fixOwnership(targetDir) {
  const platform = process.platform;
  if (platform === "win32") {
    fixOwnershipWindows(targetDir);
  }
}

function fixOwnershipWindows(targetDir) {
  execSync(`takeown /F "${targetDir}" /R /D Y`);
  execSync(`icacls "${targetDir}" /grant %USERNAME%:F /T`);
  console.log("🔧 폴더 소유자 변경 완료");
}

module.exports = {
  fixOwnership,
};
