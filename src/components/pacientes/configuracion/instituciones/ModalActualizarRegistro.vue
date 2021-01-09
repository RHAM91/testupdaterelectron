<template>
    <div class="contenedor">

        <div class="form-institucion" id="formulario_institucion">

            <div class="nav">
                Actualizar registro
            </div>
                <hr>
            <b-container fluid>
                <form @submit.prevent="guardarDato">
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <label>Nombre de la institución</label>
                            <b-form-input type="text" id="institucion" size="sm" v-model="institucion" required="" autocomplete="off"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-4">
                            <b-button type="submit" size="sm" variant="info">Actualizar</b-button>
                        </b-col>
                    </b-row>
                </form>
            </b-container>
        </div>
        
    </div>
</template>

<script>

import axios from 'axios'
import { IP, PUERTO } from '@/config/parametros'
import { minix } from '@/components/functions/alertas'
import { mapActions } from 'vuex'

export default {
    name: 'ModaNuevoRegistro',
    props:['iditem'],
    data() {
        return {
            institucion: ''
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
            this.$emit('cerrarModal', false)
        },
        doCommand(e){
            if (e.keyCode == 27) {
                this.cerrar()
            }
        },
        async getDato(){

            try {
                const item = await axios.get(`http://${IP}:${PUERTO}/api/instituciones/${this.iditem}`, this.$store.state.token)
                this.institucion = item.data.institucion
                document.getElementById('institucion').focus()

            } catch (e) {

                console.log(e.response)
            }
        },
        async guardarDato(){

            let data = {
                institucion: this.institucion
            }
            
            try {
                const item = await axios.put(`http://${IP}:${PUERTO}/api/instituciones/${this.iditem}`, data, this.$store.state.token)
                
                this.wse(this.$store.state.rutas.instituciones)

                minix({icon: 'success', mensaje: 'Dato actualizado!', tiempo: 3000})

                await this.cerrar()

            } catch (e) {
                minix({icon: 'error', mensaje: e.response.data.message, tiempo: 3000})
            }

        },
        ...mapActions(['wse'])
    },
    mounted() {

        document.getElementById('institucion').focus()
        this.getDato()
    },
}
</script>

<style scoped>

    .contenedor{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 999;
    }
        .nav{
            width: 100%;
            height: 30px;
            /* border-bottom: 1px solid rgb(179, 179, 179); */
            color: rgb(136,173,40);
            font-size: 25px;
            padding-left: 10px;
            display: flex;
            align-items: center;
        }

        .form-institucion{
            width: 600px;
            height: 230px;
            background-color: white;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -300px;
            margin-top: -115px;
            border-radius: 4px;
        }

</style>