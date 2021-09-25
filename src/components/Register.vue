<template>
    <v-card>
        <v-container fluid>
            <h2
                class="text-center mb-5"
            >REGISTER ACCOUNT</h2>
            <v-divider class="mb-5"></v-divider>
            <v-form ref="form">
                <v-row>
                    <v-col>
                        <h4 class="ml-1 mb-3">Nama</h4>
                        <v-text-field
                            v-model="nama"
                            label="Nama"
                            color="teal darken-1"
                            required
                            outlined
                            rounded
                            append-icon="mdi-account"
                            max-width="200"
                        ></v-text-field>
                    </v-col>  
                    <v-col xl>
                        <h4 class="ml-1 mb-3">Foto Profil</h4>                        
                        <input type="file" ref="photo" class="mt-3">
                    </v-col>                  
                </v-row>

                <h4 class="ml-1 mb-3">Email</h4>
                <v-text-field
                    v-model="email"
                    label="Email"
                    color="teal darken-1"
                    type="email"
                    required
                    outlined
                    rounded
                    append-icon="mdi-email"
                ></v-text-field>
                <h4 class="ml-1 mb-3">Password</h4>
                <v-text-field
                    v-model = "password"
                    color="teal darken-1"
                    :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                    :type="showPassword? 'text' : 'password'"
                    label="Password"
                    counter
                    outlined
                    rounded
                    @click:append="showPassword = !showPassword"
                ></v-text-field>
                <v-alert
                    v-if="errors.length > 0"
                    border="right"
                    type="error"
                >
                    <ul v-for="error of errors" :key="error">
                        <li>{{error}}</li>
                    </ul>
                </v-alert>
                <div class="text-center mb-5">
                    <v-btn 
                        color="teal darken-1"
                        dark
                        block
                        rounded
                        @click="submit"
                    >
                    Register Now
                    <!-- <v-icon right dark>mdi-register</v-icon> -->
                    </v-btn>
                </div>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
import { mapActions } from 'vuex'
export default {
    data() {
        return {
            errors : [],
            nama : '',
            email : '',
            password : '',
            photoFile : '',
            showPassword : false,
            apiDomain: 'https://demo-api-vue.sanbercloud.com'
        }
    },
    methods : {
        ...mapActions({
            setAlert : 'alert/set',
            setToken : 'auth/setToken'
        }),
        validationForm() {
            this.errors = []

            //Validate Nama
            if(this.nama.length < 1) {
                this.errors.push('Nama tidak boleh kosong!')
            } else if (this.nama.length > 30) {
                this.errors.push('Nama tidak boleh lebih dari 30 karakter!')
            }

            //Validate Email
            if(this.email.length < 1) {
                this.errors.push('Email tidak boleh kosong!')
            } else if (this.email.length > 40) {
                this.errors.push('Email tidak boleh lebih dari 40 karakter!')
            } else if (!this.validEmail(this.email)) {
                this.errors.push('Email tidak valid!');
            }

            //Validate Password
            if(!this.password) {
                this.errors.push('Password tidak boleh kosong!')
            } else if (this.password.length < 8) {
                this.errors.push('Password minimal 8 digit!')
            }
        },
        submit() {

            this.validationForm()

            if (this.errors.length === 0) {
                
                this.photoFile = this.$refs.photo.files[0]
                
                let formRegisterData = new FormData()
                formRegisterData.append("name", this.nama)
                formRegisterData.append("email", this.email)
                formRegisterData.append("password", this.password)
                formRegisterData.append("photo_profile", this.photoFile)
                
                const config = {
                    method : 'post',
                    url: this.apiDomain + '/api/v2/auth/register',
                    data: formRegisterData
                }

                this.axios(config)
                    .then((response) => {

                        // this.setToken(response.data.access_token)

                        console.log(response.data)
                        this.setAlert({
                            status : true,
                            color : 'success',
                            text : 'Akun berhasil dibuat.',
                        })
                        this.close()
                    })
                    .catch((response) => {
                        console.log(response)
                        this.setAlert({
                            status : true,
                            color : 'error',
                            text : 'Akun gagal dibuat.',
                        })
                    })
                }

        },
        validEmail: function (email) {
        // eslint-disable-next-line no-useless-escape
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
        },
        close() {
            this.$emit('closed', false)
        },
    },

}
</script>