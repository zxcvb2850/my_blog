<template>
  <div class="itemize">
    <div class="new-left">
      <bread-crumb></bread-crumb>
      <articles-list :articles="webArticles"></articles-list>
    </div>
  </div>
</template>

<script>
  import axios from "axios"
  import moment from "moment"
  import articlesList from "base/articlesList/articlesList"
  import breadCrumb from 'base/breadcrumb/breadcrumb'

  export default {
    data(){
      return {
        webArticles: []
      }
    },
    created(){
      //this._getArticles();
    },
    methods: {
      _getArticles(){
        axios.get("/blog/articles/get?type=1").then((res) => {
          res = res.data;
          if (res.status === 200) {
            for (let i = 0; i < res.data.length; i++) {
              res.data[i].time = moment(res.data[i].time).format('LLL');
            }
            this.webArticles = res.data;
          }
        }).catch((err) => {
          console.log("获取失败");
          console.log(err);
        })
      },
    },
    components: {
      articlesList,
      breadCrumb
    },
    activated(){
      this._getArticles();
    }
  }
</script>

<style lang="less" scoped>
</style>

