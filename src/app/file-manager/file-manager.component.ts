import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileManagerService } from '../file-manager.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileManagerComponent {
  constructor(private readonly _fileManagerService: FileManagerService) {}

  async onFileOpen(): Promise<void> {
    await this._fileManagerService.openFilePicker();
  }
}
