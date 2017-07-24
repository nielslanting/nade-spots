<template>
  <div>
    <h1>Add nade</h1>
    <button @click="handleCreate">Create</button>
  </div>
</template>

<script>
  import gql from 'graphql-tag'

  export default {
    name: 'Add',
    props: ['map', 'types'],
    methods: {
      handleCreate () {
        this.addEntry()
      },
      addEntry () {
        this.$apollo.mutate({
          mutation: gql`
            mutation addEntry(
              $description: String!,
              $name: String!,
              $usage: ENTRY_USAGE!,
              $videoId: String!,
              $videoStart: Int!,
              $videoEnd: Int!,
              $map: ID!,
              $type: ID!,

            ) {
              createEntry(
                description: $description,
                name: $name,
                usage: $usage,
                mapId: $map,
                typeId: $type,
                video: {
                  videoId: $videoId,
                  start: $videoStart,
                  end: $videoEnd
                },
              ) {
                id,
                name,
                description,
                usage
                video {
                  id,
                  videoId
                }
              }
            }
          `,
          variables: {
            description: 'kaasisbaas',
            name: 'kaasisbaas',
            usage: 'GENERAL',
            videoId: 'YzqFUJGkjc4',
            videoStart: 103,
            videoEnd: 113,
            map: this.map.id, // Castle
            type: this.types[0].id // Grenade (M67)
          }
        })
        .then((data) => {
          console.log('addEntry success', data)
        })
        .catch((error) => {
          console.error('addEntry error', error)
        })
      }
    }
  }
</script>
