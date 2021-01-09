<template>
    <div class="contenedor">

        <div class="form-institucion" id="formulario_institucion">

            <div class="nav">
                Nuevo registro
            </div>
                <hr>
            <b-container fluid>
                
                <b-row>
                    <b-col sm="12" class="mt-3">
                        <label style="color: black;">Código del transfer</label>
                        <b-form-input type="text" id="transfer" size="sm" v-model="codigo" required="" autocomplete="off"></b-form-input>
                    </b-col>
                    <b-col sm="12" class="mt-3 mm">
                        <input type="file" id="upfile" @change="uploadTransfer" ref="btnUpTransfer">
                        <div class="ico_upload" @click="seleccionaArtchivo">
                            <img src="@/assets/upload.png" style="width: 100%;" alt="">
                        </div>
                    </b-col>
                </b-row>
                
            </b-container>
        </div>
        
    </div>
</template>

<script>

import { minix } from '@/components/functions/alertas'
import { mapActions } from 'vuex'

export default {
    name: 'ModaNuevoRegistro',
    data() {
        return {
            codigo: ''
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
            this.$emit('cerrarModal', false)
        },
        doCommand(e){
            if (e.keyCode == 27) {
                this.cerrar()
            }
        },
        async uploadTransfer(evento){

            let data = {
                api: 'transfers',
                evento: event.target.files[0],
                campos: [
                    {
                        campo: 'codigoTransfer',
                        payload: this.codigo 
                    }
                ],
            }

            await this.sfile(data)
            await this.wse(this.$store.state.rutas.transfers)
            this.codigo = ''
            document.getElementById('transfer').focus()

        },
        seleccionaArtchivo(){

            if (this.codigo.trim() == '' || this.codigo.trim() == null) {
                minix({icon: 'error', mensaje: 'El campo código transfer no puede ir vacio', tiempo: 3000})
            }else{
                this.$refs.btnUpTransfer.click()
            }


        },
        ...mapActions(['insert_data', 'wse', 'sfile'])
    },
    mounted() {
        document.getElementById('transfer').focus()
    },
}
</script>

<style scoped>

    .contenedor{
        width: 100%;
        height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 999;
    }
        .nav{
            width: 100%;
            height: 30px;
            /* border-bottom: 1px solid rgb(179, 179, 179); */
            color: rgb(136,173,40);
            font-size: 25px;
            padding-left: 10px;
            display: flex;
            align-items: center;
        }

        .form-institucion{
            width: 600px;
            height: 260px;
            background-color: white;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-left: -300px;
            margin-top: -115px;
            border-radius: 4px;
        }

        #upfile{
            display: none;
        }

        .mm{
            color: black;
            text-align: center;
            font-size: 50px;
            cursor: pointer;
        }
            .ico_upload{
                width: 60px;
                height: 60px;
                margin: auto;
                line-height: 0;
                cursor: pointer;
            }

</style>