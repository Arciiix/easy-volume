"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.execCommand = void 0;
const child_process_1 = require("child_process");
require("hazardous");
const execCommand = (cmd, args) => new Promise((resolve, reject) => {
    (0, child_process_1.exec)(`${cmd} ${args.join(" ")}`, (err, stdout, stderr) => {
        if (err || stderr) {
            reject(stderr);
        }
        else {
            resolve(stdout);
        }
    });
});
exports.execCommand = execCommand;
//# sourceMappingURL=execCommand.js.map