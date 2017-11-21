import gql from 'graphql-tag'

export default gql`
  query GameMaps($game: String) {
    game: Game(slug: $game) {
      id,
      maps {
        id,
        name,
        slug,
        thumbnail
      }
    }
  }
`
