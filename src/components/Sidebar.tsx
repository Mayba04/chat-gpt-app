import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button, Drawer, List, Avatar, Typography, Menu } from 'antd';
import { MenuOutlined, LogoutOutlined, PlusOutlined, DeleteOutlined, UserOutlined, CommentOutlined } from '@ant-design/icons';
import './Sidebar.css';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUserChats, deleteUserChat, selectChat, clearMessages } from '../actions/chatActions';
import { RootState } from '../reducers';
import { logoutUser } from '../actions/authActions';
import { useLocation } from 'react-router-dom';

const { Title } = Typography;

const Sidebar: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.user.user);
  const { chats } = useSelector((state: RootState) => state.chats);
  const location = useLocation();

  useEffect(() => {
    if (user) {
      dispatch(fetchUserChats(user.Id) as any);
    }
  }, [dispatch, user]);

  const showDrawer = () => setVisible(true);
  const closeDrawer = () => setVisible(false);

  const handleLogout = () => {
    dispatch(logoutUser() as any);
    navigate('/login');
  };

  const handleDeleteChat = (chatId: number) => {
    dispatch(clearMessages());
    dispatch(deleteUserChat(chatId) as any);
  };

  const handleSelectChat = (chat: any) => {
    dispatch(selectChat(chat));
    closeDrawer();
  };

  const handleNewChat = () => {
    if (location.pathname === '/chat') {
      dispatch(clearMessages());
      dispatch(selectChat(null));
    }
  };

  return (
    <>
      <Button type="text" icon={<MenuOutlined />} onClick={showDrawer} className="menu-button" />

      <Drawer
        title="Menu"
        placement="left"
        onClose={closeDrawer}
        visible={visible}
        className="custom-drawer"
      >
        <div className="drawer-content">
          <Menu mode="vertical" selectable={false}>
            <Menu.Item key="chats" icon={<CommentOutlined />}>
              <Link to="/chat" onClick={closeDrawer}>Chats</Link>
            </Menu.Item>
            <Menu.Item key="profile" icon={<UserOutlined />}>
              <Link to="/profile" onClick={closeDrawer}>Profile</Link>
            </Menu.Item>
            <Menu.Item key="logout" icon={<LogoutOutlined />} onClick={handleLogout}>
              Logout
            </Menu.Item>
            <Menu.Item key="new-chat" icon={<PlusOutlined />} onClick={handleNewChat}>
              Новий чат
            </Menu.Item>
          </Menu>
          <hr />
          <List
            itemLayout="horizontal"
            dataSource={chats}
            renderItem={chat => (
              <List.Item
                actions={[
                  <Button
                    type="text"
                    icon={<DeleteOutlined />}
                    onClick={() => handleDeleteChat(chat.id)}
                    danger
                  />
                ]}
              >
                <List.Item.Meta
                  title={<div onClick={() => handleSelectChat(chat)}>{chat.name}</div>}
                />
              </List.Item>
            )}
          />
          <div className="user-container">
            <Avatar src={`https://localhost:7004/images/600_${user.image}`} size="large" />
            <Title level={5} className="user-name">{user.FirstName} {user.LastName}</Title>
          </div>
        </div>
      </Drawer>
    </>
  );
};

export default Sidebar;
