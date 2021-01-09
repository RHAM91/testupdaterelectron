<template>
    <div class="contenedor_selecciona_elementos">
        <div class="cuerpo_selecciona_elementos">
            <div class="barra_selecciona_elementos">
                {{titulo}}
            </div>
            <div class="box_selecciona_elementos">
                <b-container fluid>
                    <b-row>
                        <b-col sm="12" class="mt-3">
                            <b-form-checkbox-group
                                v-model="selected"
                                :options="options"
                                class="mb-3 modSE"
                                value-field="elemento"
                                text-field="elemento"
                                stacked
                            ></b-form-checkbox-group>
                           
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
    name: 'SeleccionaElemento',
    props: ['el'],
    computed: {
        ...mapState(['aparatos', 'formulas', 'formulaElementos'])
    },
    data() {
        return {
            titulo: '',
            selected: [],
            options: []
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
            this.$emit('cModalSetElemento', false)
            this.linea()
        },
        doCommand(e){
            if (e.keyCode == 27) {
                this.cerrar()
            }
        },
        filtroNombre(){
            const formula = this.formulas.filter(formula => formula._id == this.el)
            this.titulo = formula[0].formula

            const elementos = this.formulaElementos.filter(elemento => elemento.IDFormula == this.el)
            this.options = elementos
        },
        linea(){

            if (this.selected == '' || this.selected.length == 0) {
                
            }else{

                let l = `${this.titulo}: ${this.selected.join(', ')}\n`
                this.$emit('opciones', l)
            }


        }
    },
    mounted() {
        this.filtroNombre()
    },
}
</script>

<style>
    .contenedor_selecciona_elementos{
        width: 100%;
        height: 100vh;
        background-color: rgba(0, 0, 0, .3);
        position: fixed;
        top: 0;
        left: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 999;
    }
        .cuerpo_selecciona_elementos{
            width: 500px;
            height: 500px;
            background-color: white;
        }

        .barra_selecciona_elementos{
            width: 100%;
            height: 40px;
            border-bottom: 1px solid #edebe9;
            display: flex;
            align-items: center;
            padding-left: 10px;
            font-size: 18px;
        }

        .box_selecciona_elementos{
            width: 100%;
            height: calc(100% - 40px);
            overflow: auto;

        }

        .modSE{
            
        }
</style>