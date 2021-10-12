<template lang='pug'>
q-page.admin-groups
  .row.q-pa-md.items-center
    .col-auto
      img.admin-icon.animated.fadeInLeft(src='~assets/icons/fluent-people.svg')
    .col.q-pl-md
      .text-h5.text-primary.animated.fadeInLeft {{ $t('admin.groups.title') }}
      .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{ $t('admin.groups.subtitle') }}
    .col-auto.flex.items-center
      q-input.denser.q-mr-sm(
        outlined
        v-model='search'
        dense
        :class='$q.dark.isActive ? `bg-dark` : `bg-white`'
        )
        template(#prepend)
          q-icon(name='las la-search')
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
        :label='$t(`admin.groups.create`)'
        color='primary'
        @click='createGroup'
        )
  q-separator(inset)
  .row.q-pa-md.q-col-gutter-md
    .col-12
      q-card.shadow-1
        q-table(
          :rows='groups'
          :columns='headers'
          row-key='id'
          flat
          hide-header
          hide-bottom
          :rows-per-page-options='[0]'
          :loading='loading'
          :filter='search'
          )
          template(v-slot:body-cell-id='props')
            q-td(:props='props')
              q-icon(name='las la-users', color='primary', size='sm')
          template(v-slot:body-cell-name='props')
            q-td(:props='props')
              .flex.items-center
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
              ) {{$t('admin.groups.users', { count: props.value })}}
          template(v-slot:body-cell-edit='props')
            q-td(:props='props')
              q-btn.acrylic-btn.q-mr-sm(
                flat
                :to='`/a/groups/` + props.row.id'
                icon='las la-pen'
                color='indigo'
                :label='$t(`common.actions.edit`)'
                no-caps
                )
              q-btn.acrylic-btn(
                flat
                icon='las la-trash'
                color='accent'
                :disabled='props.row.isSystem'
                @click='deleteGroup(props.row)'
                )
</template>

<script>
import gql from 'graphql-tag'
import { createMetaMixin } from 'quasar'

export default {
  mixins: [
    createMetaMixin(function () {
      return {
        title: this.$t('admin.groups.title')
      }
    })
  ],
  data () {
    return {
      groups: [],
      loading: true,
      search: ''
    }
  },
  computed: {
    headers () {
      return [
        {
          align: 'center',
          field: 'id',
          name: 'id',
          sortable: false,
          style: 'width: 20px'
        },
        {
          label: this.$t('common.field.name'),
          align: 'left',
          field: 'name',
          name: 'name',
          sortable: true
        },
        {
          label: this.$t('admin.groups.userCount'),
          align: 'center',
          field: 'userCount',
          name: 'usercount',
          sortable: false,
          style: 'width: 150px'
        },
        {
          label: '',
          align: 'right',
          field: 'edit',
          name: 'edit',
          sortable: false,
          style: 'width: 250px'
        }
      ]
    }
  },
  methods: {
    async refresh () {
      await this.$apollo.queries.groups.refetch()
      this.$q.notify({
        type: 'positive',
        message: this.$t('admin.groups.refreshSuccess')
      })
    },
    createGroup () {
      this.$q.dialog({
        component: this.$.appContext.components.GroupCreateDialog
      }).onOk(() => {
        this.$apollo.queries.groups.refetch()
      })
    },
    editGroup (gr) {
      this.$router.push(`/a/groups/${gr.id}`)
    },
    deleteGroup (gr) {
      this.$q.dialog({
        component: this.$.appContext.components.GroupDeleteDialog,
        componentProps: {
          group: gr
        }
      }).onOk(() => {
        this.$apollo.queries.groups.refetch()
      })
    }
  },
  apollo: {
    groups: {
      query: gql`
        query getGroups {
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
