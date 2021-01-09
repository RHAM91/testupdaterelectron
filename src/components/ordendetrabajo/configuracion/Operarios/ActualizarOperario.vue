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
                            <label style="color: black;">Nombre del operador</label>
                            <b-form-input type="text" id="operario" size="sm" v-model="operario" required="" autocomplete="off"></b-form-input>
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
import { mapActions, mapState } from 'vuex'

export default {
    name: 'ActualizaOperario',
    props:['iditem'],
    computed: {
        ...mapState(['permisos', 'operarios'])
    },
    data() {
        return {
            operario: ''
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
            const resultados = this.operarios.filter(operario => operario._id == this.iditem)
            this.operario = resultados[0].nombre
        },
        async guardarDato(){

            let data = {
                api: 'operarios',
                id: this.iditem,
                formulario: {
                    nombre: this.operario
                }
            }
            
           await this.updateData(data)
           await this.wse(this.$store.state.rutas.operarios)
           await this.cerrar()

           this.operario = ''

        },
        ...mapActions(['wse', 'updateData'])
    },
    mounted() {

        document.getElementById('operario').focus()
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