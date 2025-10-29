
# **JARVIS – Your Personal AI Assistant**

A local, privacy-focused personal assistant built with **Node.js**.
JARVIS understands natural language, manages your tasks, remembers information about you, and operates entirely on your machine — free, offline, and fully under your control.

---

## ✨ Features**

### 🧠 Natural Language Understanding**

* Speak naturally: “Remind me to buy groceries at 3 PM.”
* No need for strict commands — JARVIS understands intent.
* Powered by **NLP.js**, completely offline.

### 📝 **Task Management**

* Add tasks with priorities (`high`, `medium`, `low`).
* Set due times or reminders.
* Mark tasks complete or delete them.
* All tasks persist across sessions.

### 🎯 **Personal Memory**

* Teach JARVIS facts about yourself.
* Stores preferences, habits, and routines.
* Recalls details when relevant.
* All memory stored locally in JSON.

### 🔔 **Smart Reminders**

* Schedule notifications for specific times.
* Console and system-level alerts.
* Automatically handles overdue tasks.

### 🔒 **Privacy First**

* 100% local processing — no cloud APIs.
* Your data never leaves your device.
* Runs offline after setup.
* Open source and fully transparent.

---

## **🚀 Quick Start**

### **Prerequisites**

* Node.js v16+ (v22 recommended)
* macOS, Linux, or Windows
* Terminal or command-line access

### **Installation**

```bash
# Clone the repository
git clone https://github.com/yourusername/jarvis-assistant.git
cd jarvis-assistant

# Install dependencies
npm install

# Run JARVIS
node index.js
```

---

## **📖 Usage**

### **Natural Language Examples**

```bash
You: remind me to buy groceries at 3pm
JARVIS: Task added: "buy groceries" (Priority: medium)

You: what do I need to do today?
JARVIS: Your pending tasks:
1. ○ 🟡 buy groceries [Due: 3pm]

You: mark 1 as done
JARVIS: Completed: "buy groceries" ✓

You: remember that I work best in the morning
JARVIS: Got it. I’ll remember that.
```

### **Exact Command Examples**

```bash
task [description] [time] [priority]    # Add a task
tasks                                   # List tasks
complete [number]                       # Mark complete
delete [number]                         # Delete a task
remember [fact]                         # Store fact
recall                                  # Show stored facts
time / date                             # Get time/date
help                                    # Command list
exit                                    # Quit JARVIS
```

---

## **🏗️ Project Structure**

```
jarvis-assistant/
├── core/
│   ├── memory.js           # Handles persistent memory
│   ├── tasks.js            # Task management & scheduling
│   ├── nlp.js              # Natural language engine
│   ├── smartResponder.js   # Intent handling
│   └── responder.js        # Fallback for exact commands
├── data/
│   ├── memory.json         # Stores remembered facts
│   └── tasks.json          # Task database
├── index.js                # Main entry point
├── package.json            # Dependencies
└── README.md               # This file
```

---

## **🔧 Configuration**

### **Task Priorities**

| Level    | Emoji | Description        |
| -------- | ----- | ------------------ |
| `high`   | 🔴    | Urgent or critical |
| `medium` | 🟡    | Default priority   |
| `low`    | 🟢    | Low urgency        |

### **Time Formats Supported**

* `3pm`, `3:00pm`, or `3:30pm`
* `15:00` (24-hour format)

---

## **📚 Development Phases**

| Phase                                 | Focus                                           | Status |
| ------------------------------------- | ----------------------------------------------- | ------ |
| **1. Minimal Text Assistant**         | Core terminal loop, commands, modular structure | ✅      |
| **2. Memory & Personalization**       | JSON storage, `remember`/`recall`               | ✅      |
| **3. Task Management & Scheduler**    | CRUD, priorities, reminders                     | ✅      |
| **4. Natural Language Understanding** | NLP engine, entity extraction, training         | ✅      |

---

## **🛠️ Tech Stack**

| Technology         | Purpose                  |
| ------------------ | ------------------------ |
| **Node.js**        | Runtime environment      |
| **readline-sync**  | Terminal input           |
| **node-schedule**  | Task reminders           |
| **@nlpjs/basic**   | NLP engine               |
| **@nlpjs/lang-en** | English language support |

---

## **🐛 Troubleshooting**

| Issue                    | Fix                                                                  |
| ------------------------ | -------------------------------------------------------------------- |
| **Module not found**     | Run `npm install`                                                    |
| **NLP not responding**   | Reinstall NLP packages:<br>`npm install @nlpjs/basic @nlpjs/lang-en` |
| **Reminders not firing** | Keep terminal open, verify system time                               |
| **Data not saving**      | Check `data/` folder and permissions                                 |

---

## **🗺️ Roadmap**

### Upcoming Features

* [ ] macOS native notifications
* [ ] Calendar integration (.ics import)
* [ ] Daily briefing automation
* [ ] Smart scheduling algorithms
* [ ] Web dashboard (React)
* [ ] Local LLM integration (Ollama/Llama)
* [ ] Email and productivity tools

Full roadmap: [ROADMAP.md](ROADMAP.md)

---

## **🤝 Contributing**

1. Fork this repository
2. Create a branch: `git checkout -b feature/AmazingFeature`
3. Commit changes: `git commit -m 'Add AmazingFeature'`
4. Push: `git push origin feature/AmazingFeature`
5. Open a Pull Request

**Guidelines**

* Keep functions focused and modular
* Comment complex logic
* Test thoroughly before pushing
* Update documentation when adding features

---

## **📄 License**

Licensed under the **MIT License**.
See the [LICENSE](LICENSE) file for full details.

---

## **🙏 Acknowledgments**

* Built using [NLP.js](https://github.com/axa-group/nlp.js) by AXA Group
* Inspired by Tony Stark’s J.A.R.V.I.S.
* Created as a personal learning project to explore **AI assistants, NLP, and software design**.

---

## **📞 Support**

* **Issues:** [GitHub Issues](https://github.com/yourusername/jarvis-assistant/issues)
* **Discussions:** [GitHub Discussions](https://github.com/yourusername/jarvis-assistant/discussions)

---

## **🎯 Project Goals**

* Build a useful offline AI assistant.
* Explore practical NLP and AI integration.
* Demonstrate clean Node.js architecture.
* Promote privacy-first design principles.

---

**Built with ❤️, discipline, and JavaScript.**

---

Would you like me to generate a **ROADMAP.md** next (with professional formatting and milestone goals for Phases 5–7)? That would make your repo look like a real development project in progress.
