import gql from 'graphql-tag'

export default gql`
  query EntriesForMap($map: String!) {
    map: Map(slug: $map) {
      id,
      minimap,
      minimapSize,
      entries {
        id,
        createdAt,
        description,
        downvotes,
        upvotes,
        locations,
        name,
        type {
          id,
          name
          color,
        },
        usage,
        video {
          videoId,
          start,
          end
        },
        user {
          name
        }
      }
    }
  }
`
