<template>

     <div>
        <div class="barra" id="navb">
            <div class="menu" @click="AbrirMenu" v-if="icono">
                <i class="far fa-arrow-alt-circle-left"></i>
            </div>
            <div class="menu" @click="AbrirMenu" v-else>
                <i class="fas fa-bars"></i>
            </div>

            <Loading />

            <!-- COMPONENTES DEL MENU -->
        </div>
        <div class="box">
            <b-container fluid>
                <b-row>
                    <b-col sm="12">
                        <h1>Orden de trabajo</h1>
                    </b-col>
                    <b-col sm="12">
                        <b-tabs content-class="mt-3">
                            <b-tab v-if="permisos.odt.crear" title="Generar nueva ODT" @click="setSubModulo('odt')" active></b-tab>
                            <b-tab title="Historial de ODT's" @click="setSubModulo('revision')"></b-tab>
                            <b-tab title="Listado de ODT's" @click="setSubModulo('listado')"></b-tab>
                            
                        </b-tabs>
                    </b-col>


                    <b-col sm="12" v-if="submodulo == 'odt'">
                        <NuevoRegistro />
                    </b-col>

                    <b-col sm="12" v-if="submodulo == 'revision'">
                        <Revision />
                    </b-col>

                    <b-col sm="12" v-if="submodulo == 'listado'">
                        <ListadoTrabajos />
                    </b-col>



                </b-row>
            </b-container>
        </div>
     </div>
</template>

<script>

import NuevoRegistro from '@/components/ordendetrabajo/NuevaODT/NuevoRegistro.vue'
import Revision from './Pendientes/Revision.vue'
import ListadoTrabajos from './Listado/Listado.vue'

//--> GIF ANIMADO PARA LAS DESCARGAS

import Loading from '@/components/varios/Loading.vue'


import { mapState } from 'vuex'


export default {
    name: "Template",
    components:{
        NuevoRegistro,
        Loading,
        Revision,
        ListadoTrabajos
    },
    data() {
        return {
            icono: true,
            submodulo: 'odt',
        }
    },
    computed: {
        ...mapState(['permisos'])
    },
    methods: {
        AbrirMenu(){
            this.$emit('OpenMenu', true)
            this.icono = !this.icono
        },
        setSubModulo(sub){
            this.submodulo = sub
        },
        default(){
            if (this.permisos.odt.crear) {
                this.submodulo = 'odt'
            }else{
                this.submodulo = 'revision'
            }
        }
    },
    mounted() {
        this.default()
    },
}
</script>

<style scope>
    .menu{
        width: 48px;
        height: 48px;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 25px;
        cursor: pointer;
        color: rgb(63, 70, 76);
    }

    .barra{
        width: 100%;
        height: 48px;
        background-color: white;
        transition: .2s ease;
        position: sticky;
        top: 0;
    }

    .box{
        padding: 10px;
        box-sizing: border-box;
    }

   
</style>