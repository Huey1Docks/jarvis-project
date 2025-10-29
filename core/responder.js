const {remember, recall } = require('./memory');
const {addTask, listTasks, completeTask, deleteTask} = require("./tasks");

function getResponse(input){
    const command = input.trim().toLowerCase();
    const originalInput = input.trim();


    if(command === 'time'){
        const now = new Date();
        return `Its now ${now.toLocaleTimeString()}\n`;
    }else if(command === 'date'){
        const now = new Date();
        return `Today is ${now.toLocaleDateString()}\n`;
    }else if(command === 'plan'){
        return `Your plan for today:\n -Morning\n -Afternoon\n -Eveninng\n`;
    }else if(command === 'help'){
        return `
        time: Shows current time \n 
        date: Shows current date\n 
        plan: Shows daily plan\n 
        remember [fact]: Teach me something about you\n 
        recall: Show what I know about you\n task [desciption]: Add a task\n
        tasks: List all tasks\n
        complete[number]: Mark task as complete\n
        delete [number]: delete a task\n
        help: Show this message\n
        exit: Quit JARVIS`
    }else if (command.startsWith('remember ')){
        const fact = originalInput.substring(9).trim();
            if(!fact){
                return "What should i remember? Usage: remember [fact]";
            }
            return remember(fact);
    }else if(command === 'recall'){
        return recall();
    }else if(command === 'tasks'){
        return listTasks('pending');
    }else if(command.startsWith('task ')){  // Note the space after 'task'
    const taskInput = originalInput.substring(5).trim();
    if(!taskInput){
        return "What's the task? Usage: task [description] [time] [priority: low/medium/high]";
    }
    
    let description = taskInput;
    let priority = 'medium';
    let dueTime = null;
    
    const words = taskInput.split(' ');
    
    // Check last word for priority
    const lastWord = words[words.length - 1].toLowerCase();
    if(lastWord === 'low' || lastWord === 'medium' || lastWord === 'high'){
        priority = lastWord;
        words.pop();  // Remove priority from words
    }
    
    // Check for time pattern (e.g., "3pm", "15:00")
    const timePattern = /\d+:?\d*\s*(am|pm)?/i;
    for (let i = words.length - 1; i >= 0; i--) {
        if (timePattern.test(words[i])) {
            dueTime = words[i];
            words.splice(i, 1);
            break;
        }
    }
    
    description = words.join(' ');
    
    return addTask(description, priority, dueTime);
}else if(command.startsWith('complete')){
        const taskNum = parseInt(command.substring(9).trim());
        if(isNaN(taskNum)) {
            return "Please provide a task number. Usage: complete [number]";
        }
        return completeTask(taskNum);
    }else if(command.startsWith('delete')){
        const taskNum = parseInt(command.substring(7).trim());
        if(isNaN(taskNum)){
            return "Please provide a task number. Usage: delete [number]";
        }
        return deleteTask(taskNum);
    }else{
        return `I do not understand ${input}\n`;
    }
}

module.exports = { getResponse };