<template>
    <div class="contenedor_elementos">
        <div class="cuerpo_elementos">
            <!-- <button @click="cerrar">cerrar</button> -->
            <div class="barra_elementos">
                Elementos <b-button type="button" size="sm" variant="light" title="Regresar" @click="cerrar"><i class="fas fa-arrow-circle-left"></i></b-button>
            </div>
            <div class="box_elementos">
                <b-container fluid>
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <h3>
                                {{tituloFormula}}
                            </h3>
                        </b-col>
                        <b-col v-if="permisos.formulaElementos.crear" sm="12" class="mt-3">
                            <b-form-input type="text" id="elemento" v-model="elemento" size="sm" required placeholder="Elemento (Enter para agregar)" @keydown.enter="guardar"></b-form-input>
                        </b-col>
                        
                        <b-col sm="12" class="mt-3">
                            <table class="table table-sm table-bordered table-striped mod_formula">
                                <thead>
                                    <tr>
                                        <th style="width: 82%">
                                            Elemento
                                        </th>
                                        <th style="width: 23%">

                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr v-for="(item, index) in nElementos" :key="index">
                                        <td>
                                            <div class="fila_1_formula">
                                                {{item.elemento}}
                                            </div>
                                        </td>
                                        <td class="mbtn">
                                            <b-button v-if="permisos.formulaElementos.actualizar" type="button" size="sm" variant="primary" @click="actualizar(item._id, item.elemento)"><i class="fas fa-edit"></i></b-button>
                                            <b-button v-if="permisos.formulaElementos.borrar" type="button" size="sm" variant="danger" @click="eliminar(item._id)"><i class="fas fa-minus"></i></b-button>
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
import { mapState, mapActions } from 'vuex'
import { minix, pregunta, texto } from '@/components/functions/alertas'


export default {
    name: 'Elementos',
    props:['idf', 'ida'],
    computed: {
        ...mapState(['formulas', 'formulaElementos', 'permisos'])
    },
    data() {
        return {
            elemento: '',
            tituloFormula: '',
            nElementos: []
        }
    },
    methods: {
        cerrar(){
            this.$emit('cModalElemento', false)
        },
        async guardar(){

            if (this.elemento.trim() == '' || this.elemento.trim == undefined) {
                minix({icon: 'error', mensaje: 'El campo elemento no puede ir vacio!', tiempo: 3000})
            }else{

                let data = {
                    api: 'formulaElementos',
                    formulario: {
                        IDAparato: this.ida,
                        IDFormula: this.idf,
                        elemento: this.elemento
                    }
                }
    
                await this.insert_data(data)
                await this.wse(this.$store.state.rutas.formulaElementos)

                this.elemento = ''
                document.getElementById('elemento').focus()
            }

        },
        async eliminar(id){

            pregunta({titulo: 'Quieres borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                    
                    let data = {
                        api: 'formulaElementos',
                        id
                    }
                   
                    await this.deleteData(data)
                    await this.wse(this.$store.state.rutas.formulaElementos)

                    document.getElementById('elemento').focus()
                }
            })

        },
        actualizar(id, valor){

            texto({valor}, async (e)=>{

                let data = {
                    api: 'formulaElementos',
                    id,
                    formulario: {
                        elemento: e
                    }
                }

                await this.updateData(data)
                await this.wse(this.$store.state.rutas.formulaElementos)

            })
        },
        filtrar(){
            const titulo = this.formulas.filter(formula => formula._id.includes(this.idf))
            this.tituloFormula = titulo[0].formula

            const elementos = this.formulaElementos.filter(elemento => elemento.IDFormula.includes(this.idf))
            this.nElementos = elementos

        },
        ...mapActions(['wse', 'insert_data', 'deleteData', 'updateData'])
    },
    mounted() {
        // document.getElementById('elemento').focus()
        this.filtrar()
    },
    watch: {
        formulaElementos: function(){
            this.filtrar()
        }
    },
}
</script>

<style >

    .mod_formula{
        font-size: 13px;
    }

    .contenedor_elementos{
        width: 100%;
        height: 100%;
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000;
    }
        .cuerpo_elementos{
            width: 500px;
            height: 500px;
            background-color: #ffffff;
        }

        .barra_elementos{
            width: 100%;
            height: 40px;
            border-bottom: 1px solid #edebe9;
            font-size: 19px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding-left: 10px;
            padding-right: 10px;
            
        }
            .box_elementos{
                width: 100%;
                height: calc(100% - 40px);
                overflow: auto;
            }

            .mbtn{
                display: flex;
                justify-content: space-between;
            }

            .fila_1_formula{
                height: 30px;
                display: flex;
                align-items: center;
            }
</style>