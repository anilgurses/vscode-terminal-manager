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
    getTreeItem(element) {
        return element;
    }
    getChildren(element) {
        return Promise.resolve(vscode.window.terminals.map((t, i) => {
            return new Terminal(t.name, i.toString(), vscode.TreeItemCollapsibleState.None, {
                command: 'extension.openPackageOnNpm',
                title: '',
                arguments: ['']
            });
        }));
    }
}
exports.TerminalManagerProvider = TerminalManagerProvider;
class Terminal extends vscode.TreeItem {
    constructor(label, version, collapsibleState, command) {
        super(label, collapsibleState);
        this.label = label;
        this.version = version;
        this.collapsibleState = collapsibleState;
        this.command = command;
        this.iconPath = {
            light: path.join(__filename, '..', '..', 'resources', 'light', 'dependency.svg'),
            dark: path.join(__filename, '..', '..', 'resources', 'dark', 'dependency.svg')
        };
        this.contextValue = 'dependency';
        this.tooltip = `${this.label}-${this.version}`;
        this.description = this.version;
    }
}
exports.Terminal = Terminal;
//# sourceMappingURL=nodeDependencies.js.map