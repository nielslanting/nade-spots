import gql from 'graphql-tag'

export default gql`
  mutation AddDownvoteOnUser($user: ID!, $entry: ID!) {
    addToDownvoteOnUser (
      downvoteUsersUserId: $user,
      downvotedEntryId: $entry
    ) {
      downvotedEntry {
        id
      }
    }
  }
`
