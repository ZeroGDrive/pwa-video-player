import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { filter, map } from 'rxjs/operators';
import { ControlService } from '../control.service';

@Component({
  selector: 'app-video-player',
  templateUrl: './video-player.component.html',
  styleUrls: ['./video-player.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VideoPlayerComponent {
  currentSrc$ = this._controlService.currentVideo$.pipe(
    filter((url) => url !== null),
    map((videoUrl) =>
      this._sanitizer.bypassSecurityTrustResourceUrl(videoUrl as string)
    )
  );
  videoExtension$ = this._controlService.videoExtension$;
  constructor(
    private readonly _controlService: ControlService,
    private readonly _sanitizer: DomSanitizer
  ) {}
}
