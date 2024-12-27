import { call, put, select, takeLeading } from 'redux-saga/effects'
import * as actionTypes from '../actionTypes'
import { showToastMessage } from '../../utils/services'
import { navigate, replace } from '../../navigations/NavigationServices'

import moment from 'moment'
import { kundliRequest } from '../../utils/apiRequests'

function* getKundliData(actions) {
    try {
        const { payload } = actions
        const profileData = yield select(state=>state.chat.profileData)

        const basicData = {
            name: profileData?.firstName + ' ' + profileData?.lastName,
            gender: profileData?.gender,
            dob: profileData?.dateOfBirth,
            tob: profileData?.timeOfBirth,
            place: profileData?.placeOfBirth,
            lat: profileData?.latitude,
            lon: profileData?.longitude,
        }

        const data = {
            day: parseInt(moment(profileData?.dateOfBirth).format('D')),
            month: parseInt(moment(profileData?.dateOfBirth).format('M')),
            year: parseInt(moment(profileData?.dateOfBirth).format('YYYY')),
            hour: parseInt(moment(profileData?.timeOfBirth).format('hh')),
            min: parseInt(moment(profileData?.timeOfBirth).format('mm')),
            lat: profileData?.latitude,
            lon: profileData?.longitude,
            tzone: 5.5,
        }

        yield put({ type: actionTypes.SET_KUNDLI_PAYLOADS, payload: data })
        yield put({ type: actionTypes.SET_KUNDLI_BASIC_DETAILS, payload: basicData })

    } catch (e) {
        console.log(e)
    }
}

function* getPlanetData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
        const planetResponse = yield kundliRequest({
            url: 'https://json.astrologyapi.com/v1/planets',
            data: {
                ...kundliPayloads
            }
        })

        if (planetResponse) {
            yield put({ type: actionTypes.SET_PLANET_DATA, payload: planetResponse })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKpPlanetData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
        console.log('data =>',{
            ...kundliPayloads,
            horary_number:2
        })
        const response = yield kundliRequest({
            url: 'https://json.astrologyapi.com/v1/kp_horary',
            data: {
                ...kundliPayloads,
                horary_number:2
            }
        })

        if (response) {
            yield put({ type: actionTypes.SET_KP_PLANET_DATA, payload: response })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKpHouseCupsData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

        const response = yield kundliRequest({
            url: 'https://json.astrologyapi.com/v1/kp_horary',
            data: {
                ...kundliPayloads,
                horary_number:2
                
            }
        })

        if (response) {
            yield put({ type: actionTypes.SET_KP_HOUSE_CUPS_DATA, payload: response })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliChart(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
        const  url = `https://json.astrologyapi.com/v1/horo_chart/${payload}`
        console.log(url,kundliPayloads,'kundli url')
        const chartResponse = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/horo_chart/${payload}`,
            data: {
                ...kundliPayloads
            }
        })

        console.log(chartResponse,'chart datta astro')
        if (chartResponse) {
            yield put({ type: actionTypes.SET_KUNDLI_CHARTS, payload: chartResponse })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliBirthDetails(actions) {
    try {
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/birth_details`,
            data: {
                ...kundliPayloads
            }
        })

        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_BIRTH_DETAILS, payload: response })
        }


        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })

    } catch (e) {
        console.log(e)
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliMajorDasha(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/major_vdasha`,
            data: {
                ...kundliPayloads
            }
        })

        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_MAJOR_DASHA, payload: response })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliSubVDasha(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/sub_vdasha/${payload}`,
            data: {
                ...kundliPayloads
            }
        })

        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_DASHA_PATH, payload: `${payload}/` })
            yield put({ type: actionTypes.SET_KUNDLI_SUB_V_DASHA, payload: response })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliSubSubVDasha(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
        const dashaPath = yield select(state => state.kundli.dashaPath)
        console.log(dashaPath)
        console.log(`https://json.astrologyapi.com/v1/sub_sub_vdasha/${dashaPath}${payload}`)
        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/sub_sub_vdasha/${dashaPath}${payload}`,
            data: {
                ...kundliPayloads
            }
        })

        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_DASHA_PATH, payload: `${dashaPath}${payload}/` })
            yield put({ type: actionTypes.SET_KUNDLI_SUB_SUB_V_DASHA, payload: response })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliSubSubSubVDasha(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
        const dashaPath = yield select(state => state.kundli.dashaPath)
        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/sub_sub_sub/vdasha/${dashaPath}${payload}`,
            data: {
                ...kundliPayloads
            }
        })

        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_DASHA_PATH, payload: `${dashaPath}${payload}` })
            yield put({ type: actionTypes.SET_KUNDLI_SUB_SUB_SUB_V_DASHA, payload: response })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliSubSubSubSubVDasha(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
        const dashaPath = yield select(state => state.kundli.dashaPath)
        console.log(dashaPath)
        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/sub_sub_sub_sub/vdasha/${dashaPath}${payload}`,
            data: {
                ...kundliPayloads
            }
        })

        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_DASHA_PATH, payload: `${dashaPath}${payload}` })
            yield put({ type: actionTypes.SET_KUNDLI_SUB_SUB_SUB_SUB_V_DASHA, payload: response })
        }

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliHouseReports(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

        const sunReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_house_report/sun`,
            data: {
                ...kundliPayloads
            }
        })

        const moonReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_house_report/moon`,
            data: {
                ...kundliPayloads
            }
        })

        const mercuryReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_house_report/mercury`,
            data: {
                ...kundliPayloads
            }
        })

        const marsReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_house_report/mars`,
            data: {
                ...kundliPayloads
            }
        })
        const venusReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_house_report/venus`,
            data: {
                ...kundliPayloads
            }
        })

        const saturnReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_house_report/saturn`,
            data: {
                ...kundliPayloads
            }
        })
        const jupiterReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_house_report/jupiter`,
            data: {
                ...kundliPayloads
            }
        })


        const data = {
            sunReports,
            moonReports,
            mercuryReports,
            marsReports,
            saturnReports,
            venusReports,
            jupiterReports
        }

        yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* getKundliMatchingReport(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })

        console.log(payload)

        const response = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/match_ashtakoot_points`,
            data: {
                ...payload
            }
        })

        if (response) {
            yield put({ type: actionTypes.SET_KUNDLI_MATCHING_ASHTAKOOT_POINTS, payload: response })
            yield call(navigate, 'kundliMatch')
        }

        // yield put({ type: actionTypes.SET_HOUSE_REPORTS, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* RashiReportData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

       

        const moonReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_rashi_report/moon`,
            data: {
                ...kundliPayloads
            }
        })

        const mercuryReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_rashi_report/mercury`,
            data: {
                ...kundliPayloads
            }
        })

        const marsReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_rashi_report/mars`,
            data: {
                ...kundliPayloads
            }
        })
        const venusReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_rashi_report/venus`,
            data: {
                ...kundliPayloads
            }
        })

        const saturnReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_rashi_report/saturn`,
            data: {
                ...kundliPayloads
            }
        })
        const jupiterReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_rashi_report/jupiter`,
            data: {
                ...kundliPayloads
            }
        })


        const data = {
            moonReports,
            mercuryReports,
            marsReports,
            saturnReports,
            venusReports,
            jupiterReports
        }

        yield put({ type: actionTypes.SET_RASHI_REPORTS, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* AstakVargaData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)

        console.log(kundliPayloads)

        const ascendantReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak/ascendant`,
            data: {
                ...kundliPayloads
            }
        })

        const sunReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak/sun`,
            data: {
                ...kundliPayloads
            }
        })

        const moonReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak/moon`,
            data: {
                ...kundliPayloads
            }
        })

        const mercuryReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak/mercury`,
            data: {
                ...kundliPayloads
            }
        })

        const marsReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak/mars`,
            data: {
                ...kundliPayloads
            }
        })
        const venusReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak/venus`,
            data: {
                ...kundliPayloads
            }
        })

        const saturnReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak/saturn`,
            data: {
                ...kundliPayloads
            }
        })
        const jupiterReports = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak/jupiter`,
            data: {
                ...kundliPayloads
            }
        })

        const ascendantchart = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak_image/ascendant`,
            data: {
                ...kundliPayloads
            }
        })

        const sunchart = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak_image/sun`,
            data: {
                ...kundliPayloads
            }
        })

        const moonchart = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak_image/moon`,
            data: {
                ...kundliPayloads
            }
        })

        const mercurychart = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak_image/mercury`,
            data: {
                ...kundliPayloads
            }
        })

        const marschart = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak_image/mars`,
            data: {
                ...kundliPayloads
            }
        })
        const venuschart = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak_image/venus`,
            data: {
                ...kundliPayloads
            }
        })

        const saturnchart = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak_image/saturn`,
            data: {
                ...kundliPayloads
            }
        })
        const jupiterchart = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/planet_ashtak_image/jupiter`,
            data: {
                ...kundliPayloads
            }
        })


        const data = {
            sunReports,
            ascendantReports,
            moonReports,
            mercuryReports,
            marsReports,
            saturnReports,
            venusReports,
            jupiterReports,           
            sunchart,
            ascendantchart,
            moonchart,
            mercurychart,
            marschart,
            saturnchart,
            venuschart,
            jupiterchart,

        }

        yield put({ type: actionTypes.SET_ASTAK_REPORTS, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

function* SarVargaData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
        console.log('adfas',kundliPayloads)
        const sarvashtak = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/sarvashtak`,
            data: {
                ...kundliPayloads
            }
        })
        const sarvashtakchart = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/sarvashtak_image`,
            data: {
                ...kundliPayloads
            }
        })

        

        const data = {
           sarvashtak,
           sarvashtakchart
        }

        yield put({ type: actionTypes.SET_SARVA_REPORTS, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
function* BasicPanchangData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
        console.log('adfas',kundliPayloads)
        const Panchang = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/basic_panchang`,
            data: {
                ...kundliPayloads
            }
        })

        

        const data = {
            Panchang
        }

        yield put({ type: actionTypes.SET_BASIC_PANCHANGE, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}
function* AscendantData(actions) {
    try {
        const { payload } = actions
        yield put({ type: actionTypes.SET_IS_LOADING, payload: true })
        const kundliPayloads = yield select(state => state.kundli.kundliPayloads)
        console.log('adfas',kundliPayloads)
        const AscedentReport = yield kundliRequest({
            url: `https://json.astrologyapi.com/v1/general_ascendant_report`,
            data: {
                ...kundliPayloads
            }
        })

        

        const data = {
           AscedentReport
        }

        yield put({ type: actionTypes.SET_ASCEDENT_REPORTS, payload: data })

        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    } catch (e) {
        console.log(e, 'hi')
        yield put({ type: actionTypes.SET_IS_LOADING, payload: false })
    }
}

export default function* kundliSaga() {
    yield takeLeading(actionTypes.GET_KUNDLI_DATA, getKundliData)
    yield takeLeading(actionTypes.GET_KUNDLI_BIRTH_DETAILS, getKundliBirthDetails)
    yield takeLeading(actionTypes.GET_PLANET_DATA, getPlanetData)
    yield takeLeading(actionTypes.GET_KP_PLANET_DATA, getKpPlanetData)
    yield takeLeading(actionTypes.GET_KP_HOUSE_CUPS_DATA, getKpHouseCupsData)
    yield takeLeading(actionTypes.GET_KUNDLI_CHART_DATA, getKundliChart)
    yield takeLeading(actionTypes.GET_KUNDLI_MAJOR_DASHA, getKundliMajorDasha)
    yield takeLeading(actionTypes.GET_KUNDLI_SUB_V_DASHA, getKundliSubVDasha)
    yield takeLeading(actionTypes.GET_KUNDLI_SUB_SUB_V_DASHA, getKundliSubSubVDasha)
    yield takeLeading(actionTypes.GET_KUNDLI_SUB_SUB_SUB_V_DASHA, getKundliSubSubSubVDasha)
    yield takeLeading(actionTypes.GET_KUNDLI_SUB_SUB_SUB_SUB_V_DASHA, getKundliSubSubSubSubVDasha)
    yield takeLeading(actionTypes.GET_HOUSE_REPORTS, getKundliHouseReports)
    yield takeLeading(actionTypes.GET_RASHI_REPORTS, RashiReportData);
    yield takeLeading(actionTypes.GET_ASTAK_REPORTS, AstakVargaData);
    yield takeLeading(actionTypes.GET_SARVA_REPORTS, SarVargaData);
    yield takeLeading(actionTypes.GET_ASCEDENT_REPORTS, AscendantData);
    yield takeLeading(actionTypes.GET_BASIC_PANCHANGE,BasicPanchangData);
}