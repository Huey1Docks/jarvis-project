const fs = require('fs');
const path = require('path');

const MEMORY_FILE = path.join(__dirname, '../data/memory.json');


function loadMemory(){
    try{
        if(fs.existsSync(MEMORY_FILE)){
            const data = fs.readFileSync(MEMORY_FILE, 'utf8');
            return JSON.parse(data);
        }
    } catch(error){
        console.error('Error loading memory:', error.message);
    }
    return { facts: [], conversations: [] };
}

function saveMemory(memory){
    try{
        const dir = path.dirname(MEMORY_FILE);
        if(!fs.existsSync(dir)) {
            fs.mkdirSync(dir, {recursive: true });
        }
        fs.writeFileSync(MEMORY_FILE, JSON.stringify(memory, null, 2));
    } catch (error){
        console.error('Error saving memory:', error.message);
    }
}

function remember(fact){
    const memory = loadMemory();
    memory.facts.push({
        fact: fact,
        timestamp: new Date().toISOString()
    });
    saveMemory(memory);
    return "I'll remember that.";
}

function recall() {
    const memory = loadMemory();
    if(memory.facts.length === 0){
        return "I don't know anything about you yet. Teach me with 'remember [fact]'";
    }

    let response = "Here's what I know about you: \n";

    memory.facts.forEach((iterm,index)=> {
        response += `${index +1}. ${iterm.fact}\n`;
    });
    return response;
}

/*
do i still need this because i have one for deleting tasks in tasks.js
function deleteFact(index) {
    const memory = loadMemory();
    if(index < 1 || index > memory.facts.length){
        return `Invalid index. You have ${memory.facts.length} fact(s).`;
    }

    const removed = memory.facts.splice(index -1, 1);
    saveMemory(memory);
    return `Deleted: "${removed[0].fact}"`;
}
*/
module.exports = {remember, recall, };