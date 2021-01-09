<template>
    <b-container fluid>
        <b-row>
            <b-col sm="12" class="mt-2">
                <b-input-group size="sm">
                    <b-input-group-prepend is-text>
                        <b-icon icon="search"></b-icon>
                    </b-input-group-prepend>
                    <b-form-input type="search" v-model="search" id="clie" size="sm" placeholder="Buscar" autocomplete="off"></b-form-input>
                </b-input-group>
            </b-col>
            <b-col sm="12" class="mt-3">
                


                <b-table class="table-bordered table-striped" :items="spacientes" :fields="fields" :per-page="perPage" :current-page="currentPage" small style="font-size: 13px;">
					<template v-slot:cell(btn) = 'row'>
                        <div style="display: flex; justify-content:center;">
                            <b-button type="button" size="sm" class="btn-spaces" title="Ficha paciente" variant="warning" @click="modalFichaPaciente(row.item._id)"><i class="fas fa-info-circle"></i></b-button>
                            <b-button v-if="permisos.pacientes.borrar" type="button" size="sm" class="btn-spaces" title="Ficha paciente" variant="danger" @click="removerPaciente(row.item._id)"><i class="fas fa-minus-square"></i></b-button>
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


        <FichaPaciente v-if="modalPacientes" :IDEpaciente="idPaciente" v-on:cmodalfichapaciente="cerrarModalPacientes" />


    </b-container>
</template>

<script>
import { mapState, mapActions, mapGetters } from 'vuex'
import FichaPaciente from '@/components/pacientes/Formulario/ModalFichaPaciente.vue'
import { pregunta } from '@/components/functions/alertas'


export default {
    name: 'ListaPacientes',
    components:{
        FichaPaciente
    },
    computed: {
        ...mapState(['permisos']),
        search: {
            get (){
                return this.$store.state.filterPacientes.query
            },
            set(val){
                this.$store.commit('set_querypaciente', val.toLowerCase())
            }
        },
        rows(){
            return this.spacientes.length
		},
        ...mapGetters({
            spacientes : 'filteredPaciente'
        })
    },
    data() {
        return {
            idPaciente: '',
            modalPacientes: false,
            perPage: 15,
			currentPage: 1,
            fields: [
                {
                    key: 'nombre',
                    thStyle: 'width: 25%;',
                },
                {
                    key: 'departamento',
                    thStyle: 'width: 15%;'
                },
                {
                    key: 'diagnostico',
                    thStyle: 'width: 47%;'
                },
                {
                    key: 'btn',
                    thStyle: 'width: 13%;'
                }
            ]

        }
    },
    methods: {
        cerrarModalPacientes(){
            this.modalPacientes = false
        },
        modalFichaPaciente(id){
            this.idPaciente = id
            this.modalPacientes = true
        },
        async removerPaciente(id){

            pregunta({titulo: 'Quieres borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    
                    let data = {
                        api: 'pacientes',
                        id
                    }

                    await this.deleteData(data)
                    await this.wse(this.$store.state.rutas.pacientes)

                }
            })
        },
        ...mapActions(['deleteData', 'wse'])
    },
    mounted() {
        document.getElementById('clie').focus()
    },
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
        height: auto;
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