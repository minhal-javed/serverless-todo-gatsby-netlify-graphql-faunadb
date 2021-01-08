// basic usage
const React =require('react') 
const {ThemeProvider}=require ('theme-ui')
const {deep} =require('./@theme-ui/presets') 
module.exports =props => (
  <ThemeProvider theme={deep}>{props.children}</ThemeProvider>
)