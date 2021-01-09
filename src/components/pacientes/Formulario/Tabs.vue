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
                        <h1>Pacientes</h1>
                    </b-col>
                    <b-col sm="12">
                        <b-tabs content-class="mt-3">
                            <b-tab v-if="permisos.pacientes.listar" title="Registro de pacientes Nuevo" @click="setSubModulo('listadosinodt')" active></b-tab>
                            <b-tab v-if="permisos.pacientes.listar" title="Clientes" @click="setSubModulo('listado')"></b-tab>
                            <b-tab v-if="permisos.pacientes.crear" title="Crear expediente" @click="setSubModulo('newpaciente')"></b-tab>
                            <!-- <b-tab title="Bloqueados" @click="setSubModulo('Bloqueados')"></b-tab> -->
                        </b-tabs>
                    </b-col>

                    <b-col sm="12" v-if="submodulo == 'listadosinodt'">
                        <ListaPacientesSinOrdenes />
                    </b-col>

                    <b-col sm="12" v-if="submodulo == 'listado'">
                        <ListaPacientes />
                    </b-col>

                    <b-col sm="12" v-if="submodulo == 'newpaciente'">
                        <NewPaciente />
                    </b-col>

                    <!-- <b-col sm="12" v-if="submodulo == 'Bloqueados'">
                        <BloqueadosTab />
                    </b-col> -->

                </b-row>
            </b-container>

        </div>
     </div>
</template>

<script>

import ListaPacientes from '@/components/pacientes/Formulario/ListaPacientes.vue'
import NewPaciente from '@/components/pacientes/Formulario/NuevoPaciente.vue'
import ListaPacientesSinOrdenes from '@/components/pacientes/Formulario/ListaPacienteSinOrdenes.vue'

//--> GIF ANIMADO PARA LAS DESCARGAS

import Loading from '@/components/varios/Loading.vue'


import { mapState } from 'vuex'


export default {
    name: "Template",
    components:{
        ListaPacientes,
        NewPaciente,
        ListaPacientesSinOrdenes,
        Loading
    },
    data() {
        return {
            icono: true,
            submodulo: 'listadosinodt',
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
        }
    },
    mounted() {
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