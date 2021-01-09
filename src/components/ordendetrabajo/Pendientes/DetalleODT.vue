<template>
    <div class="contendor_detalle_odt">
        <div class="cuerpo_detalle_odt">
            <div class="barra_detalle_odt">
                <div v-if="primerAbono2" class="f_saldo">
                    Saldo pendiente
                </div>
                <div v-else style="margin-left: 10px;">
                    <i class="fas fa-file-alt" style="margin-right: 10px;"></i> ODT {{odtx}}
                </div>
            </div>
            <div class="box_detalle_odt">
                <b-container fluid>
                    <b-row>
                        <!-- <b-col sm="12" md="4" class="mt-3">
                            <b-card-group deck>
                                <b-card bg-variant="info" text-variant="white" header="Cuenta" class="text-center">
                                    <b-card-text>Q{{capital}}</b-card-text>
                                </b-card>
                            </b-card-group>
                        </b-col>
                        <b-col sm="12" md="4" class="mt-3">
                            <b-card-group deck>
                                <b-card bg-variant="warning" text-variant="white" header="Ultimo abono" class="text-center">
                                    <b-card-text>Q{{ultimoAbono}}</b-card-text>
                                </b-card>
                            </b-card-group>
                        </b-col>
                        <b-col sm="12" md="4" class="mt-3">
                            <b-card-group deck>
                                <b-card bg-variant="danger" text-variant="white" header="Saldo" class="text-center">
                                    <b-card-text>Q{{saldo}}</b-card-text>
                                </b-card>
                            </b-card-group>
                        </b-col> -->
                        <b-col sm="12" class="mt-3">
                            <div class="icos">
                                <div class="seccion">
                                    <div class="marco_foto">
                                        <img src="@/assets/coin.png" style="width: 100%;" alt="">
                                    </div>
                                    <div class="datos_abono">
                                        <div class="dinero">
                                            Q{{capital}}
                                        </div>
                                        <div class="titulo_dinero">
                                            Total deuda
                                        </div>
                                    </div>
                                </div>
                                <div class="seccion">
                                    <div class="marco_foto">
                                        <img src="@/assets/pig.png" style="width: 100%;" alt="">
                                    </div>
                                    <div class="datos_abono">
                                        <div class="dinero">
                                            Q{{ultimoAbono}}
                                        </div>
                                        <div class="titulo_dinero">
                                            Ultimo abono
                                        </div>
                                    </div>
                                </div>
                                <div class="seccion">
                                    <div class="marco_foto">
                                        <img src="@/assets/coins.png" style="width: 100%;" alt="">
                                    </div>
                                    <div class="datos_abono">
                                        <div class="dinero">
                                            Q{{saldo}}
                                        </div>
                                        <div class="titulo_dinero">
                                            Saldo pendiente
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </b-col>
                        <b-col sm="12" class="mt-3">
                            <table class="table table-sm table-bordered table-striped mododt">
                                <thead>
                                
                                </thead>
                                <tbody>

                                    <tr>
                                        <td class="elementos">
                                            Nombre del paciente
                                        </td>
                                        <td class="detalle_elementos">
                                            {{nombre}}
                                        </td>
                                    
                                    </tr>
                                    <tr>
                                        <td class="elementos">
                                            Edad
                                        </td>
                                        <td class="detalle_elementos">
                                            {{edad}} años
                                        </td>
                                        
                                    </tr>
                                    <tr>
                                        <td class="elementos">
                                            No. Orden de trabajo
                                        </td>
                                        <td class="detalle_elementos">
                                            ODT-{{odtx}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="elementos">
                                            Estado de la orden
                                        </td>
                                        <td v-if="actualizacion == false" class="detalle_elementos">
                                            {{estado}}
                                        </td>
                                        <td v-if="actualizacion" class="detalle_elementos">
                                            <select class="form-control form-control-sm" v-model="estado">
                                                <option value="Habilitada">Habilitada</option>
                                                <option value="Deshabilitada">Deshabilitada</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="elementos">
                                            Descripción
                                        </td>
                                        <td v-if="actualizacion == false" class="detalle_elementos">
                                            {{descripcion | modi}}
                                        </td>
                                        <td v-if="actualizacion" class="detalle_elementos">
                                            <b-form-input type="text" v-model="descripcion" size="sm"></b-form-input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="elementos">
                                            Transfer
                                        </td>
                                        <td v-if="actualizacion == false" class="detalle_elementos">
                                            {{transfer}}
                                        </td>
                                        <td v-if="actualizacion" class="detalle_elementos">
                                             <b-form-input type="text" id="transfer" v-model="transfer" @keydown.113="abrirModalTransfer" placeholder="F2 para buscar" readonly="" size="sm"></b-form-input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="elementos">
                                            Operador
                                        </td>
                                        <td v-if="actualizacion == false" class="detalle_elementos">
                                            {{operador}}
                                        </td>
                                        <td v-if="actualizacion" class="detalle_elementos">
                                            <select class="form-control form-control-sm" v-model="operador">
                                                <option v-for="(item, index) in operarios" :key="index" :value="item.nombre">{{item.nombre}}</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="elementos">
                                            Departamento
                                        </td>
                                        <td v-if="actualizacion == false" class="detalle_elementos">
                                            {{departamento}}
                                        </td>
                                        <td v-if="actualizacion" class="detalle_elementos">
                                             <select class="form-control form-control-sm" v-model="departamento">
                                                <option v-for="(item, index) in departamentos" :key="index" :value="item.departamento">{{item.departamento}}</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="elementos">
                                            Fecha creación
                                        </td>
                                        <td class="detalle_elementos">
                                            {{fecha | formatoFecha}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="elementos">
                                            Etapa
                                        </td>
                                        <td class="detalle_elementos">
                                            {{etapa}}
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="elementos">
                                            Fecha de producción
                                        </td>
                                        <td v-if="actualizacion == false" class="detalle_elementos">
                                            {{fecha_de_produccion | formatoFecha}}
                                        </td>
                                         <td v-if="actualizacion" class="detalle_elementos">
                                             <b-form-input type="date" v-model="fecha_de_produccion" size="sm"></b-form-input>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td class="elementos">
                                            Fecha de entrega
                                        </td>
                                        <td v-if="actualizacion == false" class="detalle_elementos">
                                            {{fecha_de_entrega | formatoFecha}}
                                        </td>
                                         <td v-if="actualizacion" class="detalle_elementos">
                                             <b-form-input type="date" v-model="fecha_de_entrega" size="sm"></b-form-input>
                                        </td>
                                    </tr>
                                </tbody>    
                            </table>
                        </b-col>
                        <b-col v-if="dateProduccion == false && actualizacion == false" sm="12" class="mt-2">
                            <div class="alerta_abono">
                                Ingresar abono y fecha de entrega
                            </div>
                        </b-col>
                        <b-col v-if="dateProduccion == false && actualizacion == false" sm="12" class="mt-3 d-flex justify-content-md-center">
                            <b-button type="button" size="sm" variant="outline-info" @click="abrirModalRegistroAbono">Abono y fecha</b-button>
                        </b-col>
                        <b-col v-if="primerAbono2 && actualizacion == false" :sm="aprobacion ? 6 : 12" class="mt-4">
                            <b-button v-if="permisos.reportes.crear" type="button" size="sm" block="" variant="info" @click="generarODT">Generar ODT</b-button>
                        </b-col>
                        <b-col v-if="aprobacion && actualizacion == false" sm="6" class="mt-4">
                            <b-button type="button" size="sm" block="" variant="warning" @click="aprobarAparato">Aprobar aparto</b-button>
                        </b-col>
                        <b-col v-if="actualizacion" sm="12" class="mt-2">
                            <b-button type="button" size="sm" block="" variant="success" @click="actualizar">Actualizar</b-button>
                        </b-col>
                        <b-col v-if="franja" sm="12" class="mt-4">
                            <b-button type="button" size="sm" block="" variant="success" @click="cerrarOrden">Cerrar orden</b-button>
                        </b-col>
                    </b-row>
                </b-container>
            </div>
        </div>

        <div v-if="showbtn" class="menu_btns">
            <div v-if="permisos.abonos.mostrar">
                <div v-if="dateProduccion == true" class="menu_circulo_b"  title="Abono" @click="agregarAbono">
                    <i class="fab fa-quora"></i>
                </div>
            </div>
             <div v-if="permisos.odt.actualizar" class="menu_circulo_b" title="Actualizar" @click="modactualizar">
                <i class="fas fa-pen"></i>
            </div>
            <div v-if="permisos.odt.borrar" class="menu_circulo_b" title="borrar" @click="borrar">
                <i class="fas fa-minus"></i>
            </div>
        </div>


        <div class="menu_btn">
            <div :class="['menu_circulo', showbtn ? 'rotar' : 'rator']" @click="mostrar_botones">
                <i class="fas fa-plus"></i>
            </div>
        </div>

        <RegistroAbonos v-if="modalRegistroAbonos" v-on:cModalRegistroAbonos="cerrarModalReg" :odtRA="objPaciente" />
        <Abonos v-if="mostrarAbonos" v-on:cerrarAbonos="cAbonos" v-on:uSaldos="obtenerSaldo" :odt="datosSaldos"/>
        <Transfer v-if="modalTransfer"  v-on:transfer_seleccionado="selecciona_transfer"/>

    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import axios from 'axios'
import { IP, PUERTO } from '@/config/parametros'
import { pregunta, minix } from '@/components/functions/alertas'
import moment from 'moment'
import { ipcRenderer } from 'electron'

import RegistroAbonos from './RegistroAbonos.vue'
import Abonos from './Abonos.vue'
import Transfer from '../../ordendetrabajo/NuevaODT/ElegirTransfer.vue'


export default {
    name: "Detalle",
    props: ['odtx'],
    filters:{
        modi: function(val){
            let nuw = val.replace(/<br>/g, '.\n');
            return nuw
        },
        formatoFecha: function(val){
            let nwfecha = moment(val).format('DD-MM-YYYY')
            return nwfecha
        }
    },
    components: {
        RegistroAbonos,
        Abonos,
        Transfer
    },
    computed: {
        ...mapState(['odts', 'operarios', 'departamentos', 'permisos'])
    },
    data() {
        return {
            nombre: '',
            edad: '',
            estado: '',
            descripcion: '',
            fecha: '',
            etapa: '',
            transfer: '',
            operador: '',
            departamento: '',
            fecha_de_produccion: '',
            fecha_de_entrega: '',
            objPaciente: {},
            datosSaldos: {},
            franja: false,
            aprobacion: false,
            showbtn: false,
            mostrarAbonos: false,
            actualizacion: false,
            modalTransfer: false,


            modalRegistroAbonos: false,
            

            capital: 0,
            ultimoAbono: 0,
            saldo: 0,
            primerAbono2: false,
            dateProduccion: false,
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
            this.$emit('cModalODT', false)
        },
        doCommand(e){
            if (e.keyCode == 27) {
                this.cerrar()
            }
        },
        detalleODT(){

            const ordenes = this.odts.filter(orden => orden.odt == this.odtx)

            this.nombre = ordenes[0].nombre
            this.edad = ordenes[0].edad
            this.estado = ordenes[0].estado
            this.descripcion = ordenes[0].descripcion
            this.fecha = ordenes[0].fecha
            this.etapa = ordenes[0].etapa
            this.fecha_de_produccion = ordenes[0].fecha_de_produccion
            this.fecha_de_entrega = ordenes[0].fecha_de_entrega
            this.transfer = ordenes[0].transfer
            this.operador = ordenes[0].operador
            this.departamento = ordenes[0].departamento
            this.objPaciente = {
                odt: this.odtx,
                pid: ordenes[0].pid,
                nombre: ordenes[0].nombre
            }

        },
        async consultaEtapa(){
            const etapa = await axios.get(`http://${IP}:${PUERTO}/api/odt/consultaetapa/${this.odtx}`, this.$store.state.token)


            switch (etapa.data[0].etapa) {
                case 'entrega':
                    this.aprobacion = false
                    break;
                case 'inicial':
                    this.aprobacion = false
                    break
                case 'completa':
                    this.aprobacion = false
                    break
                default:
                    this.aprobacion = true
                    break;
            }
            
        },
        async obtenerSaldo(){

            const saldos = await axios.get(`http://${IP}:${PUERTO}/api/capital/saldos/${this.odtx}`, this.$store.state.token)
            

            this.capital = saldos.data.capital
            this.ultimoAbono = saldos.data.ultimoAbono.abono
            this.saldo = saldos.data.saldo
            this.dateProduccion = saldos.data.reDateProduccion
            this.primerAbono2 = saldos.data.primerAbono
            this.franja = saldos.data.saldo0

            this.datosSaldos = {
                odt: this.odtx,
                capital: saldos.data.capital,
                ultimoAbono: saldos.data.ultimoAbono.abono,
                saldo: saldos.data.saldo,
                pid: this.objPaciente.pid,
                paciente: this.nombre,
                descripcion: this.descripcion,
                estado: this.estado,
                fecha_de_entrega: this.fecha_de_entrega

            }

            this.consultaEtapa()
        },
        async aprobarAparato(){
            let data = {
                api: 'odt/code',
                id: this.odtx,
                formulario: {
                    etapa: 'entrega'
                }
            }

            await this.updateData(data)
            await this.wse(this.$store.state.rutas.odts)
            await this.obtenerSaldo()
        },
        mostrar_botones(){
            this.showbtn = !this.showbtn
        },
        agregarAbono(){
            this.mostrarAbonos = true
        },
        modactualizar(){
            this.actualizacion = !this.actualizacion
        },
        async actualizar(){
            let data = {
                api: 'odt/code',
                id: this.odtx,
                formulario: {
                    estado: this.estado,
                    descripcion: this.descripcion,
                    fecha_de_produccion: this.fecha_de_produccion,
                    fecha_de_entrega: this.fecha_de_entrega,
                    operador: this.operador,
                    transfer: this.transfer,
                    departamento: this.departamento
                }
            }

            await this.updateData(data)
            await this.wse(this.$store.state.rutas.odts)

            this.modactualizar()
        },
        borrar(){
            pregunta({titulo: 'Quieres borrarlo?', texto: 'Esta acción no se puede revertir', afirmacion: 'Si, borrarlo!'}, async (i) =>{

                if (i) {
                
                    let data = {
                        api: 'odt',
                        id: this.odtx
                    }

                    await this.deleteData(data)
                    await this.wse(this.$store.state.rutas.odts)
                    this.cerrar()
                
                }
            })

        },
        async generarODT(){
            
            let data = {
                odt: this.odtx
            }
            
            const documentopdf = await axios.post(`http://${IP}:${PUERTO}/api/reportes`, data, this.$store.state.token)

            await ipcRenderer.send('romario', `http://${IP}:${PUERTO}/pdf/${documentopdf.data.message}`)


        },
        async cerrarOrden(){

            if (this.aprobacion == false) {
                
                let data = {
                    api: 'odt/code',
                    id: this.odtx,
                    formulario: {
                        etapa: 'cerrada'
                    }
                }
    
                await this.updateData(data)
                await this.wse(this.$store.state.rutas.odts)
    
    
                this.cerrar()
            }else{
                minix({icon: 'error', mensaje: 'Debes aprobar primero el aparato', tiempo: 3000})
            }



        },
        cAbonos(){
            this.mostrarAbonos = false
        },
        abrirModalRegistroAbono(){
            this.modalRegistroAbonos = true
        },
        abrirModalTransfer(){
            this.modalTransfer = true
        },
        selecciona_transfer(transfer){
            this.transfer = transfer
            this.modalTransfer = false
            document.getElementById('transfer').focus()
        },
        cerrarModalReg(){
            this.modalRegistroAbonos = false
            this.obtenerSaldo()
            this.detalleODT()
        },
        ...mapActions(['wse','updateData', 'deleteData', 'insert_data'])
    },
    mounted() {
        this.detalleODT()
        this.obtenerSaldo()
    },
}
</script>

<style>
    .contendor_detalle_odt{
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
        .cuerpo_detalle_odt{
            width: 700px;
            height: 700px;
            background-color: white;
        }

        .barra_detalle_odt{
            width: 100%;
            height: 40px;
            border-bottom: 1px solid #ede9eb;
            display: flex;
            align-items: center;

            font-size: 18px;
        }

        .box_detalle_odt{
            width: 100%;
            height: calc(100% - 40px);
            overflow: auto;
            padding-bottom: 10px;
        }
            .mododt{
                font-size: 14px;
            }
                .elementos{
                    font-weight: bold;
                    width: 30%;
                }
                .detalle_elementos{
                    width: 70%;
                }

                .alerta_abono{
                    width: 100%;
                    height: 30px;
                    color: white;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    background-color: #ee4825;

                }

                .f_saldo{
                    width: 100%;
                    height: 40px;
                    color: white;
                    background-color: orangered;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                }

                .icos{
                    width: 100%;
                    height: 100px;
                    display: flex;
                    /* justify-content: space-between; */
                }

                .seccion{
                    width: 223px;
                    height: 100%;
                    border: 1px solid #efefef;
                    display: flex;
                    align-items: center;
                }

                .marco_foto{
                    width: 60px;
                    height: 60px;
                    
                    margin-left: 10px;
                    margin-right: 10px;
                }

                .datos_abono{
                    width: calc(100% - 70px);
                    height: 60px;
                 
                }

                .dinero{
                    
                    font-size: 20px;
                    font-weight: bold;
                }

                .titulo_dinero{
                    color: #b3b3b3;
                    font-size: 14px;
                }
    
    .menu_btn{
        width: 45px;
        height: 45px;
        position: absolute;
        bottom: 10px;
        right: 10px;
        z-index: 998;
    }
        .menu_circulo{
            width: 43px;
            height: 43px;
            border-radius: 50%;
            background-color: #2c6e49;
            color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            transition: .4s;
            cursor: pointer;
        }

        .menu_circulo:hover{
            background-color: #4c956c;
        }

        .rotar{
            transition: .4s;
            transform: rotate(90deg);
        }

        .rator{
            transition: .4s;
            transform: rotate(-90deg);
        }


        .menu_btns{
            position: absolute;
            bottom: 65px;
            right: 10px;
            
            width: 45px;
            height: 150px;
        }
            .menu_circulo_b{
                width: 43px;
                height: 43px;
                border-radius: 50%;
                background-color: #cc0f1f;
                color: white;
                display: flex;
                justify-content: center;
                align-items: center;
                transition: .4s;
                cursor: pointer;
                z-index: 999;
                margin-bottom: 5px;
            }

            .menu_circulo_b:hover{
                transform: scale(1.2);
            }

</style>