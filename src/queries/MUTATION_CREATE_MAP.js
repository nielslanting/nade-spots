import gql from 'graphql-tag'

export default gql`
  mutation createMap(
    $minimap: String!,
    $minimapSize: Int!,
    $name: String!,
    $slug: String!,
    $thumbnail: String!,
    $game: ID!
  ) {
    createMap(
      minimap: $minimap,
      minimapSize: $minimapSize,
      name: $name,
      slug: $slug,
      thumbnail: $thumbnail,
      gameId: $game
    ) {
      id,
      minimap,
      minimapSize,
      name,
      slug,
      thumbnail
    }
  }
`
