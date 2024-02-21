document.addEventListener("DOMContentLoaded", function() {
    const TELEGRAM_TOKEN = '6527581740:AAEc3Z_1vwP5aOY6iOBUdCqGYm9XRMWwyv8';
    const CHAT_ID = '-4154188856'; // Ваш chat_id (идентификатор чата)

    const chatMessages = document.getElementById('chat-messages');
    const userInput = document.getElementById('user-input');
    const sendButton = document.getElementById('send-button');

    function addBotMessage(message) {
        const botMessage = document.createElement('div');
        botMessage.classList.add('message');
        botMessage.classList.add('bot');
        botMessage.innerText = message;
        chatMessages.appendChild(botMessage);
    }

    function addUserMessage(message) {
        const userMessage = document.createElement('div');
        userMessage.classList.add('message');
        userMessage.classList.add('user');
        userMessage.innerText = message;
        chatMessages.appendChild(userMessage);
    }

    function sendTelegramMessage(message) {
        const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;
        const params = {
            chat_id: CHAT_ID,
            text: message,
        };

        fetch(url, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(params),
        })
        .then(response => response.json())
        .then(data => console.log(data))
        .catch(error => console.error('Error sending message:', error));
    }

    function handleUserInput() {
        const message = userInput.value.trim();
        if (message !== '') {
            addUserMessage(message);
            sendTelegramMessage(message);
            userInput.value = '';
        }
    }

    userInput.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            handleUserInput();
        }
    });

    sendButton.addEventListener('click', handleUserInput);
});
