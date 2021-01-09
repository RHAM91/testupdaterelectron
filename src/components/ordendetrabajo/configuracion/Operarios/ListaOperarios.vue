<template>
    <b-container>
        <b-row>
            <b-col sm="12" v-if="permisos.operarios.crear">
                <b-button type="button" size="sm" variant="success" @click="toggleModalNuevoRegistro"><i class="fas fa-plus"></i> Agregar</b-button>
            </b-col>

            <b-col sm="12" class="mt-2">
                <table class="table table-sm mod">
                    <thead>
                        <tr>
                            <th style="width: 40%">
                                Operario
                            </th>
                            <th style="width: 40%">
                                Fecha de registro
                            </th>
                            <th style="width: 20%">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in operarios" :key="index">
                            <td>
                                <div class="ttxxtt">
                                    {{item.nombre}}
                                </div>
                            </td>
                            <td>    
                                <div class="ttxxtt">
                                    {{item.date | formateoFecha}}
                                </div>
                            </td>
                            <td>
                                <b-button v-if="permisos.operarios.actualizar" type="button" size="sm" class="btn-spaces" title="Editar" variant="primary" @click="toggleModalActualizaRegistro(item._id)"><i class="fas fa-edit"></i> Editar</b-button>
                                <b-button v-if="permisos.operarios.borrar" type="button" size="sm" title="Borrar" variant="danger" @click="borrarItem(item._id)"><i class="fas fa-minus"></i> Borrar</b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>


        <div v-if="modalNuevoRegistro">
            <ModalNuevoRegistro v-on:cerrarModal="toggleModalNuevoRegistro" />
        </div>

        <div v-if="modalActualizarRegistro">
            <ModalActualizaRegistro v-on:cerrarModal="toggleModalActualizaRegistro" :iditem='itemId' />
        </div>

    </b-container>
</template>

<script>

import { minix, pregunta } from '@/components/functions/alertas'
import moment from 'moment'

import ModalNuevoRegistro from '@/components/ordendetrabajo/configuracion/Operarios/NuevoOperario.vue'
import ModalActualizaRegistro from '@/components/ordendetrabajo/configuracion/Operarios/ActualizarOperario.vue'
import { mapState, mapActions } from 'vuex'


export default {
    name: 'ListaOperarios',
    components:{
        ModalNuevoRegistro,
        ModalActualizaRegistro
    },
    computed: {
        ...mapState(['permisos', 'operarios'])
    },
    filters:{
        formateoFecha(data){
            let nwFecha = moment(data).format("DD-MM-YYYY"); 
            return nwFecha
        }
    },
    data() {
        return {
            modalNuevoRegistro: false,
            modalActualizarRegistro: false,

            itemId: ''
        }
    },
    methods: {
        toggleModalNuevoRegistro(valor){
            
            this.modalNuevoRegistro = !this.modalNuevoRegistro
        },
        toggleModalActualizaRegistro(valor){ // este valor esta siendo usado para 2 cosas, en esta parte se usa para obtener el id para actualizar y tambien trae el valor del emit del componente ModalAactualizarRegistro
            this.itemId = valor
            this.modalActualizarRegistro = !this.modalActualizarRegistro
        },
        borrarItem(id){

            pregunta({titulo: 'Quieres borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    
                    let data = {
                        api: 'operarios',
                        id
                    }
                   
                    await this.deleteData(data)
                    await this.wse(this.$store.state.rutas.operarios)
                }
            })

        },
        ...mapActions(['wse', 'deleteData'])
    }
}
</script>

<style scoped>
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