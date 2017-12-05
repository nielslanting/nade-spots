import gql from 'graphql-tag'

export default gql`
  query GameMaps($game: String) {
    game: Game(slug: $game) {
      id,
      name,
      maps {
        id,
        name,
        slug,
        thumbnail
      }
    }
  }
`
