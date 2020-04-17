export default {
  data () {
    return {
      userInfo: null
    }
  },

  mounted () {
    this.consoleUserInfo()
  },

  methods: {
    consoleUserInfo () {
      let user = {
        name: 'shine',
        sex: 'man',
        age: '25',
        hobby: 'code'
      }

      this.userInfo = user
    }
  },
}