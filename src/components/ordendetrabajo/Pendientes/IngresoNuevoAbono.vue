<template>
    <div class="contendor_detalle_odt">
        <div class="cuerpo_detalle_odt">
            <div class="barra_detalle_odt" style="padding-left: 10px; position: relative;">
                Ingresar abonos
                <b-button type="button" size="sm" variant="light" style="position: absolute; right: 5px;" @click="cerrar">Cancelar</b-button>
            </div>
            <div class="box_detalle_odt">
                <b-container>
                    <form @submit.prevent="guardar">
                        <b-row>
                            <b-col sm="12" class="mt-3">
                                <label>Tipo de pago</label>
                                <select class="form-control form-control-sm" v-model="tipopago">
                                    <option value="efectivo">Efectivo</option>
                                    <option value="cheque">Cheque</option>
                                    <option value="deposito">Depósito</option>
                                    <option value="tarjeta">Tarjeta</option>
                                </select>
                            </b-col>

                        <!-- Efectivo -->
                    
                            <b-col v-if="tipopago == 'efectivo'" sm="12" class="mt-4">
                                <label>Abono</label>
                                <b-form-input type="number" size="sm" step="0.01" v-model="abono" required placeholder="Q"></b-form-input>
                            </b-col>

                        <!-- Cheque -->

                            <b-col v-if="tipopago == 'cheque'" sm="12" class="mt-4">
                                <label>Abono</label>
                                <b-form-input type="number" size="sm" step="0.01" v-model="abono" required placeholder="Q"></b-form-input>
                            </b-col>
                            <b-col v-if="tipopago == 'cheque'" sm="12" class="mt-2">
                                <label>Banco</label>
                                <select class="form-control form-control-sm" v-model="establecimiento" required>
                                        <option value="">Elegir</option>
                                        <option v-for="(item, index) in bancos" :key="index" :value="item.valor">{{item.banco}}</option>
                                </select>
                            </b-col>
                            <b-col v-if="tipopago == 'cheque'" sm="12" class="mt-2">
                                <label>Corrleativo</label>
                                <b-form-input type="text" size="sm" step="0.01" v-model="correlativo" required ></b-form-input>
                            </b-col>

                        <!-- Depósito -->

                            <b-col v-if="tipopago == 'deposito'" sm="12" class="mt-4">
                                <label>Abono</label>
                                <b-form-input type="number" size="sm" step="0.01" v-model="abono" required placeholder="Q"></b-form-input>
                            </b-col>
                            <b-col v-if="tipopago == 'deposito'" sm="12" class="mt-2">
                                <label>Banco</label>
                                <select class="form-control form-control-sm" v-model="establecimiento" required>
                                        <option value="">Elegir</option>
                                        <option v-for="(item, index) in bancos" :key="index" :value="item.valor">{{item.banco}}</option>
                                </select>
                            </b-col>
                            <b-col v-if="tipopago == 'deposito'" sm="12" class="mt-2">
                                <label>No. boleta</label>
                                <b-form-input type="text" size="sm" v-model="correlativo" required ></b-form-input>
                            </b-col>

                        <!-- Tarjeta -->

                            <b-col v-if="tipopago == 'tarjeta'" sm="12" class="mt-4">
                                <label>Abono</label>
                                <b-form-input type="number" size="sm" step="0.01" v-model="abono" required placeholder="Q"></b-form-input>
                            </b-col>
                            <b-col v-if="tipopago == 'tarjeta'" sm="12" class="mt-2">
                                <label>No. autorización</label>
                                <b-form-input type="text" size="sm" v-model="correlativo" required ></b-form-input>
                            </b-col>


                            <b-col sm="12" class="mt-4 d-flex flex-row-reverse">
                                <b-button type="submit" size="sm" variant="success">Guardar</b-button>
                            </b-col>
                        </b-row>
                    </form>
                </b-container>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions } from 'vuex'
import moment from 'moment'
export default {
    name: 'IngresoNuevoAbono',
    props: ['odt'],
    data() {
        return {
            bancos: [
                {valor: 'Bac', banco: 'Bac'},
                {valor: 'BI', banco: 'BI'},
                {valor: 'BAM', banco: 'BAM'},
                {valor: 'Banrural', banco: 'Banrural'},
                {valor: 'Bantrab', banco: 'Bantrab'},
                {valor: 'GyT', banco: 'GyT'},
                {valor: 'Industrial', banco: 'Industrial'},
                {valor: 'Inmoviliario', banco: 'Inmoviliario'},
                {valor: 'Internacional', banco: 'Internacional'},
                {valor: 'Proamerica', banco: 'Proamérica'}
            ],
            tipopago: 'efectivo',
            establecimiento: '',
            abono: '',
            correlativo: ''
        }
    },
    methods: {
        cerrar(){
            this.$emit('cerrarIngresoNuevoAbono', false)
        },
        async guardar(){
            let data = {
                api: 'abonos/abononuevo',
                formulario: {
                    odt: this.odt.odt,
                    tipoDePago: this.tipopago,
                    establecimiento: this.establecimiento,
                    correlativo: this.correlativo,
                    pid: this.odt.pid,
                    nombre: this.odt.paciente,
                    abono: this.abono,
                    fecha: moment(Date.now()).format('YYYY-MM-DD')
                }
            }

            await this.insert_data(data)
            await this.$emit('actualizarSaldos', true)
        },
        ...mapActions(['wse', 'insert_data'])
    },
}
</script>

<style>
    
</style>