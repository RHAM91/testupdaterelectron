<template>
    <div class="contenedor-descripcion">
        <div class="cuerpo-descripcion">
            <div class="cabecera_decripcion">
                Historial de ordenes:	
                <b-button type="button" size="sm" variant="light" @click="cerrar">Cerrar</b-button>
            </div>
            <div class="permietro_historial_ordenes">
                <b-container fluid>
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <table class="table table-sm table-striped tbmod">
                                <thead>
                                    <td style="width: 15%;">
                                        Orden No.
                                    </td>
                                    <td style="width: 70%">
                                        Descripción
                                    </td>
                                    <td style="width: 15%;">
                                        Fecha
                                    </td>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in orders" :key="index">
                                        <td>
                                            {{item.odt}}
                                        </td>
                                        <td>
                                            {{item.descripcion}}
                                        </td>
                                        <td>
                                            {{item.fecha_de_entrega}}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </div>
    </div>
</template>

<script>

import { mapState } from 'vuex'

export default {

    name: 'Descripcion',
    props: ['idPac'],
    computed: {
        ...mapState(['odts'])
    },
    data() {
        return {
            orders: []
        }
    },
    methods: {
        cerrar(){
            this.$emit('cerrarModal', false)
        },
        odtPorPaciente(){
            
            let ordenes = this.odts.filter(odt => odt.pid == this.idPac)
            this.orders = ordenes
        },
    },
    mounted() {
        this.odtPorPaciente()
    },
}
</script>

<style>
    .contenedor-descripcion{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: rgba(0, 0, 0, .3);
        z-index: 999;
    }
        .cuerpo-descripcion{
            width: 700px;
            height: 500px;
            background-color: white;

        }
            .cabecera_decripcion{
                width: 100%;
                height: 40px;
                /* background-color: #8AC21D; */
                border-bottom: 1px solid #EAE8E6;
                display: flex;
                align-items: center;
                justify-content: space-between;
                padding-right: 10px;
                padding-left: 10px;
            }

            .permietro_historial_ordenes{
                width: 100%;
                height: calc(100% - 40px);
                overflow: auto;
            }

    .tbmod{
        font-size: 12px;
    }
</style>