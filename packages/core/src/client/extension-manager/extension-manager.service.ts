import { Injectable, Autowired } from '@ali/common-di';
import { replaceLocalizePlaceholder, URI } from '@ali/ide-core-browser';
import { posix } from '@ali/ide-core-common/lib/path';
import { action, observable, computed, runInAction } from 'mobx';
import { ExtensionService, IExtensionProps } from '@ali/ide-kaitian-extension/lib/common';
import { StaticResourceService } from '@ali/ide-static-resource/lib/browser';
import { EditorPreferences, WorkbenchEditorService } from '@ali/ide-editor/lib/browser';

import {
  IExtension,
  DEFAULT_ICON_URL,
  RawExtension,
  ExtensionDetail,
  OpenExtensionOptions,
} from './base';
import { EXT_SCHEME } from '../../common/constant';

@Injectable()
export class ExtensionManagerService {
  @Autowired()
  protected extensionService: ExtensionService;

  @Autowired()
  protected staticResourceService: StaticResourceService;

  @Autowired(EditorPreferences)
  editorPreferences: EditorPreferences;

  @Autowired(WorkbenchEditorService)
  workbenchEditorService: WorkbenchEditorService;

  @observable
  isInit: boolean = false;

  @observable
  extensions: IExtension[] = [];

  @action
  async init() {
    if (this.isInit) {
      return;
    }
    const extensionProps = await this.extensionService.getAllExtensionJson();
    const extensions = await this.transformFromExtensionProp(extensionProps);
    // 是否要展示内置插件
    runInAction(() => {
      this.extensions = extensions;
      this.isInit = true;
    });
  }

  /**
   * 转换 IExtensionProps 到 IExtension
   * @param extensionProps
   */
  private async transformFromExtensionProp(
    extensionProps: IExtensionProps[]
  ): Promise<IExtension[]>;
  private async transformFromExtensionProp(extensionProps: IExtensionProps): Promise<IExtension>;
  private async transformFromExtensionProp(
    extensionProps: IExtensionProps[] | IExtensionProps
  ): Promise<IExtension[] | IExtension> {
    if (Array.isArray(extensionProps)) {
      return await Promise.all(
        extensionProps.map(async (extension) => {
          return {
            ...extension,
            installed: true,
          };
        })
      );
    }
    return {
      ...extensionProps,
      installed: true,
    };
  }

  @computed
  get rawExtension() {
    return this.extensions.map((extension) => {
      const { displayName, description } = this.getI18nInfo(extension);
      const [publisher, name] = extension.extensionId.split('.');
      return {
        id: extension.id,
        extensionId: extension.extensionId,
        // 说明加载的是新规范的插件，则用插件市场 name packageJSON 的 name
        name: name ? name : extension.packageJSON.name,
        displayName,
        version: extension.packageJSON.version,
        description,
        publisher: name ? publisher : extension.packageJSON.publisher,
        installed: extension.installed,
        icon: this.getIconFromExtension(extension),
        path: extension.realPath,
        enable: extension.isUseEnable,
        isBuiltin: true,
        isDevelopment: !extension.realPath.startsWith(`${EXT_SCHEME}:`),
        engines: {
          vscode: extension.packageJSON.engines?.vscode,
          kaitian: extension.packageJSON.engines?.kaitian,
        },
      };
    });
  }

  getRawExtensionById(extensionId: string): RawExtension | undefined {
    return this.rawExtension.find((extension) => this.equalExtensionId(extension, extensionId));
  }

  private equalExtensionId(extension: RawExtension, extensionId: string): boolean {
    return extension.extensionId === extensionId || extension.id === extensionId;
  }

  /**
   * 插件部分信息是 i18n 的，需要做层转换
   * @param extension
   */
  private getI18nInfo(extension: IExtension): { description: string; displayName: string } {
    let displayName;
    let description;

    displayName =
      replaceLocalizePlaceholder(extension.packageJSON.displayName, extension.id) ||
      (extension.packageNlsJSON && extension.packageNlsJSON.displayName) ||
      (extension.defaultPkgNlsJSON && extension.defaultPkgNlsJSON.displayName) ||
      extension.packageJSON.displayName;
    description =
      replaceLocalizePlaceholder(extension.packageJSON.description, extension.id) ||
      (extension.packageNlsJSON && extension.packageNlsJSON.description) ||
      (extension.defaultPkgNlsJSON && extension.defaultPkgNlsJSON.description) ||
      extension.packageJSON.description;

    return {
      description,
      displayName,
    };
  }

  private getIconFromExtension(extension: IExtension): string {
    const { icon } = extension.packageJSON;
    if (!icon) return DEFAULT_ICON_URL;
    const uri = new URI(extension.realPath);
    return this.staticResourceService
      .resolveStaticResource(uri.withPath(posix.join(uri.codeUri.path, icon)))
      .toString();
  }

  async getDetailById(extensionId: string): Promise<ExtensionDetail | undefined> {
    const extension = this.getRawExtensionById(extensionId);
    if (!extension) {
      return;
    }
    const extensionDetail = await this.extensionService.getExtensionProps(extension.path, {
      readme: './README.md',
      changelog: './CHANGELOG.md',
    });
    if (extensionDetail) {
      return {
        ...extension,
        readme: extensionDetail.extraMetadata.readme,
        changelog: extensionDetail.extraMetadata.changelog,
        packageJSON: extensionDetail?.packageJSON,
        license: '',
        categories: '',
        repository: extensionDetail.packageJSON.repository
          ? extensionDetail.packageJSON.repository.url
          : '',
        contributes: extensionDetail?.packageJSON?.contributes,
        isDevelopment: extensionDetail.isDevelopment,
      };
    }
  }

  openExtensionDetail(options: OpenExtensionOptions) {
    const query = `extensionId=${options.publisher}.${options.name}&version=${
      options.version
    }&name=${options.displayName || options.name}&icon=${options.icon}`;
    // 当打开模式为双击同时预览模式生效时，默认单击为预览
    const editorOptions = {
      preview: this.editorPreferences['editor.previewMode'] && options.preview,
    };
    this.workbenchEditorService.open(new URI(`extension://local?${query}`), editorOptions);
  }
}
