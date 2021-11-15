import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export type Video = {
  url: string;
  extension: string;
};
@Injectable({
  providedIn: 'root',
})
export class ControlService {
  private readonly _currentVideoSubject$ = new BehaviorSubject<Video | null>(
    null
  );
  readonly currentVideo$ = this._currentVideoSubject$.asObservable();

  constructor() {}

  setCurrentVideo(videoFile: Video | null) {
    this._currentVideoSubject$.next(videoFile);
  }
}
