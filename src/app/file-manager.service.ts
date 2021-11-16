import { Injectable } from '@angular/core';
import { ControlService } from './control.service';

@Injectable({
  providedIn: 'root',
})
export class FileManagerService {
  private readonly _pickerOpts = {
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

  async openFilePicker(): Promise<void> {
    const [fileHandle] = await (window as any).showOpenFilePicker(
      this._pickerOpts
    );
    const file = await fileHandle.getFile();
    const ext = file.name.split('.').pop();
    const URL = window.URL || window.webkitURL;
    const src = URL.createObjectURL(file);
    this._controlService.setCurrentVideo({ url: src, extension: ext });
  }
}
