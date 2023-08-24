module.exports = {
  "extension": {
    "publisher": "codeblitz",
    "name": "web-scm",
    "version": "0.3.7"
  },
  "packageJSON": {
    "name": "web-scm",
    "publisher": "codeblitz",
    "version": "0.3.7",
    "displayName": "web-scm",
    "description": "web-scm",
    "activationEvents": [
      "*"
    ],
    "kaitianContributes": {
      "workerMain": "./out/worker/index.js",
      "browserMain": "./out/browser/index.js",
      "configuration": {
        "title": "WebSCM",
        "type": "object",
        "properties": {
          "git.mergeEditor": {
            "type": "boolean",
            "default": true,
            "markdownDescription": "%config.mergeEditor%",
            "scope": "window"
          },
          "webscm.commitType": {
            "type": "string",
            "default": "baseBranch",
            "enum": [
              "baseBranch",
              "newBranch"
            ],
            "markdownDescription": "%config.commitType%",
            "scope": "window"
          },
          "webscm.createPR": {
            "type": "boolean",
            "default": false,
            "markdownDescription": "%config.createPR%",
            "scope": "window"
          }
        }
      },
      "viewsProxies": [
        "CommitPanel"
      ],
      "browserViews": {
        "scm": {
          "type": "add",
          "view": [
            {
              "id": "CommitPanel",
              "component": "CommitPanel",
              "title": "提交信息"
            }
          ]
        }
      }
    },
    "contributes": {
      "commands": [
        {
          "command": "git.commit",
          "title": "%command.commit%",
          "icon": "$(check)",
          "category": "Git"
        },
        {
          "command": "git.refresh",
          "title": "%command.refresh%",
          "icon": "$(refresh)",
          "category": "Git"
        },
        {
          "command": "git.branch",
          "title": "%command.branch%",
          "icon": "$(branch)",
          "category": "Git"
        },
        {
          "command": "git.branchFrom",
          "title": "%command.branchFrom%",
          "icon": "$(branch)",
          "category": "Git"
        },
        {
          "command": "git.openFile",
          "title": "%command.openFile%",
          "icon": "$(go-to-file)",
          "category": "Git"
        },
        {
          "command": "git.stage",
          "title": "%command.stage%",
          "icon": "$(add)",
          "category": "Git"
        },
        {
          "command": "git.stageAllMerge",
          "title": "%command.stageAllMerge%",
          "category": "Git",
          "icon": "$(add)"
        },
        {
          "command": "git.clean",
          "title": "%command.clean%",
          "icon": "$(discard)",
          "category": "Git"
        },
        {
          "command": "git.cleanAll",
          "title": "%command.cleanAll%",
          "icon": "$(discard)",
          "category": "Git"
        }
      ],
      "menus": {
        "scm/title": [
          {
            "command": "git.commit",
            "group": "navigation",
            "when": "scmProvider == webscm"
          },
          {
            "command": "git.refresh",
            "group": "navigation",
            "when": "scmProvider == webscm"
          },
          {
            "command": "git.branch",
            "when": "scmProvider == webscm && createBranchAble"
          },
          {
            "command": "git.branchFrom",
            "when": "scmProvider == webscm && createBranchAble"
          }
        ],
        "scm/resourceState/context": [
          {
            "command": "git.openFile",
            "when": "scmProvider == webscm",
            "group": "inline"
          },
          {
            "command": "git.clean",
            "when": "scmProvider == webscm && scmResourceGroup == workingTree",
            "group": "inline"
          },
          {
            "command": "git.stage",
            "when": "scmProvider == webscm && scmResourceGroup == merge",
            "group": "inline"
          }
        ],
        "scm/resourceGroup/context": [
          {
            "command": "git.cleanAll",
            "when": "scmProvider == webscm && scmResourceGroup == workingTree",
            "group": "inline"
          },
          {
            "command": "git.stageAllMerge",
            "when": "scmProvider == webscm && scmResourceGroup == merge",
            "group": "1_modification"
          },
          {
            "command": "git.stageAllMerge",
            "when": "scmProvider == webscm && scmResourceGroup == merge",
            "group": "inline@2"
          }
        ]
      },
      "colors": [
        {
          "id": "gitDecoration.addedResourceForeground",
          "description": "%colors.added%",
          "defaults": {
            "light": "#587c0c",
            "dark": "#81b88b",
            "highContrast": "#1b5225",
            "highContrastLight": "#374e06"
          }
        },
        {
          "id": "gitDecoration.modifiedResourceForeground",
          "description": "%colors.modified%",
          "defaults": {
            "light": "#895503",
            "dark": "#E2C08D",
            "highContrast": "#E2C08D",
            "highContrastLight": "#895503"
          }
        },
        {
          "id": "gitDecoration.deletedResourceForeground",
          "description": "%colors.deleted%",
          "defaults": {
            "light": "#ad0707",
            "dark": "#c74e39",
            "highContrast": "#c74e39",
            "highContrastLight": "#ad0707"
          }
        },
        {
          "id": "gitDecoration.renamedResourceForeground",
          "description": "%colors.renamed%",
          "defaults": {
            "light": "#007100",
            "dark": "#73C991",
            "highContrast": "#73C991",
            "highContrastLight": "#007100"
          }
        },
        {
          "id": "gitDecoration.untrackedResourceForeground",
          "description": "%colors.untracked%",
          "defaults": {
            "light": "#007100",
            "dark": "#73C991",
            "highContrast": "#73C991",
            "highContrastLight": "#007100"
          }
        },
        {
          "id": "gitDecoration.ignoredResourceForeground",
          "description": "%colors.ignored%",
          "defaults": {
            "light": "#8E8E90",
            "dark": "#8C8C8C",
            "highContrast": "#A7A8A9",
            "highContrastLight": "#8e8e90"
          }
        },
        {
          "id": "gitDecoration.stageModifiedResourceForeground",
          "description": "%colors.stageModified%",
          "defaults": {
            "light": "#895503",
            "dark": "#E2C08D",
            "highContrast": "#E2C08D",
            "highContrastLight": "#895503"
          }
        },
        {
          "id": "gitDecoration.stageDeletedResourceForeground",
          "description": "%colors.stageDeleted%",
          "defaults": {
            "light": "#ad0707",
            "dark": "#c74e39",
            "highContrast": "#c74e39",
            "highContrastLight": "#ad0707"
          }
        },
        {
          "id": "gitDecoration.conflictingResourceForeground",
          "description": "%colors.conflict%",
          "defaults": {
            "light": "#ad0707",
            "dark": "#e4676b",
            "highContrast": "#c74e39",
            "highContrastLight": "#ad0707"
          }
        },
        {
          "id": "gitDecoration.submoduleResourceForeground",
          "description": "%colors.submodule%",
          "defaults": {
            "light": "#1258a7",
            "dark": "#8db9e2",
            "highContrast": "#8db9e2",
            "highContrastLight": "#1258a7"
          }
        }
      ],
      "keybindings": [
        {
          "command": "git.commit",
          "key": "ctrl+enter",
          "mac": "cmd+enter",
          "when": "scmRepository"
        }
      ],
      "workerMain": "./out/worker/index.js",
      "browserMain": "./out/browser/index.js",
      "configuration": {
        "title": "WebSCM",
        "type": "object",
        "properties": {
          "git.mergeEditor": {
            "type": "boolean",
            "default": true,
            "markdownDescription": "%config.mergeEditor%",
            "scope": "window"
          },
          "webscm.commitType": {
            "type": "string",
            "default": "baseBranch",
            "enum": [
              "baseBranch",
              "newBranch"
            ],
            "markdownDescription": "%config.commitType%",
            "scope": "window"
          },
          "webscm.createPR": {
            "type": "boolean",
            "default": false,
            "markdownDescription": "%config.createPR%",
            "scope": "window"
          }
        }
      },
      "viewsProxies": [
        "CommitPanel"
      ],
      "browserViews": {
        "scm": {
          "type": "add",
          "view": [
            {
              "id": "CommitPanel",
              "component": "CommitPanel",
              "title": "提交信息"
            }
          ]
        }
      }
    }
  },
  "defaultPkgNlsJSON": {
    "command.continueInLocalClone": "Clone Repository Locally and Open on Desktop...",
    "command.continueInLocalClone.qualifiedName": "Continue Working in New Local Clone",
    "command.clone": "Clone",
    "command.cloneRecursive": "Clone (Recursive)",
    "command.init": "Initialize Repository",
    "command.openRepository": "Open Repository",
    "command.close": "Close Repository",
    "command.refresh": "Refresh",
    "command.openChange": "Open Changes",
    "command.openAllChanges": "Open All Changes",
    "command.openFile": "Open File",
    "command.openHEADFile": "Open File (HEAD)",
    "command.stage": "Stage Changes",
    "command.stageAll": "Stage All Changes",
    "command.stageAllTracked": "Stage All Tracked Changes",
    "command.stageAllUntracked": "Stage All Untracked Changes",
    "command.stageAllMerge": "Stage All Merge Changes",
    "command.stageSelectedRanges": "Stage Selected Ranges",
    "command.revertSelectedRanges": "Revert Selected Ranges",
    "command.stageChange": "Stage Change",
    "command.revertChange": "Revert Change",
    "command.unstage": "Unstage Changes",
    "command.unstageAll": "Unstage All Changes",
    "command.unstageSelectedRanges": "Unstage Selected Ranges",
    "command.rename": "Rename",
    "command.clean": "Discard Changes",
    "command.cleanAll": "Discard All Changes",
    "command.cleanAllTracked": "Discard All Tracked Changes",
    "command.cleanAllUntracked": "Discard All Untracked Changes",
    "command.closeAllDiffEditors": "Close All Diff Editors",
    "command.commit": "Commit & Push",
    "command.commitStaged": "Commit Staged",
    "command.commitEmpty": "Commit Empty",
    "command.commitStagedSigned": "Commit Staged (Signed Off)",
    "command.commitStagedAmend": "Commit Staged (Amend)",
    "command.commitAll": "Commit All",
    "command.commitAllSigned": "Commit All (Signed Off)",
    "command.commitAllAmend": "Commit All (Amend)",
    "command.commitNoVerify": "Commit (No Verify)",
    "command.commitStagedNoVerify": "Commit Staged (No Verify)",
    "command.commitEmptyNoVerify": "Commit Empty (No Verify)",
    "command.commitStagedSignedNoVerify": "Commit Staged (Signed Off, No Verify)",
    "command.commitStagedAmendNoVerify": "Commit Staged (Amend, No Verify)",
    "command.commitAllNoVerify": "Commit All (No Verify)",
    "command.commitAllSignedNoVerify": "Commit All (Signed Off, No Verify)",
    "command.commitAllAmendNoVerify": "Commit All (Amend, No Verify)",
    "command.commitMessageAccept": "Accept Commit Message",
    "command.commitMessageDiscard": "Discard Commit Message",
    "command.restoreCommitTemplate": "Restore Commit Template",
    "command.undoCommit": "Undo Last Commit",
    "command.checkout": "Checkout to...",
    "command.checkoutDetached": "Checkout to (Detached)...",
    "command.branch": "Create Branch...",
    "command.branchFrom": "Create Branch From...",
    "command.deleteBranch": "Delete Branch...",
    "command.renameBranch": "Rename Branch...",
    "command.cherryPick": "Cherry Pick...",
    "command.merge": "Merge Branch...",
    "command.mergeAbort": "Abort Merge",
    "command.rebase": "Rebase Branch...",
    "command.createTag": "Create Tag",
    "command.deleteTag": "Delete Tag",
    "command.deleteRemoteTag": "Delete Remote Tag",
    "command.fetch": "Fetch",
    "command.fetchPrune": "Fetch (Prune)",
    "command.fetchAll": "Fetch From All Remotes",
    "command.pull": "Pull",
    "command.pullRebase": "Pull (Rebase)",
    "command.pullFrom": "Pull from...",
    "command.push": "Push",
    "command.pushForce": "Push (Force)",
    "command.pushTo": "Push to...",
    "command.pushToForce": "Push to... (Force)",
    "command.pushFollowTags": "Push (Follow Tags)",
    "command.pushFollowTagsForce": "Push (Follow Tags, Force)",
    "command.pushTags": "Push Tags",
    "command.addRemote": "Add Remote...",
    "command.removeRemote": "Remove Remote",
    "command.sync": "Sync",
    "command.syncRebase": "Sync (Rebase)",
    "command.publish": "Publish Branch...",
    "command.showOutput": "Show Git Output",
    "command.ignore": "Add to .gitignore",
    "command.revealInExplorer": "Reveal in Explorer View",
    "command.revealFileInOS.linux": "Open Containing Folder",
    "command.revealFileInOS.mac": "Reveal in Finder",
    "command.revealFileInOS.windows": "Reveal in File Explorer",
    "command.rebaseAbort": "Abort Rebase",
    "command.stashIncludeUntracked": "Stash (Include Untracked)",
    "command.stash": "Stash",
    "command.stashStaged": "Stash (Staged)",
    "command.stashPop": "Pop Stash...",
    "command.stashPopLatest": "Pop Latest Stash",
    "command.stashApply": "Apply Stash...",
    "command.stashApplyLatest": "Apply Latest Stash",
    "command.stashDrop": "Drop Stash...",
    "command.stashDropAll": "Drop All Stashes...",
    "command.timelineOpenDiff": "Open Changes",
    "command.timelineCopyCommitId": "Copy Commit ID",
    "command.timelineCopyCommitMessage": "Copy Commit Message",
    "command.timelineSelectForCompare": "Select for Compare",
    "command.timelineCompareWithSelected": "Compare with Selected",
    "command.manageUnsafeRepositories": "Manage Unsafe Repositories",
    "command.api.getRepositories": "Get Repositories",
    "command.api.getRepositoryState": "Get Repository State",
    "command.api.getRemoteSources": "Get Remote Sources",
    "command.git.acceptMerge": "Complete Merge",
    "command.git.openMergeEditor": "Resolve in Merge Editor",
    "command.git.runGitMerge": "Compute Conflicts With Git",
    "command.git.runGitMergeDiff3": "Compute Conflicts With Git (Diff3)",
    "common.cancel": "Cancel",
    "common.certain": "Certain",
    "alex.git.inputBox.placeholder": "Message ({0}  commit and push directly)",
    "staged.changes": "Staged Changes",
    "merge.changes": "Merge Changes",
    "untracked.changes": "Untracked Changes",
    "git.title.workingTree": "{0} (WorkingTree)",
    "git.title.untracked": "{0} (Untracked)",
    "git.title.deleted": "{0} (Deleted)",
    "git.title.added": "{0} (Added)",
    "git error details": "Git Error",
    "added": "Added",
    "diff": "Diff",
    "discard": "Discard Changes",
    "confirm delete": "Are you sure you want to DELETE {0}?\nThis is IRREVERSIBLE!\nThis file will be FOREVER LOST if you proceed.",
    "restore file": "Restore file",
    "confirm restore": "Are you sure you want to restore {0}?",
    "confirm discard": "Are you sure you want to discard changes in {0}?",
    "delete file": "Delete file",
    "delete files": "Delete Files",
    "restore files": "Restore files",
    "confirm restore multiple": "Are you sure you want to restore {0} files?",
    "confirm discard multiple": "Are you sure you want to discard changes in {0} files?",
    "warn untracked": "This will DELETE {0} untracked files!\nThis is IRREVERSIBLE!\nThese files will be FOREVER LOST.",
    "there are untracked files single": "The following untracked file will be DELETED FROM DISK if discarded: {0}.",
    "there are untracked files": "There are {0} untracked files which will be DELETED FROM DISK if discarded.",
    "confirm discard all 2": "{0}\n\nThis is IRREVERSIBLE, your current working set will be FOREVER LOST.",
    "yes discard tracked": "Discard 1 Tracked File",
    "yes discard tracked multiple": "Discard {0} Tracked Files",
    "discardAll": "Discard All {0} Files",
    "confirm discard all single": "Are you sure you want to discard changes in {0}?",
    "confirm discard all": "Are you sure you want to discard ALL changes in {0} files?\nThis is IRREVERSIBLE!\nYour current working set will be FOREVER LOST if you proceed.",
    "discardAll multiple": "Discard 1 File",
    "confirm delete multiple": "Are you sure you want to DELETE {0} files?\nThis is IRREVERSIBLE!\nThese files will be FOREVER LOST if you proceed.",
    "commit message": "Commit message",
    "provide commit message": "Please provide a commit message",
    "commit success": "Commit to {0} success \n Whether to go to {1} to create a PR",
    "commit failed": "Commit failed",
    "commit message is empty or no changes": "Commit message is empty or no changes",
    "confirm stage files with merge conflicts": "Are you sure you want to stage {0} files with merge conflicts",
    "confirm stage file with merge conflicts": "Are you sure you want to stage {0} with merge conflicts?",
    "conflict.unsupport": "Unsupported conflict resolution type 【 {0} 】\n will go to Ant CodeSpaces to resolve conflicts",
    "conflict.unsupport.local": "Unsupported conflict resolution type 【 {0} 】\n please resolve conflicts locally",
    "open": "Open",
    "index modified": "Index modified",
    "modified": "Modified",
    "index added": "Index added",
    "index deleted": "Index deleted",
    "deleted": "Deleted",
    "index renamed": "已重命名索引",
    "index copied": "已复制索引",
    "untracked": "Untracked",
    "ignored": "Ignored",
    "intent to add": "Intent to add",
    "both deleted": "Both deleted",
    "added by us": "已由我们添加",
    "deleted by them": "已被他们删除",
    "added by them": "已由他们添加",
    "deleted by us": "已被我们删除",
    "both added": "两者均已添加",
    "both modified": "Both modified",
    "commitMessage": "Message (press {0} to commit)",
    "commit": "提交",
    "merge changes": "合并更改",
    "staged changes": "暂存的更改",
    "changes": "更改",
    "push success": "已成功推送。",
    "commit in rebase": "无法在变基过程中修改提交消息。请完成变基操作，并改用交互式变基。",
    "commitMessageWhitespacesOnlyWarning": "当前提交消息仅包含空白字符",
    "commitMessageCountdown": "当前行剩余 {0} 个字符",
    "commitMessageWarning": "当前行比 {1} 超出 {0} 个字符",
    "huge": "huge",
    "neveragain": "Neveragain",
    "add known": "Add known",
    "yes": "Yes",
    "alex.git.inputBox.merge.conflict.value": "Merge branch '{0}' into {1}",
    "contains unstaged merge conflict files": "Contains unstaged merge conflict files",
    "protected branch or tag": "Source branch is protected branch or tag, will create branch \n【 {0} \n No need to switch branches after creation",
    "create branch success": "Create branch successfully {0}",
    "create branch fail": "Failed to create branch {0}",
    "conflict toplatform": "The submission is successful, the source branch is the protection branch or Tag, click Certain to go to {0} to create a PR",
    "conflict resolved success": "The conflict is resolved successfully, click Certain to go to the PR page",
    "conflict success": "The conflict is resolved successfully",
    "config.mergeEditor": "Open the merge editor for files that are currently under conflict.",
    "Incoming": "Incoming {0}",
    "Current": "Current {0}",
    "Result": "Result",
    "Open Merge": "Open Merge",
    "Switch MergeEditor": "Switch mergeEditor will reload the window, are you sure you want to continue?",
    "config.commitType": "Commit to {0} or create new branch",
    "config.createPR": "Create PR after commit {0}",
    "config.createPR.to": "After the code is submitted, automatically create a PR and merge it into {0}",
    "config.commitType.to": "Commit into {0}",
    "config.createBranch.createPR": "Create a new branch and submit a PR",
    "commit.message": "Please enter submission information",
    "commit.branch": "Please enter a branch name",
    "auto.pr.success": "自动创建 {0} PR 成功",
    "auto.pr.fail": "创建 {0} PR 失败"
  },
  "pkgNlsJSON": {
    "zh-CN": {
      "command.continueInLocalClone": "Clone Repository Locally and Open on Desktop...",
      "command.continueInLocalClone.qualifiedName": "Continue Working in New Local Clone",
      "command.clone": "Clone",
      "command.cloneRecursive": "Clone (Recursive)",
      "command.init": "Initialize Repository",
      "command.openRepository": "Open Repository",
      "command.close": "Close Repository",
      "command.refresh": "刷新",
      "command.openChange": "Open Changes",
      "command.openAllChanges": "Open All Changes",
      "command.openFile": "打开文件",
      "command.openHEADFile": "Open File (HEAD)",
      "command.stage": "保存更改",
      "command.stageAll": "Stage All Changes",
      "command.stageAllTracked": "Stage All Tracked Changes",
      "command.stageAllUntracked": "Stage All Untracked Changes",
      "command.stageAllMerge": "保存所有合并更改",
      "command.stageSelectedRanges": "Stage Selected Ranges",
      "command.revertSelectedRanges": "Revert Selected Ranges",
      "command.stageChange": "Stage Change",
      "command.revertChange": "Revert Change",
      "command.unstage": "Unstage Changes",
      "command.unstageAll": "Unstage All Changes",
      "command.unstageSelectedRanges": "Unstage Selected Ranges",
      "command.rename": "Rename",
      "command.clean": "放弃更改",
      "command.cleanAll": "放弃所有更改",
      "command.cleanAllTracked": "Discard All Tracked Changes",
      "command.cleanAllUntracked": "Discard All Untracked Changes",
      "command.closeAllDiffEditors": "Close All Diff Editors",
      "command.commit": "提交并推送",
      "command.commitStaged": "Commit Staged",
      "command.commitEmpty": "Commit Empty",
      "command.commitStagedSigned": "Commit Staged (Signed Off)",
      "command.commitStagedAmend": "Commit Staged (Amend)",
      "command.commitAll": "Commit All",
      "command.commitAllSigned": "Commit All (Signed Off)",
      "command.commitAllAmend": "Commit All (Amend)",
      "command.commitNoVerify": "Commit (No Verify)",
      "command.commitStagedNoVerify": "Commit Staged (No Verify)",
      "command.commitEmptyNoVerify": "Commit Empty (No Verify)",
      "command.commitStagedSignedNoVerify": "Commit Staged (Signed Off, No Verify)",
      "command.commitStagedAmendNoVerify": "Commit Staged (Amend, No Verify)",
      "command.commitAllNoVerify": "Commit All (No Verify)",
      "command.commitAllSignedNoVerify": "Commit All (Signed Off, No Verify)",
      "command.commitAllAmendNoVerify": "Commit All (Amend, No Verify)",
      "command.commitMessageAccept": "Accept Commit Message",
      "command.commitMessageDiscard": "Discard Commit Message",
      "command.restoreCommitTemplate": "Restore Commit Template",
      "command.undoCommit": "Undo Last Commit",
      "command.checkout": "Checkout to...",
      "command.checkoutDetached": "Checkout to (Detached)...",
      "command.branch": "创建新分支",
      "command.branchFrom": "从...创建新分支",
      "command.deleteBranch": "Delete Branch...",
      "command.renameBranch": "Rename Branch...",
      "command.cherryPick": "Cherry Pick...",
      "command.merge": "Merge Branch...",
      "command.mergeAbort": "Abort Merge",
      "command.rebase": "Rebase Branch...",
      "command.createTag": "Create Tag",
      "command.deleteTag": "Delete Tag",
      "command.deleteRemoteTag": "Delete Remote Tag",
      "command.fetch": "Fetch",
      "command.fetchPrune": "Fetch (Prune)",
      "command.fetchAll": "Fetch From All Remotes",
      "command.pull": "Pull",
      "command.pullRebase": "Pull (Rebase)",
      "command.pullFrom": "Pull from...",
      "command.push": "Push",
      "command.pushForce": "Push (Force)",
      "command.pushTo": "Push to...",
      "command.pushToForce": "Push to... (Force)",
      "command.pushFollowTags": "Push (Follow Tags)",
      "command.pushFollowTagsForce": "Push (Follow Tags, Force)",
      "command.pushTags": "Push Tags",
      "command.addRemote": "Add Remote...",
      "command.removeRemote": "Remove Remote",
      "command.sync": "Sync",
      "command.syncRebase": "Sync (Rebase)",
      "command.publish": "Publish Branch...",
      "command.showOutput": "Show Git Output",
      "command.ignore": "Add to .gitignore",
      "command.revealInExplorer": "Reveal in Explorer View",
      "command.revealFileInOS.linux": "Open Containing Folder",
      "command.revealFileInOS.mac": "Reveal in Finder",
      "command.revealFileInOS.windows": "Reveal in File Explorer",
      "command.rebaseAbort": "Abort Rebase",
      "command.stashIncludeUntracked": "Stash (Include Untracked)",
      "command.stash": "Stash",
      "command.stashStaged": "Stash (Staged)",
      "command.stashPop": "Pop Stash...",
      "command.stashPopLatest": "Pop Latest Stash",
      "command.stashApply": "Apply Stash...",
      "command.stashApplyLatest": "Apply Latest Stash",
      "command.stashDrop": "Drop Stash...",
      "command.stashDropAll": "Drop All Stashes...",
      "command.timelineOpenDiff": "Open Changes",
      "command.timelineCopyCommitId": "Copy Commit ID",
      "command.timelineCopyCommitMessage": "Copy Commit Message",
      "command.timelineSelectForCompare": "Select for Compare",
      "command.timelineCompareWithSelected": "Compare with Selected",
      "command.manageUnsafeRepositories": "Manage Unsafe Repositories",
      "command.api.getRepositories": "Get Repositories",
      "command.api.getRepositoryState": "Get Repository State",
      "command.api.getRemoteSources": "Get Remote Sources",
      "command.git.acceptMerge": "Complete Merge",
      "command.git.openMergeEditor": "Resolve in Merge Editor",
      "command.git.runGitMerge": "Compute Conflicts With Git",
      "command.git.runGitMergeDiff3": "Compute Conflicts With Git (Diff3)",
      "common.cancel": "取消",
      "common.certain": "确定",
      "common.toplatform": "提交成功，是否去 {0} 创建 PR",
      "alex.git.inputBox.placeholder": "输入提交信息(快捷键 {0} 直接提交并推送) ",
      "staged.changes": "暂存更改",
      "merge.changes": "合并更改",
      "untracked.changes": "未追踪的更改",
      "git.title.workingTree": "{0} (工作树)",
      "git.title.untracked": "{0} (未追踪)",
      "git.title.deleted": "{0} (已删除)",
      "git.title.added": "{0} (新增)",
      "git error details": "Git Error",
      "added": "新增",
      "diff": "更改",
      "discard": "放弃更改",
      "confirm delete": "确定要删除 {0} 吗?",
      "restore file": "恢复文件",
      "confirm restore": "确认是否还原 {0}",
      "confirm discard": "确定要放弃 {0} 中更改吗?",
      "delete file": "删除文件",
      "delete files": "删除文件",
      "restore files": "还原文件",
      "confirm restore multiple": "确认还原 {0} 个文件?",
      "confirm discard multiple": "确认放弃在 {0} 个文件中的更改?",
      "warn untracked": "确认删除 {0} 个文件!\nT此操作不可撤消!文件将被永久删除。",
      "there are untracked files single": "若放弃下面未跟踪的文件，其将被从硬盘上删除: {0}。",
      "there are untracked files": "若放弃 {0} 个未跟踪的文件，其将被从硬盘上删除。",
      "confirm discard all 2": "{0}\n\n此操作不可撤销，你当前的工作集将会永远丢失。",
      "yes discard tracked": "放弃1个文件",
      "yes discard tracked multiple": "放弃 {0} 个追踪的文件",
      "discardAll": "放弃 所有 {0} 个文件",
      "confirm discard all single": "确定放弃 {0} 中的更改吗?",
      "confirm discard all": "确定要放弃在 {0} 个文件中的所有更改吗？此操作不可撤销!你当前的工作集将会永远丢失。",
      "discardAll multiple": "放弃1个文件",
      "confirm delete multiple": "确认删除 {0} 个文件!\nT此操作不可撤消!文件将被永久删除。",
      "commit message": "提交信息",
      "provide commit message": "请输入提交信息",
      "commit success": "向分支 {0} 提交成功",
      "commit failed": "提交失败",
      "commit message is empty or no changes": "提交信息为空或者没有更改文件",
      "confirm stage files with merge conflicts": "确定要暂存含有合并冲突的 {0} 个文件吗?",
      "confirm stage file with merge conflicts": "确定要暂存含有合并冲突的 {0}  吗?",
      "conflict.unsupport.local": "【 {0} 】不支持的解决冲突类型 \n 请本地解决冲突",
      "conflict.unsupport": "【 {0} 】不支持的解决冲突类型 \n 点击确定将前往标准版解决冲突",
      "open": "打开",
      "index modified": "已修改索引",
      "modified": "已修改",
      "index added": "已添加索引",
      "index deleted": "已删除索引",
      "deleted": "已删除",
      "index renamed": "已重命名索引",
      "index copied": "已复制索引",
      "untracked": "未跟踪的",
      "ignored": "已忽略",
      "intent to add": "打算添加",
      "both deleted": "两者均已删除",
      "added by us": "已由我们添加",
      "deleted by them": "已被他们删除",
      "added by them": "已由他们添加",
      "deleted by us": "已被我们删除",
      "both added": "两者均已添加",
      "both modified": "二者均已修改",
      "commitMessage": "Message (press {0} to commit)",
      "commit": "提交",
      "merge changes": "合并更改",
      "staged changes": "暂存的更改",
      "changes": "更改",
      "push success": "已成功推送。",
      "commit in rebase": "无法在变基过程中修改提交消息。请完成变基操作，并改用交互式变基。",
      "commitMessageWhitespacesOnlyWarning": "当前提交消息仅包含空白字符",
      "commitMessageCountdown": "当前行剩余 {0} 个字符",
      "commitMessageWarning": "当前行比 {1} 超出 {0} 个字符",
      "huge": "Git 存储库“{0}”中存在大量活动更改，将仅启用部分 Git 功能。",
      "neveragain": "不再显示",
      "add known": "是否要将“{0}”添加到 .gitignore?",
      "yes": "是",
      "alex.git.inputBox.merge.conflict.value": "Merge branch '{0}' into {1}",
      "merge conflicts has unstage file": "含有未暂存的合并冲突文件",
      "protected branch or tag": "源分支为受保护分支或者Tag，将自动创建新分支 \n【 {0} 】\n 创建完成后无需切换分支",
      "create branch success": "创建分支成功 {0}",
      "create branch fail": "创建分支失败 {0}",
      "conflict toplatform": "提交成功，源分支为保护分支或者Tag，点击确定前往 {0} 创建PR",
      "conflict resolved success": "冲突解决成功，点击确定前往PR页面",
      "conflict success": "冲突解决成功",
      "config.mergeEditor": "为当前存在冲突的文件打开三路合并编辑器。",
      "Incoming": "传入更改 {0}",
      "Current": "当前更改 {0}",
      "Result": "合并结果",
      "Open Merge": "打开合并编辑器",
      "Switch MergeEditor": "切换合并编辑器，将会刷新页面，点击确定刷新",
      "config.commitType": "直接提交或者创建新分支",
      "config.createPR": "是否提交完后自动创建 PR",
      "config.createPR.to": "提交代码后，自动创建 PR 合并到 {0}",
      "config.commitType.to": "提交到 {0} 分支",
      "config.createBranch.createPR": "新建分支并提交PR",
      "commit.message": "请输入提交信息",
      "commit.branch": "请输入分支名",
      "auto.pr.success": "自动创建 {0} PR 成功",
      "auto.pr.fail": "创建 {0} PR 失败"
    }
  },
  "nlsList": [
    {
      "filename": "package.nls.zh-cn.json",
      "languageId": ".zh-cn"
    }
  ],
  "extendConfig": {},
  "webAssets": [],
  "mode": "public"
}
