import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlService } from '../control.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileManagerComponent {
  pickerOpts = {
    types: [
      {
        description: 'Videos',
        accept: {
          'video/*': ['.mp4', '.mkv', '.avi'],
        },
      },
    ],
    excludeAcceptAllOption: true,
    multiple: false,
  };

  constructor(private readonly _controlService: ControlService) {}

  async onFileOpen(): Promise<void> {
    const [fileHandle] = await (window as any).showOpenFilePicker(
      this.pickerOpts
    );
    const file = await fileHandle.getFile();
    const ext = file.name.split('.').pop();
    const URL = window.URL || window.webkitURL;
    const src = URL.createObjectURL(file);
    this._controlService.setCurrentVideo({ url: src, extension: ext });
  }
}
