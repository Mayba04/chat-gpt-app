import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const ErrorPage: React.FC = () => {
  return (
    <div className="container text-center" style={{ marginTop: '50px' }}>
      <h1 className="display-1">404</h1>
      <h2>Page Not Found</h2>
      <p className="lead">Sorry, the page you are looking for does not exist.</p>
      <a href="/" className="btn btn-primary">Go to Home</a>
    </div>
  );
};

export default ErrorPage;
