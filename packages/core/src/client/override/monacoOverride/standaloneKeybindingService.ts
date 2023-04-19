import { ICommandService } from '@opensumi/monaco-editor-core/esm/vs/platform/commands/common/commands';
import { StandaloneKeybindingService } from '@opensumi/monaco-editor-core/esm/vs/editor/standalone/browser/standaloneServices';
import { StandaloneServices } from '@opensumi/monaco-editor-core/esm/vs/editor/standalone/browser/standaloneServices';
import { IContextKeyService } from '@opensumi/monaco-editor-core/esm/vs/platform/contextkey/common/contextkey';
import { ITelemetryService } from '@opensumi/monaco-editor-core/esm/vs/platform/telemetry/common/telemetry';
import { INotificationService } from '@opensumi/monaco-editor-core/esm/vs/platform/notification/common/notification';
import { ILogService } from '@opensumi/monaco-editor-core/esm/vs/platform/log/common/log';
import { ICodeEditorService } from '@opensumi/monaco-editor-core/esm/vs/editor/browser/services/codeEditorService';

export class StandaloneKeybindingServiceProxy extends StandaloneKeybindingService {
  // TODO contextService
  constructor(monacoCodeService: ICodeEditorService, monacoCommandService: ICommandService) {
    super(
      StandaloneServices.get(IContextKeyService),
      monacoCommandService,
      // StandaloneServices.get(ICommandService),
      StandaloneServices.get(ITelemetryService),
      StandaloneServices.get(INotificationService),
      StandaloneServices.get(ILogService),
      // StandaloneServices.get(ICodeEditorService)
      monacoCodeService
    );
  }
}
