export interface GameplayHistory {
  timeStamp: Date;
  action: string;
}

export enum selectedAction {
  'All',
  'Game Started',
  'Game Paused',
  'Game Resumed',
  'Game Ended',
  'Turbo On',
  'Turbo Off',
  'Car Overtaken',
  'Action Left',
  'Action Right',
}

export interface Score {
  name: string;
  score: number;
}

export interface ResponseData {
  success: boolean;
}
