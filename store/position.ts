export const CREATE_POSITION = "position/CREATE_POSITION";

interface CreatePositionParams {
  latitude: number | null;
  longitude: number | null;
}

interface CreatePositionAction {
  type: typeof CREATE_POSITION;
  payload: CreatePositionParams;
}

export type PositionActionType = CreatePositionAction;

export interface PositionState {
  latitude: number | null;
  longitude: number | null;
}

const initialState: PositionState = {
  latitude: null,
  longitude: null,
};

export function positionReducer(
  state = initialState,
  action: PositionActionType
): PositionState {
  switch (action.type) {
    case CREATE_POSITION:
      return {
        latitude: action.payload.latitude,
        longitude: action.payload.longitude,
      };
    default:
      return state;
  }
}

export function createPosition(latitude: number | null, longitude: number | null): CreatePositionAction {
  return {
    type: CREATE_POSITION,
    payload: {
      latitude,
      longitude,
    },
  };
}
