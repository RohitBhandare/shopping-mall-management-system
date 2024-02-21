import React, { useState } from 'react';

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  const handleSendMessage = () => {
    if (input.trim() === '') return;
    setMessages([...messages, { text: input, fromUser: true }]);
    // Add logic to handle bot response here
    setInput('');
  };

  // You can add more features and styling based on your requirements

  return (
    <div className="bg-white p-4 rounded">
      <div className="mb-4" style={{ minHeight: '200px', maxHeight: '400px', overflowY: 'auto' }}>
        {messages.map((message, index) => (
          <div key={index} className={message.fromUser ? 'text-right' : 'text-left'}>
            {message.text}
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={handleInputChange}
          className="flex-1 mr-2 p-2 border rounded"
        />
        <button onClick={handleSendMessage} className="bg-blue-500 text-white p-2 rounded">
          Send
        </button>
      </div>
    </div>
  );
};

export default Chatbot;
