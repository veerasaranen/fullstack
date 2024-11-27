import { Link } from 'react-router-dom'
import { Container } from '@mui/material'
import {
  TableContainer,
  Table,
  TableBody,
  TableRow,
  TableCell,
} from '@mui/material'

const Users = ({ users }) => {
  return (
    <Container>
      <h2>Users</h2>
      <br />
      <TableContainer>
        <Table>
          <TableBody>
            <TableRow>
              <TableCell></TableCell>
              <TableCell>
                <b>blogs created</b>
              </TableCell>
            </TableRow>
            {users.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.username}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  )
}

export default Users
