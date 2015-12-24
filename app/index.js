import generators from 'yeoman-generator'

export default generators.Base.extend({

  constructor: function constructor() {
    this.option('no-react')
  },

  initializing: function initializing() {
    this.log('Preparing for liftoff!')
  },

})
