import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchVerifiedSessionsWithComments, updateAdminComment, deleteAdminComment } from '../actions/adminActions';
import { fetchMessages, fetchAdminComment, clearMessagesAndComments } from '../actions/chatActions';
import { RootState } from '../reducers';
import { ListGroup, Button, Container, Row, Col, Form, Card, Modal } from 'react-bootstrap';
import './AdminCommentsSessions.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrash, faEye } from '@fortawesome/free-solid-svg-icons';
import { Tooltip, OverlayTrigger } from 'react-bootstrap';

const AdminCommentsSessions: React.FC = () => {
    const dispatch = useDispatch();
    const { verifiedSessionsWithComments, loading, error } = useSelector((state: RootState) => state.admin);
    const messages = useSelector((state: RootState) => state.chats.messages);
    const adminComments = useSelector((state: RootState) => state.chats.adminComments);
    const [selectedSession, setSelectedSession] = useState<any>(null);
    const [comment, setComment] = useState<string>('');
    const [selectedMessageId, setSelectedMessageId] = useState<number | null>(null);
    const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
    const [showEditModal, setShowEditModal] = useState<boolean>(false);
    const [currentComment, setCurrentComment] = useState<string>('');
    const [commentToDelete, setCommentToDelete] = useState<any>(null);
    const [showAdminComment, setShowAdminComment] = useState<{ [key: number]: boolean }>({});
    const [loadingAdminComment, setLoadingAdminComment] = useState<boolean>(false);
    const [viewedAdminComments, setViewedAdminComments] = useState<{ [key: number]: boolean }>({});
    const [adminCommentId, setAdminCommentId] = useState<number | null>(null);


    useEffect(() => {
        dispatch(fetchVerifiedSessionsWithComments() as any);
    }, [dispatch]);

    const handleSessionClick = (sessionId: number) => {
        setSelectedSession(sessionId);
        dispatch(fetchMessages(sessionId) as any);
    };

    const refreshPage = () => {
        window.location.reload();
    };

    const handleEditComment = async (messageId: number) => {
        setSelectedMessageId(messageId); // Спочатку встановлюємо selectedMessageId
        setLoadingAdminComment(true);
        await dispatch(fetchAdminComment(messageId) as any);
        setLoadingAdminComment(false);
    
        if (adminComments && adminComments[messageId]) {
            const adminComment = adminComments[messageId];
            setComment(adminComment[0].comment);
            setAdminCommentId(adminComment[0].id);
            setShowEditModal(true);
        }
    };
    
    const handleDeleteComment = async (messageId: number) => {
        setLoadingAdminComment(true);
        await dispatch(fetchAdminComment(messageId) as any);
        setLoadingAdminComment(false);

        if (adminComments && adminComments[messageId]) {
            const adminComment = adminComments[messageId];
            setCommentToDelete(adminComment[0]);
            setShowDeleteModal(true);
        }
    };

    const handleViewAdminComment = async (messageId: number) => {
        if (!viewedAdminComments[messageId]) {
            setLoadingAdminComment(true);
            await dispatch(fetchAdminComment(messageId) as any);
            setLoadingAdminComment(false);
    
            setShowAdminComment(prevState => ({ ...prevState, [messageId]: true }));
            setViewedAdminComments(prevState => ({ ...prevState, [messageId]: true })); // Зберігаємо стан натиснутої кнопки
        }
    };
    
    const handleSubmitComment = async () => {
        if (selectedMessageId !== null && comment.trim() !== ''  && adminCommentId !== null) {
            const commentDTO = {
                Id: adminCommentId,
                Comment: comment,
            };
            await dispatch(updateAdminComment(commentDTO) as any);
            setComment('');
            setSelectedMessageId(null);
            setShowEditModal(false);
            dispatch(fetchMessages(selectedSession) as any);
            refreshPage();
        } else {
            alert('Comment cannot be empty.');
        }
    };

    
    

    const confirmDeleteComment = async () => {
        if (commentToDelete && commentToDelete.id) {
            await dispatch(deleteAdminComment(commentToDelete.id) as any);
            setShowDeleteModal(false);
            setCommentToDelete(null);
            dispatch(fetchMessages(selectedSession) as any);
            refreshPage();
        }
    };

    return (
        <Container fluid className="chat-container-admin">
            <Row className="h-100">
                <Col md={4} className="border-end pe-3 session-list h-100">
                    <Card className="mt-3 mb-3 shadow h-100">
                        <Card.Body>
                            <Card.Title>Sessions with Admin Comments</Card.Title>
                            <hr />
                            {loading &&  
                            <div className="d-flex justify-content-center">
                                <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                                </div>
                            </div>}
                            {error &&
                            <div className="alert alert-danger" role="alert">
                                <p>Error: {error}</p>
                            </div>
                            }
                            <ListGroup>
                                {verifiedSessionsWithComments.length > 0 ? (
                                    verifiedSessionsWithComments.map((session: any) => (
                                        <ListGroup.Item key={session.id} action onClick={() => handleSessionClick(session.id)}>
                                            {session.name} - {new Date(session.created).toLocaleString()}
                                        </ListGroup.Item>
                                    ))
                                ) : (
                                    <div className="centered-image-container">
                                    <img src='/img/no_sessions_with_admin_comments.png' alt="No sessions selected" className="no-sessions-image" />
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
                                    <h3>Session Name: {verifiedSessionsWithComments.find((session: any) => session.id === selectedSession)?.name}</h3>
                                    <ListGroup>
                                        {messages.map((message: any) => (
                                            <ListGroup.Item key={message.id} className="message-item">
                                                <strong>{message.role === 'user' ? 'User' : 'Bot'}:</strong> {message.content}
                                                <div style={{ fontSize: 'small', color: 'gray' }}>
                                                {new Date(message.timestamp).toLocaleString()}
                                                </div>
                                                {message.adminComment && (
                                                    <>
                                                        <Button variant="link" 
                                                            onClick={() => handleViewAdminComment(message.id)} 
                                                            disabled={viewedAdminComments[message.id]}
                                                            title="View Admin Comment">
                                                            <FontAwesomeIcon icon={faEye} />
                                                        </Button>
                                                        
                                                       {/* <Button
                                                            variant="link"
                                                            onClick={() => handleViewAdminComment(message.id)}
                                                            disabled={viewedAdminComments[message.id]} 
                                                        >
                                                            View Admin Comment
                                                        </Button> */}
                                                        {showAdminComment[message.id] && adminComments && adminComments[message.id] && adminComments[message.id].map((comment: any, index: number) => (
                                                            <p key={index}><strong>Admin Comment:</strong> {comment.comment}</p>
                                                        ))}
                                                    </>
                                                )}
                                                {message.role === 'assistant' && message.adminComment && (
                                                    <>
                                                        <Button variant="link" onClick={() => handleDeleteComment(message.id)} title="Delete Comment">
                                                            {/* Delete Comment */}
                                                            <FontAwesomeIcon icon={faTrash} />
                                                        </Button>
                                                        <Button variant="link" onClick={() => handleEditComment(message.id)} title="Edit Comment">
                                                            {/* Edit Comment */}
                                                            <FontAwesomeIcon icon={faEdit} />
                                                        </Button>
                                                    </>
                                                )}
                                            </ListGroup.Item>
                                        ))}
                                    </ListGroup>
                                </>
                            ) : (
                                <div className="centered-image-container">
                                    <img src='/img/no-session selected.png' alt="No sessions selected" className="no-sessions-image" />
                                </div>
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
                    {loadingAdminComment ? (
                        <p>Loading...</p>
                    ) : (
                        <>
                            <p>Are you sure you want to delete this comment?</p>
                            <p><strong>Comment:</strong> {commentToDelete?.comment}</p>
                        </>
                    )}
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
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
                <Modal.Title>Edit Comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {loadingAdminComment ? (
                    <p>Loading...</p>
                ) : (
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
                    </Form>
                )}
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={() => setShowEditModal(false)}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={handleSubmitComment} disabled={loadingAdminComment}>
                    Save
                </Button>
            </Modal.Footer>
        </Modal>
        </Container>
    );
};

export default AdminCommentsSessions;


