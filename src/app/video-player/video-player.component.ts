import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { VgApiService } from '@videogular/ngx-videogular/core';
import { map } from 'rxjs/operators';
import { ControlService } from '../control.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent {
  readonly currentVideo$ = this._controlService.currentVideo$.pipe(
    map((video) => {
      if (video) {
        return {
          url: this._sanitizer.bypassSecurityTrustResourceUrl(video!.url),
          extension: video!.extension,
        };
      }
      return null;
    })
  );

  videoApi: VgApiService | null = null;

  constructor(
    private readonly _controlService: ControlService,
    private readonly _sanitizer: DomSanitizer
  ) {}

  onPlayerReady(api: VgApiService) {
    this.videoApi = api;

    this.videoApi.getDefaultMedia().subscriptions.ended.subscribe(() => {
      if (this.videoApi) {
        this.videoApi.getDefaultMedia().currentTime = 0;
        this._controlService.setCurrentVideo(null);
      }
    });
  }
}
