import React, { useState } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import "./ChatPage.css"; // Додайте ваші стилі тут

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState<string[]>([]);
  const [input, setInput] = useState("");

  const handleSend = (event: React.FormEvent) => {
    event.preventDefault();
    if (input.trim()) {
      setMessages([...messages, input]);
      setInput("");
    }
  };

  return (
    <Container fluid className="chat-container">
      <Row className="chat-header">
        <Col>
          <h2>ChatGPT</h2>
        </Col>
      </Row>
      <Row className="chat-content">
        <Col>
          <div className="chat-messages">
            {messages.map((msg, index) => (
              <div key={index} className="chat-message">
                {msg}
              </div>
            ))}
          </div>
        </Col>
      </Row>
      <Row className="chat-input">
        <Col>
          <Form onSubmit={handleSend}>
            <Form.Group controlId="formMessage">
              <Form.Control
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="send-button">
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
