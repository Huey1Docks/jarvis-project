const { containerBootstrap } = require('@nlpjs/core');
const { Nlp } = require('@nlpjs/nlp');
const { LangEn } = require('@nlpjs/lang-en-min');

class NLPEngine {
  constructor() {
    this.nlp = null;
  }

  async initialize() {
    const container = await containerBootstrap();
    
    container.use(Nlp);
    container.use(LangEn);
    
    const nlp = container.get('nlp');
    nlp.settings.autoSave = false;
    nlp.settings.log = false;
    
    // Add language
    nlp.addLanguage('en');
    
    this.nlp = nlp;
    
    await this.trainModel();
    console.log("✓ NLP engine initialized");
  }

  async trainModel() {
    // Train for adding tasks
    this.nlp.addDocument('en', 'add task', 'task.add');
    this.nlp.addDocument('en', 'remind me to', 'task.add');
    this.nlp.addDocument('en', 'I need to', 'task.add');
    this.nlp.addDocument('en', 'create a task', 'task.add');
    this.nlp.addDocument('en', 'new task', 'task.add');
    this.nlp.addDocument('en', 'todo', 'task.add');
    this.nlp.addDocument('en', 'add to my list', 'task.add');
    
    // Train for listing tasks
    this.nlp.addDocument('en', 'show my tasks', 'task.list');
    this.nlp.addDocument('en', 'what do I need to do', 'task.list');
    this.nlp.addDocument('en', 'list my tasks', 'task.list');
    this.nlp.addDocument('en', 'what are my tasks', 'task.list');
    this.nlp.addDocument('en', 'show todo list', 'task.list');
    this.nlp.addDocument('en', 'what is on my list', 'task.list');
    this.nlp.addDocument('en', 'my tasks', 'task.list');
    
    // Train for completing tasks
    this.nlp.addDocument('en', 'mark as done', 'task.complete');
    this.nlp.addDocument('en', 'complete task', 'task.complete');
    this.nlp.addDocument('en', 'finish task', 'task.complete');
    this.nlp.addDocument('en', 'done with task', 'task.complete');
    this.nlp.addDocument('en', 'I finished', 'task.complete');
    this.nlp.addDocument('en', 'task done', 'task.complete');
    
    // Train for remembering facts
    this.nlp.addDocument('en', 'remember that', 'memory.remember');
    this.nlp.addDocument('en', 'note that', 'memory.remember');
    this.nlp.addDocument('en', 'keep in mind', 'memory.remember');
    this.nlp.addDocument('en', 'store this', 'memory.remember');
    
    // Train for recalling facts
    this.nlp.addDocument('en', 'what do you know about me', 'memory.recall');
    this.nlp.addDocument('en', 'tell me what you remember', 'memory.recall');
    this.nlp.addDocument('en', 'what do you remember', 'memory.recall');
    this.nlp.addDocument('en', 'recall facts', 'memory.recall');
    
    // Train for getting time
    this.nlp.addDocument('en', 'what time is it', 'info.time');
    this.nlp.addDocument('en', 'tell me the time', 'info.time');
    this.nlp.addDocument('en', 'current time', 'info.time');
    this.nlp.addDocument('en', 'time', 'info.time');
    
    // Train for getting date
    this.nlp.addDocument('en', 'what is the date', 'info.date');
    this.nlp.addDocument('en', 'what day is it', 'info.date');
    this.nlp.addDocument('en', 'today date', 'info.date');
    this.nlp.addDocument('en', 'date', 'info.date');
    
    await this.nlp.train();
  }

  async process(input) {
    const response = await this.nlp.process('en', input);
    return {
      intent: response.intent,
      score: response.score,
      entities: this.extractEntities(input, response)
    };
  }

  extractEntities(input, response) {
    const entities = {};
    
    // Extract task description
if (response.intent === 'task.add') {
  let task = input
    .replace(/^(remind me to|remind be to|add task|add|create a task to|create task|I need to|need to|new task|todo|add to my list)\s*/i, '')
    .replace(/\s+(to my list|on my list)$/i, '')
    .trim();
  
  // Extract time (3pm, 15:00, etc.)
  const timeMatch = task.match(/\s+at\s+(\d+:?\d*\s*(am|pm)?)/i);
  if (timeMatch) {
    entities.time = timeMatch[1];
    task = task.replace(timeMatch[0], '').trim();
  }
  
  // Extract priority
  const priorityMatch = task.match(/\s+(high|medium|low)\s*priority/i);
  if (priorityMatch) {
    entities.priority = priorityMatch[1].toLowerCase();
    task = task.replace(priorityMatch[0], '').trim();
  }
  
  entities.task = task;
}
    
    // Extract task number
    if (response.intent === 'task.complete') {
      const numberMatch = input.match(/\d+/);
      if (numberMatch) {
        entities.number = parseInt(numberMatch[0]);
      }
    }
    
    // Extract fact to remember
    if (response.intent === 'memory.remember') {
      let fact = input
        .replace(/^(remember that|note that|keep in mind|store this)\s*/i, '')
        .trim();
      entities.fact = fact;
    }
    
    return entities;
  }
}

module.exports = NLPEngine;