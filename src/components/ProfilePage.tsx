import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../reducers';

const ProfilePage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user.user);

  return (
    <div className="profile-page">
      <h2>Profile</h2>
      <p>Email: {user.email}</p>
      <p>First Name: {user.firstName}</p>
      <p>Last Name: {user.lastName}</p>
      {/* Додайте інші поля для налаштувань профілю */}
    </div>
  );
};

export default ProfilePage;
