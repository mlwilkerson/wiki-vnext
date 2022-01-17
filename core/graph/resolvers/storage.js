const _ = require('lodash')
const graphHelper = require('../../helpers/graph')
const { v4: uuid } = require('uuid')

/* global WIKI */

module.exports = {
  Query: {
    async storageTargets (obj, args, context, info) {
      const dbTargets = await WIKI.models.storage.getTargets({ siteId: args.siteId })
      // targets = _.sortBy(targets.map(tgt => {
      //   const targetInfo = _.find(WIKI.data.storage, ['module', tgt.key]) || {}
      //   return {
      //     ...targetInfo,
      //     ...tgt,
      //     hasSchedule: (targetInfo.schedule !== false),
      //     syncInterval: targetInfo.syncInterval || targetInfo.schedule || 'P0D',
      //     syncIntervalDefault: targetInfo.schedule,
      //     config: _.sortBy(_.transform(tgt.config, (res, value, key) => {
      //       const configData = _.get(targetInfo.props, key, false)
      //       if (configData) {
      //         res.push({
      //           key,
      //           value: JSON.stringify({
      //             ...configData,
      //             value: (configData.sensitive && value.length > 0) ? '********' : value
      //           })
      //         })
      //       }
      //     }, []), 'key')
      //   }
      // }), ['title', 'key'])
      return WIKI.data.storage.map(md => {
        const dbTarget = dbTargets.find(tg => tg.module === md.key)
        return {
          id: dbTarget?.id ?? uuid(),
          isEnabled: dbTarget?.isEnabled ?? false,
          module: md.key,
          title: md.title,
          description: md.description,
          icon: md.icon,
          banner: md.banner,
          vendor: md.vendor,
          website: md.website,
          contentTypes: {
            activeTypes: dbTarget?.activeTypes ?? md.contentTypes.defaultTypesEnabled,
            largeThreshold: dbTarget?.largeThreshold ?? md.contentTypes.defaultLargeThreshold
          },
          assetDelivery: {
            isStreamingSupported: md?.assetDelivery?.isStreamingSupported ?? false,
            isDirectAccessSupported: md?.assetDelivery?.isDirectAccessSupported ?? false,
            streaming: dbTarget?.assetDelivery?.streaming ?? md?.assetDelivery?.defaultStreamingEnabled ?? false,
            directAccess: dbTarget?.assetDelivery?.directAccess ?? md?.assetDelivery?.defaultDirectAccessEnabled ?? false
          },
          versioning: {
            isSupported: md?.versioning?.isSupported ?? false,
            isForceEnabled: md?.versioning?.isForceEnabled ?? false,
            enabled: dbTarget?.versioning?.streaming ?? md?.versioning?.defaultEnabled ?? false
          },
          sync: {},
          status: {},
          config: _.transform(md.props, (r, v, k) => {
            const cfValue = dbTarget?.config?.[k] ?? v.default
            r[k] = {
              ...v,
              value: v.sensitive && cfValue ? '********' : cfValue,
              ...v.enum && {
                enum: v.enum.map(o => {
                  if (o.indexOf('|') > 0) {
                    const oParsed = o.split('|')
                    return {
                      value: oParsed[0],
                      label: oParsed[1]
                    }
                  } else {
                    return {
                      value: o,
                      label: o
                    }
                  }
                })
              }
            }
          }, {}),
          actions: md.actions
        }
      })
    }
  },
  Mutation: {
    async updateStorageTargets (obj, args, context) {
      try {
        const dbTargets = await WIKI.models.storage.getTargets()
        for (const tgt of args.targets) {
          const currentDbTarget = _.find(dbTargets, ['key', tgt.key])
          if (!currentDbTarget) {
            continue
          }
          await WIKI.models.storage.query().patch({
            isEnabled: tgt.isEnabled,
            mode: tgt.mode,
            syncInterval: tgt.syncInterval,
            config: _.reduce(tgt.config, (result, value, key) => {
              let configValue = _.get(JSON.parse(value.value), 'v', null)
              if (configValue === '********') {
                configValue = _.get(currentDbTarget.config, value.key, '')
              }
              _.set(result, `${value.key}`, configValue)
              return result
            }, {}),
            state: {
              status: 'pending',
              message: 'Initializing...',
              lastAttempt: null
            }
          }).where('key', tgt.key)
        }
        await WIKI.models.storage.initTargets()
        return {
          responseResult: graphHelper.generateSuccess('Storage targets updated successfully')
        }
      } catch (err) {
        return graphHelper.generateError(err)
      }
    },
    async executeStorageAction (obj, args, context) {
      try {
        await WIKI.models.storage.executeAction(args.targetKey, args.handler)
        return {
          responseResult: graphHelper.generateSuccess('Action completed.')
        }
      } catch (err) {
        return graphHelper.generateError(err)
      }
    }
  }
}
