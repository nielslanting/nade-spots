import gql from 'graphql-tag'

export default gql`
  mutation ($idToken: String!, $name: String!, $email: String!, $picture: String!){
    createUser(authProvider: {auth0: {idToken: $idToken}}, name: $name, email: $email, picture: $picture) {
      id,
      name,
      picture
    }
  }
`
