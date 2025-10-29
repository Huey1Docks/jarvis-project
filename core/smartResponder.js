const { remember, recall } = require('./memory');
const { addTask, listTasks, completeTask, deleteTask } = require('./tasks');

class SmartResponder {
  constructor(nlpEngine) {
    this.nlp = nlpEngine;
  }

  async getResponse(input) {
    // First, try NLP
    const nlpResult = await this.nlp.process(input);
    
    // If confidence is high enough, use NLP
    if (nlpResult.score > 0.7) {
      return this.handleIntent(nlpResult);
    }
    
    // Otherwise, fall back to exact commands
    return this.handleExactCommand(input);
  }

  handleIntent(nlpResult) {
    const { intent, entities } = nlpResult;
    
    switch (intent) {
      case 'task.add':
        if (!entities.task) {
          return "What task do you want to add?";
        }
        const priority = entities.priority || 'medium';
        const time = entities.time || null;
        return addTask(entities.task, priority, time);
      
      case 'task.list':
        return listTasks('pending');
      
      case 'task.complete':
        if (!entities.number) {
          return "Which task number do you want to complete?";
        }
        return completeTask(entities.number);
      
      case 'memory.remember':
        if (!entities.fact) {
          return "What should I remember?";
        }
        return remember(entities.fact);
      
      case 'memory.recall':
        return recall();
      
      case 'info.time':
        const now = new Date();
        return `It's ${now.toLocaleTimeString()}`;
      
      case 'info.date':
        const today = new Date();
        return `Today is ${today.toLocaleDateString()}`;
      
      default:
        return "I'm not sure what you mean. Try asking differently or type 'help' for commands.";
    }
  }

  handleExactCommand(input) {
    const command = input.trim().toLowerCase();
    
    if (command === 'help') {
      return `I understand natural language! Try saying things like:
  - "remind me to buy groceries at 3pm"
  - "what do I need to do today?"
  - "mark task 1 as done"
  - "remember that I prefer coffee"
  - "what time is it?"
  
Or use exact commands:
  - task [description] [time] [priority]
  - tasks
  - complete [number]
  - remember [fact]
  - recall
  - exit`;
    }
    
    if (command === 'plan') {
      return "Your plan for today:\n - Morning\n - Afternoon\n - Evening";
    }
    
    return "I didn't understand that. Type 'help' to see what I can do.";
  }
}

module.exports = SmartResponder;