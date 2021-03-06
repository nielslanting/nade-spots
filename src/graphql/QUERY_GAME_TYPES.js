import gql from 'graphql-tag'

export default gql`
  query GameTypes($game: String) {
    game: Game(slug: $game) {
      id,
      types {
        id,
        color,
        name
      }
    }
  }
`
