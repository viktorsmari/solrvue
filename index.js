/*
Vue.http.options.emulateJSON = true;
Vue.http.options.emulateHTTP = true;
Vue.http.options.root = "/api";
Vue.http.headers.common['Access-Control-Request-Method'] = '*'
*/
Vue.http.options.root = '/root';
Vue.http.headers.common['Authorization'] = 'Basic YXBpOnBhc3N3b3Jk';

var myapp = new Vue({
  http: {
    root: '/root',
    headers: {
      Authorization: 'Basic YXBpOnBhc3N3b3Jk'
    }
  },
  el: '#app',
  data: {
    mySearch:'',
    myResults:'',
  },
  methods: {
    doSearch: function(){
      var app = this;
      app.myResults = "Searching for " + this.mySearch;
      console.log(app.myResults);

      // Using axios
      /*
      //axios.get('http://apis.is/car/?number=aa031')
      axios.get('http://s1c1.env1.metastore.cvt.dk:8983/solr/metastore_shard1_replica1/select?q=water&wt=json&indent=true')
        .then(function(response){
          console.log(response.data.results[0]);
          app.myResults = response.data.results[0];
        }).catch(function (error){
          console.log(error);
        });
      */

      // Using vue-resource
      this.$http.get(
//         'http://apis.is/car/?number=aa031'
          'http://s1c1.env1.metastore.cvt.dk:8983/solr/metastore_shard11_replica1/select?q=*%3A*&wt=json&indent=true'
          )
        .then((response) => {
          console.log(response);
          app.myResults = response.body.results[0];
        }, (response) => {
          app.myResults = response.body;
        });
    },
    doSearchApis: function(){
      var app = this;
      app.myResults = "Searching for " + this.mySearch;
      console.log(app.myResults);
      this.$http.get(
         'https://apis.is/car/?number=aa031'
          )
        .then((response) => {
          console.log(response);
          app.myResults = response.body.results[0];
        }, (response) => {
          app.myResults = response.body;
        });
    }
  },
  computed: {
  }
})
