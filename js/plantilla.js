var config = {
    apiKey: "AIzaSyDFanj4rwRLpOlk4fC-nVlM3NpvprSYj4c",
    authDomain: "prueba2-98d7a.firebaseapp.com",
    databaseURL: "https://prueba2-98d7a.firebaseio.com",
    storageBucket: "prueba2-98d7a.appspot.com",
    messagingSenderId: "660422179076"
};
firebase.initializeApp(config);
var refProfesores = firebase.database().ref('Zonzamas/profesores');
var refGrupos = firebase.database().ref('Zonzamas/grupos');


//Definir un componente llamado demo grid
Vue.component('demo-grid', {
  template: '#grid-template',   //definir el id de la plantilla del componente
  replace: true, //no tengo claro este parámetro
  props: { //datos que se le van a pasar al componente
    data: Array,
    columnas: Array,
    filterKey: String
  },
  data: function () {   //en los componentes data es siempre una función
    var sortOrders = {}
    this.columnas.forEach(function (key) {
      sortOrders[key] = 1
    })
    return { //data devuelve dos datos, sortKey y sortOrders
      sortKey: '',
      sortOrders: sortOrders
    }
  },
  computed: {
    filteredData: function () {
      var sortKey = this.sortKey
      var filterKey = this.filterKey && this.filterKey.toLowerCase()
      var order = this.sortOrders[sortKey] || 1
      var data = this.data
      if (filterKey) {
        data = data.filter(function (row) {
          return Object.keys(row).some(function (key) {
            return String(row[key]).toLowerCase().indexOf(filterKey) > -1
          })
        })
      }
      if (sortKey) {
        data = data.slice().sort(function (a, b) {
          a = a[sortKey]
          b = b[sortKey]
          return (a === b ? 0 : a > b ? 1 : -1) * order
        })
      }
      return data
    }
  },
  filters: { //Filtro que pone primera letra de la palabra en mayúscula
    capitalize: function (str) {
      return str.charAt(0).toUpperCase() + str.slice(1)
    }
  },
  methods: {
    sortBy: function (key) {
      this.sortKey = key
      this.sortOrders[key] = this.sortOrders[key] * -1
    }
  }
})

//objeto vue
var demo = new Vue({
  el: '#demo',  //elemento donde actuará vue, normalmente un <div></div>
       // gridData: 
  data: {
    cadenaBusqueda: '',
    columnasProfesores: ['Codigo','Nombre', 'Apellido1','Apellido2'],
    cadenaBusqueda2: '', 
    columnasGrupos: ['Codigo','Curso','Denominacion','Letra'],
    cadenaBusqueda3: '',
    columnasAgenda: ['id','nombre','apellidos','telefono'],
    agendaDatos: [
        {
          id: 1,
          nombre: 'Mario',
          apellidos: 'Brito Morales',
          fnacimiento: '19/01/1973',
          telefono: '699800461'
        },
        {
          id: 2,
          nombre: 'Juana',
          apellidos: 'Rodríguez  Pérez',
          fnacimiento: '29/11/1970',
          telefono: '659855461'
        },
        {
          id: 3,
          nombre: 'Vicente',
          apellidos: 'Roca Valido',
          fnacimiento: '22/07/1983',
          telefono: '698554781'
        }
      ]
      
  },
    firebase: {
        profesores: refProfesores,
        grupos: refGrupos
  }
})
