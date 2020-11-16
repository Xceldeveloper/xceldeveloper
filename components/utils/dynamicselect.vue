<template>
  <v-dialog v-model="activate" max-width="500px" transition="dialog-transition">
    <v-card>
      <v-card-title>{{ title }}</v-card-title>
      <v-card-text>
        <v-text-field
          v-if="itemx.length > 10"
          :autofocus="activate"
          name="Search..."
          label="search.."
          v-model="searchQuery"
          :color="color"
          append-icon="mdi-send"
          append.@click="hello"
        ></v-text-field>
        <div id="list-cover" v-for="(item, index) in itemx" :key="index">
          <div @click="returnSelected(index)" v-if="itemx.length > 0">
            <slot name="custom" v-bind:options="item">
              <v-list-item link>
                <v-list-item-title>{{ item }}</v-list-item-title>
              </v-list-item>
            </slot>
          </div>
        </div>
        <v-row
          class="fill-height ma-0"
          align="center"
          justify="center"
          v-if="itemx.length === 0"
        >
          <v-progress-circular
            indeterminate
            size="50"
            :color="color"
          ></v-progress-circular>
        </v-row>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: {
    color: {
      type: String,
      default: '#000000'
    },
    title: {
      type: String,
      default: ''
    },
    activate: {
      type: Boolean,
      default: false
    },
    items: {
      type: Array,
      required: true
    },
    nameKey: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      searchQuery: ''
    }
  },
  methods: {
    returnSelected(index) {
      this.$emit('selected', this.itemx[index])
      this.$emit('close')
    }
  },
  computed: {
    itemx() {
      if (this.searchQuery == '') {
        return this.items
      } else {
        return this.items.filter((e) => {
          if (this.nameKey !== '' || this.nameKey.length > 0) {
            //if is object array use name-key to filter else
            return (
              (e[this.nameKey] || '')
                .toLowerCase()
                .indexOf((this.searchQuery || '').toLowerCase()) > -1
            )
          } else {
            //else filter like that
            return e.toLowerCase().indexOf(this.searchQuery.toLowerCase()) > -1
          }
        })
      }
    }
  },
  watch: {
    activate(val) {
      if (!val) {
        this.searchQuery = ''
        this.$emit('close')
      }
    }
  }
}
</script>

<style>
#select-title {
  display: block;
  padding: 10px;
  font-size: 18px;
}
</style>