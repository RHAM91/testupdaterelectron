<template>
    <div class="contenedor_ficha_paciente">
        
        <div class="cnt">
            <div class="barraTop">
                Ficha de paciente
            </div>
            <div class="cuerpo_modal_ficha_paciente">
                <div class="foto_paciente">
                   <div class="c_foto">
                      <div class="foto_centrar">
                            <div class="ico">
                                <img src="@/assets/user-male.png" style="width: 100%;" alt="">
                            </div>
                            <div class="pie_foto">
                                {{nombre}} <br>
                                {{IDEpaciente}}
                            </div>
                      </div>
                   </div>
                </div>
                <div class="datos_paciente">
                    <b-container>
                        <b-row>
                            <b-col sm="12" class="mt-4">
                                <b-row>
                                    <b-col sm="12">
                                        <div class="titulo_MFP">
                                            Datos del paciente
                                            <div v-if="permisos.pacientes.actualizar" class="ico_editar" @click="mostrarEdicionPaciente">
                                                <i class="fas fa-pen" v-if="editarDatosPaciente == false"></i>
                                                <i class="fas fa-ban" v-else></i>
                                            </div>
                                        </div>
                                        
                                    </b-col>
                                    <b-col sm="12" class="mt-4">
                                        <table style="width: 100%;">
                                            <tr>
                                                <td class="titulob">
                                                    Nombre del paciente:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosPaciente == false">
                                                    {{nombre}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                    <b-form-input type="text" size="sm" required="" v-model="nombre"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Fecha ingreso:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosPaciente == false">
                                                    {{date | formatoFecha}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                    <b-form-input type="date" size="sm" required="" v-model="date"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Género:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosPaciente == false">
                                                    {{genero}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                    <select class="form-control form-control-sm" required v-model="genero">
                                                        <option value="femenino">femenino</option>
                                                        <option value="masculino">masculino</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Fecha de nacimiento:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosPaciente == false">
                                                    {{fechaNacimiento | formatoFecha}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                    <b-form-input type="date" size="sm" required="" v-model="fechaNacimiento"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Edad:
                                                </td>
                                                <td class="tituloc">
                                                    {{fechaNacimiento | edad}} años
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Departamento:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosPaciente == false">
                                                    {{departamento}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                    <select class="form-control form-control-sm" required v-model="departamento">
                                                        <option v-for="(item, index) in departamentos" :key="index" :value="item.departamento">{{item.departamento}}</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Dirección:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosPaciente == false">
                                                    {{direccion}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                    <b-form-input type="text" size="sm" required="" v-model="direccion"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Persona responsable:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosPaciente == false">
                                                    {{personaResponsable}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                    <b-form-input type="text" size="sm" required="" v-model="personaResponsable"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Teléfono:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosPaciente == false">
                                                    {{telefono}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                    <b-form-input type="text" size="sm" required="" v-model="telefono"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Correo electrónico:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosPaciente == false">
                                                    {{correo}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                    <b-form-input type="email" size="sm" required="" v-model="correo"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    NIT:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosPaciente == false">
                                                    {{nit}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                    <b-form-input type="text" size="sm" required="" v-model="nit"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Facebook:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosPaciente == false">
                                                    {{facebook}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                    <b-form-input type="text" size="sm" required="" v-model="facebook"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Expediente:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosPaciente == false">
                                                    {{expedienteTiempo}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                    <select class="form-control form-control-sm" required v-model="expedienteTiempo">
                                                        <option value="Antiguo">Antiguo</option>
                                                        <option value="Nuevo">Nuevo</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr v-if="editarDatosPaciente">
                                                <td class="titulob">
                                                    
                                                </td>
                                                <td style="display: flex;flex-direction: row-reverse;">
                                                    <b-button type="button" size="sm" variant="success" @click="editarDatosPacienteExec">Actualizar</b-button>
                                                </td>
                                            </tr>
                                        </table>
                                    </b-col>


                                    <b-col sm="12" class="mt-3">
                                        <div class="titulo_MFP">
                                            Órden médica y diagnóstico
                                            <div v-if="permisos.pacientes.actualizar" class="ico_editar" @click="mostrarEdicionDiagnostico">
                                                <i class="fas fa-pen" v-if="editarDatosDiagnostico == false"></i>
                                                <i class="fas fa-ban" v-else></i>
                                            </div>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" class="mt-4">
                                        <table style="width: 100%;">
                                            <tr>
                                                <td class="titulob">
                                                    Diagnóstico:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosDiagnostico == false">
                                                    {{diagnostico}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                   <b-form-input type="text" size="sm" required="" v-model="diagnostico"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Institución:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosDiagnostico == false">
                                                    {{institucion}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                   <select class="form-control form-control-sm" required v-model="institucion">
                                                        <option v-for="(item, index) in instituciones" :key="index" :value="item.institucion">{{item.institucion}}</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Médico responsable:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosDiagnostico == false">
                                                    {{medicoResponsable}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                   <select class="form-control form-control-sm" required v-model="medicoResponsable">
                                                        <option v-for="(item, index) in medicos" :key="index" :value="item.nombre">{{item.nombre}}</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Referido por:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosDiagnostico == false">
                                                    {{referido}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                   <b-form-input type="text" size="sm" required="" v-model="referido"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Tipo de trabajo:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosDiagnostico == false">
                                                    {{tipoDeTrabajo}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                   <b-form-input type="text" size="sm" required="" v-model="tipoDeTrabajo"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Historial de ordenes:
                                                </td>
                                                <td class="tituloc">
                                                    <b-button type="button" size="sm" variant="success" @click="ModalDecripcion">Ver</b-button>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Posición:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosDiagnostico == false">
                                                    {{posicion}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                   <select class="form-control form-control-sm" required v-model="posicion">
                                                        <option value="izquierda">Izquierda</option>
                                                        <option value="derecha">Derecha</option>
                                                        <option value="bilateral">Bilateral</option>
                                                    </select>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Fecha primera cita:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosDiagnostico == false">
                                                    {{primeraCita | formatoFecha}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                   <b-form-input type="date" size="sm" required="" v-model="primeraCita"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Atendido por:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosDiagnostico == false">
                                                    {{atendidoPor}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                   <b-form-input type="text" size="sm" required="" v-model="atendidoPor"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Fecha de medidas:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosDiagnostico == false">
                                                    {{fechaDeMedidas | formatoFecha}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                   <b-form-input type="date" size="sm" required="" v-model="fechaDeMedidas"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Efectuadas por:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosDiagnostico == false">
                                                    {{efectuadasPor}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                   <b-form-input type="text" size="sm" required="" v-model="efectuadasPor"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Fecha de pruebas #1:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosDiagnostico == false">
                                                    {{fechaPruebas1 | formatoFecha}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                   <b-form-input type="date" size="sm" required="" v-model="fechaPruebas1"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Fecha de pruebas #2
                                                </td>
                                                <td class="tituloc" v-if="editarDatosDiagnostico == false">
                                                    {{fechaPruebas2 | formatoFecha}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                   <b-form-input type="date" size="sm" required="" v-model="fechaPruebas2"></b-form-input>
                                                </td>
                                            </tr>
                                            <tr>
                                                <td class="titulob">
                                                    Fecha de pruebas #3:
                                                </td>
                                                <td class="tituloc" v-if="editarDatosDiagnostico == false">
                                                    {{fechaPruebas3 | formatoFecha}}
                                                </td>
                                                <td class="tituloc" v-else>
                                                   <b-form-input type="date" size="sm" required="" v-model="fechaPruebas3"></b-form-input>
                                                </td>
                                            </tr>
                                             <tr v-if="editarDatosDiagnostico">
                                                <td class="titulob">
                                                    
                                                </td>
                                                <td style="display: flex;flex-direction: row-reverse;">
                                                    <b-button type="button" size="sm" variant="success" @click="editarDatosDiagnosticoExec">Actualizar</b-button>
                                                </td>
                                            </tr>
                                        </table>
                                    </b-col>


                                    <b-col sm="12" class="mt-3">
                                        <div class="titulo_MFP">
                                            Documentos
                                            <div v-if="permisos.subir_archivos.crear" class="ico_editar">
                                                <input type="file" id="uploadfile" @change="uploadFile" ref="btnUpload">
                                                <i class="fas fa-cloud-upload-alt" @click="subirArchivo"></i>
                                            </div>
                                        </div>
                                    </b-col>
                                    <b-col sm="12" class="mt-4 mb-4 d-flex">
                                        <div v-for="(item, index) in archivos" :key="index" class="card mcard">
                                            <div class="rArchivo" @click="carousel(index)">
                                                <img class="card-img-top" :src="item.archivo" alt="Card image cap">
                                            </div>
                                            <!-- <div class="card-body">
                                                <p class="card-text">Archivo</p>
                                            </div> -->
                                        </div>
                                    </b-col>
                                </b-row>
                            </b-col>
                        </b-row>
                    </b-container>
                </div>
            </div>
        </div>
        <ModalArchivos v-if="modalarchivos" :ff="archivos" :position="position" v-on:cModalArchivo="cerrarCarousel"/>
        <DecripcionTrabajo v-if="modaldescripciontrabajo" :idPac="IDEpaciente" v-on:cerrarModal="cerrarDescripcion" />
    </div>
</template>

<script>

import ModalArchivos from '@/components/pacientes/Formulario/ModalArchivos.vue'
import DecripcionTrabajo from './ModalDescripcionTrabajo.vue'

import axios from 'axios'
import { mapState, mapActions } from 'vuex'
import { IP, PUERTO } from '@/config/parametros'
import { minix } from '@/components/functions/alertas'
import moment from 'moment'


export default {
    name: "ModalFichaPaciente",
    components:{
        ModalArchivos,
        DecripcionTrabajo
    },
    props:['IDEpaciente'],
    computed: {
        ...mapState(['pacientes', 'departamentos', 'instituciones', 'medicos', 'permisos', 'odts'])
    },
    data() {
        return {
            editarDatosPaciente: false,
            editarDatosDiagnostico: false,
            archivos: [],
            modalarchivos: false,
            modaldescripciontrabajo: false,
            position: 0,

            nombre: '',
            date: '',
            genero: '',
            fechaNacimiento: '',
            departamento: '',
            direccion: '',
            personaResponsable: '',
            telefono: '',
            correo: '',
            nit: '',
            facebook: '',
            expedienteTiempo: '',

            diagnostico: '',
            institucion: '',
            medicoResponsable: '',
            referido: '',
            tipoDeTrabajo: '',
            posicion: '',
            primeraCita: '',
            atendidoPor: '',
            fechaDeMedidas: '',
            efectuadasPor: '',
            fechaPruebas1: '',
            fechaPruebas2: '',
            fechaPruebas3: '',

        }
    },
    filters:{
        edad: function(value){
            let fn = moment(value).add(1, 'days').format('YYYY')
            let actual = moment(Date.now()).format('YYYY')

            let edad = parseInt(actual) - parseInt(fn)

            return edad
        },
        formatoFecha: function(value){
            let nf = moment(value).format('DD-MM-YYYY')
            return nf
        }
    },
    created() {
        window.addEventListener('keydown', this.doCommand)
    },
    destroyed() {
        window.removeEventListener('keydown', this.doCommand)
    },
    methods: {
        cerrar(){
            this.$emit('cmodalfichapaciente', false)
        },
        doCommand(e){
            if (e.keyCode == 27) {
                this.cerrar()
            }
        },
        seleccionarPaciente(){

            const resultados = this.pacientes.filter(paciente => paciente._id == this.IDEpaciente)

            this.nombre = resultados[0].nombre
            this.date = moment(resultados[0].date).format('YYYY-MM-DD')
            this.genero = resultados[0].genero
            this.fechaNacimiento = resultados[0].fechaNacimiento
            this.departamento = resultados[0].departamento
            this.direccion = resultados[0].direccion
            this.personaResponsable = resultados[0].personaResponsable
            this.telefono = resultados[0].telefono
            this.correo = resultados[0].correo
            this.nit = resultados[0].nit
            this.facebook = resultados[0].facebook
            this.expedienteTiempo = resultados[0].expedienteTiempo

            this.diagnostico = resultados[0].diagnostico
            this.institucion = resultados[0].institucion
            this.medicoResponsable = resultados[0].medicoResponsable
            this.referido = resultados[0].referido
            this.tipoDeTrabajo = resultados[0].tipoDeTrabajo
            this.posicion = resultados[0].posicion
            this.primeraCita = moment(resultados[0].primeraCita).format('YYYY-MM-DD')
            this.atendidoPor = resultados[0].atendidoPor
            this.fechaDeMedidas = moment(resultados[0].fechaDeMedidas).format('YYYY-MM-DD')
            this.efectuadasPor = resultados[0].efectuadasPor
            this.fechaPruebas1 = moment(resultados[0].fechaPruebas1).format('YYYY-MM-DD')
            this.fechaPruebas2 = moment(resultados[0].fechaPruebas2).format('YYYY-MM-DD')
            this.fechaPruebas3 = moment(resultados[0].fechaPruebas3).format('YYYY-MM-DD')
            
        },
        mostrarEdicionPaciente(){
            this.editarDatosPaciente = !this.editarDatosPaciente
        },
        mostrarEdicionDiagnostico(){
            this.editarDatosDiagnostico = !this.editarDatosDiagnostico
        },
        async editarDatosPacienteExec(){

            let data = {
                api: 'pacientes',
                id: this.IDEpaciente,
                formulario: {
                    nombre: this.nombre,
                    date: this.date,
                    genero: this.genero,
                    fechaNacimiento: this.fechaNacimiento,
                    departamento: this.departamento,
                    direccion: this.direccion,
                    personaResponsable: this.personaResponsable,
                    telefono: this.telefono,
                    correo: this.correo,
                    nit: this.nit,
                    facebook: this.facebook,
                    expedienteTiempo: this.expedienteTiempo
                }
            }

            await this.updateData(data)
            await this.wse(this.$store.state.rutas.pacientes)
            this.editarDatosPaciente = false

        },
        async editarDatosDiagnosticoExec(){

            let data = {
                api: 'pacientes',
                id: this.IDEpaciente,
                formulario: {
                    diagnostico: this.diagnostico,
                    institucion: this.institucion,
                    medicoResponsable: this.medicoResponsable,
                    referido: this.referido,
                    tipoDeTrabajo: this.tipoDeTrabajo,
                    posicion: this.posicion,
                    primeraCita: this.primeraCita,
                    atendidoPor: this.atendidoPor,
                    fechaDeMedidas: this.fechaDeMedidas,
                    efectuadasPor: this.efectuadasPor,
                    fechaPruebas1: this.fechaPruebas1,
                    fechaPruebas2: this.fechaPruebas2,
                    fechaPruebas3: this.fechaPruebas3,
                }
            }

            await this.updateData(data)
            await this.wse(this.$store.state.rutas.pacientes)
            this.editarDatosDiagnostico = false

        },
        subirArchivo(){
            this.$refs.btnUpload.click()
        },
        async uploadFile(event){
            

            let data = {
                api: 'archivos',
                evento: event.target.files[0],
                campos: [
                    {
                        campo: 'uid',
                        payload: this.IDEpaciente
                    }
                ]
            }

            await this.sfile(data)
            await this.getArchivos()

        },
        async getArchivos(){
            const archivos = await axios.get(`http://${IP}:${PUERTO}/api/archivos/${this.IDEpaciente}`, this.$store.state.token)
            this.archivos = archivos.data
        },
        carousel(id){
            this.modalarchivos = true
            this.position = id
        },
        cerrarCarousel(){
            this.modalarchivos = false
        },
        ModalDecripcion(){
            this.modaldescripciontrabajo = true
        },
        cerrarDescripcion(){
            this.modaldescripciontrabajo = false
        },
        ...mapActions(['updateData', 'wse', 'sfile'])
    
    },
    mounted() {
        this.seleccionarPaciente()
        this.getArchivos()
    },
}
</script>

<style>
    .contenedor_ficha_paciente{
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        padding-top: 50px;
        padding-bottom: 50px;
        padding-left: 30px;
        padding-right: 30px;
        display: flex;
        justify-content: center;

    }
        .cnt{
            /* width: 100%; */
            max-width: 1100px;
            height: 100%;
            background-color: white;
        }

        .barraTop{
            border-bottom: 1px solid #edebe9;
            color: #4e4d4c;
            width: 100%;
            height: 40px;
            display: flex;
            align-items: center;
            padding-left: 10px;
            font-size: 20px;
        }

        .cuerpo_modal_ficha_paciente{
            width: 100%;
            height: calc(100% - 40px);
            color: #4e4d4c;
            display: flex;
        }
            .foto_paciente{
                width: 350px;
                height: 100%;
                padding-left: 15px;
                box-sizing: border-box;
                background-color: #274690;
            }
                .c_foto{
                    width: 100%;
                    height: 350px;
                    /* background-color: #f0f0f0; */
                    margin-top: 30px;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }
                    .ico{
                        width: 270px;
                        height: 270px;
                        margin: auto;
                        border-radius: 50%;
                        overflow: hidden;
                    }

                    .pie_foto{
                        
                        margin-top: 20px;
                        width: 100%;
                        font-size: 19px;
                        color: white;
                        text-align: center;
                    }

            .datos_paciente{
                width: calc(100% - 350px);
                height: 100%;
                overflow: auto;
                padding-left: 15px;
            }
                .cajafoto{
                    width: 100%;
                    height: auto;
                    background-color: #f0f0f0;
                }

                    .titulo_MFP{
                        font-size: 25px;
                        font-weight: bold;
                        color: #7d9e27;
                        border-bottom: 1px solid #edebe9;
                        display: flex;
                        justify-content: space-between;
                    }
                        .ico_editar{
                            font-size: 14px;
                            color: #495057;
                            display: flex;
                            align-items: center;
                            cursor: pointer;
                        }

                    .titulob{
                        /* font-weight: bold; */
                        width: 35%;
                    }
                    .tituloc{
                        width: 65%;
                    }

                    #uploadfile{
                        display: none;
                    }

                    .rArchivo{
                        width: 100px;
                        height: 100px;
                        overflow: hidden;
                        margin: auto;
                        cursor: pointer;
                        
                    }

                    .mcard{
                        margin-right: 15px;
                        transition: .4s ease;
                    }

                    .mcard:hover{
                        transform: scale(1.3);
                    }
</style>