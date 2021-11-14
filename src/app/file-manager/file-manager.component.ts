import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ControlService } from '../control.service';

@Component({
  selector: 'app-file-manager',
  templateUrl: './file-manager.component.html',
  styleUrls: ['./file-manager.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileManagerComponent {
  constructor(private readonly _controlService: ControlService) {}

  async onFileOpen(): Promise<void> {
    const [fileHandle] = await (window as any).showOpenFilePicker();
    const file = await fileHandle.getFile();
    this._controlService.setVideoExtension(file.name.split('.').pop());
    const URL = window.URL || window.webkitURL;
    const src = URL.createObjectURL(file);
    console.log(src);
    this._controlService.setCurrentVideo(src);
  }
}
