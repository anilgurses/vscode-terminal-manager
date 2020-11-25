"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Terminal = exports.TerminalManagerProvider = void 0;
const vscode = require("vscode");
const path = require("path");
class TerminalManagerProvider {
    constructor(workspaceRoot) {
        this.workspaceRoot = workspaceRoot;
        this._onDidChangeTreeData = new vscode.EventEmitter();
        this.onDidChangeTreeData = this._onDidChangeTreeData.event;
    }
    refresh() {
        this._onDidChangeTreeData.fire();
    }
    async createTerminal() {
        const input = await vscode.window.showInputBox({
            placeHolder: 'Enter name of the terminal:'
        });
        await this.fullScreen();
        const terminal = vscode.window.createTerminal(input, vscode.workspace.rootPath);
        terminal.show(true);
        this.refresh();
    }
    async closeTerminal(terminal) {
        terminal.vsTerminal.dispose();
    }
    async showTerminal(terminal) {
        terminal.vsTerminal.show(true);
        this.fullScreen();
    }
    async fullScreen() {
        await vscode.commands.executeCommand('workbench.action.togglePanel');
        await vscode.commands.executeCommand('workbench.action.toggleMaximizedPanel');
    }
    renameTerminal(terminal) {
    }
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        return Promise.resolve(vscode.window.terminals.map((t, i) => {
            return new Terminal((i + 1).toString() + '. ' + t.name, '', t, vscode.TreeItemCollapsibleState.None);
        }));
    }
}
exports.TerminalManagerProvider = TerminalManagerProvider;
class Terminal extends vscode.TreeItem {
    constructor(label, version, vsTerminal, collapsibleState) {
        super(label, collapsibleState);
        this.label = label;
        this.version = version;
        this.vsTerminal = vsTerminal;
        this.collapsibleState = collapsibleState;
        this.iconPath = {
            light: path.join(__filename, '..', '..', 'resources', 'light', 'terminal.svg'),
            dark: path.join(__filename, '..', '..', 'resources', 'dark', 'terminal.svg')
        };
        this.contextValue = 'terminal';
        this.command = {
            command: 'terminalManager.showTerminal',
            title: '',
            arguments: [this]
        };
        this.tooltip = `${this.label}-${this.version}`;
        this.description = this.version;
    }
}
exports.Terminal = Terminal;
//# sourceMappingURL=terminalManager.js.map