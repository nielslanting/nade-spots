import gql from 'graphql-tag'

export default gql`
  mutation AddUpvoteOnUser($user: ID!, $entry: ID!) {
    addToUpvoteOnUser (
      upvoteUsersUserId: $user,
      upvotedEntryId: $entry
    ) {
      upvotedEntry {
        id
      }
    }
  }
`
