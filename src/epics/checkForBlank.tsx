import { ActionsObservable } from 'redux-observable';
import { mergeMap } from 'rxjs/operators';
import 'rxjs/add/operator/mergeMap'
import { ObservableInput, of } from 'rxjs';
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux';
import { Action, AppState } from '../reducers/index';

import actions from '../actions/actions';
import { CLICK_SQUARE } from '../actions/actionTypes';
import checkIfPlayed from '../utilities/checkIfPlayed';
import getMinesTouching from '../utilities/getMinesTouching';
import getSquaresTouching from '../utilities/getSquaresTouching';

const checkForBlankEpic = (action$: ActionsObservable<Action>) => {
    console.log(`in checkForBlank epic`)
    return action$.ofType(CLICK_SQUARE).pipe(mergeMap((action): ObservableInput<any> => {
        const index = action.payload.index;
        const useSelector: TypedUseSelectorHook<AppState> = useReduxSelector;
        const state = useSelector(state => state);
        if (state) {
            const mines = state.mines;
            const minesTouching = getMinesTouching(index, mines);

            if (minesTouching && minesTouching > 0) {
                return of();
            }

            const moves = state.moves;
            const squaresTouchingArray = getSquaresTouching(index);
            if (squaresTouchingArray) {
                const squaresToReveal = squaresTouchingArray.filter(square => {
                    return (!checkIfPlayed(square, moves));
                })
    
                squaresToReveal.forEach(square => {
                    return of(actions.clickSquare(square));
                })
            }
        }
        return of();
    }))
}

export default checkForBlankEpic;
