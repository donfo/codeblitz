/**
 * 收敛 kaitian 的 patch
 */

import { Injector } from '@ali/common-di';
import { StaticServices } from '@ali/monaco-editor-core/esm/vs/editor/standalone/browser/standaloneServices';
import { ModesRegistry } from '@ali/monaco-editor-core/esm/vs/editor/common/modes/modesRegistry';
import { DirtyDiffWidget } from '@ali/ide-scm/lib/browser/dirty-diff/dirty-diff-widget';
import { AbstractResourcePreferenceProvider } from '@ali/ide-preferences/lib/browser/abstract-resource-preference-provider';

export const disposableCollection: ((injector: Injector) => void)[] = [];

// TODO: 不使用 private 如何清除副作用
export const disposeMode = () => {
  const modeService: any = StaticServices.modeService;

  // 需要把 LanguageRegistry dispose，否则二次加载会重复触发事件，导致加载越来越慢
  modeService._value?._registry?.dispose?.();
  modeService._value = null;
  (<any>ModesRegistry)._languages = [];
};

// TODO: 此处 diff 的 stage 和 revertChange 应该是 git 注册的，框架中直接添加了按钮，耦合，需要修复实现 scm/change/title
const _addAction = (<any>DirtyDiffWidget).prototype._addAction;
(<any>DirtyDiffWidget).prototype._addAction = function (icon: string, type: any) {
  if (icon === 'plus' || icon === 'rollback') return;
  _addAction.call(this, icon, type);
};

// TODO: 目前 preference 在 dispose 时会重置，而这个时机目前是在 dispose 所有实例时才会触发，此时 reset 无意义，
// 还会导致因 reset 触发事件获取 injector 实例发生错误（因为一些实例可能早已销毁）
Object.defineProperty(AbstractResourcePreferenceProvider.prototype, 'reset', {
  value: () => {},
  configurable: true,
});
