import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPendingVerificationSessionsAction, addAdminComment } from '../actions/adminActions';
import { fetchMessages, fetchAdminComment, clearMessagesAndComments } from '../actions/chatActions';
import { RootState } from '../reducers';
import './PendingVerificationSessions.css';
import { ListGroup, Button, Container, Row, Col, Form, Card } from 'react-bootstrap';
import noActiveSessionsImg from '/img/no_active_sessions.webp';

const PendingVerificationSessions: React.FC = () => {
  const dispatch = useDispatch();
  const { pendingVerificationSessions, loading, error } = useSelector((state: RootState) => state.admin);
  const messages = useSelector((state: RootState) => state.chats.messages);
  const adminComments = useSelector((state: RootState) => state.chats.adminComments);
  const [selectedSession, setSelectedSession] = useState<any>(null);
  const [comment, setComment] = useState<string>('');
  const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);

  useEffect(() => {
    dispatch(fetchPendingVerificationSessionsAction() as any);
  }, [dispatch]);

  const handleSessionClick = async (sessionId: number) => {
    setSelectedSession(sessionId);
    dispatch(clearMessagesAndComments() as any);
    await dispatch(fetchMessages(sessionId) as any);
  };

  const handleAddComment = (messageId: number) => {
    setSelectedMessageId(messageId);
  };

  const handleSubmitComment = async () => {
    if (selectedMessageId !== null) {
      const commentDTO = {
        MessageId: selectedMessageId,
        Comment: comment,
        CreatedAt: new Date().toISOString(),
        AdminId: 1 // Замініть це на актуальний ID адміністратора
      };
      await dispatch(addAdminComment(commentDTO) as any);
      setComment('');
      setSelectedMessageId(null);
      setSelectedSession(null); // Додано, щоб скинути обрану сесію
      dispatch(fetchPendingVerificationSessionsAction() as any);
      dispatch(clearMessagesAndComments() as any); // Переконайтеся, що цей виклик очищає повідомлення і коментарі
    }
  };

  const handleViewAdminComment = (messageId: number) => {
    dispatch(fetchAdminComment(messageId) as any);
  };

  return (
    <div className="pending-verification-sessions-container">
      <Container fluid className="chat-container">
        <Row className="h-100">
          <Col md={4} className="border-end pe-3 session-list h-100">
            <Card className="mt-3 mb-3 shadow h-100">
              <Card.Body>
                <Card.Title>Pending Verification Sessions</Card.Title>
                <hr />
                {loading && <p>Loading...</p>}
                {error && <p>Error: {error}</p>}
                <ListGroup>
                  {pendingVerificationSessions.length > 0 ? (
                    pendingVerificationSessions.map((session: any) => (
                      <ListGroup.Item key={session.id} action onClick={() => handleSessionClick(session.id)}>
                        {session.name} - {new Date(session.createdAt).toLocaleString()}
                      </ListGroup.Item>
                    ))
                  ) : (
                  <div className="centered-image-container">
                    <img src='/img/no_active_sessions.png' alt="No active sessions" className="no-sessions-image" />
                  </div>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
          <Col md={8} className="ps-3 session-details h-100">
            <Card className="mt-3 mb-3 shadow h-100">
              <Card.Body>
                <Card.Title>Session Details</Card.Title>
                <hr />
                {selectedSession ? (
                  <>
                    <h3>Session Name: {pendingVerificationSessions.find((session: any) => session.id === selectedSession)?.name}</h3>
                    <p>Created At: {new Date(pendingVerificationSessions.find((session: any) => session.id === selectedSession)?.createdAt).toLocaleString()}</p>
                    <ListGroup>
                      {messages.map((message: any) => (
                        <ListGroup.Item key={message.id} className="message-item">
                          <strong>{message.role === 'user' ? 'User' : 'Bot'}:</strong> {message.content}
                          <div style={{ fontSize: 'small', color: 'gray' }}>
                            {new Date(message.createdAt).toLocaleString()}
                          </div>
                          {message.role === 'assistant' && (
                            <>
                              {!message.adminComment && (
                                <Button variant="link" onClick={() => handleAddComment(message.id)}>
                                  Add Comment
                                </Button>
                              )}
                              {selectedMessageId === message.id && (
                                <Form>
                                  <Form.Group controlId="formComment">
                                    <Form.Label>Add Comment</Form.Label>
                                    <Form.Control
                                      as="textarea"
                                      rows={3}
                                      value={comment}
                                      onChange={(e) => setComment(e.target.value)}
                                    />
                                  </Form.Group>
                                  <Button variant="primary" onClick={handleSubmitComment}>
                                    Submit Comment
                                  </Button>
                                </Form>
                              )}
                              {message.adminComment && (
                                <Button variant="link" onClick={() => handleViewAdminComment(message.id)}>
                                  View Admin Comment
                                </Button>
                              )}
                              {adminComments && adminComments[message.id] && adminComments[message.id].map((comment: any, index: number) => (
                                <p key={index}><strong>Admin Comment:</strong> {comment.comment}</p>
                              ))}
                            </>
                          )}
                        </ListGroup.Item>
                      ))}
                    </ListGroup>
                  </>
                ) : (
                  <div className="centered-image-container">
                  <img src='/img/no-session selected.png' alt="No active sessions" className="no-sessions-image" />
                </div>
                )}
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default PendingVerificationSessions;
