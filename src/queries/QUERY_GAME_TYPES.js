import gql from 'graphql-tag'

export default gql`
  query GameTypes($game: String) {
    game: Game(slug: $game) {
      types {
        id,
        color,
        name
      }
    }
  }
`
