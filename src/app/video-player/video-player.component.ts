import {
  ChangeDetectionStrategy,
  Component,
  TemplateRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { tap } from 'rxjs';
import { map } from 'rxjs/operators';
import { ControlService } from '../control.service';
import { FileManagerService } from '../file-manager.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent {
  @ViewChild('sourceContainer', { read: ViewContainerRef })
  mediaContainer: ViewContainerRef | null = null;
  @ViewChild('source', { read: TemplateRef })
  sourceTemplate: TemplateRef<any> | null = null;

  readonly currentVideo$ = this._controlService.currentVideo$.pipe(
    map((video) => {
      if (video) {
        return {
          url: this._sanitizer.bypassSecurityTrustResourceUrl(video!.url),
          extension: video!.extension,
        };
      }
      return null;
    }),
    tap((video) => {
      if (video) {
        this._showSourceElement(video);
      }
    })
  );

  videoApi: VgApiService | null = null;

  constructor(
    private readonly _controlService: ControlService,
    private readonly _sanitizer: DomSanitizer,
    private readonly _fileManagerService: FileManagerService
  ) {}

  // render source elements with the new video data
  private _showSourceElement(video: {
    url: SafeResourceUrl;
    extension: string;
  }): void {
    if (this.sourceTemplate) {
      this.mediaContainer?.clear();
      this.mediaContainer?.createEmbeddedView(this.sourceTemplate, {
        $implicit: video.url,
        extension: video.extension,
      });
    }
  }

  onPlayerReady(api: VgApiService) {
    this.videoApi = api;

    this.videoApi.getDefaultMedia().subscriptions.ended.subscribe(() => {
      if (this.videoApi) {
        this.videoApi.getDefaultMedia().currentTime = 0;
      }
    });
  }

  async onFileOpen(): Promise<void> {
    await this._fileManagerService.openFilePicker();
  }
}
