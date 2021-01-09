<template>
     <b-container>
        <b-row>
            <b-col sm="12">
                <b-button v-if="permisos.medicos.crear" type="button" size="sm" variant="success" @click="toggleModalNuevoRegistro"><i class="fas fa-plus"></i> Agregar</b-button>
            </b-col>

            <b-col sm="12" class="mt-2">
                <table class="table table-sm mod">
                    <thead>
                        <tr>
                            <th style="width: 30%">
                                Nombre
                            </th>
                            <th style="width: 25%">
                                Teléfono
                            </th>
                            <th style="width: 25%">
                                correo
                            </th>
                            <th style="width: 20%">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in medicos" :key="index">
                            <td>
                                <div class="ttxxtt">
                                    {{item.nombre}}
                                </div>
                            </td>
                            <td>    
                                <div class="ttxxtt">
                                    {{item.telefono}}
                                </div>
                            </td>
                             <td>    
                                <div class="ttxxtt">
                                    {{item.correo}}
                                </div>
                            </td>
                            <td>
                                <b-button v-if="permisos.medicos.actualizar" type="button" size="sm" class="btn-spaces" title="Editar" variant="primary" @click="actualizarMedico(item._id)"><i class="fas fa-edit"></i> Editar</b-button>
                                <b-button v-if="permisos.medicos.borrar" type="button" size="sm" title="Borrar" variant="danger" @click="borrarMedico(item._id)"><i class="fas fa-minus"></i> Borrar</b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>

        <div v-if="ModalNuevoRegistro">
            <ModalNuevoRegistro v-on:cModalNuevoMedico="toggleModalNuevoRegistro" />
        </div>


        <div v-if="ModalActualizaRegistro">
            <ModalActualizaRegistro v-on:cModalActualiaMedico="closeModalAmedico" :IDEmedico="idMedico" />
        </div>

    </b-container>
</template>

<script>



import ModalNuevoRegistro from '@/components/pacientes/configuracion/medicos/ModalNuevoRegistro.vue'
import ModalActualizaRegistro from '@/components/pacientes/configuracion/medicos/ModalActualizarRegistro.vue'
import { mapState, mapActions } from 'vuex'
import { minix, pregunta } from '@/components/functions/alertas'


export default {
    name: 'Medicos',
    components:{
        ModalNuevoRegistro,
        ModalActualizaRegistro
    },
    computed: {
        ...mapState(['permisos','medicos']),
    },
    data() {
        return {
            ModalNuevoRegistro: false,
            ModalActualizaRegistro: false,
            idMedico: ''
        }
    },
    methods: {
        toggleModalNuevoRegistro(){
            this.ModalNuevoRegistro = !this.ModalNuevoRegistro
        },
        closeModalAmedico(){
            this.ModalActualizaRegistro = false
        },
        actualizarMedico(id){
            this.idMedico = id
            this.ModalActualizaRegistro = true
        },
        borrarMedico(id){

             pregunta({titulo: 'Quieres borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                
                    let data = {
                        api: 'medicos',
                        id
                    }

                    await this.deleteData(data)
    
                    await this.wse(this.$store.state.rutas.medicos)
                   
                }
            })

        },
        ...mapActions(['deleteData', 'wse'])
    },
    mounted() {
       
    }, 
}
</script>

<style>
    .box{
        padding: 10px;
        box-sizing: border-box;
    }

    .mod{
        font-size: 13px;
        max-width: 1200px;
    }

    .ttxxtt{
        height: 30px;
        display: flex;
        align-items: center;
    }

    .bet-titulo{
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .btn-spaces{
        margin-right: 15px;
    }
</style>