export default {
    data () {
      return {
        _catagories: {
            appetizers: 'Appetizers',
            soup:'Soup',
            sideDish:'Side Dish',
            mainCourse:'Main Course',
            garnishes:'Garnishes',
            dessert:'Dessert',
            drink:'Drink'
        },        
      }
    },
    methods: {
      catagories(cat) {
        return this.$data._catagories[cat] || cat
      },
      catagoriesForSelect(disabled = [],addAll=false) {
          const result=Object.entries(this.$data._catagories)
          .map(([key, value]) => {
            return { text: value, value: key, disabled: disabled.includes(key) }
          })
         
          if(addAll){ 
              result.unshift({text: 'All', value:''})
          }
        return result
      },
    }
  }
  