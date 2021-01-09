<template>
    <div class="contendor_detalle_odt">
        <div class="cuerpo_detalle_odt">
            <div class="barra_detalle_odt">
                Registro abono y fecha de entrega
                <b-button type="button" size="sm" variant="outline-danger" @click="cerrar">cerrar</b-button>
            </div>
            <div class="box_detalle_odt">
                <b-container fluid="">
                    <form @submit.prevent="guardar">
                        <b-row>
                            <b-col sm="12" class="mt-3">
                                <label>Abono</label>
                                <b-form-input type="text" id="campoabono" v-model="abono" size="sm" placeholder="Q." required></b-form-input>
                            </b-col>
                            <b-col sm="12" class="mt-3">
                                <label>Fecha de entrega</label>
                                <b-form-input type="date" size="sm" v-model="fechaentrega" required></b-form-input>
                            </b-col>
                            <b-col sm="12" class="mt-3">
                                <label>Tipo de pago</label>
                                <select class="form-control form-control-sm" v-model="tipopago" required>
                                    <option value="">Elegir</option>
                                    <option value="sin abono">Sin abono</option>
                                    <option value="efectivo">Efectivo</option>
                                    <option value="cheque">Cheque</option>
                                    <option value="deposito">Depósito</option>
                                    <option value="tarjeta">Tarjeta</option>
                                </select>
                            </b-col>
                            <b-col v-if="tipopago == 'sin abono'" sm="12" class="mt-3">
                                <label>Motivo</label>
                                <b-form-textarea
                                    id="textarea-small"
                                    size="sm"
                                    required
                                    v-model="motivoSinAbono"
                                ></b-form-textarea>
                            </b-col>
                            <b-col v-if="tipopago == 'cheque'" sm="12" class="mt-3">
                                <label>Banco</label>
                                <select class="form-control form-control-sm" v-model="establecimiento" required>
                                        <option value="">Elegir</option>
                                        <option v-for="(item, index) in bancos" :key="index" :value="item.valor">{{item.banco}}</option>
                                </select>
                            </b-col>
                            <b-col v-if="tipopago == 'cheque'" sm="12" class="mt-3">
                                <label>Correlativo</label>
                                <b-form-input type="text" size="sm" v-model="correlativo" required></b-form-input>
                            </b-col>

                            <b-col v-if="tipopago == 'deposito'" sm="12" class="mt-3">
                                <label>Banco</label>
                                <select class="form-control form-control-sm" v-model="establecimiento" required>
                                        <option value="">Elegir</option>
                                        <option v-for="(item, index) in bancos" :key="index" :value="item.valor">{{item.banco}}</option>
                                </select>
                            </b-col>
                            <b-col v-if="tipopago == 'deposito'" sm="12" class="mt-3">
                                <label>Boleta</label>
                                <b-form-input type="text" size="sm" v-model="correlativo" required></b-form-input>
                            </b-col>

                            <b-col v-if="tipopago == 'tarjeta'" sm="12" class="mt-3">
                                <label>Banco</label>
                                <select class="form-control form-control-sm" v-model="establecimiento" required>
                                        <option value="">Elegir</option>
                                        <option v-for="(item, index) in bancos" :key="index" :value="item.valor">{{item.banco}}</option>
                                </select>
                            </b-col>
                            <b-col v-if="tipopago == 'tarjeta'" sm="12" class="mt-3">
                                <label>Número de autorización</label>
                                <b-form-input type="text" size="sm" v-model="correlativo" required></b-form-input>
                            </b-col>
                            
                            <b-col sm="12" class="mt-3 d-flex flex-row-reverse">
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
    name: 'RegistroAbonos',
    props: ['odtRA'],
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
            abono: '',
            motivoSinAbono: '',
            tipopago: '',
            establecimiento: '',
            correlativo: '',
            fechaentrega: moment(Date.now()).format('YYYY-MM-DD'),
            fechaRegistro: moment(Date.now()).format('YYYY-MM-DD')
        }
    },
    methods: {
        cerrar(){
            this.$emit('cModalRegistroAbonos', false)
        },
        async guardar(){

            let data = {
                api: 'abonos',
                formulario: {
                    odt: this.odtRA.odt,
                    tipoDePago: this.tipopago,
                    establecimiento: this.establecimiento,
                    correlativo: this.correlativo,
                    pid: this.odtRA.pid,
                    nombre: this.odtRA.nombre,
                    abono: this.abono,
                    fecha: this.fechaRegistro,
                    fechaEntrega: this.fechaentrega,
                    motivo: this.motivoSinAbono
                }
            }
            
            await this.insert_data(data)
            await this.wse(this.$store.state.rutas.odts)

        },
        ...mapActions(['wse','insert_data'])
    },
    mounted() {
        document.getElementById('campoabono').focus()
    },
}
</script>
<style>
</style>