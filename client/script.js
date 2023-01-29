import bot from './assets/bot.svg';
import user from './assets/user.svg';
import Prism from 'prismjs';

const form = document.querySelector('form');
const chatContainer = document.querySelector('#chat_container');

let loadInterval;





// Optimized Code
function loader(element) {
  let dots = 0;
  loadInterval = setInterval(() => {
    element.textContent = '.'.repeat(dots).padEnd(4, ' ');
    dots = (dots + 1) % 4;
  }, 300);
}

// Explanation
// This code is optimized by using the string repeat and padEnd methods, as they are more efficient than 
// using a condition to evaluate the value of dots and adding a dot to the content of the element. This 
// reduces the complexity of the code and improves its performance.

function typeText(element, text) {
  let index = 0;
  const html = Prism.highlight(text, Prism.languages.javascript, 'javascript');
  element.innerHTML = html;

  /* let interval = setInterval(() => {
    element.innerHTML += text.charAt(index);
    index++;
    if (index >= text.length) clearInterval(interval);
  }); */
}

//Programer: I optimized the code by combining the timestamp and the hexadecimal string into one line.
function generateUniqueId(){
  return `id-${Date.now()}-${Math.random().toString(16)}`;
}



const handleSubmit = async (e) => {
  e.preventDefault();

  const data = new FormData(form);

  chatContainer.scrollTop = chatContainer.scrollHeight;

  const messageDiv = document.getElementById("result");
  loader(messageDiv);

  try {
    const response = await fetch(/* 'https://openai-app.onrender.com' */ 'http://localhost:5000', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        prompt: data.get('prompt')
      })
    });

    clearInterval(loadInterval);
    messageDiv.innerHTML = '';

    if(response.ok){
      const data = await response.json()
      const parseData = data.bot.trim()
      typeText(messageDiv, parseData);
    } else{
      throw new Error(await response.text());
    }
  } catch (err) {
    messageDiv.innerHTML = "Something went wrong"
    alert(err);
  }

  form.reset();
}


form.addEventListener('submit', handleSubmit);
form.addEventListener('keyup', (e) =>{
  if( e.keyCode === 13){
    handleSubmit(e);
  }
})






//Optimized code
const copyButtonLabel = "Copy Code";
let blocks = document.querySelectorAll("pre");

navigator.clipboard && blocks.forEach((block) => {
  let button = document.createElement("button");
  button.innerText = copyButtonLabel;
  block.appendChild(button);
  button.addEventListener("click", () => copyCode(block, button));
});

async function copyCode(block, button) {
  let code = block.querySelector("code");
  let text = code.innerText;
  await navigator.clipboard.writeText(text);
  button.innerText = "Code Copied";
  setTimeout(() => {button.innerText = copyButtonLabel;}, 700);
}
//Optimized code to reduce unnecessary statements and nested if statements to improve readability.




