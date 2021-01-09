import Vue from 'vue'
import Vuex from 'vuex'
import { IP, PUERTO } from '../config/parametros'
import axios from 'axios'
import VuexPersist from 'vuex-persist'
import { minix } from '../components/functions/alertas'
// import socket from '../config/sockets_config'

Vue.use(Vuex)

const vuexPersist = new VuexPersist({
  key: 'kat',
  storage: window.localStorage,
  reducer: state => ({

    token: state.token,
    permisos: state.permisos,
    t2: state.t2
    //instituciones: state.instituciones
  }) 
})

// FUNCIONES AUXILIARES

// -> Función para eliminar acentos y poder hacer la búsqueda correctamente

function filtrar_acentos(input){
    var acentos = "ÃÀÁÄÂÈÉËÊÌÍÏÎÒÓÖÔÙÚÜÛãàáäâèéëêìíïîòóöôùúüûÑñÇç";
    var original = "AAAAAEEEEIIIIOOOOUUUUaaaaaeeeeiiiioooouuuunncc";
    for (var i = 0; i < acentos.length; i++) {
        input = input.replace(acentos.charAt(i), original.charAt(i)).toLowerCase();
    };
    return input;
}

export default new Vuex.Store({
  state: {
    token: '',
    t2:'',
    loading: false,

    permisos:[],
    instituciones:[],
    pacientes: [],
    medicos: [],
    departamentos: [],
    operarios: [],
    aparatos: [],
    transfers: [],
    odts:[],
    formulas: [],
    formulaElementos: [],

    rutas: {
        instituciones: {api: 'instituciones', estado: 'set_instituciones'},
        medicos: {api: 'medicos', estado: 'set_medicos'},
        pacientes: {api: 'pacientes', estado: 'set_pacientes'},
        departamentos: {api: 'departamentos', estado: 'set_departamentos'},
        operarios: {api: 'operarios', estado: 'set_operarios'},
        aparatos: {api: 'aparatos', estado: 'set_aparatos'},
        transfers: {api: 'transfers', estado: 'set_transfers'},
        odts: {api: 'odt/etapa/todo', estado: 'set_odts'},
        formulas: {api: 'formulas', estado: 'set_formulas'},
        formulaElementos: {api: 'formulaElementos', estado: 'set_formulaElementos'},
    },

    filterPacientes: {
        query: '',
        nocliente: '',
        filter_revision: '',
        filter_produccion: '',
        filter_odts: ''
    }

  },
  mutations: {
    set_token(state, token){
        let token_formateado = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        state.token = token_formateado
    },
    set_loading(state, data){
        state.loading = data
    },
    set_t2(state, token){
        state.t2 = token
    },
    set_permisos(state, data){
        state.permisos = data
    },
    set_instituciones(state, data){
        state.instituciones = data
    },
    set_pacientes(state, data){
        state.pacientes = data
    },
    set_medicos(state, data){
        state.medicos = data
    },
    set_departamentos(state, data){
        state.departamentos = data
    },
    set_operarios(state, data){
        state.operarios = data
    },
    set_querypaciente(state, query){
        state.filterPacientes.query = query
    },
    set_querypacientenocli(state, query){
        state.filterPacientes.nocliente = query
    },
    set_queryodts(state, query){
        state.filterPacientes.filter_odts = query
    },
    set_aparatos(state, data){
        state.aparatos = data
    },
    set_transfers(state, data){
        state.transfers = data
    },
    set_odt(state, data){
        state.odt = data
    },
    set_formulas(state, data){
        state.formulas = data
    },
    set_formulaElementos(state, data){
        state.formulaElementos = data
    },
    set_odts(state, data){
        state.odts = data
    }
  },
  actions: {
    get_token({commit}, data){
        commit('set_token', data)
    },
    async insert_data({commit, state}, data){
      try {
          const r = await axios.post(`http://${IP}:${PUERTO}/api/${data.api}`, data.formulario, state.token)

          if (r.status == 200) {
              minix({icon: 'success', mensaje: r.data.message, tiempo: 3000})
          }else{
              minix({icon: 'info', mensaje: r.status, tiempo: 3000})
          }

          //document.getElementById(`formulario_${data.limpiar}`).reset()

      } catch (e) {
        
          minix({icon: 'error', mensaje: `Al parecer algo salió mal :/ (${e.response.data.e.code})`, tiempo: 3000})
          console.table(e.response.data.e)

      }

    },
    async updateData({state}, data){
        try {
            const resp = await axios.put(`http://${IP}:${PUERTO}/api/${data.api}/${data.id}`, data.formulario, state.token)

            if (resp.status == 200) {
                minix({icon: 'success', mensaje: resp.data.message, tiempo: 3000})
            }else{
                minix({icon: 'info', mensaje: resp.status, tiempo: 3000})
            }

        } catch (e) {
            minix({icon: 'error', mensaje: `Al parecer algo salió mal :/ (${e.response.data.e.code})`, tiempo: 3000})
            console.table(e.response.data.e)
        }
    },
    async deleteData({state}, data){
        try {
            const resp = await axios.delete(`http://${IP}:${PUERTO}/api/${data.api}/${data.id}`, state.token)

            if (resp.status == 200) {

                minix({icon: 'success', mensaje: resp.data.message, tiempo: 3000})
            }else{

                minix({icon: 'info', mensaje: resp.status, tiempo: 3000})
            }

        } catch (e) {
            minix({icon: 'error', mensaje: `Al parecer algo salió mal :/ (${e.response.data.e.code})`, tiempo: 3000})
            console.table(e.response.data.e)
        }
    },
      async getPermisos({commit, state}, data){
          try {
  
              let vistas = {}
  
              for (let i = 0; i < data.rutas.length; i++) {
      
                  let permisoVista = await axios.get(`http://${IP}:${PUERTO}/api/permisos/vistas/${data.rutas[i]}`, state.token)
                  Object.assign(vistas, permisoVista.data)
              }
  
              commit('set_permisos', vistas)
  
          } catch (e) {
  
              console.log(e.response)
              minix({icon: 'error', mensaje: 'Error al obtener los permisos', tiempo: 3000})
          }
      },
      async getDatos({commit, state}, data){
    
          try {
              
              const productos = await axios.get(`http://${IP}:${PUERTO}/api/${data.api}`, state.token)
              commit(data.estado, productos.data)


          } catch (e) {
              console.log(e)            
          }
      },
      async sfile({state}, data){
           
        try {

            const formData = new FormData()
            formData.append('image', data.evento)

            for (let i = 0; i < data.campos.length; i++) {
                const e = data.campos[i];
                
                formData.append(e.campo, e.payload)
            }

            const archivo = await axios.post(`http://${IP}:${PUERTO}/api/${data.api}`, formData, state.token)
            minix({icon: 'success', mensaje: archivo.data.message, tiempo: 3000})

        } catch (e) {
            minix({icon: 'info', mensaje: archivo.status, tiempo: 3000})
        }


      },
      ws({commit, state, dispatch}, socket){ //inicia los canales de escucha
        
        socket.emit('todo', '...')

        socket.on('actualizar', (orden)=>{
            //console.log('Esta es la orden', orden)
            dispatch('getDatos', state.rutas.instituciones)
            dispatch('getDatos', state.rutas.pacientes)
            dispatch('getDatos', state.rutas.medicos)
            dispatch('getDatos', state.rutas.departamentos)
            dispatch('getDatos', state.rutas.operarios)
            dispatch('getDatos', state.rutas.aparatos)
            dispatch('getDatos', state.rutas.transfers)
            dispatch('getDatos', state.rutas.odts)
            dispatch('getDatos', state.rutas.formulas)
            dispatch('getDatos', state.rutas.formulaElementos)
            commit('set_loading', true)
        })

        socket.on('modulo', (data) =>{ // PASO 5: este recibe la instruccion de que modulo debe actualizar segun la necesidad
            dispatch('getDatos', data)
            commit('set_loading', true)
        })


          // FUNCION PARA AGREGAR EL LOADING CUAND DE DESCARGAN LOS DATOS EN LOCAL

    },
      wse({}, modulo){ // PASO 1: recibe el wse del modulo por ejemplo medicos al guardar, recibe los datos de ruta (ver en estate)

        const { enviar } = require('@/config/sockets_config')
        enviar(modulo) // PASO 2: se pasan los datos de la ruta a la funcion enviar para que lo emita al servidor
    },
    
    },
    getters:{
    
    filteredPaciente (state){
        if(state.filterPacientes.query.length > 2){
            
            return state.pacientes.filter(paciente => filtrar_acentos(paciente.nombre.toLowerCase()).includes(state.filterPacientes.query) && paciente.cliente == true)
        }else{

            return state.pacientes.filter(paciente =>  paciente.cliente == true)
        }
    },
    filteredPacienteNoCli (state){
        if(state.filterPacientes.nocliente.length > 2){
            
            return state.pacientes.filter(paciente => filtrar_acentos(paciente.nombre.toLowerCase()).includes(state.filterPacientes.nocliente) && paciente.cliente == false)
        }else{

            return state.pacientes.filter(paciente =>  paciente.cliente == false)
        }
    },
    filteredPacientew (state){

        if(state.filterPacientes.query.length > 2){
            return state.pacientes.filter(paciente => filtrar_acentos(paciente.nombre.toLowerCase()).includes(state.filterPacientes.query))
        }
    },
    filterODTs (state){

        if(state.filterPacientes.filter_odts.length > 2){
            return state.odts.filter(odt => filtrar_acentos(odt.nombre.toLowerCase()).includes(state.filterPacientes.filter_odts) || filtrar_acentos(odt.descripcion.toLowerCase()).includes(state.filterPacientes.filter_odts) || filtrar_acentos(odt.departamento.toLowerCase()).includes(state.filterPacientes.filter_odts) || filtrar_acentos(odt.etapa.toLowerCase()).includes(state.filterPacientes.filter_odts))
        }

        return state.odts
    }
  },
  plugins: [vuexPersist.plugin],
  modules: {
  }
})
