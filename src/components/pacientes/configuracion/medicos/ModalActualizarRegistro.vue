<template>
    <div class="contenedor_AM">
        <div class="formulario">
            <div class="mrmTitulo">
                Actualiza registro
            </div>
            <div class="b-formulario">
                <b-container fluid>
                    <form @submit.prevent="ejecutar">
                        <b-row>
                            <b-col sm="12" class="mt-3">
                                <label>Nombre del médico</label>
                                <b-form-input type="text" id="nombremedico" v-model="nombre" size="sm" require></b-form-input>
                            </b-col>
                             <b-col sm="12" class="mt-3">
                                <label>Teléfono</label>
                                <b-form-input type="number" v-model="telefono" size="sm" placeholder="+502" require></b-form-input>
                            </b-col>
                             <b-col sm="12" class="mt-3">
                                <label>Correo</label>
                                <b-form-input type="email" v-model="correo" size="sm" placeholder="@"></b-form-input>
                            </b-col>
                             <b-col sm="12" class="mt-3">
                                <b-button type="submit" size="sm" variant="success" block="">Guardar</b-button>
                            </b-col>
                        </b-row>
                    </form>
                </b-container>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'

export default {
    name: 'ActualizaRegistro',
    props:['IDEmedico'],
    computed: {
        ...mapState(['medicos'])
    },
    data() {
        return {
            nombre: '',
            telefono: '',
            correo: '',

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
            this.$emit('cModalActualiaMedico', false)
        },
        buscarElemento(){
            const resultados = this.medicos.filter(medico => medico._id == this.IDEmedico)
            
            this.nombre = resultados[0].nombre
            this.telefono = resultados[0].telefono
            this.correo = resultados[0].correo
        },
        async ejecutar(){

            let data = {
                api: `medicos`,
                id: this.IDEmedico,
                formulario: {
                    nombre: this.nombre,
                    telefono: this.telefono,
                    correo: this.correo
                }
            }
            
            await this.updateData(data)

            await this.wse(this.$store.state.rutas.medicos)

            this.cerrar()

            this.nombre = ''
            this.telefono = ''
            this.correo = ''

        },
        doCommand(e){
            if (e.keyCode == 27) {
                this.cerrar()
            }
        },
        ...mapActions(['updateData', 'wse'])
    },
    mounted() {
        document.getElementById('nombremedico').focus()
        this.buscarElemento()
    },
}
</script>

<style>
    .contenedor_AM{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
    }
        .formulario{
            width: 500px;
            height: 350px;
            background-color: white;
        }

            .mrmTitulo{
                width: 100%;
                height: 40px;
                background-color: orangered;
                color: white;
                /* font-weight: bold; */
                font-size: 20px;
                display: flex;
                align-items: center;
                padding-left: 10px;
            }

            .b-formulario{
                width: 100%;
                height: calc(100%  - 40px);
            }
</style>