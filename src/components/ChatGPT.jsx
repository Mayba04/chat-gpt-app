import React, { useState } from "react";
import axios from "axios";

export default function ChatGPT() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");

  const HTTP = "http://localhost:8080/chat";

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post(HTTP, { prompt })
        .then((res) => {
        if (res.data && res.data.text && res.data.text.content) {
        setResponse(res.data.text.content);
        } else {
        setResponse("Виникла проблема при отриманні відповіді від сервера. Будь ласка, спробуйте знову.");
        }
        })
        .catch((error) => {
            console.error("Помилка при запиті до сервера:", error);
            setResponse("Виникла помилка при спробі відправити запит. Будь ласка, перевірте ваше з'єднання та спробуйте знову.");
        });

        setPrompt("");
  };

  const handlePrompt = (e) => {
    setPrompt(e.target.value);
  };

  return (
    <div className="container container-sm p-1">
      <h1 className="title text-center text-darkGreen">ChatGPT API</h1>
      <form className="form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="chatPrompt">Ask questions</label>
          <input
            id="chatPrompt"
            className="shadow-sm"
            type="text"
            placeholder="Enter text"
            value={prompt}
            onChange={handlePrompt}
          />
        </div>
        <button className="btn btn-accept w-100" type="submit">
          Go
        </button>
      </form>
      <div className="bg-darkGreen mt-2 p-1 border-5">
        <p className="text-light">
          {response ? response : "Ask me anything..."}
        </p>
      </div>
    </div>
  );
}
