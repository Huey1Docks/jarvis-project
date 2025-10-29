const readline = require('readline-sync');
const NLPEngine = require('./core/nlp');
const SmartResponder = require('./core/smartResponder');

async function main() {
  console.log("🤖 Initializing JARVIS with NLP...\n");
  
  // Initialize NLP
  const nlp = new NLPEngine();
  await nlp.initialize();
  
  const responder = new SmartResponder(nlp);
  
  console.log("✓ JARVIS is ready! (Now with natural language understanding)\n");
  console.log("Try: 'remind me to buy groceries at 3pm'\n");

  while (true) {
    const input = readline.question('You: ');
    
    if (input.toLowerCase() === 'exit') {
      console.log("JARVIS: Goodbye!\n");
      break;
    }
    
    const response = await responder.getResponse(input);
    console.log(`JARVIS: ${response}\n`);
  }
}

main().catch(console.error);