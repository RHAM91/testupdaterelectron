<template>
    <div class="contenedor">

        <div class="form-in">

            <div class="nav">
                Nuevo registro
            </div>
                <hr>
            <b-container fluid>
                <form @submit.prevent="guardarDato">
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <label>Nombre del departamento</label>
                            <b-form-input type="text" id="departamento" size="sm" v-model="departamento" autocomplete="off" required=""></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-4">
                            <b-button type="submit" size="sm" variant="info">Guardar</b-button>
                        </b-col>
                    </b-row>
                </form>
            </b-container>
        </div>
        
    </div>
</template>

<script>

import { IP, PUERTO } from '@/config/parametros'
import { minix } from '@/components/functions/alertas'
import { mapActions } from 'vuex'

export default {
    name: 'ModaNuevoRegistro',
    data() {
        return {
            departamento: ''
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
            this.$emit('cDepartamentosNuevoReg', false)
        },
        doCommand(e){
            if (e.keyCode == 27) {
                this.cerrar()
            }
        },
        async guardarDato(){
            
            let data = {
                api: 'departamentos',
                formulario: {
                    departamento: this.departamento
                }
            }

            await this.insert_data(data)
            
            await this.wse(this.$store.state.rutas.departamentos)

            this.departamento = ''

            document.getElementById('departamento').focus()
        },
        ...mapActions(['insert_data', 'wse'])
    },
    mounted() {
        document.getElementById('departamento').focus()
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
        
        display: flex;
        justify-content: center;
        align-items: center;
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

        .form-in{
            width: 600px;
            height: 230px;
            background-color: white;
            border-radius: 4px;
        }

</style>