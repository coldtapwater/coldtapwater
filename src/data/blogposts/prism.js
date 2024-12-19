import BlogPost from '../../models/BlogPost';

const prismBlogPost = new BlogPost({
  id: 'prism-ai-new-reality',
  title: 'How I Accidentally Became the Architect of a New AI Reality (Oops.)',
  summary: 'How a casual idea to fix AI reasoning spiraled into the creation of PRISM—a two-dimensional AI framework with logic, values, and way too much brainpower.',
  content: `
# How I Accidentally Became the Architect of a New AI Reality (Oops.) 

---

## **How It Started vs. How It's Going**
I'll be honest — I didn't wake up one day and say, *"You know what would be fun? Redesigning the entire neural architecture of AI."* But here we are. What began as a casual thought spiral about how LLMs are basically just fancy parrots somehow snowballed into me building a whole new system I'm calling **PRISM**.  

Catchy name, right? It stands for **Principled Reasoning with Integrated Structural Mapping**. Sounds sophisticated, huh? It is. But don't worry, I'll break it down. If I can understand it, you can too.  

---

## **Why I Did It (Or, "I Blame Large Language Models")**
AI right now is like that one friend who *thinks* they know everything, but when you ask them a follow-up question, they hit you with a *"Well, actually…"* moment. These models can regurgitate an entire Wikipedia page but can't handle logic like, "If I paint a car blue, does it get lighter?" (No, LLM. No, it does not.)  

I got tired of it. I wanted an AI that could *reason*, not just predict the next word like some kind of cosmic autocomplete. So, naturally, I did what any reasonable person would do: I built a **two-dimensional neural architecture with a knowledge graph and something I call the "Checker Layer."**  

If that sentence means nothing to you, it's okay. It barely meant anything to me at first too. But trust me, this thing is wild.  

---

## **What Even Is a 2D Neural Network?**
Most neural networks operate in one dimension — they just process stuff in a straight line like a conveyor belt at an airport. But I thought, *"What if we give it another dimension?"*  

Boom — now we're working with not just sequential token processing (left to right) but also **vertical abstraction** (up and down). Imagine a stack of pancakes where each layer has more advanced knowledge than the one below it.  

- **Bottom Layer** = Raw facts (Eggs break when dropped. Gravity exists.)  
- **Middle Layer** = Concepts and ideas (Eggs are fragile. Falling from a height has consequences.)  
- **Top Layer** = High-level reasoning (Don't drop the egg unless you're making an omelet.)  

Now when you ask, "If I drop an egg off a balcony, what happens?" the system doesn't just copy-paste a physics lesson. It reasons through each layer and can explain why it came to the conclusion that, yes, the egg will break.  

---

## **Enter: The Knowledge Graph**
If the 2D structure is the muscle, the **Knowledge Graph** is the brain. It's basically a massive web of facts, ideas, and concepts, all linked together like some kind of cosmic spiderweb. When PRISM wants to know something, it doesn't just guess — it pulls from this graph like a pro researcher checking their notes.  

**Here's what makes it cool:**  
- It updates itself. (Finally, an AI with self-awareness — but not the scary Skynet kind.)  
- It can spot inconsistencies.  
- It actually remembers things you told it before (unlike me during finals week).  

---

## **The Checker Layer: AI's Moral Compass**
Alright, this part is my favorite. You know how spellcheck flags typos in Word? Imagine if your spellcheck could also flag *bad logic, unethical behavior, and general nonsense*.  

Enter the **Checker Layer**, PRISM's personal Jiminy Cricket. Except instead of a cricket, it's a system that checks the AI's reasoning as it's happening. If the AI says, "If you paint a car blue, it will weigh less," the Checker Layer pulls the emergency brake like, *"Hold up. That makes no sense."*  

It's not just fact-checking; it's **logic-checking** and **ethics-checking** too. If PRISM somehow concludes that it's okay to steal cookies because "nobody saw it," the Checker Layer reminds it that **stealing is bad, Jerry.**  

---

## **Personalization Without the Chaos**
You know how Netflix says it knows you but then recommends *The Great British Bake Off* after you just binge-watched *Breaking Bad*? Yeah, I didn't want PRISM to be like that.  

PRISM personalizes its reasoning for each user, but it keeps personal preferences **separate** from hard facts. So even if you're a die-hard flat-earther (please reconsider), PRISM isn't going to overwrite "The Earth is round" just to please you.  

---

## **The Hard Parts (Or, "This Almost Broke My Brain")**
Building PRISM wasn't all sunshine and perfectly compiled code. I had to solve things like:  
- **How do you make the Checker Layer fast enough to work in real-time?**  
- **How do you prevent user bias from breaking the logic system?**  
- **How do you keep it all scalable without needing NASA-level hardware?**  

Spoiler alert: I did it. Sort of. The Checker Layer runs smoothly, user bias is quarantined like a suspect banana at customs, and I managed to keep the system efficient enough to not require a supercomputer.  

---

## **What's Next for PRISM?**
I'm not done. Far from it. Next up, I want to make PRISM *even more human-like* (in reasoning, not in being creepy).  

I'm working on ways to:  
- **Train it on more abstract thinking.** (It needs to know that "breaking someone's trust" isn't just about glass shattering.)  
- **Speed up reasoning without sacrificing logic.** (Brains are fast. PRISM can be, too.)  
- **Expand the Checker Layer.** (Sometimes I want it to call me out when I'm being lazy.)  

Plus, I'm thinking of giving it a more fun personality. Because let's be honest — nobody wants to talk to a lifeless automaton.  

---

## **The Takeaway (Or, "What Did We Learn?")**
If you only remember one thing from this entire blog post, make it this:  
**AI doesn't have to be boring. It can reason. It can explain itself. And it can absolutely call you out on your bad logic.**  

I didn't set out to change the way AI works, but sometimes curiosity leads you down wild rabbit holes. And if that hole happens to contain a 2D neural network with a knowledge graph and a snarky Checker Layer, so be it.  

If you're curious, stick around. I'm sure PRISM will surprise you as much as it's surprised me.

---

## **Want to Learn More?**
This blog post only scratches the surface of what PRISM can do. If you're interested in the technical details and want to dive deeper into the architecture, methodology, and research behind PRISM, check out the [full research paper](/portfolio/research). It covers everything from the mathematical foundations to implementation details and experimental results.
  
  `,
  coverImage: '/images/prismcover.jpg',
  tags: ['AI', 'PRISM', '2D Neural Networks', 'Knowledge Graphs', 'Checker Layer', 'Artificial Intelligence', 'Machine Learning'],
  publishDate: '2024-12-19',
  category: 'Technology',
  featured: true,
  authorId: 'frgmt0'
});

export default prismBlogPost;
