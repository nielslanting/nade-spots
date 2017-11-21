import gql from 'graphql-tag'

export default gql`
  mutation EditUserName($user: ID!, $name: String!) {
    updateUser(id: $user, name: $name) {
      id,
      name,
    }
  }
`
