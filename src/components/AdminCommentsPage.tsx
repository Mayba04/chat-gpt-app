import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVerifiedSessionsWithComments, updateAdminComment, deleteAdminComment } from '../actions/adminActions';
import { fetchMessages, fetchAdminComment, clearMessagesAndComments } from '../actions/chatActions';
import { RootState } from '../reducers';
import { ListGroup, Button, Container, Row, Col, Form, Card, Modal } from 'react-bootstrap';
import './AdminCommentsSessions.css';

const AdminCommentsSessions: React.FC = () => {
    const dispatch = useDispatch();
    const { verifiedSessionsWithComments, loading, error } = useSelector((state: RootState) => state.admin);
    const messages = useSelector((state: RootState) => state.chats.messages);
    const adminComments = useSelector((state: RootState) => state.chats.adminComments);
    const [selectedSession, setSelectedSession] = useState<any>(null);
    const [comment, setComment] = useState<string>('');
    const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [commentToDelete, setCommentToDelete] = useState<any>(null);
    const [showAdminComment, setShowAdminComment] = useState<{ [key: number]: boolean }>({});
    const [showEditCommentForm, setShowEditCommentForm] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        dispatch(fetchVerifiedSessionsWithComments() as any);
    }, [dispatch]);

    const handleSessionClick = (sessionId: number) => {
        setSelectedSession(sessionId);
        dispatch(fetchMessages(sessionId) as any);
    };

    const handleEditComment = (messageId: number, existingComment: string) => {
        setSelectedMessageId(messageId);
        setComment(existingComment);
        setShowEditCommentForm({ [messageId]: true });
    };

    const handleDeleteComment = async (messageId: number) => {
        setSelectedMessageId(messageId);
        await dispatch(fetchAdminComment(messageId) as any);

        if (adminComments) {
            const adminComment = adminComments[messageId];
            if (adminComment) {
                setCommentToDelete(adminComment[0]);
            }
        }

        setShowDeleteModal(true);
    };

    const handleViewAdminComment = async (messageId: number) => {
        await dispatch(fetchAdminComment(messageId) as any);
        setShowAdminComment(prevState => ({ ...prevState, [messageId]: true }));
    };

    const handleSubmitComment = async () => {
        if (selectedMessageId !== null) {
            const commentDTO = {
                MessageId: selectedMessageId,
                Comment: comment,
                CreatedAt: new Date().toISOString(),
                AdminId: 1 // Replace with actual admin ID
            };
            await dispatch(updateAdminComment(commentDTO) as any);
            setComment('');
            setSelectedMessageId(null);
            setShowEditCommentForm({});
            dispatch(fetchMessages(selectedSession) as any);
        }
    };

    const confirmDeleteComment = async () => {
        if (commentToDelete && commentToDelete.id) {
            await dispatch(deleteAdminComment(commentToDelete.id) as any);
            setShowDeleteModal(false);
            setCommentToDelete(null);
            dispatch(fetchMessages(selectedSession) as any);
        }
    };

    return (
        <Container fluid className="chat-container">
            <Row className="h-100">
                <Col md={4} className="border-end pe-3 session-list h-100">
                    <Card className="mt-3 mb-3 shadow h-100">
                        <Card.Body>
                            <Card.Title>Sessions with Admin Comments</Card.Title>
                            <hr />
                            {loading && <p>Loading...</p>}
                            {error && <p>Error: {error}</p>}
                            <ListGroup>
                                {verifiedSessionsWithComments.length > 0 ? (
                                    verifiedSessionsWithComments.map((session: any) => (
                                        <ListGroup.Item key={session.id} action onClick={() => handleSessionClick(session.id)}>
                                            {session.name} - {new Date(session.createdAt).toLocaleString()}
                                        </ListGroup.Item>
                                    ))
                                ) : (
                                    <p>No sessions with admin comments</p>
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
                                    <h3>Session Name: {verifiedSessionsWithComments.find((session: any) => session.id === selectedSession)?.name}</h3>
                                    <p>Created At: {new Date(verifiedSessionsWithComments.find((session: any) => session.id === selectedSession)?.createdAt).toLocaleString()}</p>
                                    <ListGroup>
                                        {messages.map((message: any) => (
                                            <ListGroup.Item key={message.id} className="message-item">
                                                <strong>{message.role === 'user' ? 'User' : 'Bot'}:</strong> {message.content}
                                                <div style={{ fontSize: 'small', color: 'gray' }}>
                                                    {new Date(message.createdAt).toLocaleString()}
                                                </div>
                                                {message.adminComment && (
                                                    <>
                                                        <Button variant="link" onClick={() => handleViewAdminComment(message.id)}>
                                                            View Admin Comment
                                                        </Button>
                                                        {showAdminComment[message.id] && adminComments && adminComments[message.id] && adminComments[message.id].map((comment: any, index: number) => (
                                                            <p key={index}><strong>Admin Comment:</strong> {comment.comment}</p>
                                                        ))}
                                                    </>
                                                )}
                                                {message.role === 'assistant' && message.adminComment && (
                                                    <>
                                                        <Button variant="link" onClick={() => handleDeleteComment(message.id)}>
                                                            Delete Comment
                                                        </Button>
                                                        <Button variant="link" onClick={() => handleEditComment(message.id, message.adminComment.comment)}>
                                                            Edit Comment
                                                        </Button>
                                                    </>
                                                )}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                    {selectedMessageId !== null && showEditCommentForm[selectedMessageId] && (
                                        <Form>
                                            <Form.Group controlId="formComment">
                                                <Form.Label>Edit Comment</Form.Label>
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
                                </>
                            ) : (
                                <p>No session selected</p>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
            <Modal show={showDeleteModal} onHide={() => setShowDeleteModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirm Delete</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <p>Are you sure you want to delete this comment?</p>
                    <p><strong>Comment:</strong> {commentToDelete?.comment}</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={confirmDeleteComment}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AdminCommentsSessions;
