import gql from 'graphql-tag'

export default gql`
  query allGames {
    allGames {
      id,
      name,
      slug,
      types {
        id,
        name,
        color
      }
    }
  }
`
