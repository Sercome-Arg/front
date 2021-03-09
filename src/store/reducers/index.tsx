import { combineReducers } from 'redux';

import apiWork from './apiWorkReducer';
import loginReducer from './login'
import modalReducer from './modalReducer'
import drawerReducer from './drawerReducer'
import registerReducer from './registerReducer'
import solicitudDeValidacionReducer from './solicitudDeValidacionReducer'
import requestReducer from './requestReducer'
import presupuestoReducer from './presupuestoReducer'
import itemReducer from './itemReducer'
import unidadDeMedidaReducer from './unidadDeMedidaReducer'
import ubicacionReducer from './ubicacionReducer'
import fileReducer from './fileReducer'
import empresaReducer from './empresaReducer'
import actividadEconomicaReducer from './actividadEconomicaReducer'
import languageReducer from './languageReducer'
import proposalReducer from './proposalReducer'
import profileReducer from './profileReducer'
import mercadoPagoReducer from './mercadoPagoReducer'
import subscriptionReducer from './subscriptionReducer'
import paymentReducer from './paymentReducer'
import userReducer from './userReducer'
import courseReducer from './courseReducer'
import studentReducer from './studentReducer'
import appReducer from './appReducer'
import linkReducer from './linkReducer'
import permissionReducer from './permissionReducer'
import examReducer from './examReducer'
import questionReducer from './questionReducer'
import questionTypeReducer from './questionTypeReducer'
import quizReducer from './quizReducer'
import QuestionQuizReducer from './quizReducer'

export default combineReducers({
    apiWork,
    loginReducer,
    modalReducer,
    drawerReducer,
    registerReducer,
    solicitudDeValidacionReducer,
    requestReducer,
    presupuestoReducer,
    itemReducer,
    unidadDeMedidaReducer,
    ubicacionReducer,
    fileReducer,
    empresaReducer,
    actividadEconomicaReducer,
    languageReducer,
    proposalReducer,
    profileReducer,
    mercadoPagoReducer,
    subscriptionReducer,
    paymentReducer,
    userReducer,
    courseReducer,
    studentReducer,
    appReducer,
    linkReducer,
    permissionReducer,
    examReducer,
    questionReducer,
    questionTypeReducer,
    quizReducer,
    QuestionQuizReducer
    
})