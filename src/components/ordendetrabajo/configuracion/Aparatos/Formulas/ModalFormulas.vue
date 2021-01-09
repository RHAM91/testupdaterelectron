<template>
    <div class="contenedor_add_formula">
        <div class="formulario_formula">
            <div class="barra_formula">
                Fórmulas
            </div>
            <div class="cuerpo_formula">
                <b-container fluid>
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <h3>
                                {{tituloAparato}}
                            </h3>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <b-form-input v-if="permisos.formulas.crear" type="text" id="formula" v-model="formula" size="sm" required placeholder="Fórmula (Enter para agregar)" @keydown.enter="guardar"></b-form-input>
                        </b-col>
                        
                        <b-col sm="12" class="mt-3">
                            <table class="table table-sm table-bordered table-striped mod_formula">
                                <thead>
                                    <tr>
                                        <th style="width: 75%">
                                            Fórmula
                                        </th>
                                        <th style="width: 25%">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in nFormulas" :key="index">
                                        <td>
                                            <div class="fila_1_formula">
                                                {{item.formula}}
                                            </div>
                                        </td>
                                        <td class="xbtn">
                                            <b-button type="button" size="sm" variant="info" @click="abrir_modalElementos(item._id)"><i class="fas fa-plus"></i></b-button>
                                            <b-button v-if="permisos.formulas.actualizar" type="button" size="sm" title="Editar" variant="primary" @click="actualizar(item._id, item.formula)"><i class="fas fa-edit"></i></b-button>
                                            <b-button v-if="permisos.formulas.borrar" type="button" size="sm" variant="danger" @click="eliminar(item._id)"><i class="fas fa-minus"></i></b-button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </b-col>
                    </b-row>
                </b-container>
            </div> 
        </div>


        <Elementos v-if="ModalElementos" v-on:cModalElemento="cerrarModalElemento" :idf="IDFormula" :ida="i" />


    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex'
import { minix, texto, pregunta } from '@/components/functions/alertas'
import Elementos from './Elementos.vue'

export default {
    name: "ModalFormula",
    props: ['i'],
    components:{
        Elementos
    },
    computed: {
        ...mapState(['formulas', 'aparatos', 'permisos'])
    },
    data() {
        return {
            ModalElementos: false,
            IDFormula: '',
            nFormulas: [],
            formula: '',
            tituloAparato: ''
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
            this.$emit('cModalFormula', false)
        },
        doCommand(e){
            if (e.keyCode == 27) {
                this.cerrar()
            }
        },
        async guardar(){

            if (this.formula.trim() == '' || this.formula.trim == undefined) {
                minix({icon: 'error', mensaje: 'El campo formula no puede ir vacio!', tiempo: 3000})
            }else{
                let data = {
                    api: 'formulas',
                    formulario: {
                        IDAparato: this.i,
                        formula: this.formula.toUpperCase()
                    }
                }
    
                await this.insert_data(data)
                await this.wse(this.$store.state.rutas.formulas)

                this.formula = ''
                document.getElementById('formula').focus()

            }

        },
        actualizar(id, valor){
            texto({valor}, async (e)=>{

                let data = {
                    api: 'formulas',
                    id,
                    formulario: {
                        formula: e
                    }
                }

                await this.updateData(data)
                await this.wse(this.$store.state.rutas.formulas)

            })
        },
        eliminar(id){
             pregunta({titulo: 'Quieres borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    
                    let data = {
                        api: 'formulas',
                        id
                    }
                   
                    await this.deleteData(data)
                    await this.wse(this.$store.state.rutas.formulas)
                }
            })
        },
        filtrar(){
            const titulo = this.aparatos.filter(aparato => aparato._id.includes(this.i))
            this.tituloAparato = titulo[0].aparato

            const formula = this.formulas.filter(formula => formula.IDAparato.includes(this.i))
            this.nFormulas = formula
        },
        abrir_modalElementos(id){
            this.ModalElementos = true
            this.IDFormula = id
        },
        cerrarModalElemento(){
            this.ModalElementos = false
            document.getElementById('formula').focus()
        },
        ...mapActions(['wse', 'insert_data', 'updateData', 'deleteData'])
    },
    mounted() {
        // document.getElementById('formula').focus()
        this.filtrar()
    },
    watch: {
        formulas: function(){
            this.filtrar()
        }
    },
}
</script>

<style scoped>

    .mod_formula{
        font-size: 13px;
    }

    .contenedor_add_formula{
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
        .formulario_formula{
            width: 500px;
            height: 500px;
            background-color: #ffffff;
        }

        .barra_formula{
            width: 100%;
            height: 40px;
            border-bottom: 1px solid #edebe9;
            font-size: 19px;
            display: flex;
            align-items: center;
            padding-left: 10px;
        }

        .cuerpo_formula{
            width: 100%;
            height: calc(100% - 40px);
            overflow: auto;
        }

            .fila_1_formula{
                height: 30px;
                display: flex;
                align-items: center;
            }

            .xbtn{
                display: flex;
                justify-content: space-between;
            }
</style>

