'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = void 0;
const vscode = require("vscode");
const terminalManager_1 = require("./terminalManager");
function activate(context) {
    // Samples of `window.registerTreeDataProvider`
    const terminalManagerProvider = new terminalManager_1.TerminalManagerProvider(vscode.workspace.rootPath);
    vscode.window.registerTreeDataProvider('terminalManager', terminalManagerProvider);
    vscode.commands.registerCommand('terminalManager.refresh', () => terminalManagerProvider.refresh());
    vscode.commands.registerCommand('terminalManager.createTerminal', () => terminalManagerProvider.createTerminal());
    vscode.commands.registerCommand('terminalManager.editTerminal', (terminal) => terminalManagerProvider.renameTerminal(terminal));
    vscode.commands.registerCommand('terminalManager.deleteTerminal', (terminal) => terminalManagerProvider.closeTerminal(terminal));
    vscode.commands.registerCommand('terminalManager.showTerminal', (terminal) => terminalManagerProvider.showTerminal(terminal));
}
exports.activate = activate;
//# sourceMappingURL=extension.js.map