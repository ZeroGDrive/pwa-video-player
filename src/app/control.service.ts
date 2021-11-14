import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ControlService {
  private readonly _currentVideoSubject$ = new BehaviorSubject<string | null>(
    null
  );
  readonly currentVideo$ = this._currentVideoSubject$.asObservable();

  private readonly _videoExtensionSubject$ = new BehaviorSubject<string | null>(
    null
  );
  readonly videoExtension$ = this._videoExtensionSubject$.asObservable();

  constructor() {}

  setCurrentVideo(videoFile: string) {
    this._currentVideoSubject$.next(videoFile);
  }

  setVideoExtension(extension: string) {
    this._videoExtensionSubject$.next(extension);
  }
}
