import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function ChatGPT() {
  const [prompt, setPrompt] = useState("");
  const [history, setHistory] = useState([]);
  const [isLoading, setIsLoading] = useState(false); 
  const endOfMessagesRef = useRef(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [history]);

  const HTTP = "http://localhost:8080/chat";

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userMessage = prompt;
    if (!userMessage.trim()) return;
    setIsLoading(true); // Початок загрузки
    const newHistoryItem = { type: 'user', text: userMessage };
    setHistory(prevHistory => [...prevHistory, newHistoryItem]);
    setPrompt(""); // Очистити поле вводу

    try {
      const response = await axios.post(HTTP, { prompt: userMessage });
      setIsLoading(false); 
      const botResponse = response.data.text.content; 
      setHistory(prevHistory => [...prevHistory, { type: 'bot', text: botResponse }]);
    } catch (error) {
      setIsLoading(false); 
      setHistory(prevHistory => [...prevHistory, { type: 'bot', text: "Виникла помилка при спробі відправити запит." }]);
      console.error("Помилка при запиті до сервера:", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="messages-container">
        {history.map((entry, index) => (
          <div key={index} className={`message ${entry.type}`}>
            <span className="message-text">{entry.text}</span>
          </div>
        ))}
        {isLoading && <div className="loader">Loading...</div>}
        <div ref={endOfMessagesRef} />
      </div>
      <div className="input-area">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="input-field"
            placeholder="Type a message..."
            value={prompt}
            onChange={e => setPrompt(e.target.value)}
            disabled={isLoading} 
          />
          <button type="submit" className="send-button" disabled={isLoading}>Send</button>
        </form>
      </div>
    </div>
  );
}
