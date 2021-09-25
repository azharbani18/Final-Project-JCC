<template>
    <v-card>
        <v-container fluid>
            <h2 class="text-center mb-5">Tambah Blog Baru</h2>
            <v-divider class="mb-5"></v-divider>

            <v-form ref="form">
                <h4 class="ml-1 mb-3">Judul Blog</h4>
                <v-text-field
                    v-model="title"
                    label="Judul"
                    color="teal darken-1"
                    required
                    outlined
                    rounded
                    append-icon="mdi-subtitles"
                ></v-text-field>

                <h4 class="ml-1 mb-3">Deskripsi Blog</h4>
                <v-textarea
                    outlined
                    rounded
                    color="teal darken-1"
                    name="input-7-4"
                    label="Deskripsi"
                    v-model="description"
                    append-icon="mdi-subtitles"
                ></v-textarea>

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
                    Tambah Blog
                    </v-btn>
                </div>
            </v-form>
        </v-container>
    </v-card>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data() {
        return {
            errors : [],
            title : '',
            description : '',
            apiDomain: 'https://demo-api-vue.sanbercloud.com'
        }
    },
    computed: {
        ...mapGetters({
            token : 'auth/token'
        })
    },
    methods : {
        ...mapActions({
            setAlert : 'alert/set',
            setToken : 'auth/setToken'
        }),
        validationForm() {
            this.errors = []

            //Validate Title
            if(!this.title) {
                this.errors.push('Judul tidak boleh kosong!')
            } else if (this.title.length > 50) {
                this.errors.push('Judul tidak boleh lebih dari 50 karakter!')
            }

            //Validate Description
            if(!this.description) {
                this.errors.push('Deskripsi tidak boleh kosong!')
            } else if (this.description.length > 500) {
                this.errors.push('Email tidak boleh lebih dari 500 karakter!')
            }
        },
        submit() {

            this.validationForm()

            if (this.errors.length === 0) {
                                
                const config = {
                    method : 'post',
                    url: this.apiDomain + '/api/v2/blog',
                    data: {
                        'title' : this.title,
                        'description' : this.description
                    },
                    headers: {
                        'Authorization' : 'Bearer ' + this.token,
                    }
                }

                this.axios(config)
                    .then((response) => {
                        console.log(response.data)
                        this.setAlert({
                            status : true,
                            color : 'success',
                            text : 'Blog berhasil ditambahkan.',
                        })
                        this.close()
                        this.$router.go(0)
                    })
                    .catch((response) => {
                        console.log(response)
                        this.setAlert({
                            status : true,
                            color : 'error',
                            text : 'Blog gagal ditambahkan.',
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
