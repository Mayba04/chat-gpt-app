import React, { useState, useEffect } from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '../reducers';
import { sendNewMessage, continueChat, fetchMessages, fetchAdminComment } from '../actions/chatActions';
import { ChatActionTypes } from '../actions/types';
import "./ChatPage.css";

const ChatPage: React.FC = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user.user);
  const selectedChat = useSelector((state: RootState) => state.chats.selectedChat);
  const messages = useSelector((state: RootState) => state.chats.messages);
  const adminComments = useSelector((state: RootState) => state.chats.adminComments);

  useEffect(() => {
    if (selectedChat) {
      dispatch(fetchMessages(selectedChat.id) as any);
    }
  }, [selectedChat, dispatch]);

  const handleSend = async (event: React.FormEvent) => {
    event.preventDefault();
    if (input.trim()) {
      const userMessage = { id: Date.now(), content: input, role: "user" };
      dispatch({ type: ChatActionTypes.ADD_MESSAGE, payload: userMessage });

      setLoading(true);
      try {
        if (selectedChat) {
          await dispatch(continueChat({ chatSessionId: selectedChat.id, prompt: input }) as any);
        } else {
          await dispatch(sendNewMessage(input) as any);
        }
        setInput("");
      } catch (error) {
        console.error('Error sending message:', error);
      } finally {
        setLoading(false);
      }
    }
  };

  const renderMessage = (msg: any) => {
    const isUser = msg.role === "user";
    const content = typeof msg.content === 'string'
      ? msg.content.split("\n").map((line: string, index: number) => (
        <p key={index}>{line}</p>
      ))
      : msg.content;

    return (
      <div key={msg.id} className={`chat-message ${isUser ? "user-message" : "bot-message"}`}>
        <strong>{isUser ? "You" : "Bot"}:</strong> {content}
        {msg.adminComment && (
          <>
            <Button variant="link" onClick={() => dispatch(fetchAdminComment(msg.id) as any)}>
              View Admin Comment
            </Button>
            {adminComments && adminComments[msg.id] && (
              <div>
                {adminComments[msg.id].map((comment: any) => (
                  <p key={comment.id}><strong>Admin Comment:</strong> {comment.comment}</p>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    );
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
            {messages.map(renderMessage)}
            {loading && <div className="loading">Loading...</div>}
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
                disabled={loading}
              />
            </Form.Group>
            <Button variant="primary" type="submit" className="send-button" disabled={loading}>
              Send
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ChatPage;
