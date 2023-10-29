import moment from 'moment';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';

import Form from 'react-bootstrap/Form';

const Chats = () => {
  const chatMessagesRef = useRef<HTMLDivElement | null>(null);
  // Mock chat messages
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello!Hello!Hello!Hello!Hello!', sender: 'user', date: new Date() },
    { id: 2, text: 'Hi thereHello!Hello!Hello!Hello!Hello!!', sender: 'other', date: new Date() },
    { id: 1, text: 'Hello!Hello!Hello!Hello!Hello!', sender: 'user', date: new Date() },
    { id: 2, text: 'Hi thereHello!Hello!Hello!Hello!Hello!!', sender: 'other', date: new Date() },
    { id: 1, text: 'Hello!Hello!Hello!Hello!Hello!', sender: 'user', date: new Date() },
    { id: 2, text: 'Hi thereHello!Hello!Hello!Hello!Hello!!', sender: 'other', date: new Date() },
    { id: 1, text: 'Hello!Hello!Hello!Hello!Hello!', sender: 'user', date: new Date() },
    { id: 2, text: 'Hi thereHello!Hello!Hello!Hello!Hello!!', sender: 'other', date: new Date() },
    { id: 1, text: 'Hello!Hello!Hello!Hello!Hello!', sender: 'user', date: new Date() },
    { id: 2, text: 'Hi thereHello!Hello!Hello!Hello!Hello!!', sender: 'other', date: new Date() },
    { id: 1, text: 'Hello!Hello!Hello!Hello!Hello!', sender: 'user', date: new Date() },
    { id: 2, text: 'Hi thereHello!Hello!Hello!Hello!Hello!!', sender: 'other', date: new Date() },
    { id: 1, text: 'Hello!Hello!Hello!Hello!Hello!', sender: 'user', date: new Date() },
    { id: 2, text: 'Hi thereHello!Hello!Hello!Hello!Hello!!', sender: 'other', date: new Date() },
    { id: 1, text: 'Hello!Hello!Hello!Hello!Hello!', sender: 'user', date: new Date() },
    { id: 2, text: 'Hi thereHello!Hello!Hello!Hello!Hello!!', sender: 'other', date: new Date() },
    { id: 1, text: 'Hello!Hello!Hello!Hello!Hello!', sender: 'user', date: new Date() },
    { id: 2, text: 'Hi thereHello!Hello!Hello!Hello!Hello!!', sender: 'other', date: new Date() },
    { id: 1, text: 'Hello!Hello!Hello!Hello!Hello!', sender: 'user', date: new Date() },
    { id: 2, text: 'Hi thereHello!Hello!Hello!Hello!Hello!!', sender: 'other', date: new Date() },
    { id: 1, text: 'Hello!Hello!Hello!Hello!Hello!', sender: 'user', date: new Date() },
    { id: 2, text: 'Hi thereHello!Hello!Hello!Hello!Hello!!', sender: 'other', date: new Date() },
    { id: 1, text: 'Hello!Hello!Hello!Hello!Hello!', sender: 'user', date: new Date() },
    { id: 2, text: 'Hi thereHello!Hello!Hello!Hello!Hello!!', sender: 'other', date: new Date() },
    { id: 1, text: 'Hello!Hello!Hello!Hello!Hello!', sender: 'user', date: new Date() },
    { id: 2, text: 'Hi thereHello!Hello!Hello!Hello!Hello!!', sender: 'other', date: new Date() },
    { id: 1, text: 'Hello!Hello!Hello!Hello!Hello!', sender: 'user', date: new Date() },
    { id: 2, text: 'Hi thereHello!Hello!Hello!Hello!Hello!!', sender: 'other', date: new Date() },
  ]);

  useEffect(() => {
    // Scroll to the bottom of the chat messages when the component mounts or when messages change
    if (chatMessagesRef !== null && chatMessagesRef.current !== null) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  // State for the message input
  const [messageInput, setMessageInput] = useState('');
  useEffect(() => {
    console.log(messages);
  }, [messages]);
  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    console.log('test');
    e.preventDefault();
    if (messageInput.trim() !== '') {
      console.log('qweqweqe');
      const newMessage = { id: messages.length + 1, text: messageInput, sender: 'user', date: new Date() };
      setMessages([...messages, newMessage]);
      setMessageInput('');
    }
  };

  return (
    <Container className="main-page" style={{ maxWidth: 'none' }}>
      <Row style={{ height: '100%' }}>
        <Col md={3} className="sidebar">
          {/* Sidebar content */}
          <Card>
            <Card.Body>
              <Form.Label>Private key</Form.Label>
              <Form.Control type="file" required name="file" />
              <Form.Text id="passwordHelpBlock" muted>
                Upload your private key to decrypt messages
              </Form.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <h2>Your Chats</h2>
              {/* List of chats */}
              <ul className="chat-list">
                <li>Chat 1</li>
                <li>Chat 2</li>
                <li>Chat 3</li>
                {/* Add more chat items as needed */}
              </ul>
            </Card.Body>
          </Card>
        </Col>
        <Col md={9} className="chat-window">
          {/* Chat content */}
          <Card style={{ width: '100%', height: '100%' }}>
            <Card.Header>Chat with qweqweqwe</Card.Header>
            <Card.Body
              style={{
                width: '100%',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                padding: '1rem 0 0 0',
                justifyContent: 'space-between',
              }}
            >
              {/* Chat messages */}
              <div className="chat-messages" ref={chatMessagesRef}>
                {messages.map((msg) => (
                  <div key={msg.id} className={`message ${msg.sender === 'user' ? 'user-message' : 'other-message'}`}>
                    {msg.text}
                    <div className="message-date">
                      <p>{moment(msg.date).format('HH:mm:ss')}</p>
                    </div>
                  </div>
                ))}
              </div>
              {/* Message input */}

              <Form className="message-control" style={{ backgroundColor: 'white' }} onSubmit={sendMessage}>
                <Form.Group controlId="formBasicEmail" style={{ width: '95%' }}>
                  <Form.Control
                    type="text"
                    placeholder="Type your message"
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form.Group>
              </Form>
              {/*<input*/}
              {/*  type="text"*/}
              {/*  placeholder="Type your message..."*/}
              {/*  value={messageInput}*/}
              {/*  onChange={(e) => setMessageInput(e.target.value)}*/}
              {/*/>*/}
              {/*<Button variant="primary" onClick={sendMessage}>*/}
              {/*  Send*/}
              {/*</Button>*/}
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Chats;
