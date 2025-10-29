const fs = require('fs');
const path = require('path');
const schedule = require('node-schedule');


const TASKS_FILE = path.join(__dirname, '../data/tasks.json');
const scheduledJobs = {};

function loadTasks(){
    try{
        if (fs.existsSync(TASKS_FILE)) {
            const data = fs.readFileSync(TASKS_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch(error) {
        console.error('Error loading tasks:', error.message);
    }
    return [];
}

function saveTasks(tasks){
    try {
        const dir = path.dirname(TASKS_FILE);
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {recursive: true});
        }
        fs.writeFileSync(TASKS_FILE, JSON.stringify(tasks, null, 2));
    } catch (error) {
        console.error('Error saving tasks:', error.message);
    }
}

function addTask(description, priority = 'medium', dueTime = null) {
    const tasks = loadTasks();

    const task = {
        id: Date.now(),
        description: description,
        priority: priority,
        dueTime, dueTime,
        completed: false,
        createdAt: new Date().toISOString()
    };

    tasks.push(task);
    saveTasks(tasks);

    if(dueTime){
        scheduleReminder(task);
    }

    return `Task added: "${description}" (Priority: ${priority})`;
}

function listTasks(filter = 'all') {
    const tasks = loadTasks();

    let filteredTasks = tasks;
    if(filter === 'pending'){
        filteredTasks = tasks.filter(t => !t.completed);
    }else if(filter === 'completed'){
        filteredTasks = tasks.filter(t => t.completed);
    }
    if(filteredTasks.length === 0){
        return `No ${filter} tasks found.`;
    }

    let response = `Your ${filter} tasks:\n`;
    filteredTasks.forEach((task,index) => {
        const priorityIcons = {
            'high': '🔴',
            'medium': '🟡',
            'low': '🟢'
        };

        const status = task.completed ? '✓' : '○';
        const priority = priorityIcons[task.priority] || '';
        const time = task.dueTime ? `[Due: ${task.dueTime}]` : '';
        response += `${index + 1}. ${status} ${task.description} ${priority}${time}\n`;
    });
    
    return response;
}

function completeTask(taskNumber){
    const tasks = loadTasks();

    if(taskNumber < 1 || taskNumber > tasks.length) {
        return "Invalid task number";
    }

    const task = tasks[taskNumber - 1];
    task.completed = true;
    task.completedAt = new Date().toISOString();

    saveTasks(tasks);
    return `Completed: "${task.description}" ✓`;
}



function deleteTask(taskNumber) {
    const tasks = loadTasks();


    if(taskNumber < 1 || taskNumber > tasks.length) {
        return "Invalid task number";
    }

    const deleted = tasks.splice(taskNumber -1,1)[0];
    saveTasks(tasks);
    return `Deleted: "${deleted.description}"`;
}

function scheduleReminder(task){

    if(!task.dueTime) return;

    try{
        const time = parseTime(task.dueTime);
        if(!time){
            console.log(`Could not parse time: ${task.dueTime}`);
            return;
        }

        const job = schedule.scheduleJob(time, function() {
            console.log(`\n🔔 Reminder: ${task.description}\n`);
            console.log('You: ');
        });

        scheduledJobs[task.id] = job;
        console.log(`✓ Reminder set for: ${task.description} at ${task.dueTime}`);
    }catch(error){
        console.error(`Error scheduling reminder: ${error.message}`)
    }
}


function parseTime(timeStr){
    const now = new Date();


    const match = timeStr.match(/(\d+):?(\d+)?\s*(am|pm)?/i);
    if(!match)return null;

    let hours = parseInt(match[1]);
    const minutes = match[2] ? parseInt(match[2]) : 0;
    const meridiem = match[3] ? match[3].toLowerCase() : null;


    if(meridiem === 'pm' && hours < 12) hours += 12;
  if (meridiem === 'am' && hours === 12) hours = 0;
  
  const scheduledTime = new Date(now);
  scheduledTime.setHours(hours, minutes, 0, 0);

  if (scheduledTime < now) {
    scheduledTime.setDate(scheduledTime.getDate() + 1);
  }
  
  return scheduledTime;
}
module.exports = {
    addTask,
    listTasks,
    completeTask,
    deleteTask,
    parseTime
};