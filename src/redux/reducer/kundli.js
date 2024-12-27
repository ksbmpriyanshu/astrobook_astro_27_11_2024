import * as actionTypes from '../actionTypes'

const initialState = {
    kundliPayloads: null,
    birthDetailsData: null,
    chartData: null,
    basicDetails: null,
    planetData: null,
    kpPlanetData: null,
    kpHouseCupsData: null,
    dashaVisible: 'MAJOR',
    dashaPath: '',
    majorDashaData: null,
    subVDashaData: null,
    subSubVDashaData: null,
    subSubSubVDashaData: null,
    subSubSubSubVDashaData: null,
    houseReportData: null,
    kundliRashiReport: null,
    AshtakvargaReport: null,
    SarvaReport: null,
    AscedentReport: null,
    Panchang: null,
}

const kundli = (state = initialState, actions) => {
    const { type, payload } = actions;
    switch (type) {
        case actionTypes.SET_KUNDLI_PAYLOADS:
            return {
                ...state,
                kundliPayloads: payload
            }
        case actionTypes.RESET_KUNDLI_DATA:
            return {
                ...initialState,
                kundliListData: state.kundliListData,
                maleKundliData: state.maleKundliData,
                femaleKundliData: state.femaleKundliData,
                matchingAshtakootPointsData: state.matchingAshtakootPointsData
            }
        case actionTypes.SET_KUNDLI_BIRTH_DETAILS:
            return {
                ...state,
                birthDetailsData: payload
            }
        case actionTypes.SET_KUNDLI_CHARTS:
            return {
                ...state,
                chartData: payload
            }
        case actionTypes.SET_KUNDLI_BASIC_DETAILS:
            return {
                ...state,
                basicDetails: payload
            }
        case actionTypes.SET_PLANET_DATA:
            return {
                ...state,
                planetData: payload
            }
        case actionTypes.SET_KP_PLANET_DATA:
            return {
                ...state,
                kpPlanetData: payload
            }
        case actionTypes.SET_KP_HOUSE_CUPS_DATA:
            return {
                ...state,
                kpHouseCupsData: payload
            }
        case actionTypes.SET_KUNDLI_MAJOR_DASHA:
            return {
                ...state,
                majorDashaData: payload
            }
        case actionTypes.SET_KUNDLI_DAHSA_VISIBLE:
            return {
                ...state,
                dashaVisible: payload,
            }
        case actionTypes.SET_KUNDLI_DASHA_PATH:
            return {
                ...state,
                dashaPath: payload,
            }
        case actionTypes.SET_KUNDLI_SUB_V_DASHA:
            return {
                ...state,
                dashaVisible: 'ANTAR',
                subVDashaData: payload
            }
        case actionTypes.SET_KUNDLI_SUB_SUB_V_DASHA:
            return {
                ...state,
                dashaVisible: 'PRATYANTAR',
                subSubVDashaData: payload
            }
        case actionTypes.SET_KUNDLI_SUB_SUB_SUB_V_DASHA:
            return {
                ...state,
                dashaVisible: 'SOOKSHMA',
                subSubSubVDashaData: payload
            }
        case actionTypes.SET_KUNDLI_SUB_SUB_SUB_SUB_V_DASHA:
            return {
                ...state,
                dashaVisible: 'PRAN',
                subSubSubSubVDashaData: payload
            }
        case actionTypes.SET_HOUSE_REPORTS:
            return {
                ...state,
                houseReportData: payload
            }

        case actionTypes.SET_RASHI_REPORTS:
            return {
                ...state,
                kundliRashiReport: payload
            }
        case actionTypes.SET_ASTAK_REPORTS:
            return {
                ...state,
                AshtakvargaReport: payload
            }
        case actionTypes.SET_SARVA_REPORTS:
            return {
                ...state,
                SarvaReport: payload
            }
        case actionTypes.SET_ASCEDENT_REPORTS:
            return {
                ...state,
                AscedentReport: payload
            }
        case actionTypes.SET_BASIC_PANCHANGE:
            return {
                ...state,
                Panchang: payload
            }
        default: {
            return state;
        }
    }
}

export default kundli;