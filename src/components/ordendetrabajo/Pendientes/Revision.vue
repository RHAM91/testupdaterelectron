<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-2">
                <b-input-group size="sm">
                    <b-input-group-prepend is-text>
                        <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input type="search" v-model="searchrev"  size="sm" placeholder="Buscar" autocomplete="off"></b-form-input>
                </b-input-group>
            </b-col>
            <b-col sm="12" class="mt-2">

                
                <b-table class="table-striped" :items="odt_r" :fields="fields" :per-page="perPage" :current-page="currentPage" small style="font-size: 13px;">
					<template v-slot:cell(btn) = 'row'>
                        <b-button type="button" style="margin-right: 5px;" title="Abrir" size="sm" variant="danger" @click="abrirODTRevision(row.item.odt)"><i class="far fa-folder-open"></i></b-button>                        
					</template>
                    <template v-slot:cell(descripcion) = 'descript'>
                        {{descript.item.descripcion.substr(0, 110) + "..."}}
                    </template>
                    <template v-slot:cell(departamento) = 'depto'>
                        <div :class="depto.item.departamento == 'capital' ? 'no_depa': 'depa'">
                            {{depto.item.departamento}}
                        </div>
                    </template>
                     <template v-slot:cell(etapa) = 'eta'>
                        <div class="_clase">
                            {{eta.item.etapa}}
                        </div>
                    </template>
                    <template v-slot:cell(fecha_de_produccion) = 'fpro'>
                        <div class="_clase">
                            {{fpro.item.fecha_de_produccion }}
                        </div>
                    </template>
                    <template v-slot:cell(fecha_de_entrega) = 'fent'>
                        
                         <div v-if="fent.item.diferencia < 0" class="_claseYellow">
                            {{fent.item.fecha_de_entrega }}
                             Excedido {{fent.item.diferencia * -1}} dias
                        </div>
                        <div v-else-if="fent.item.diferencia <= 3" class="_claseRed">
                            {{fent.item.fecha_de_entrega }}
                             Queda {{fent.item.diferencia + 2}} dias
                        </div>
                        <div v-else class="_clase">
                            {{fent.item.fecha_de_entrega }} 
                           
                        </div>
                    </template>
				</b-table>

                <b-pagination
                        v-model="currentPage"
                        :total-rows="rows"
                        :per-page="perPage"
                        aria-controls="my-table"
					></b-pagination>

            </b-col>
        </b-row>


    <DetalleODT v-if="modalODT" :odtx="codigoODT" v-on:cModalODT="cerrarODTRevision" />



    </b-container>
</template>

<script>
import { mapState, mapGetters } from 'vuex'

import DetalleODT from './DetalleODT'
import moment from 'moment'

export default {
    name: "Revision",
    components:{
        DetalleODT
    },
    filters:{
        formateoFecha(val){
            let fech = moment(val).format('DD-MM-YYYY')
            return fech
        }
    },
    computed: {
        ...mapState(['odts']),
        searchrev: {
            get(){
                return this.$store.state.filterPacientes.filter_odts
            },
            set(val){
                this.$store.commit('set_queryodts', val.toLowerCase())
            }
        },
        rows(){
            return this.odt_r.length
		},
        ...mapGetters({
            odt_r: 'filterODTs'
        })
    },
    data() {
        return {
            modalODT: false,
            codigoODT: '',
            perPage: 12,
			currentPage: 1,
            fields: [
                {
                    key: 'odt',
                    thStyle: 'width: 5%;',
                },
                {
                    key: 'nombre',
                    thStyle: 'width: 20%;'
                },
                {
                    key: 'descripcion',
                    thStyle: 'width: 30%;',
                    
                },
                {
                    key: 'departamento',
                    thStyle: 'width: 10%;text-align:center',
                    tdClass: 'centrado'
                },
                {
                    key: 'etapa',
                    thStyle: 'width: 10%;text-align:center'
                },
                {
                    key: 'fecha_de_produccion',
                    thStyle: 'width: 10%;text-align:center'
                },
                {
                    key: 'fecha_de_entrega',
                    thStyle: 'width: 10%;text-align:center'
                },
                {
                    key: 'btn',
                    thStyle: 'width: 5%;text-align:center'
                }
            ]
            
        }
    },
    methods: {
        abrirODTRevision(odt){
            this.codigoODT = odt
            this.modalODT = true
        },
        cerrarODTRevision(){
            this.modalODT = false
        }
    },
}
</script>

<style>
/* 26313e */
.tap{
    /* background-color: #36313e;
    color: white;
    border: 1px solid #36313e; */
    text-align: center;
}

.mod-revision{
    font-size: 13px;
}

.body-revision{
    text-align: center;
}

.depa{
    width: 120px;
    height: 50px;
    background-color: #88AD28;
    color: white;
    display: flex;
    justify-content: center;
    align-items: center;
}

.no_depa{
    width: 120px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: none !important;
}

._clase{
    width: 120px;
    height: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: none !important;
}

._claseRed{
    width: 120px;
    height: 50px;
    text-align: center;
    background-color: #fb6b5b;
    color: white;
    border-top: none !important;
    padding-top: 5px;
    box-sizing: border-box;
    
}

._claseYellow{
    width: 120px;
    height: 50px;
    text-align: center;
    background-color: #FEB22C;
    color: white;
    border-top: none !important;
    padding-top: 5px;
    box-sizing: border-box;
    
}

.centrado{
    display: flex;
    justify-content: center;
}


</style>