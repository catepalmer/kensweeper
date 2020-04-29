import { all, put, select, takeEvery } from 'redux-saga/effects';
import actions from '../actions/actions';
import checkIfPlayed from '../utilities/checkIfPlayed';
import getMinesTouching from '../utilities/getMinesTouching';
import getSquaresTouching from '../utilities/getSquaresTouching';

type Action = {
	type: string;
	payload: {
		index?: number;
		mines?: number[];
	};
};

function* clickSurroundingSquares(action: Action) {
	const { mines, moves, board } = yield select();
	const index = action.payload.index;
	const { boardSize } = board;
	const minesTouching = getMinesTouching(index, mines, boardSize);
	const squaresTouchingArray = getSquaresTouching(index, boardSize);

	if (minesTouching && minesTouching > 0) return;

	if (squaresTouchingArray) {
		const squaresToReveal = squaresTouchingArray.filter((square) => {
			if (square !== undefined && square < board.numSquares) {
				return !checkIfPlayed(square, moves);
			}
		});

		const squaresToRevealActions = squaresToReveal.map((square) => {
			if (square !== undefined) {
				return put(actions.clickSquare(square));
			}
		});

		yield all(squaresToRevealActions);
	}
}

export default function* clickSurroundingSquaresSaga() {
	yield takeEvery('CLICK_SQUARE', clickSurroundingSquares);
}
