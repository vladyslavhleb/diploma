import moment from 'moment';
import React, { FormEvent, useEffect, useRef, useState } from 'react';
import { Button, Card, Col, Container, Row } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

import { gql, useMutation, useQuery } from '@apollo/client';

import { ChatResponse, MessageResponse, UserResponse } from '../../__generated__/graphql';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';

export const SEND_MESSAGE = gql`
  mutation sendMessage($chat_id: String!, $payload: String!) {
    sendMessage(chat_id: $chat_id, payload: $payload) {
      sender {
        user_id
      }
      message_id
      payload
      created_at
    }
  }
`;

export const CREATE_CHAT = gql`
  mutation createChat($receiverNickname: String!) {
    createChat(receiverNickname: $receiverNickname) {
      chat_id
    }
  }
`;

const GET_USER = gql`
  query getUser {
    getUser {
      nickname
      user_id
      chats {
        chat_id
        users {
          user_id
          nickname
        }
      }
    }
  }
`;

export const GET_MESSAGES = gql`
  query getMessageHistory($chat_id: String!, $limit: Float!, $offset: Float!) {
    getMessageHistory(chat_id: $chat_id, limit: $limit, offset: $offset) {
      sender {
        user_id
        nickname
      }
      message_id
      payload
      created_at
    }
  }
`;

const Chats = () => {
  const chatMessagesRef = useRef<HTMLDivElement | null>(null);
  const { chat_id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    refetch({ limit: 20, offset: 0, chat_id }).then((result) => {
      setMessages(result.data.getMessageHistory);
    });
  }, [chat_id]);

  const { data: getUserData } = useQuery<{ getUser: UserResponse }>(GET_USER, { fetchPolicy: 'no-cache' });
  const { refetch } = useQuery<{ getMessageHistory: MessageResponse[] }>(GET_MESSAGES, {
    fetchPolicy: 'no-cache',
    variables: { limit: 20, offset: 0, chat_id },
  });
  const [sendMessageMutation] = useMutation<{ sendMessage: MessageResponse }>(SEND_MESSAGE);
  const [createChatMutation] = useMutation<{ createChat: ChatResponse }>(CREATE_CHAT);

  const [messages, setMessages] = useState<MessageResponse[]>([]);

  useEffect(() => {
    // Scroll to the bottom of the chat messages when the component mounts or when messages change
    if (chatMessagesRef !== null && chatMessagesRef.current !== null) {
      chatMessagesRef.current.scrollTop = chatMessagesRef.current.scrollHeight;
    }
  }, [messages]);

  // State for the message input
  const [messageInput, setMessageInput] = useState('');
  const [nicknameInput, setNicknameInput] = useState('');

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const payload = messageInput.trim();
    if (payload !== '') {
      const result = await sendMessageMutation({ variables: { chat_id, payload } });
      if (result.data?.sendMessage) {
        setMessages([result.data?.sendMessage, ...messages]);
        setMessageInput('');
      }
    }
  };

  const createChat = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const res = await createChatMutation({ variables: { receiverNickname: nicknameInput } });
    const chat_id = res.data?.createChat.chat_id;
    navigate(`/chats/${chat_id}`);
  };

  return (
    <Container className="main-page" style={{ maxWidth: 'none' }}>
      <Row style={{ height: '100%' }}>
        <Col md={3} className="sidebar">
          {/* Sidebar content */}
          <Card>
            <Card.Body>
              <Form.Label style={{ fontWeight: 'bold' }}>Private key</Form.Label>
              <Form.Control type="file" required name="file" />
              <Form.Text id="passwordHelpBlock" muted>
                Upload your private key to decrypt messages
              </Form.Text>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Form onSubmit={createChat}>
                <Form.Label style={{ fontWeight: 'bold' }}>Create a chat</Form.Label>
                <Form.Group className="w-100" controlId="validationFormikUsername2">
                  <InputGroup hasValidation>
                    <Form.Control
                      type="text"
                      placeholder="Receiver nickname"
                      name="nickname"
                      value={nicknameInput}
                      onChange={(e) => setNicknameInput(e.target.value)}
                    />
                    <Form.Control.Feedback type="invalid" tooltip></Form.Control.Feedback>
                    <Button type="submit">Start a chat</Button>
                  </InputGroup>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>

          <Card>
            <Card.Body>
              <Form.Label style={{ fontWeight: 'bold' }}>Your Chats</Form.Label>
              {/* List of chats */}
              <ul className="chat-list">
                {getUserData?.getUser?.chats?.map((chat) => (
                  <li key={chat.chat_id} onClick={() => navigate(`/chats/${chat.chat_id}`)} style={{ margin: 0 }}>
                    Chat with {chat.users.filter((user) => user.user_id !== getUserData?.getUser?.user_id)[0].nickname}
                  </li>
                ))}
                {/* Add more chat items as needed */}
              </ul>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Form.Group className="w-100" controlId="validationFormikUsername2">
                <InputGroup hasValidation>
                  <Button type="submit" variant="danger">
                    Logout
                  </Button>
                </InputGroup>
              </Form.Group>
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
                  <div
                    key={msg.message_id}
                    className={`message ${
                      msg.sender?.user_id === getUserData?.getUser.user_id ? 'user-message' : 'other-message'
                    }`}
                  >
                    {msg.payload}
                    <div className="message-date">
                      <p>{moment(msg.created_at).format('HH:mm:ss')}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Form className="message-control" style={{ backgroundColor: 'white' }} onSubmit={sendMessage}>
                <Form.Group controlId="formBasicEmail" style={{ width: '95%' }}>
                  <Form.Control
                    type="text"
                    placeholder="Type your message"
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formBasicEmail">
                  <Button variant="primary" type="submit">
                    Submit
                  </Button>
                </Form.Group>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Chats;
