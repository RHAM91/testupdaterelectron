<template>
    <b-container fluid>
        <b-row>
            <b-col sm="2" class="mt-3">
                <label>Departamento</label>
                <select class="form-control form-control-sm" v-model="departamento">
                    <optgroup label="-------------------------">
                        <option value="crono">Cronológicamente</option>
                    </optgroup>
                    <optgroup label="-------------------------">
                        <option v-for="(item, index) in departamentos" :key="index" :value="item.departamento">{{item.departamento}}</option>
                    </optgroup>
                </select>
            </b-col>
            <b-col sm="2" class="mt-3">
                <label>Etapa</label>
                <select class="form-control form-control-sm" v-model="etapa">
                    <option value="produccion">Producción</option>
                    <option value="inicial">Inicial</option>
                    <option value="cerrada">Cerrada</option>
                    <option value="entrega">Entrega</option>
                    <option value="completa">Completa</option>
                </select>
            </b-col>
            <b-col sm="2" class="mt-3">
                <label>Fecha inicial</label>
                <b-form-input type="date" size="sm" v-model="fechai"></b-form-input>
            </b-col>
             <b-col sm="2" class="mt-3">
                <label>Fecha final</label>
                <b-form-input type="date" size="sm" v-model="fechaf"></b-form-input>
            </b-col>
             <b-col sm="2" class="mt-5">
                <b-button type="button" size="sm" block="" variant="success" @click="filtrarODT">Consultar</b-button>
            </b-col>
             <b-col sm="2" class="mt-5">
                <b-button type="button" size="sm" block="" variant="warning" @click="imprimirLista">Imprimir</b-button>
            </b-col>

             <b-col sm="12" class="mt-3">
                 <table class="table table-sm table-bordered table-striped mod_listado">
                     <thead>
                         <tr>
                             <th style="width: 5%">
                                 ODT
                             </th>
                             <th style="width: 10%">
                                 Paciente
                             </th>
                             <th style="width: 7%">
                                 Fecha
                             </th>
                             <th style="width: 7%">
                                 F.Entrega
                             </th>
                             <th style="width: 50%">
                                 Descripción
                             </th>
                             <th style="width: 8%">
                                 Lugar
                             </th>
                             <th style="width: 8%">
                                 Etapa
                             </th>
                         </tr>
                     </thead>
                     <tbody>
                         <tr v-for="(item, index) in odts" :key="index">
                             <td class="customtable">
                                 {{item.odt}}
                             </td>
                             <td class="customtable">
                                 {{item.nombre}}
                             </td>
                             <td class="customtable">
                                 {{item.fecha | formatoFecha}}
                             </td>
                             <td class="customtable">
                                 {{item.fecha_de_entrega | formatoFecha}}
                             </td>
                             <td class="customtable">
                                 {{item.descripcion}}
                             </td>
                             <td class="customtable">
                                 {{item.departamento}}
                             </td>
                             <td class="customtable">
                                 {{item.etapa}}
                             </td>
                         </tr>
                     </tbody>
                 </table>
            </b-col>
        </b-row>
    </b-container>
</template>

<script>
import { mapState } from 'vuex'
import axios from 'axios'
import { IP, PUERTO } from '@/config/parametros'
import { minix } from '@/components/functions/alertas'
import moment from 'moment'

export default {
    name: "ListadoTrabajo",
    computed: {
        ...mapState(['departamentos'])
    },
    data() {
        return {
            departamento: 'crono',
            etapa: 'produccion',
            fechai: '',
            fechaf: '',

            odts: []
        }
    },
    filters:{
        formatoFecha: function(fecha){
            let nfecha = moment(fecha).format('DD/MMM/YYYY')
            return nfecha
        }
    },
    methods: {
        async filtrarODT(){

            if (this.fechai == '' || this.fechaf == '') {

                minix({icon: 'error', mensaje: 'Todos los campos deben estar llenos', tiempo: 3000})

            }else{

                let data = {
                    departamento: this.departamento.toLowerCase(),
                    etapa: this.etapa,
                    fechai: this.fechai,
                    fechaf: this.fechaf
                }
    
    
                const odtfiltro = await axios.post(`http://${IP}:${PUERTO}/api/odt/consulta2`, data, this.$store.state.token)
                this.odts = odtfiltro.data
            }


        },
        async imprimirLista(){

            if (this.fechai == '' || this.fechaf == '') {

                minix({icon: 'error', mensaje: 'Todos los campos deben estar llenos', tiempo: 3000})

            }else{

                let data = {
                    departamento: this.departamento.toLowerCase(),
                    etapa: this.etapa,
                    fechai: this.fechai,
                    fechaf: this.fechaf
                }
    
    
                const listaPDF = await axios.post(`http://${IP}:${PUERTO}/api/odt/lista`, data, this.$store.state.token)
                await window.open(`http://${IP}:${PUERTO}/pdf/${listaPDF.data.message}`, '_blank');

            }
        },
        aplicaFecha(){
            let fechaActual = moment(Date.now()).format('YYYY-MM-DD')
            this.fechai = fechaActual
            this.fechaf = fechaActual
        }
    },
    mounted() {
        this.aplicaFecha()
    },
}
</script>

<style>
    .mod_listado{
        font-size: 13px;
    }
        .customtable{
            font-size: 12px;
        }
</style>