export default {
    data () {
      return {
        _error: {
            'auth/email-already-exists':'Email has already been used',
            'auth/email-already-in-use':'Email has already been used',
            'auth/invalid-display-name':'Invalid display name',
            'auth/invalid-email':'Invalid Email Format',
            'auth/invalid-password':'Invalid Password format, need to be at lease 6 char.',
            'auth/user-not-found':'User not found',
            'auth/wrong-password':'Wrong password'
        },        
      }
    },
    methods: {
      error (err) {
        return this.$data._error[err] || err
      },
    }
  }
  