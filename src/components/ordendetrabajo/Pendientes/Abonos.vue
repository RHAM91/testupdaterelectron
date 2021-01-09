<template>
    <div class="contenedor_abonos">
        <div class="barra_abonos" style="position: relative;">
            <b-button type="button" size="sm" variant="success" style="position: absolute; right: 8px; top: 8px;" @click="cerrarAbonos">Cerrar</b-button>
        </div>
        <div class="cuerpo_abonos">
            <div class="box_abonos">
                <div class="cajas_marco">
                    <div class="td_caja">
                        <div class="img_caja">
                            <img src="@/assets/odt.png" style="width: 100%;" alt="">
                        </div>
                        <div class="cdatos">
                            <div class="p_arriba">
                                {{odt.odt}}
                            </div>
                            <div class="p_abajo">
                                ORDEN DE TRABAJO
                            </div>
                        </div>
                    </div>
                    <div class="td_caja" style="background-color: #f7f7f7;">
                        <div class="img_caja">
                            <img src="@/assets/coin.png" style="width: 100%;" alt="">
                        </div>
                        <div class="cdatos">
                            <div class="p_arriba">
                                {{odt.capital}}
                            </div>
                            <div class="p_abajo">
                                TOTAL DEUDA
                            </div>
                        </div>
                    </div>
                    <div class="td_caja">
                        <div class="img_caja">
                            <img src="@/assets/pig.png" style="width: 100%;" alt="">
                        </div>
                        <div class="cdatos">
                            <div class="p_arriba">
                                {{odt.ultimoAbono}}
                            </div>
                            <div class="p_abajo">
                                ÚLTIMO ABONO
                            </div>
                        </div>
                    </div>
                    <div class="td_caja" style="background-color: #f7f7f7;">
                        <div class="img_caja">
                            <img src="@/assets/coins.png" style="width: 100%;" alt="">
                        </div>
                        <div class="cdatos">
                            <div class="p_arriba">
                                {{odt.saldo}}
                            </div>
                            <div class="p_abajo">
                                SALDO PENDIENTE
                            </div>
                        </div>
                    </div>
                </div>
                <b-container fluid>
                    <b-row>
                        <b-col sm="12" class="mt-4">
                            <table class="table table-sm table-bordered xd">
                                <thead>
                                    <tr>
                                        <th class="titulo_abonos">
                                            ODT
                                        </th>
                                        <th class="titulo_abonos">
                                            Paciente
                                        </th>
                                        <th class="titulo_abonos">
                                            Detalle de la orden
                                        </th>
                                        <th class="titulo_abonos">
                                            Estado de la orden
                                        </th>
                                        <th class="titulo_abonos">
                                            Fecha de entrega
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>
                                            ODT-{{odt.odt}}
                                        </td>
                                        <td>
                                            {{odt.paciente}}
                                        </td>
                                        <td>
                                            {{odt.descripcion}}
                                        </td>
                                        <td>
                                            {{odt.estado}}
                                        </td>
                                        <td>
                                            {{odt.fecha_de_entrega | nfecha}}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </b-col>

                        <b-col sm="12" class="mt-4">
                            <table class="table table-sm table-bordered xd">
                                <thead>
                                    <tr>
                                        <th class="titulo_abonos">
                                            Abonos registrados
                                        </th>
                                        <th class="titulo_abonos">
                                            Fecha
                                        </th>
                                        <th class="titulo_abonos">
                                            Tipo de pago
                                        </th>
                                        <th class="titulo_abonos">
                                            Banco
                                        </th>
                                        <th class="titulo_abonos">
                                            Correlativo / No. Boleta
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in abonos" :key="index">
                                        <td>
                                            Q{{item.abono}}
                                        </td>
                                        <td>
                                            {{item.fecha | nfecha}}
                                        </td>
                                        <td>
                                            {{item.tipoDePago}} - {{item.motivo}}
                                        </td>
                                        <td>
                                            {{item.establecimiento}}
                                        </td>
                                        <td>
                                            {{item.correlativo}}
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </b-col>
                    </b-row>
                </b-container>
                <div v-if="permisos.abonos.crear" class="addAbono" @click="abrirNuevoAbono">
                    <i class="fas fa-plus"></i>
                </div>
            </div>

        </div>


        <IngresoNuevoAbono v-if="nuevoabonomodal" v-on:cerrarIngresoNuevoAbono="cIngresoNuevoAbono" v-on:actualizarSaldos="getAbonos" :odt="odt" />


    </div>
</template>

<script>

import IngresoNuevoAbono from './IngresoNuevoAbono.vue'

import axios from 'axios'
import moment from 'moment'
import { IP, PUERTO } from "@/config/parametros";
import { mapState } from 'vuex';

export default {
    name: 'Abonos',
    props: ['odt'],
    components:{
        IngresoNuevoAbono
    },
    computed: {
        ...mapState(['permisos'])
    },
    filters: {
        nfecha: function(data){
            let fecha = moment(data).format('DD-MMM-YYYY')
            return fecha
        }
    },
    data() {
        return {
            abonos: [],
            nuevoabonomodal: false
        }
    },
    methods: {
        cerrarAbonos(){
            this.$emit('cerrarAbonos', false)
        },
        cIngresoNuevoAbono(){
            this.nuevoabonomodal = false
        },
        abrirNuevoAbono(){
            this.nuevoabonomodal = true
        },
        async getAbonos(){
            const abonos = await axios.get(`http://${IP}:${PUERTO}/api/abonos/odt/${this.odt.odt}`, this.$store.state.token)
            this.abonos = abonos.data

            this.$emit('uSaldos', true)
        }
    },
    mounted() {
        this.getAbonos()
    },
}
</script>

<style>
    .contenedor_abonos{
        width: 100%;
        height: 100vh;
        background-color: white;
        position: absolute;
        top: 0;
        left: 0;
        z-index: 998;
    }

    .barra_abonos{
        width: 100%;
        height: 50px;
        border-bottom: 1px solid #edebe9;
    }

    .cuerpo_abonos{
        width: 100%;
        height: calc(100% - 50px);
        background-color: #f5f5f5;
        padding: 20px;
        box-sizing: border-box;
    }

    .box_abonos{
        width: 100%;
        height: 100%;
        border: 1px solid #f0f0f0;
        background-color: #ffffff;
        overflow: auto;
        padding: 10px;
        box-sizing: border-box;
    }

    .cajas_marco{
        width: 100%;
        height: 82px;
        display: flex;

    }
        .td_caja{
            width: 25%;
            height: 100%;
            border: 1px solid #efefef;
            padding-left: 10px;
            box-sizing: border-box;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        .img_caja{
            width: 50px;
            height: 50px;
        }
            .cdatos{
                width: auto;
                height: 50px;
                margin-left: 10px;
                
            }

                .p_arriba{
                    font-weight: bold;
                    font-size: 1.3em;
                    line-height: 30px;
                    color: #2f3f4f;
                }

                .p_abajo{
                    font-size: 14px;
                    color: rgba(160, 160, 160, .8);
                }

        .xd{
            font-size: 13px;
        }

        .titulo_abonos{
            background-color: #26313e;
            color: white;
            width: 20%;
        }

        .addAbono{
            position: absolute;
            bottom: 30px;
            right: 30px;
            background-color: #5b85aa;
            border-radius: 50%;
            width: 45px;
            height: 45px;
            color: white;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: .4s;
            cursor: pointer;
        }

        .addAbono:hover{
            background-color: #f46036;
        }
</style>