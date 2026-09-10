---
name: setup-repository
description: Sets up and integrates the codebase-memory-mcp code intelligence knowledge graph server for a repository. Covers binary installation, client MCP registration (workspace mcp.json, .agents/mcp_config.json, global config), initial indexing, team persistence snapshots, git hygiene (.gitignore / Git LFS), cadence updates, and verification. Triggers on "/setup-repository", "setup repository", "setup repo", "setup codebase memory", "setup cbm", or "initialize codebase memory".
metadata:
  author: BIGboss248
  version: "1.1"
---

# Codebase Memory MCP Setup Skill (`setup-repository`)

This skill defines the complete procedure for equipping any repository with the **`codebase-memory-mcp`** persistent knowledge graph code intelligence server.

---

## 1. Install `codebase-memory-mcp` Binary

Install the native binary or global CLI for your platform:

### Windows (PowerShell)

```powershell
Invoke-WebRequest -Uri https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.ps1 -OutFile install.ps1
Unblock-File .\install.ps1
.\install.ps1
Remove-Item .\install.ps1
```

### macOS / Linux (Bash)

```bash
curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash
```

### Global npm Package Alternative (Any OS)

```bash
npm install -g codebase-memory-mcp@latest
```

### Verify Installation

```bash
codebase-memory-mcp --version
```

Expected output: `codebase-memory-mcp 0.x.x`

---

## 2. Register MCP Server in Configuration Files

Register `codebase-memory-mcp` across the relevant MCP configuration files:

### A. Workspace Root `mcp.json`

Add to `mcp.json` at the root of the repository:

```json
{
  "mcpServers": {
    "codebase-memory": {
      "command": "codebase-memory-mcp",
      "args": []
    }
  }
}
```

### B. Workspace Agent Config (`.agents/mcp_config.json`)

If the repository uses an `.agents/` directory:

```json
{
  "mcpServers": {
    "codebase-memory": {
      "command": "codebase-memory-mcp",
      "args": []
    }
  }
}
```

### C. Global User Config (`mcp_config.json`)

For Antigravity / Gemini global settings (`~/.gemini/config/mcp_config.json`):

```json
{
  "mcpServers": {
    "codebase-memory": {
      "command": "codebase-memory-mcp",
      "args": []
    }
  }
}
```

---

## 3. Git & Storage Hygiene

By default, the SQLite knowledge graph is stored centrally in your user cache:

- `~/.cache/codebase-memory-mcp/<project-name>.db`

### Local-Only Mode (Default)

If you do not want local graph snapshots tracked in git, add `.codebase-memory/` to `.gitignore`:

```gitignore
# Codebase Memory MCP local snapshot
.codebase-memory/
```

### Team Sharing Mode (Portable Snapshots)

If teammates should share the precomputed graph snapshot:

1. Remove `.codebase-memory/` from `.gitignore`.
2. Track the binary snapshot with **Git LFS** in root `.gitattributes` to avoid inflating git history:
   ```gitattributes
   .codebase-memory/graph.db.zst filter=lfs diff=lfs merge=lfs -text
   ```

---

## 4. Run Initial Repository Indexing

Index the repository to build the initial knowledge graph:

### Standard Local Index:

```bash
codebase-memory-mcp cli index_repository --repo-path "<canonical-repo-path>"
```

### Persistent Team Artifact Index:

```bash
codebase-memory-mcp cli index_repository --repo-path "<canonical-repo-path>" --persistence true
```

_Generates `.codebase-memory/graph.db.zst` and `artifact.json` in the repository root._

---

## 5. Deliberate Cadence Maintenance

To prevent committing binary graph changes on every minor edit, update the snapshot on a deliberate cadence:

### Package Script (`package.json`)

Add a script for on-demand milestone/release updates:

```json
{
  "scripts": {
    "cbm:update": "codebase-memory-mcp cli index_repository --repo-path . --persistence true"
  }
}
```

Run when checkpointing:

```bash
pnpm run cbm:update
```

### Scheduled GitHub Action (`.github/workflows/cbm-sync.yml`)

For automated weekly/nightly synchronization:

```yaml
name: Codebase Memory Sync

on:
  schedule:
    - cron: "0 2 * * 0" # Weekly at 2 AM UTC on Sunday
  workflow_dispatch:

concurrency:
  group: cbm-sync
  cancel-in-progress: false

jobs:
  sync-graph:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Install CBM
        run: |
          curl -fsSL https://raw.githubusercontent.com/DeusData/codebase-memory-mcp/main/install.sh | bash
          echo "$HOME/.local/bin" >> $GITHUB_PATH
      - name: Index Repository
        run: codebase-memory-mcp cli index_repository --repo-path . --persistence true
      - name: Commit changes
        uses: stefanzweifel/git-auto-commit-action@v5
        with:
          commit_message: "chore(cbm): refresh knowledge graph [skip ci]"
          file_pattern: ".codebase-memory/*"
```

---

## 6. Verification & Smoke Test

Verify the graph is populated and operational:

1. **Architecture Overview**:

   ```bash
   codebase-memory-mcp cli get_architecture --project "<project-name>"
   ```

   _Verify node count, edge count, detected languages, entry points, and packages._

2. **Call Path Traversal**:

   ```bash
   codebase-memory-mcp cli trace_path --project "<project-name>" --function-name "<target-symbol>" --direction "inbound"
   ```

3. **(Optional) 3D Visualizer Web UI**:

   ```bash
   codebase-memory-mcp --ui=true --port=9749
   ```

   _Open `http://localhost:9749` to explore the 3D graph._

4. **Agent Tool Activation**:
   _Restart or reload the agent session to activate the newly registered MCP server tools (`search_graph`, `trace_path`, `query_graph`, `get_architecture`, `detect_changes`)._
