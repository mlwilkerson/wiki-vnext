<template lang='pug'>
  q-page.admin-groups
    .row.q-pa-md.items-center
      .col-auto
        img.admin-icon.animated.fadeInLeft(src='~assets/icons/fluent-people.svg')
      .col.q-pl-md
        .text-h5.text-primary.animated.fadeInLeft {{ $t('admin:groups.title') }}
        .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{ $t('admin:groups.subtitle') }}
      .col-auto
        q-btn.acrylic-btn.q-mr-sm(
          icon='las la-question-circle'
          flat
          color='grey'
          type='a'
          href='https://docs.js.wiki/admin/groups'
          target='_blank'
          )
        q-btn.q-mr-sm.acrylic-btn(
          icon='las la-redo-alt'
          flat
          color='secondary'
          @click='refresh'
          )
        q-btn(
          unelevated
          icon='las la-plus'
          :label='$t(`admin:groups.create`)'
          color='primary'
          @click='createGroup'
          )
    q-separator(inset)
    .row.q-pa-md.q-col-gutter-md
      .col-12
        q-card.shadow-1
          q-table(
            :data='groups'
            :columns='headers'
            row-key='id'
            flat
            hide-bottom
            :rows-per-page-options='[0]'
            :loading='loading'
            )
            template(v-slot:body-cell-id='props')
              q-td(:props='props')
                q-btn.acrylic-btn(
                  size='sm'
                  padding='xs'
                  icon='las la-clipboard'
                  flat
                  color='brown'
                  @click='copyID(props.value)'
                  )
                  q-tooltip(
                    anchor='center left'
                    self='center right'
                  ) {{$t('common:clipboard.uuid')}}
            template(v-slot:body-cell-name='props')
              q-td.flex.items-center(:props='props')
                strong {{props.value}}
                q-icon.q-ml-sm(
                  v-if='props.row.isSystem'
                  name='las la-lock'
                  color='pink'
                  )
            template(v-slot:body-cell-usercount='props')
              q-td(:props='props')
                q-chip.text-caption(
                  square
                  :color='$q.dark.isActive ? `dark-6` : `grey-2`'
                  :text-color='$q.dark.isActive ? `white` : `grey-8`'
                  dense
                ) {{props.value}}
            template(v-slot:body-cell-edit='props')
              q-td(:props='props')
                q-btn.acrylic-btn(
                  flat
                  padding='xs sm'
                  icon='las la-pen'
                  color='indigo'
                  :to='`/a/groups/` + props.row.id'
                  )
            template(v-slot:body-cell-remove='props')
              q-td(:props='props')
                q-btn.acrylic-btn(
                  flat
                  padding='xs sm'
                  icon='las la-trash'
                  color='accent'
                  :disabled='props.row.isSystem'
                  @click='deleteGroup(props.row)'
                  )
</template>

<script>
import gql from 'graphql-tag'
import Vue from 'vue'
import { copyToClipboard } from 'quasar'

export default {
  meta () {
    return {
      title: this.$t('admin:groups.title')
    }
  },
  data () {
    return {
      groups: [],
      loading: true
    }
  },
  computed: {
    headers () {
      return [
        {
          label: this.$t('common:field.id'),
          align: 'center',
          field: 'id',
          name: 'id',
          sortable: false,
          style: 'width: 50px'
        },
        {
          label: this.$t('common:field.name'),
          align: 'left',
          field: 'name',
          name: 'name',
          sortable: true
        },
        {
          label: this.$t('admin:groups.userCount'),
          align: 'center',
          field: 'userCount',
          name: 'usercount',
          sortable: false,
          style: 'width: 150px'
        },
        {
          label: this.$t('admin:groups.edit'),
          align: 'center',
          field: 'edit',
          name: 'edit',
          sortable: false,
          style: 'width: 150px'
        },
        {
          label: this.$t('admin:groups.delete'),
          align: 'center',
          field: 'remove',
          name: 'remove',
          sortable: false,
          style: 'width: 100px'
        }
      ]
    }
  },
  methods: {
    async refresh () {
      await this.$apollo.queries.groups.refetch()
      this.$q.notify({
        type: 'positive',
        message: this.$t('admin:groups.refreshSuccess')
      })
    },
    createGroup () {
      this.$q.dialog({
        component: Vue.options.components.GroupCreateDialog,
        parent: this
      }).onOk(() => {
        this.$apollo.queries.groups.refetch()
      })
    },
    editGroup (gr) {
      this.$router.push(`/a/groups/${gr.id}`)
    },
    deleteGroup (gr) {
      this.$q.dialog({
        component: Vue.options.components.GroupDeleteDialog,
        parent: this,
        group: gr
      }).onOk(() => {
        this.$apollo.queries.groups.refetch()
      })
    },
    copyID (uid) {
      copyToClipboard(uid).then(() => {
        this.$q.notify({
          type: 'positive',
          message: this.$t('common:clipboard.uuidSuccess')
        })
      }).catch(() => {
        this.$q.notify({
          type: 'negative',
          message: this.$t('common:clipboard.uuidFailure')
        })
      })
    }
  },
  apollo: {
    groups: {
      query: gql`
        query {
          groups {
            id
            name
            isSystem
            userCount
            createdAt
            updatedAt
          }
        }
      `,
      prefetch: false,
      fetchPolicy: 'network-only',
      update: (data) => data.groups,
      watchLoading (isLoading) {
        this.loading = isLoading
        this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-groups-refresh')
      }
    }
  }
}
</script>

<style lang='scss'>

</style>
