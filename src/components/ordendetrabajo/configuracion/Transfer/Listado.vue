<template>
    <b-container>
        <b-row>
            <b-col sm="12" >
                <b-button type="button" size="sm" variant="success" @click="abrirModalNuevo"><i class="fas fa-plus"></i> Agregar</b-button>
            </b-col>

            <b-col sm="12" class="mt-2">
                <table class="table table-sm table-striped mod">
                    <thead>
                        <tr>
                            <th style="width: 40%">
                                Código transfer
                            </th>
                            <th style="width: 40%">
                                Diseño
                            </th>
                            <th style="width: 20%">

                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in transfers" :key="index">
                            <td>
                                <div class="ttxxtt modttxttx">
                                    {{item.codigoTransfer}}
                                </div>
                            </td>
                            <td>    
                                <div class="muestra">
                                    <img :src="item.url" class="ajustemuestra" alt="">
                                </div>
                            </td>
                            <td>
                                <b-button  type="button" size="sm" class="btn-spaces" title="Editar" variant="primary"><i class="fas fa-edit"></i> Editar</b-button>
                                <b-button  type="button" size="sm" title="Borrar" variant="danger"><i class="fas fa-minus"></i> Borrar</b-button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </b-col>
        </b-row>


        <div v-if="modalNuevoRegistro">
            <Nuevo v-on:cerrarModal="cerrarModal" />
        </div>

        <!-- <div v-if="modalActualizarRegistro">
            <ModalActualizaRegistro v-on:cerrarModal="toggleModalActualizaRegistro" :iditem='itemId' />
        </div> -->

    </b-container>
</template>

<script>

import Nuevo from '@/components/ordendetrabajo/configuracion/Transfer/Nuevo.vue'
import { mapState } from 'vuex'


export default {
    name: 'ListadoTransfer',
    computed: {
        ...mapState(['transfers', 'permisos'])
    },
    components:{
        Nuevo
    },
    data() {
        return {
            modalNuevoRegistro: false
        }
    },
    methods: {
        abrirModalNuevo(){
            this.modalNuevoRegistro = true
        },
        cerrarModal(){
            this.modalNuevoRegistro = false
        }
    },
}
</script>

<style scoped>
    .muestra{
        width: 100px;
        height: 100px;
        /* border: 1px dashed blue; */
    }
        .modttxttx{
            height: 100px;
            /* border: 1px solid black; */
            display: flex;
            align-items: center;
        }

        .ajustemuestra{
            width: 100%;
            height: 100%;
        }
</style>