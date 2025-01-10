import { LogScreen, Severity, SimEvent } from './types';

import { INote } from '../note/types';
import { IViewport } from '../viewport/viewport.interface';
import { makeAutoObservable } from 'mobx';

export default class Log {
  public screen: LogScreen = LogScreen.Baseline;
  public event: SimEvent = SimEvent.OnClickAddNote;
  public severity: Severity = Severity.Info;
  public duration: number = 0;
  public userSimulationId: string = '';
  public message: string = 'empty string';
  public userId: string | null = null;
  public viewports: IViewport[] = [];
  public note: INote | null = null;
  public recordId: string = '';

  constructor() {
    makeAutoObservable(this);
  }
}
