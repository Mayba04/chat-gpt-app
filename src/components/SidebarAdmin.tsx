import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Offcanvas, ListGroup, ListGroupItem } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTrash } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPendingVerificationSessionsAction } from '../actions/adminActions';
import { RootState } from '../reducers';
import { logoutUser } from '../actions/authActions';
import { useLocation } from 'react-router-dom';

const SidebarAdmin: React.FC = () => {
  const [show, setShow] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const pendingMessages = useSelector((state: RootState) => state.admin.pendingVerificationSessions);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      dispatch(fetchPendingVerificationSessionsAction() as any);
    }
  }, [dispatch, user]);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleLogout = () => {
    dispatch(logoutUser() as any);
    navigate('/login');
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
            <li><Button variant="link" onClick={handleLogout}>Logout</Button></li>
            <hr />
            <ListGroup>
              {pendingMessages.map((message) => (
                <ListGroupItem key={message.id} className="d-flex justify-content-between align-items-center">
                  <div>{message.content}</div>
                  <Button variant="primary" size="sm" onClick={() => navigate(`/comment/${message.id}`)}>
                    Comment
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
