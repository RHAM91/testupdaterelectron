<template>
    <b-container fluid style="max-width: 1100px;">
        <form @submit.prevent="guardarODT">
            <b-row>
                <b-col sm="12" md="2" class="mt-3">
                    <b-button type="button" size="sm" variant="info" block @click="BuscarPacienteModal">Buscar paciente</b-button>
                </b-col>
                <b-col sm="12" md="10"  class="mt-3">
                    <table class="table table-sm table-bordered table-descripcion">
                        <tr>
                            <td>
                                Paciente
                            </td>
                            <td>
                                {{nombrePaciente}}
                            </td>
                            <td>
                                Edad
                            </td>
                            <td>
                                {{edad}} años
                            </td>
                        </tr>
                    </table>
                </b-col>
                <b-col sm="12" md="6" class="mt-3">
                    <label>Precio del producto?</label>
                    <b-form-input type="number" v-model="precio" step="0.01" id="Precio" size="sm" required="required" placeholder="Q." autocomplete="off"></b-form-input>
                </b-col>
                <b-col sm="12" md="6" class="mt-3">
                    <label>Abono</label>
                    <b-form-input type="number" v-model="abono" step="0.01" id="Abono" size="sm" required="required" placeholder="Q." autocomplete="off"></b-form-input>
                </b-col>
                <b-col sm="12" md="6" class="mt-3">
                    <label>Donación?</label>
                    <select class="form-control form-control-sm" v-model="donacion" required>
                        <option value="true">Si</option>
                        <option value="false">No</option>
                    </select>
                </b-col>
                <b-col sm="12" md="6" class="mt-3">
                    <label>Color</label>
                    <b-form-input type="text" id="codeTransfer" v-model="codeTransfer" size="sm" required="required" placeholder="F2 para buscar" @keydown.113="setearModal" autocomplete="off"></b-form-input>
                </b-col>
                <b-col sm="12" md="6" class="mt-3">
                    <label>Operador</label>
                    <select class="form-control form-control-sm" v-model="operador" required>
                        <option value="">Seleccionar</option>
                        <option v-for="(item, index) in operarios" :key="index" :value="item.nombre">{{item.nombre}}</option>
                    </select>
                </b-col>
                <b-col sm="12" md="6" class="mt-3">
                    <label>Departamento</label>
                    <select class="form-control form-control-sm" v-model="departamento" required>
                        <option value="">Seleccionar</option>
                        <option v-for="(item, index) in departamentos" :key="index" :value="item.departamento">{{item.departamento}}</option>
                    </select>
                </b-col>
                <b-col sm="12" class="mt-5">
                    <select class="form-control form-control-sm" v-model="seleccion" @change="seleccionaAparato">
                        <option value="">Seleccionar aparato</option>
                        <option v-for="(item, index) in aparatos" :key="index" :value="item._id">{{item.aparato}}</option>
                    </select>
                </b-col>
                <b-col sm="12" class="mt-4">
                    <div class="botonera">
                        <b-button type="button" class="space-btn" v-for="(item, index) in nBotones" :key="index" size="sm" variant="warning" @click="mostrarElementos(item._id)">{{item.formula}}</b-button>
                    </div>
                </b-col>
                <b-col sm="12" class="mt-4">
                    <label>Descripción de la orden</label>
                   <b-form-textarea
                        id="textarea-default"
                        placeholder="Descripción"
                        v-model="descripcion"
                        required
                        rows="8"
                    ></b-form-textarea>
                </b-col>
                <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
                   <b-button type="submit" variant="success" size="sm">Ingresar orden</b-button>
                </b-col>
            </b-row>
        </form>

        <BuscarPaciente v-if="modalBuscarPaciente" v-on:cmodalbp="BuscarPacienteModal" v-on:pacienteseleccionado="pacienteamostrar" />
        <ElegirTransfer v-if="modalTransfer" v-on:cerrar_transfer="setearModal" v-on:transfer_seleccionado="set_transfer"/>
        <SeleccionaElemento v-if="modalElementos" :el="setElemento" v-on:cModalSetElemento="closeModal" v-on:opciones="setOptions" />

    </b-container>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import moment from 'moment'

import BuscarPaciente from './BuscarPaciente.vue'
import ElegirTransfer from './ElegirTransfer.vue'
import SeleccionaElemento from './ModalSeleccionaElementos.vue'

export default {
    components:{
        BuscarPaciente,
        ElegirTransfer,
        SeleccionaElemento
    },
    computed: {
        ...mapState(['operarios', 'departamentos', 'aparatos', 'formulas'])
    },
    data() {
        return {
            seleccion: '',
            Odtcarrito: [],
            nBotones: [],
            setElemento: '',

            modalBuscarPaciente: false,
            modalTransfer: false,
            modalElementos: false,


            nombrePaciente: '',
            edad: '',
            genero: '',
            PID: '',
            precio: '',
            abono: '',
            donacion: 'false',
            codeTransfer: '',
            operador: '',
            departamento: '',
            descripcion: ''

        }
    },
    methods: {
        BuscarPacienteModal(){
            this.modalBuscarPaciente = !this.modalBuscarPaciente
        },
        pacienteamostrar(paciente){
            this.nombrePaciente = paciente[0].nombre
            this.genero = paciente[0].genero
            
            let age =  moment(Date.now()).format('YYYY') - moment(paciente[0].fechaNacimiento).format('YYYY')
            this.edad = age

            this.PID = paciente[0]._id


            document.getElementById('Precio').focus()
        },
        async guardarODT(){
            let data = {
                api: 'odt',
                formulario:{
                    pid: this.PID,
                    nombre: this.nombrePaciente,
                    edad: this.edad,
                    fecha: moment(Date.now()).format('YYYY-MM-DD'),
                    genero: this.genero,
                    precio: this.precio,
                    abono: this.abono,
                    donacion: this.donacion,
                    transfer: this.codeTransfer,
                    operador: this.operador,
                    departamento: this.departamento.toLowerCase(),
                    aparato: this.aparato,
                    descripcion: this.descripcion

                }
            }

            await this.insert_data(data)
            await this.wse(this.$store.state.rutas.odts)
            await this.wse(this.$store.state.rutas.pacientes)

            this.nombrePaciente = ''
            this.edad = ''
            this.genero = ''
            this.PID = ''
            this.precio = ''
            this.abono = ''
            this.donacion = 'false'
            this.codeTransfer = ''
            this.operador = ''
            this.aparato = ''
            this.descripcion = ''
        },
        seleccionaAparato(){

            this.Odtcarrito = []

            // convierto el id por el nombre del aparato para ingresarlo al array y poder leerlo

            const aparatos = this.aparatos.filter(aparato => aparato._id == this.seleccion)

            // hago la lista de botones segun el aparato que se seleccionó

            const botones = this.formulas.filter(formula => formula.IDAparato.includes(this.seleccion))
            this.nBotones = botones

        },
        mostrarElementos(id){
            this.setElemento = id
            this.modalElementos = true
        },
        setearModal(){
            this.modalTransfer = !this.modalTransfer
        },
        closeModal(){
            this.modalElementos = false
        },
        setOptions(opciones){

            this.descripcion = this.descripcion + opciones

        },
        set_transfer(transfer){
            this.codeTransfer = transfer
            document.getElementById('codeTransfer').focus()
        },
        ...mapActions(['wse', 'insert_data'])
    },
}
</script>

<style scoped>
    .table-descripcion{
        width: 100%;
    }

    .space-btn{
        margin-right: 10px;
        margin-bottom: 10px;
    }
</style>