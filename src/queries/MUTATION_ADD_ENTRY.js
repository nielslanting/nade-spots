import gql from 'graphql-tag'

gql`
  mutation addEntry(
    $description: String!,
    $name: String!,
    $usage: USAGE!,
    $videoId: String!,
    $videoStart: Int!,
    $videoEnd: Int!,
    $map: ID!,
    $type: ID!,
    $locations: Json!,
    $userId: ID!,
  ) {
    createEntry(
      description: $description,
      name: $name,
      usage: $usage,
      mapId: $map,
      typeId: $type,
      locations: $locations,
      video: {
        videoId: $videoId,
        start: $videoStart,
        end: $videoEnd
      },
      userId: $userId                
    ) {
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
`
