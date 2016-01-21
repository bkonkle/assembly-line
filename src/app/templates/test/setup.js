import chai from 'chai'<% if (react) { %>
import chaiEnzyme from 'chai-enzyme'<% } %>
import sinonChai from 'sinon-chai'
<% if (react) { %>
chai.use(chaiEnzyme)<% } %>
chai.use(sinonChai)
