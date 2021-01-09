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
                            <label style="color: black;">Nombre del aparato</label>
                            <b-form-input type="text" id="aparato" size="sm" v-model="aparato" required="" autocomplete="off"></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <b-form-textarea
                                id="textarea-default"
                                placeholder="Descripción"
                                required
                                v-model="descripcion"
                            ></b-form-textarea>
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
    name: 'Actualizacion',
    props:['iditem'],
    computed: {
        ...mapState(['permisos', 'aparatos'])
    },
    data() {
        return {
            aparato: '',
            descripcion: ''
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
            const resultados = this.aparatos.filter(aparato => aparato._id == this.iditem)
            this.aparato = resultados[0].aparato,
            this.descripcion = resultados[0].descripcion
        },
        async guardarDato(){

            let data = {
                api: 'aparatos',
                id: this.iditem,
                formulario: {
                    aparato: this.aparato,
                    descripcion: this.descripcion
                }
            }
            
           await this.updateData(data)
           await this.wse(this.$store.state.rutas.aparatos)
           await this.cerrar()

           this.aparato = ''
           this.descripcion = ''

        },
        ...mapActions(['updateData', 'wse'])
    },
    mounted() {

        document.getElementById('aparato').focus()
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
            height: 285px;
            background-color: white;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -300px;
            margin-top: -115px;
            border-radius: 4px;
        }

</style>