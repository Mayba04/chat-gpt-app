import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Offcanvas, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPendingVerificationSessionsAction } from '../actions/adminActions';
import { fetchUserChats, deleteUserChat, selectChat, clearMessages } from '../actions/chatActions';
import { RootState } from '../reducers';
import { logoutUser } from '../actions/authActions';
import { useLocation } from 'react-router-dom';

const SidebarAdmin: React.FC = () => {
  
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const { chats } = useSelector((state: RootState) => state.chats);
  const pendingMessages = useSelector((state: RootState) => state.admin.pendingVerificationSessions);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      dispatch(fetchPendingVerificationSessionsAction() as any);
      dispatch(fetchUserChats(user.Id) as any);
    }
  }, [dispatch, user]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    dispatch(logoutUser() as any);
    navigate('/login');
  };

  const handleDeleteChat = (chatId: number) => {
    dispatch(clearMessages());
    console.log(chatId);
    dispatch(deleteUserChat(chatId) as any);

  };

  const handleSelectChat = (chat: any) => {
    dispatch(selectChat(chat));
    handleClose();
  };

  return (
    <>
      <Button variant="link" onClick={handleShow} className="toggle-button">
        <FontAwesomeIcon icon={faBars} />
      </Button>

      <Offcanvas show={show} onHide={handleClose} backdrop={false}>
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>MenuAdmin</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvas-body">
          <ul className="list-unstyled">
            <li><Link to="/chat" onClick={handleClose}>Chats</Link></li>
            <li><Link to="/profile" onClick={handleClose}>Profile</Link></li>
            <li><Link to="/admin-comments-sessions" onClick={handleClose}>Verified sessions</Link></li>
            <li><Link to="/pending-verification-sessions" onClick={handleClose}>Sessions to check</Link></li>
            <li><Button variant="link" onClick={handleLogout}>Logout</Button></li>

            <hr />
            <ListGroup>
              {chats.map((chat) => (
                <ListGroupItem key={chat.id} className="d-flex justify-content-between align-items-center">
                  <div onClick={() => handleSelectChat(chat)}>{chat.name}</div>
                  <Button variant="danger" size="sm" onClick={() => handleDeleteChat(chat.id)}>
                    <FontAwesomeIcon icon={faTrash} />
                  </Button>
                </ListGroupItem>
              ))}
            </ListGroup>
          </ul>
          <div className="user-container">
            <img src={`https://localhost:7004/images/600_${user.image}`} alt="User" className="profile-img" />
            <span className="user-name">{user.FirstName} {user.LastName}</span>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
};

export default SidebarAdmin;
