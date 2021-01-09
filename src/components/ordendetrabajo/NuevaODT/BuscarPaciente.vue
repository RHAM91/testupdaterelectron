<template>
    <div class="contenedorbp">
        <div class="box_bp">
            <div class="barra_bp">
                <div class="muesca">

                </div>
                Buscar paciente
            </div>
            <div class="cuerpo_bp">
                <b-container>
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <b-form-input type="text" id="input_bp" v-model="nombrePaciente" size="sm" placeholder="Nombre o apellidos" autocomplete="off" required></b-form-input>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <div class="marco">
                                <table class="table table-sm table-striped table-bordered mod">
                                    <thead>
                                        <tr>
                                            <th style="width: 40%;">
                                                Paciente
                                            </th>
                                            <th style="width: 10%;">
                                                Edad
                                            </th>
                                            <th style="width: 40%;">
                                                Diagnostico
                                            </th>
                                            <th style="width: 10%;">

                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(item, index) in spacientes" :key="index">
                                            <td>
                                                {{item.nombre}}
                                            </td>
                                            <td>
                                                {{item.fechaNacimiento}}
                                            </td>
                                            <td>
                                                {{item.diagnostico}}
                                            </td>
                                            <td>
                                                <b-button type="button" size="sm" variant="info" @click="seleccionaPaciente(item._id)">ok</b-button>
                                            </td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
import {IP, PUERTO} from '@/config/parametros'
import { minix } from '@/components/functions/alertas'
import { mapState, mapGetters } from 'vuex'


export default {
    name: 'BuscarPacientes',
    computed: {
        ...mapState(['permisos']),
        nombrePaciente: {
            get (){
                return this.$store.state.filterPacientes.query
            },
            set(val){
                this.$store.commit('set_querypaciente', val.toLowerCase())
            }
        },
        ...mapGetters({
            spacientes : 'filteredPacientew'
        })
    },
    data() {
        return {
           
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
            this.$emit('cmodalbp', false)
        },
        doCommand(e){
            if (e.keyCode == 27) {
                this.cerrar()
            }
        },
        seleccionaPaciente(val){
            const pacientex = this.spacientes.filter(paciente => paciente._id == val)
            this.$emit('pacienteseleccionado', pacientex)
            this.cerrar()
        },
    },
    mounted() {
        document.getElementById('input_bp').focus()
    },
}
</script>

<style scoped>
    .contenedorbp{
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, 0.3);
        position: fixed;
        top: 0;
        left: 0;
        z-index: 999;
        display: flex;
        justify-content: center;
        align-items: center;
    }
        .box_bp{
            width: 700px;
            height: 500px;
            background-color: white;

        }
            .muesca{
                width: 8px;
                height: 100%;
                background-color: #23A5FB;
                margin-right: 10px;
            }

            .barra_bp{
                width: 100%;
                height: 45px;
                border-bottom: 1px solid #edebe9;
                font-size: 18px;
                display: flex;
                align-items: center;
            }

            .cuerpo_bp{
                width: 100%;
                height: calc(100% - 45px);

            }

            .marco{
                height: 375px;
                overflow: auto;
            }
</style>