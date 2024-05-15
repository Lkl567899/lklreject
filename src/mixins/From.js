export default {
  data() {
    return {

    }
  },
  methods: {
      //小小弹框
      isFrom() {
        if (!this.$store.getters.token) {
          this.$dialog
            .confirm({
              title: "温馨提示",
              message: "请登录后再操作",
              confirmButtonText: "去登录",
              cancelButtonText: "再逛逛",
            })
            .then(() => {
              this.$router.replace({
                path: "/login",
                query: {
                  backUrl: this.$route.fullPath,
                },
              });
            })
            .catch(() => {
              return;
            });
          return true;
        }
        return false;
      },
  }
}
