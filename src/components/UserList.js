import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  ListGroup,
  Spinner,
  Image,
  Alert,
  Col,
  Row,
  Container,
  FormControl,
  InputGroup,
  Card,
  Button,
} from "react-bootstrap";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "https://602e7c2c4410730017c50b9d.mockapi.io/users"
        );
        setUsers(response.data);
        setFilteredUsers(response.data);
        setLoading(false);
      } catch (error) {
        setError("Failed to fetch data");
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  const handleUserClick = (user) => {
    setSelectedUser(user);
  };

  const handleSearchChange = (event) => {
    const searchValue = event.target.value.toLowerCase();
    setSearchTerm(searchValue);
    const filtered = users.filter((user) =>
      `${user.profile.firstName} ${user.profile.lastName}`
        .toLowerCase()
        .includes(searchValue)
    );
    setFilteredUsers(filtered);
  };

  if (loading) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" variant="primary" />
      </Container>
    );
  }

  if (error) {
    return (
      <Container
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  return (
    <Container>
      <Row className="mb-3">
        <Col>
          <InputGroup>
            <FormControl
              placeholder="Search by name"
              value={searchTerm}
              onChange={handleSearchChange}
              style={{ borderRadius: "20px" }}
            />
          </InputGroup>
        </Col>
      </Row>
      <Row>
        <Col md={4} className="mb-4">
          <ListGroup>
            {filteredUsers.map((user, i) => (
              <ListGroup.Item
                key={user.id + i}
                onClick={() => handleUserClick(user)}
                className={`p-3 mb-2 ${
                  selectedUser &&
                  user.id + user.profile.username ===
                    selectedUser.id + selectedUser.profile.username
                    ? "active"
                    : ""
                }`}
                style={{ cursor: "pointer", borderRadius: "10px" }}
              >
                <Row className="align-items-center">
                  <Col xs={3}>
                    <Image
                      src={user.avatar}
                      roundedCircle
                      alt="Avatar"
                      width="50"
                      height="50"
                      className="me-2"
                      onError={(e) => {
                        e.target.src = `https://via.placeholder.com/150?text=${user.profile.firstName.slice(
                          0,
                          1
                        )}`; // Fallback to default image on error
                      }}
                    />
                  </Col>
                  <Col xs={9}>
                    <div>
                      <div className="fw-bold">
                        {user.profile.firstName} {user.profile.lastName}
                      </div>
                      <small className="text-muted">{user.jobTitle}</small>
                    </div>
                  </Col>
                </Row>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Col>
        <Col md={8}>
          {selectedUser ? (
            <Card className="shadow-sm p-3 mb-5 bg-white rounded">
              <Card.Body>
                <Card.Title>
                  {selectedUser.profile.firstName}{" "}
                  {selectedUser.profile.lastName}
                </Card.Title>
                <Card.Subtitle className="mb-2 text-muted">
                  {selectedUser.jobTitle}
                </Card.Subtitle>
                <Card.Text>
                  <strong>Username:</strong> {selectedUser.profile.username}
                </Card.Text>
                <Card.Text>
                  <strong>Email:</strong> {selectedUser.profile.email}
                </Card.Text>
                <Card.Text>
                  <strong>Bio:</strong> {selectedUser.Bio}
                </Card.Text>
                <Image
                  src={selectedUser.avatar}
                  alt="Avatar"
                  rounded
                  width="150"
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/150?text=${selectedUser.profile.firstName.slice(
                      0,
                      1
                    )}`; // Fallback to default image on error
                  }}
                />
              </Card.Body>
              <Button variant="secondary" onClick={() => setSelectedUser(null)}>
                Clear
              </Button>
            </Card>
          ) : (
            <Alert variant="info">Select a user to see details</Alert>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default UserList;
