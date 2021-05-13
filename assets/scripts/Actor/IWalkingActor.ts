import DIRECTION from "./DIRECTION";

export interface IWalkingActor {
  move(direction: DIRECTION): void;
}