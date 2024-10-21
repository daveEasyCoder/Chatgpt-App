const sendBtn = document.querySelector('.sendMessage');
const userInput = document.querySelector('.user-input');
const chatBody = document.querySelector('.chatbot-body');

const API_KEY = "AIzaSyAe6FH3UPGg1gOQZx6ncz4hYgcZeHhTWmk";
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
const userMessage = {
    answer:null
}
sendBtn.addEventListener('click',()=>{
    const inputValue = userInput.value.trim();
    userMessage.answer = inputValue;
    if (inputValue) {
        const messageEl = ` <div class="message-text">${userMessage.answer}</div>`;
        const message = createMessage(messageEl,"user-message");
        chatBody.appendChild(message);
        setTimeout(renderBotMessage,600);     
    }
})



/* display chatbot message */
const renderBotMessage = () => {

    const botMessage = `
                <div class="picture-container bot-pic"><img src="assets/ChatGPT-Logo.png" alt=""></div>
                <div class="bot-message thinking-bot">
                    <div class="dot"></div>
                    <div class="dot"></div>
                    <div class="dot"></div>
                </div>
                `;
                const message = createMessage(botMessage,"content");
                chatBody.appendChild(message);  
                const item = message.querySelector('.thinking-bot');
               fetchMessage(item);

    }


const createMessage = (MessageEl,classes) => {
    const messageBox = document.createElement("div");
    messageBox.innerHTML = MessageEl;
    messageBox.classList.add("message",classes);
    return messageBox;
}

const fetchMessage = async(item) =>{
    const requestOption = {
        method:"POST",
        headers:{"Content-Type":"application/json"},
        body:JSON.stringify({
            contents:[{
                parts:[{text:userMessage.answer}]
            }]
        })
    }
    try {
        const response = await fetch(API_URL,requestOption);
        if (!response.ok) {
            throw new Error("something went wrong");
        }
        const data = await response.json();
        const generatedMessage = data.candidates[0].content.parts[0].text;
        item.innerHTML = generatedMessage;
         /* clear the text inside the text Area */
         userInput.value = "";
         console.log(item);
    } catch (error) {
        console.log(error);
    }
}