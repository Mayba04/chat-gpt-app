import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Offcanvas, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserChats, deleteUserChat, selectChat } from '../actions/chatActions';
import { RootState } from '../reducers';
import { logoutUser } from '../actions/authActions';

const Sidebar: React.FC = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const { chats } = useSelector((state: RootState) => state.chats);
  

  useEffect(() => {
    if (user) {
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
          <Offcanvas.Title>Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="offcanvas-body">
          <ul className="list-unstyled">
            <li><Link to="/chat" onClick={handleClose}>Chats</Link></li>
            <li><Link to="/profile" onClick={handleClose}>Profile</Link></li>
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

export default Sidebar;
