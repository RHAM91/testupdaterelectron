<template>
     <div>
        <b-container>
            <form @submit.prevent="guardarRegistro">
                <b-row>
                    <b-col sm="12" class="mt-3">
                        <label>Expediente</label>
                        <select class="form-control form-control-sm" v-model="expedienteTiempo">
                            <option value="">Selecciona</option>
                            <option value="Nuevo">Nuevo</option>
                            <option value="Antiguo">Antiguo</option>
                        </select>
                    </b-col>
                
                    <b-col sm="12" md="9" class="mt-3">
                        <label>Nombre completo</label>
                        <b-form-input type="text" id="nombreCompleto" v-model="nombre" size="sm" required=""></b-form-input>
                    </b-col>

                    <b-col sm="12" md="3" class="mt-3">
                        <label>Nombre corto</label>
                        <b-form-input type="text" v-model="nombreCorto" size="sm" required=""></b-form-input>
                    </b-col>

                    <b-col sm="12" md="6" class="mt-3">
                        <label>Fecha de nacimiento</label>
                        <b-form-input type="date" v-model="fechaNacimiento" size="sm" required=""></b-form-input>
                    </b-col>

                    <b-col sm="12" md="6" class="mt-3">
                        <label>Departamento</label>
                        <select class="form-control form-control-sm" v-model="departamento">
                            <option value="">Selecciona</option>
                            <option v-for="(item, index) in departamentos" :key="index" :value="item.departamento">{{item.departamento}}</option>
                        </select>
                    </b-col>

                    <b-col sm="12" class="mt-3">
                        <label>Dirección</label>
                        <b-form-input type="text" v-model="direccion" size="sm" required=""></b-form-input>
                    </b-col>

                    <b-col sm="12" class="mt-3">
                        <label>Persona responsable</label>
                        <b-form-input type="text" v-model="personaResponsable" size="sm" required=""></b-form-input>
                    </b-col>

                    <b-col sm="12" md="4" class="mt-3">
                        <label>Teléfono</label>
                        <b-form-input type="text" v-model="telefono" size="sm" required="" placeholder="+502"></b-form-input>
                    </b-col>

                    <b-col sm="12" md="4" class="mt-3">
                        <label>Correo</label>
                        <b-form-input type="text" v-model="correo" size="sm" required="" placeholder="@"></b-form-input>
                    </b-col>

                    <b-col sm="12" md="4" class="mt-3">
                        <label>Nit</label>
                        <b-form-input type="text" v-model="nit" size="sm" required=""></b-form-input>
                    </b-col>

                    <b-col sm="12" class="mt-3">
                        <label>Facebook</label>
                        <b-form-input type="text" v-model="facebook" size="sm" required="" placeholder="FB"></b-form-input>
                    </b-col>

                    <b-col sm="12" class="mt-3">
                        <label>Genero</label>
                        <select class="form-control form-control-sm" v-model="genero">
                            <option value="">Selecciona</option>
                            <option value="femenino">Femenino</option>
                            <option value="masculino">Masculino</option>
                        </select>
                    </b-col>

                    <b-col sm="12" class="mt-3">
                        <label>Diagnóstico</label>
                        <b-form-textarea id="textarea" v-model="diagnostico" placeholder="Diagnóstico" rows="3" max-rows="6"></b-form-textarea>
                    </b-col>

                        <b-col sm="12" class="mt-3">
                        <label>Institución</label>
                        <select class="form-control form-control-sm" v-model="institucion">
                            <option value="">Selecciona</option>
                            <option v-for="(item, index) in instituciones" :key="index" :value="item.institucion">{{item.institucion}}</option>
                        </select>
                    </b-col>

                        <b-col sm="12" class="mt-3">
                        <label>Otras instituciones</label>
                        <b-form-input type="text" v-model="otrasInstituciones" size="sm" required=""></b-form-input>
                    </b-col>

                        <b-col sm="12" md="6" class="mt-3">
                        <label>Donación?</label>
                        <select class="form-control form-control-sm" v-model="donacion">
                            <option value="true">Si</option>
                            <option value="false">No</option>
                        </select>
                    </b-col>

                        <b-col sm="12" md="6" class="mt-3">
                        <label>Cancela consulta</label>
                        <b-form-input type="number" step="0.01" v-model="cancela" size="sm" required="" placeholder="Q."></b-form-input>
                    </b-col>

                        <b-col sm="12" class="mt-3">
                        <label>Médico responsable</label>
                        <select class="form-control form-control-sm" v-model="medicoResponsable">
                            <option value="">Selecciona</option>
                            <option v-for="(item, index) in medicos" :key="index" :value="item.nombre">{{item.nombre}}</option>
                        </select>
                    </b-col>

                        <b-col sm="12" class="mt-3">
                        <label>Referido por</label>
                        <b-form-input type="text" v-model="referido" size="sm" required=""></b-form-input>
                    </b-col>

                        <b-col sm="12" class="mt-3">
                        <label>Tipo de trabajo</label>
                        <select class="form-control form-control-sm" v-model="tipoDeTrabajo">
                            <option value="">Selecciona</option>
                            <option value="ortesis">Ortesis</option>
                        </select>
                    </b-col>

                        <b-col sm="12" class="mt-3">
                        <label>Posición</label>
                        <select class="form-control form-control-sm" v-model="posicion">
                            <option value="">Selecciona</option>
                            <option value="izquierda">Izquierda</option>
                            <option value="derecha">Derecha</option>
                            <option value="bilateral">Bilateral</option>
                        </select>
                    </b-col>

                        <b-col sm="12" md="6" class="mt-3">
                        <label>Primera cita</label>
                        <b-form-input type="date" v-model="primeraCita" size="sm" required=""></b-form-input>
                    </b-col>

                        <b-col sm="12" md="6" class="mt-3">
                        <label>Atendido por</label>
                        <b-form-input type="text" v-model="atendidoPor" size="sm" required=""></b-form-input>
                    </b-col>

                        <b-col sm="12" md="6" class="mt-3">
                        <label>Fecha de medidas</label>
                        <b-form-input type="date" v-model="fechaDeMedidas" size="sm" required=""></b-form-input>
                    </b-col>

                        <b-col sm="12" md="6" class="mt-3">
                        <label>Efectuadas por</label>
                        <b-form-input type="text" v-model="efectuadasPor" size="sm" required=""></b-form-input>
                    </b-col>

                    <b-col sm="12" md="4" class="mt-3">
                        <label>Fecha de pruebas 1</label>
                        <b-form-input type="date" v-model="fechaPruebas1" size="sm" required=""></b-form-input>
                    </b-col>

                    <b-col sm="12" md="4" class="mt-3">
                        <label>Fecha de pruebas 2</label>
                        <b-form-input type="date" v-model="fechaPruebas2" size="sm" required=""></b-form-input>
                    </b-col>

                    <b-col sm="12" md="4" class="mt-3">
                        <label>Fecha de pruebas 3</label>
                        <b-form-input type="date" v-model="fechaPruebas3" size="sm" required=""></b-form-input>
                    </b-col>

                    <!-- <b-col sm="12" class="mt-3">
                        <label>Foto del paciente</label>
                        <div class="custom-file input-group-sm">
                            <input type="file" class="custom-file-input" id="inputGroupFile01" disabled aria-describedby="inputGroupFileAddon01">
                            <label class="custom-file-label" for="inputGroupFile01">Elegir archivo</label>
                        </div>
                    </b-col> -->
                        <b-col sm="12" class="mt-4">
                            <b-button type="submit" size="sm" variant="success">Registrar</b-button>
                    </b-col>
                </b-row>
            </form>
        </b-container>
     </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

import Loading from '@/components/varios/Loading.vue'


export default {
    name: "NuevoPaciente",
    components:{
        Loading
    },
    computed: {
        ...mapState(['instituciones', 'medicos', 'departamentos'])
    },
    data() {
        return {
            icono: true,
            expedienteTiempo: 'Nuevo',
            nombre: '',
            nombreCorto: '',
            fechaNacimiento: '',
            departamento: '',
            direccion: '',
            telefono: '',
            personaResponsable: '',
            correo: '',
            nit: '',
            facebook: '',
            genero: '',
            diagnostico: '',
            institucion: '',
            otrasInstituciones: '',
            donacion: 'false',
            cancela: '',
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
            fechaPruebas3: ''
        }
    },
    methods: {
        AbrirMenu(){
            this.$emit('OpenMenu', true)
            this.icono = !this.icono
        },
        async guardarRegistro(){

            let data = {
                token: this.$store.state.token,
                api: 'pacientes',
                formulario: {
                    expedienteTiempo: this.expedienteTiempo,
                    nombre: this.nombre,
                    nombreCorto: this.nombreCorto,
                    fechaNacimiento: this.fechaNacimiento,
                    departamento: this.departamento,
                    direccion: this.direccion,
                    telefono: this.telefono,
                    personaResponsable: this.personaResponsable,
                    correo: this.correo,
                    nit: this.nit,
                    facebook: this.facebook,
                    genero: this.genero,
                    diagnostico: this.diagnostico,
                    institucion: this.institucion,
                    otrasInstituciones: this.otrasInstituciones,
                    donacion: this.donacion,
                    cancela: this.cancela,
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
                    fechaPruebas3: this.fechaPruebas3
                }
            }

            await this.insert_data(data)
            await this.wse(this.$store.state.rutas.pacientes)

                this.expedienteTiempo = 'Nuevo',
                this.nombre = '',
                this.nombreCorto = '',
                this.fechaNacimiento = '',
                this.departamento = '',
                this.direccion = '',
                this.telefono = '',
                this.personaResponsable = '',
                this.correo = '',
                this.nit = '',
                this.facebook = '',
                this.genero = '',
                this.diagnostico = '',
                this.institucion = '',
                this.otrasInstituciones = '',
                this.donacion = 'false',
                this.cancela = '',
                this.medicoResponsable = '',
                this.referido = '',
                this.tipoDeTrabajo = '',
                this.posicion = '',
                this.primeraCita = '',
                this.atendidoPor = '',
                this.fechaDeMedidas = '',
                this.efectuadasPor = '',
                this.fechaPruebas1 = '',
                this.fechaPruebas2 = '',
                this.fechaPruebas3 = ''

        },
        ...mapActions(['insert_data', 'wse'])
    },
    mounted() {
       document.getElementById('nombreCompleto').focus()
    },
}
</script>

<style scope>
    .menu{
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        cursor: pointer;
        color: rgb(63, 70, 76);
    }

    .barra{
        width: 100%;
        height: 48px;
        background-color: white;
        transition: .2s ease;
        position: sticky;
        top: 0;
    }

    .box{
        padding: 10px;
        box-sizing: border-box;
    }

   
</style>