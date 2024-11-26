const sendBtn = document.querySelector('.sendMessage');
const userInput = document.querySelector('.user-input');
const chatBody = document.querySelector('.chatbot-body');

const string = 'AIzaSyCXQ1G-K-Xd6c8jBPnlWX8hlVXm2ZzJ1FM';
const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${string}`;
const userMessage = {
    answer:null
}
sendBtn.addEventListener('click',()=>{
    findMessage();

})

window.addEventListener('keyup',(event) => {
    if (event.key === "Enter") {
     findMessage();
    }
 })


 const findMessage = () => {
    const inputValue = userInput.value.trim();
    userMessage.answer = inputValue; /* clear the text inside the text Area */

    if (inputValue) {
        const messageEl = ` <div class="message-text">${userMessage.answer}</div>`;
        const message = createMessage(messageEl,"user-message");
        chatBody.appendChild(message);
        setTimeout(renderBotMessage,600);     
    }
 }

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
    userInput.value = "";
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
    } catch (error) {
        console.log(error);
    }
}
