<template lang='pug'>
  q-page.admin-groups
    .row.q-pa-md.items-center
      .col-auto
        img.admin-icon.animated.fadeInLeft(src='~assets/icons/fluent-people.svg')
      .col.q-pl-md
        .text-h5.text-primary.animated.fadeInLeft {{ $t('admin.groups.edit') }}
        .text-subtitle1.text-grey.animated.fadeInLeft.wait-p2s {{group.name}}
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
          icon='las la-arrow-left'
          flat
          color='purple'
          to='/a/groups'
          )
        q-btn(
          unelevated
          icon='mdi-check'
          :label='$t(`common.actions.apply`)'
          color='secondary'
          @click='save'
          :loading='loading'
        )
    q-separator(inset)
    .row.q-pa-md.q-col-gutter-md
      .col-auto
        q-card.rounded-borders.bg-dark
          q-list(
            style='min-width: 200px;'
            padding
            dark
            )
            q-item(
              v-for='item of tabs'
              :key='`tab-` + item.key'
              clickable
              active-class='bg-primary text-white'
              :active='tab === item.key'
              @click='tab = item.key'
              dark
              )
              q-item-section(side)
                q-icon(
                  :name='item.icon'
                  :color='tab === item.key ? `white` : `primary`'
                  )
              q-item-section {{ item.title }}
      .col
        //-----------------------------
        //- GENERAL
        //-----------------------------
        q-card.shadow-1.q-py-sm(v-if='tab === `general`')
          q-item
            blueprint-icon(icon='team')
            q-item-section
              q-item-label {{$t(`admin.groups.name`)}}
              q-item-label(caption) {{$t(`admin.groups.nameHint`)}}
            q-item-section
              q-input(
                outlined
                v-model='group.name'
                dense
                :rules=`[
                  val => /^[^<>"]+$/.test(val) || $t('admin.groups.nameInvalidChars')
                ]`
                hide-bottom-space
                :aria-label='$t(`admin.groups.name`)'
                )
          q-separator.q-my-sm(inset)
          q-item
            blueprint-icon(icon='double-right')
            q-item-section
              q-item-label {{$t(`admin.groups.redirectOnLogin`)}}
              q-item-label(caption) {{$t(`admin.groups.redirectOnLoginHint`)}}
            q-item-section
              q-input(
                outlined
                v-model='group.redirectOnLogin'
                dense
                :aria-label='$t(`admin.groups.redirectOnLogin`)'
                )
          q-separator.q-my-sm(inset)
          q-item
            blueprint-icon(icon='chevron-right')
            q-item-section
              q-item-label {{$t(`admin.groups.redirectOnFirstLogin`)}}
              q-item-label(caption) {{$t(`admin.groups.redirectOnFirstLoginHint`)}}
            q-item-section
              q-input(
                outlined
                v-model='group.redirectOnFirstLogin'
                dense
                :aria-label='$t(`admin.groups.redirectOnLogin`)'
                )
        //-----------------------------
        //- RULES
        //-----------------------------
        .row.q-col-gutter-md(v-else-if='tab === `rules`')
          .col-12.col-lg-12
            q-card.shadow-1.q-pb-sm
              .flex.justify-between
                q-card-section
                  .text-subtitle1 {{$t(`admin.groups.rules`)}}
                q-card-section
                  q-btn(
                    unelevated
                    color='primary'
                    icon='las la-plus'
                    label='New Rule'
                    @click='newRule'
                  )
              q-card-section.q-pl-lg
                .admin-groups-rule(
                  v-for='(rule, idx) of group.rules'
                  :key='rule.id'
                  )
                  .admin-groups-rule-icon(:class='rule.deny ? `text-negative` : `text-positive`')
                    q-icon.cursor-pointer(
                      :name='rule.deny ? `las la-ban` : `las la-check`'
                      color='white'
                      @click='rule.deny = !rule.deny'
                    )
                  .admin-groups-rule-name
                    input(
                      type='text'
                      v-model='rule.name'
                      placeholder='Rule Name'
                    )
                  q-card.admin-groups-rule-card.q-mt-md(flat)
                    q-card-section.admin-groups-rule-card-permissions(:class='rule.deny ? `is-deny` : `is-allow`')
                      q-select.q-mt-xs(
                        standout
                        v-model='rule.roles'
                        emit-value
                        map-options
                        dense
                        :aria-label='$t(`admin.groups.ruleSites`)'
                        :options='rules'
                        placeholder='Select permissions...'
                        option-value='permission'
                        option-label='title'
                        options-dense
                        multiple
                        use-chips
                        stack-label
                        )
                        template(v-slot:option='{ itemProps, itemEvents, opt, selected, toggleOption }')
                          q-item(v-bind='itemProps', v-on='itemEvents')
                            q-item-section(side)
                              q-toggle(
                                :value='selected'
                                @input='toggleOption(opt)'
                                color='primary'
                                checked-icon='las la-check'
                                unchecked-icon='las la-times'
                                :aria-label='opt.label'
                              )
                            //- q-item-section(side, style='flex-basis: 150px;')
                            //-   q-chip.text-caption(
                            //-     square
                            //-     color='teal'
                            //-     text-color='white'
                            //-     dense
                            //-   ) {{opt.permission}}
                            q-item-section
                              q-item-label {{opt.title}}
                              q-item-label(caption) {{opt.hint}}
                      q-btn.acrylic-btn.q-ml-md(
                        flat
                        icon='las la-trash'
                        color='negative'
                        padding='sm sm'
                        size='md'
                      )
                    q-card-section(horizontal)
                      q-card-section.admin-groups-rule-card-filters
                        .text-caption Applies to...
                        q-select.q-mt-xs(
                          standout
                          v-model='rule.sites'
                          emit-value
                          map-options
                          dense
                          :aria-label='$t(`admin.groups.ruleSites`)'
                          :options='sites'
                          option-value='id'
                          option-label='title'
                          multiple
                          behavior='dialog'
                          :display-value='rule.sites.length > 0 ? rule.sites.length + ` sites selected` : `Any Site`'
                          )
                          template(v-slot:option='{ itemProps, itemEvents, opt, selected, toggleOption }')
                            q-item(v-bind='itemProps', v-on='itemEvents')
                              q-item-section
                                q-item-label {{opt.title}}
                              q-item-section(side)
                                q-toggle(
                                  :value='selected'
                                  @input='toggleOption(opt)'
                                  color='primary'
                                  checked-icon='las la-check'
                                  unchecked-icon='las la-times'
                                  :aria-label='opt.label'
                                )
                        q-select.q-mt-sm(
                          standout
                          v-model='rule.locales'
                          emit-value
                          map-options
                          dense
                          :aria-label='$t(`admin.groups.ruleLocales`)'
                          :options='locales'
                          option-value='code'
                          option-label='name'
                          multiple
                          behavior='dialog'
                          :display-value='rule.locales.length > 0 ? rule.locales.length + ` locales selected` : `Any Locale`'
                          )
                          template(v-slot:option='{ itemProps, itemEvents, opt, selected, toggleOption }')
                            q-item(v-bind='itemProps', v-on='itemEvents')
                              q-item-section
                                q-item-label {{opt.name}}
                              q-item-section(side)
                                q-toggle(
                                  :value='selected'
                                  @input='toggleOption(opt)'
                                  color='primary'
                                  checked-icon='las la-check'
                                  unchecked-icon='las la-times'
                                  :aria-label='opt.label'
                                )
                      q-card-section.admin-groups-rule-card-pattern
                        .text-caption Pattern
                        q-select.q-mt-xs(
                          standout
                          v-model='rule.match'
                          emit-value
                          map-options
                          dense
                          :aria-label='$t(`admin.groups.ruleMatch`)'
                          :options=`[
                            { label: $t('admin.groups.ruleMatchStart'), value: 'START' },
                            { label: $t('admin.groups.ruleMatchEnd'), value: 'END' },
                            { label: $t('admin.groups.ruleMatchRegex'), value: 'REGEX' },
                            { label: $t('admin.groups.ruleMatchTag'), value: 'TAG' },
                            { label: $t('admin.groups.ruleMatchTagAll'), value: 'TAGALL' },
                            { label: $t('admin.groups.ruleMatchExact'), value: 'EXACT' }
                          ]`
                        )
                        q-input.q-mt-sm(
                          standout
                          v-model='rule.path'
                          dense
                          :prefix='[`START`, `REGEX`, `EXACT`].includes(rule.match) ? `/` : null'
                          :suffix='rule.match === `REGEX` ? `/` : null'
                          :aria-label='$t(`admin.groups.rulePath`)'
                        )
        //-----------------------------
        //- PERMISSIONS
        //-----------------------------
        .row.q-col-gutter-md(v-else-if='tab === `permissions`')
          .col-12.col-lg-7
            q-card.shadow-1.q-pb-sm
              q-card-section
                .text-subtitle1 {{$t(`admin.groups.permisions`)}}
              template(v-for='(perm, idx) of permissions')
                q-item(tag='label', v-ripple, :key='perm.permission')
                  q-item-section.items-center(style='flex: 0 0 40px;')
                    q-icon(
                      name='las la-comments'
                      color='primary'
                      size='sm'
                      )
                  q-item-section
                    q-item-label {{perm.permission}}
                    q-item-label(caption) {{perm.hint}}
                  q-item-section(avatar)
                    q-toggle(
                      v-model='group.permissions'
                      :val='perm.permission'
                      color='primary'
                      checked-icon='las la-check'
                      unchecked-icon='las la-times'
                      :aria-label='$t(`admin.general.allowComments`)'
                      )
                q-separator.q-my-sm(inset, v-if='idx < permissions.length - 1')

</template>

<script>
import gql from 'graphql-tag'
import { get } from 'vuex-pathify'
import cloneDeep from 'lodash/cloneDeep'
import { v4 as uuid } from 'uuid'

export default {
  meta () {
    return {
      title: this.$t('admin.groups.edit')
    }
  },
  data () {
    return {
      loading: true,
      group: {
        id: '',
        name: '',
        isSystem: false,
        permissions: [],
        rules: [],
        users: [],
        redirectOnLogin: '/'
      },
      tab: 'rules',
      tabs: [
        {
          key: 'general',
          title: 'General',
          icon: 'las la-id-card'
        },
        {
          key: 'rules',
          title: 'Rules',
          icon: 'las la-file-invoice'
        },
        {
          key: 'permissions',
          title: 'Permissions',
          icon: 'las la-list-alt'
        },
        {
          key: 'users',
          title: 'Users',
          icon: 'las la-users'
        }
      ],
      selectPageModal: false
    }
  },
  computed: {
    sites: get('admin/sites'),
    locales: get('admin/locales'),
    rules () {
      return [
        {
          permission: 'read:pages',
          title: 'Read Pages',
          hint: 'Can view pages, as specified in the Page Rules',
          warning: false,
          restrictedForSystem: false,
          disabled: false
        },
        {
          permission: 'write:pages',
          hint: 'Can create / edit pages, as specified in the Page Rules',
          warning: false,
          restrictedForSystem: true,
          disabled: false
        },
        {
          permission: 'manage:pages',
          hint: 'Can move existing pages as specified in the Page Rules',
          warning: false,
          restrictedForSystem: true,
          disabled: false
        },
        {
          permission: 'delete:pages',
          hint: 'Can delete existing pages, as specified in the Page Rules',
          warning: false,
          restrictedForSystem: true,
          disabled: false
        },
        {
          permission: 'write:styles',
          hint: 'Can insert CSS styles in pages, as specified in the Page Rules',
          warning: false,
          restrictedForSystem: true,
          disabled: false
        },
        {
          permission: 'write:scripts',
          hint: 'Can insert JavaScript in pages, as specified in the Page Rules',
          warning: false,
          restrictedForSystem: true,
          disabled: false
        },
        {
          permission: 'read:source',
          hint: 'Can view pages source, as specified in the Page Rules',
          warning: false,
          restrictedForSystem: false,
          disabled: false
        },
        {
          permission: 'read:history',
          hint: 'Can view pages history, as specified in the Page Rules',
          warning: false,
          restrictedForSystem: false,
          disabled: false
        },
        {
          permission: 'read:assets',
          hint: 'Can view / use assets (such as images and files), as specified in the Page Rules',
          warning: false,
          restrictedForSystem: false,
          disabled: false
        },
        {
          permission: 'write:assets',
          hint: 'Can upload new assets (such as images and files), as specified in the Page Rules',
          warning: false,
          restrictedForSystem: true,
          disabled: false
        },
        {
          permission: 'manage:assets',
          hint: 'Can edit and delete existing assets (such as images and files), as specified in the Page Rules',
          warning: false,
          restrictedForSystem: true,
          disabled: false
        },
        {
          permission: 'read:comments',
          hint: 'Can view comments, as specified in the Page Rules',
          warning: false,
          restrictedForSystem: false,
          disabled: false
        },
        {
          permission: 'write:comments',
          hint: 'Can post new comments, as specified in the Page Rules',
          warning: false,
          restrictedForSystem: false,
          disabled: false
        },
        {
          permission: 'manage:comments',
          hint: 'Can edit and delete existing comments, as specified in the Page Rules',
          warning: false,
          restrictedForSystem: true,
          disabled: false
        }
      ]
    },
    permissions () {
      return [
        {
          permission: 'write:users',
          hint: 'Can create or authorize new users, but not modify existing ones',
          warning: false,
          restrictedForSystem: true,
          disabled: false
        },
        {
          permission: 'manage:users',
          hint: 'Can manage all users (but not users with administrative permissions)',
          warning: false,
          restrictedForSystem: true,
          disabled: false
        },
        {
          permission: 'write:groups',
          hint: 'Can manage groups and assign CONTENT permissions / page rules',
          warning: false,
          restrictedForSystem: true,
          disabled: false
        },
        {
          permission: 'manage:groups',
          hint: 'Can manage groups and assign ANY permissions (but not manage:system) / page rules',
          warning: true,
          restrictedForSystem: true,
          disabled: false
        },
        {
          permission: 'manage:navigation',
          hint: 'Can manage the site navigation',
          warning: false,
          restrictedForSystem: true,
          disabled: false
        },
        {
          permission: 'manage:theme',
          hint: 'Can manage and modify themes',
          warning: false,
          restrictedForSystem: true,
          disabled: false
        },
        {
          permission: 'manage:api',
          hint: 'Can generate and revoke API keys',
          warning: true,
          restrictedForSystem: true,
          disabled: false
        },
        {
          permission: 'manage:system',
          hint: 'Can manage and access everything. Root administrator.',
          warning: true,
          restrictedForSystem: true,
          disabled: true

        }
      ]
    }
  },
  methods: {
    selectPage () {
      this.selectPageModal = true
    },
    selectPageHandle ({ path, locale }) {
      this.group.redirectOnLogin = `/${locale}/${path}`
    },
    newRule () {
      this.group.rules.push({
        id: uuid(),
        name: 'Untitled Rule',
        deny: false,
        match: 'START',
        roles: [],
        path: '',
        locales: [],
        sites: []
      })
    },
    async save () {
      try {
        await this.$apollo.mutate({
          mutation: gql`
            mutation (
              $id: UUID!
              $name: String!
              $redirectOnLogin: String!
              $permissions: [String]!
              $rules: [GroupRuleInput]!
            ) {
              groups {
                update(
                  id: $id
                  name: $name
                  redirectOnLogin: $redirectOnLogin
                  permissions: $permissions
                  pageRules: $pageRules
                ) {
                  responseResult {
                    succeeded
                    errorCode
                    slug
                    message
                  }
                }
              }
            }
          `,
          variables: {
            id: this.group.id,
            name: this.group.name,
            redirectOnLogin: this.group.redirectOnLogin,
            permissions: this.group.permissions,
            pageRules: this.group.pageRules
          },
          watchLoading (isLoading) {
            this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-groups-update')
          }
        })
        this.$store.commit('showNotification', {
          style: 'success',
          message: 'Group changes have been saved.',
          icon: 'check'
        })
      } catch (err) {
        this.$store.commit('pushGraphError', err)
      }
    },
    async refresh () {
      return this.$apollo.queries.group.refetch()
    }
  },
  apollo: {
    group: {
      query: gql`
        query ($id: UUID!) {
          groupById(id: $id) {
            id
            name
            redirectOnLogin
            isSystem
            permissions
            rules {
              id
              name
              path
              roles
              match
              deny
              locales
              sites
            }
            users {
              id
              name
              email
            }
            createdAt
            updatedAt
          }
        }
      `,
      variables () {
        return {
          id: this.$route.params.id
        }
      },
      prefetch: false,
      fetchPolicy: 'network-only',
      update: (data) => cloneDeep(data.groupById),
      watchLoading (isLoading) {
        this.loading = isLoading
        this.$store.commit(`loading${isLoading ? 'Start' : 'Stop'}`, 'admin-groups-refresh')
      }
    }
  }
}
</script>

<style lang='scss'>
.admin-groups-rule {
  position: relative;
  padding: 10px 0 24px 40px;

  &-icon {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    width: 31px;

    &::before {
      position: absolute;
      content: "";
      border-radius: 100%;
      width: 31px;
      height: 31px;
      background-color: currentColor;
      top: 4px;
    }

    &::after {
      position: absolute;
      content: "";
      width: 3px;
      top: 41px;
      bottom: 0;
      left: 14px;
      opacity: .4;
      background-color: currentColor;
      display: block;
    }

    .q-icon {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      font-size: 16px;
      height: 38px;
      line-height: 38px;
      width: 100%;
      align-items: center;
      justify-content: center;
      display: flex;
    }
  }

  &-name {
    line-height: 12px;

    input {
      font-weight: 700;
      color: $grey-6;
      letter-spacing: 1px;
      font-size: 12px;
      line-height: 12px;
      border: none;
      padding: 0 0 0 5px;
      outline: none;
      width: 100%;
      background-color: transparent;

      &::placeholder {
        color: $grey-5;
      }

      @at-root .body--dark & {
        color: rgba(255,255,255,.7);

        &::placeholder {
          color: rgba(255,255,255,.4);
        }
      }
    }
  }

  &-card {
    background-color: $grey-2 !important;

    @at-root .body--dark & {
      background-color: $dark-6 !important;
    }

    &-permissions {
      background-color: rgba($positive, .1);
      border-bottom: 1px solid rgba($positive, .3);
      display: flex;
      align-items: center;

      .q-select {
        flex-basis: 100%;
      }

      &.is-allow {
        background-color: rgba($positive, .1);
        border-bottom: 1px solid rgba($positive, .3);
      }
      &.is-deny {
        background-color: rgba($negative, .1);
        border-bottom: 1px solid rgba($negative, .3);
      }
    }

    &-filters {
      background-color: $grey-3;
      flex-basis: 300px;

      .text-caption:first-child {
        color: $grey-7;
      }

      @at-root .body--dark & {
        background-color: $dark-5;
      }
    }
    &-pattern {
      flex-grow: 1;
    }
  }
}
</style>
