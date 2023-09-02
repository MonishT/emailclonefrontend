import React, { useState, useEffect } from 'react';
import './App.css';

function Email() {
  const [emails, setEmails] = useState([]);
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    fetch('/api/emails')
      .then(response => response.json())
      .then(data => setEmails(data));
  }, []);

  const handleComposeSubmit = event => {
    event.preventDefault();

    const newEmail = { to, subject, message };

    fetch('/api/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newEmail),
    })
      .then(response => response.json())
      .then(data => {
        console.log(data.message);
        setTo('');
        setSubject('');
        setMessage('');
      });
  };

  return (
    <div className="container">
      <h1>Gmail Clone</h1>
      <div className="email-list">
        <h2>Inbox</h2>
        <ul>
          {emails.map((email, index) => (
            <li key={index}>{`${email.subject} - ${email.to}`}</li>
          ))}
        </ul>
      </div>
      <div className="compose-email">
        <h2>Compose Email</h2>
        <form onSubmit={handleComposeSubmit}>
          <input
            type="text"
            value={to}
            onChange={e => setTo(e.target.value)}
            placeholder="To"
          /><br />
          <input
            type="text"
            value={subject}
            onChange={e => setSubject(e.target.value)}
            placeholder="Subject"
          /><br />
          <textarea
            value={message}
            onChange={e => setMessage(e.target.value)}
            placeholder="Message"
          /><br />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Email;
