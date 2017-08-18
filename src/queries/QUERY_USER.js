import gql from 'graphql-tag'

export default gql`
  query {
    user {
      id,
      name,
      picture,
      upvoted {
        id
      },
      downvoted {
        id
      }
    }
  }
`
