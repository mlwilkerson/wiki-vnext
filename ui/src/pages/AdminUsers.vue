<template lang='pug'>
q-page.admin-groups
  .row.q-pa-md.items-center
    .col-auto
      img.admin-icon.animated.fadeInLeft(src='~assets/icons/fluent-account.svg')
    .col.q-pl-md
      .text-h5.text-primary.animated.fadeInLeft {{ $t('admin.users.title') }}
      .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{ $t('admin.users.subtitle') }}
    .col-auto.flex.items-center
      q-input.q-mr-sm(
        outlined
        v-model='search'
        dense
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
        :label='$t(`admin.users.create`)'
        color='primary'
        @click='createUser'
        )
  q-separator(inset)
  .row.q-pa-md.q-col-gutter-md
    .col-12
      q-card.shadow-1
        q-table(
          :rows='users'
          :columns='headers'
          row-key='id'
          flat
          hide-header
          hide-bottom
          :rows-per-page-options='[0]'
          :loading='loading'
          )
          template(v-slot:body-cell-id='props')
            q-td(:props='props')
              q-icon(name='las la-user', color='primary', size='sm')
          template(v-slot:body-cell-name='props')
            q-td(:props='props')
              .flex.items-center
                strong {{props.value}}
                q-icon.q-ml-sm(
                  v-if='props.row.isSystem'
                  name='las la-lock'
                  color='pink'
                  )
          template(v-slot:body-cell-email='props')
            q-td(:props='props')
              em {{ props.value }}
          template(v-slot:body-cell-date='props')
            q-td(:props='props')
              i18n-t.text-caption(keypath='admin.users.createdAt', tag='div')
                template(#date)
                  strong {{ humanizeDate(props.value) }}
              i18n-t.text-caption(
                v-if='props.row.lastLoginAt'
                keypath='admin.users.lastLoginAt'
                tag='div'
                )
                template(#date)
                  strong {{ humanizeDate(props.row.lastLoginAt) }}
          template(v-slot:body-cell-edit='props')
            q-td(:props='props')
              q-btn.acrylic-btn.q-mr-sm(
                flat
                :to='`/a/users/` + props.row.id'
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
import { DateTime } from 'luxon'

export default {
  meta () {
    return {
      title: this.$t('admin.groups.title')
    }
  },
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
          label: this.$t('admin.users.email'),
          align: 'left',
          field: 'email',
          name: 'email',
          sortable: false
        },
        {
          align: 'left',
          field: 'createdAt',
          name: 'date',
          sortable: false
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
    humanizeDate (val) {
      return DateTime.fromISO(val).toRelative()
    },
    async refresh () {
      await this.$apollo.queries.users.refetch()
      this.$q.notify({
        type: 'positive',
        message: this.$t('admin.users.refreshSuccess')
      })
    },
    createUser () {
      this.$q.dialog({
        component: this.$.appContext.components.UserCreateDialog
      }).onOk(() => {
        this.$apollo.queries.users.refetch()
      })
    },
    editUser (gr) {
      this.$router.push(`/a/users/${gr.id}`)
    },
    deleteUser (gr) {
      this.$q.dialog({
        component: this.$.appContext.components.UserDeleteDialog,
        componentProps: {
          group: gr
        }
      }).onOk(() => {
        this.$apollo.queries.users.refetch()
      })
    }
  },
  apollo: {
    users: {
      query: gql`
        query getUsers {
          users {
            id
            name
            email
            providerId
            isSystem
            isActive
            createdAt
            lastLoginAt
          }
        }
      `,
      prefetch: false,
      fetchPolicy: 'network-only',
      update: (data) => data.users,
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
