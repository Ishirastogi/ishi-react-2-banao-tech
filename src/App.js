import { Container, Navbar } from "react-bootstrap";
import UserList from "./components/UserList";
function App() {
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">ReactJS Task 2 - User List</Navbar.Brand>
          <Navbar.Text className="ms-auto">
            Assignment submitted by Ishi Rastogi
          </Navbar.Text>
        </Container>
      </Navbar>
      <Container>
        <h1 className="mt-4">Users</h1>
        <UserList />
      </Container>
    </div>
  );
}

export default App;
