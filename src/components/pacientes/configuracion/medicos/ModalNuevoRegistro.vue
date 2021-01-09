<template>
    <div class="contenedor_MRMedico">
        <div class="formulario">
            <div class="mrmTitulo">
                Nuevo registro
            </div>
            <div class="b-formulario">
                <b-container fluid>
                    <form @submit.prevent="guardarDatos">
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
import { mapActions } from 'vuex'
export default {
    name: 'NuevoMedico',
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
            this.$emit('cModalNuevoMedico', false)
        },
        async guardarDatos(){

            let data = {
                api: 'medicos',
                formulario: {
                    nombre: this.nombre,
                    telefono: this.telefono,
                    correo: this.correo
                }
            }

            await this.insert_data(data)

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
        ...mapActions(['insert_data', 'wse'])
    },
    mounted() {
        document.getElementById('nombremedico').focus()
    },
}
</script>

<style>
    .contenedor_MRMedico{
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