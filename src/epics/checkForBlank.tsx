import {
    ActionsObservable,
    Epic,
    StateObservable,
    ofType,
} from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import { ObservableInput, of } from 'rxjs';
import { Action, AppState } from '../reducers/index';

import actions from '../actions/actions';
import { CLICK_SQUARE } from '../actions/actionTypes';
import checkIfPlayed from '../utilities/checkIfPlayed';
import getMinesTouching from '../utilities/getMinesTouching';
import getSquaresTouching from '../utilities/getSquaresTouching';

const checkForBlankEpic: Epic = (
    action$: ActionsObservable<Action>,
    state$: StateObservable<AppState>
) => {
    return action$.pipe(
        ofType(CLICK_SQUARE),
        mergeMap(
            (action: Action): ObservableInput<any> => {
                const index = action.payload.index;
                if (state$) {
                    const mines = state$.value.mines;
                    const minesTouching = getMinesTouching(index, mines);

                    if (minesTouching && minesTouching > 0) {
                        return of();
                    }

                    const moves = state$.value.moves;
                    const squaresTouchingArray = getSquaresTouching(index);
                    if (squaresTouchingArray) {
                        const squaresToReveal = squaresTouchingArray.filter(
                            square => {
                                return !checkIfPlayed(square, moves);
                            }
                        );
                        squaresToReveal.forEach(square => {
                            return of(actions.clickSquare(square));
                        });
                    }
                }
                return of();
            }
        )
    );
};

export default checkForBlankEpic;
