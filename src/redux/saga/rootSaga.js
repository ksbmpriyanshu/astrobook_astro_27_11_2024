import { all } from "redux-saga/effects";
import settingSaga from "./settingSaga";
import authSaga from "./authSaga";
import liveSaga from "./liveSaga";
import chatSaga from "./chatSaga";
import historySaga from "./historySaga";
import kundliSaga from "./kundliSaga";
import astromallSaga from "./astromallSaga";

export default function* rootSaga() {
    yield all([
        authSaga(),
        settingSaga(),
        liveSaga(),
        chatSaga(),
        historySaga(),
        kundliSaga(),
        astromallSaga()
    ]);
}
