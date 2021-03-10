import { Injector } from '@ali/common-di';
import {
  PreferenceService,
  PreferenceProxy,
  createPreferenceProxy,
  PreferenceSchema,
  localize,
} from '@ali/ide-core-browser';

// 这里都是 scm 相关配置项注册
/* istanbul ignore file */
export const lsifPreferenceSchema: PreferenceSchema = {
  id: 'lsif',
  order: 5,
  title: localize('lsifConfigurationTitle', 'LSIF'),
  type: 'object',
  properties: {
    'lsif.enable': {
      type: 'boolean',
      description: localize('lsif.enable', 'Lsif enablement'),
      default: false,
    },
    'lsif.documentScheme': {
      type: 'string',
      description: localize('lsif.documentScheme', 'lsif支持的文件协议'),
      default: 'file',
    },
  },
};

export interface LsifConfiguration {
  'lsif.enable': boolean;
  'lsif.documentScheme': string;
}

export const LsifPreferences = Symbol('LsifPreferences');
export type LsifPreferences = PreferenceProxy<LsifConfiguration>;

export function bindLsifPreference(injector: Injector) {
  injector.addProviders({
    token: LsifPreferences,
    useFactory: (injector: Injector) => {
      const preferences: PreferenceService = injector.get(PreferenceService);
      return createPreferenceProxy(preferences, lsifPreferenceSchema);
    },
  });
}
