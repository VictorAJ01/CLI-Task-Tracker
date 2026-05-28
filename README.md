# CLI Task Tracker

A command-line task tracker built for the [Task Tracker CLI project](https://roadmap.sh/projects/task-tracker) on roadmap.sh. Track what you need to do, what you are working on, and what you have finished.

**Project page:** https://roadmap.sh/projects/task-tracker

## Features

- Add, update, and delete tasks
- Mark a task as in progress or done
- List all tasks or filter by status (`todo`, `in-progress`, `done`)
- Store tasks in a `tasks.json` file in the project directory (created automatically if missing)

## Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/VictorAJ01/CLI-Task-Tracker.git
cd CLI-Task-Tracker
```

### 2. Install dependencies

```bash
npm install
```

### 3. Build the project

```bash
npm run build
```

This compiles TypeScript from `src/` into `dist/`.

### 4. Run the CLI

**Option A — use the `task-cli` command globally (recommended)**

```bash
npm link
```

Then run commands from any directory:

```bash
task-cli list
```

**Option B — run without linking**

From the project root:

```bash
node dist/index.js <command> [arguments]
```

## Usage

```bash
# Add a new task
task-cli add "Buy groceries"
# Output: Tasks added successfully

# Update a task
task-cli update 1 "Buy groceries and cook dinner"

# Delete a task
task-cli delete 1

# Mark a task as in progress or done
task-cli mark-in-progress 1
task-cli mark-done 1

# List all tasks
task-cli list

# List tasks by status
task-cli list done
task-cli list todo
task-cli list in-progress
```

> **Tip:** If your description contains special characters (e.g. `!`), wrap it in single quotes: `task-cli add 'Buy groceries!'`

## Task properties

Each task is stored in `tasks.json` with:

| Property      | Description                                      |
| ------------- | ------------------------------------------------ |
| `id`          | Unique identifier                                |
| `description` | Short description of the task                    |
| `status`      | `todo`, `in-progress`, or `done`                 |
| `createdAt`   | ISO timestamp when the task was created          |
| `updatedAt`   | ISO timestamp when the task was last updated     |

## Tech stack

- TypeScript
- Node.js (native `fs` module for file I/O)
- No external runtime dependencies

## License

ISC
