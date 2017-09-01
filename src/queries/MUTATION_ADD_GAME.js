import gql from 'graphql-tag'

export default gql`
  mutation createGame($name: String!, $slug: String!) {
    createGame(
      name: $name,
      slug: $slug,
      typesIds: ["cj59yn1k45rsl0129p1nf7u9k", "cj59yp9gn5txr01244o0d4yd1", "cj59yq3ks5sak0129k9uex52o"]
    ) {
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
