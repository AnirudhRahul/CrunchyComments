// Nodejs buildscript for the project
// Sends all output to dist/

console.log("Building...")

CleanCSS = require('clean-css');
fs = require('fs')
fse = require('fs-extra');
path = require('path')

fse.moveSync('dist/manifest.json', 'tmp/manifest.json')
fse.emptyDirSync('dist/')
fse.moveSync('tmp/manifest.json', 'dist/manifest.json')
fse.removeSync('tmp/')
fs.mkdirSync("dist/themes/")
console.log("Deleted Old build")

css_base_path = path.join(__dirname, 'source', 'content_scripts', 'css')
light_css = new CleanCSS().minify([
  path.join(css_base_path, 'reddit-embed', 'light.css'),
  path.join(css_base_path, 'buttons', 'light.css'),
  path.join(css_base_path, 'tabs', 'light.css')
]);
fs.writeFile(path.join(__dirname ,'dist/themes/light.css'), light_css.styles, (err,data) => (err?console.log(err):''))

dark_css = new CleanCSS().minify([
  path.join(css_base_path, 'reddit-embed', 'dark.css'),
  path.join(css_base_path, 'buttons', 'dark.css'),
  path.join(css_base_path, 'tabs', 'dark.css')
]);
fs.writeFile(path.join(__dirname ,'dist/themes/dark.css'), dark_css.styles, (err,data) => (err?console.log(err):''))

console.log("Finished minifying css")


function fileEndingFilter(endings){
  return (src, dest) =>{
    for(end of endings)
      if(src.endsWith(end))
        return false
    return true
  }
}



fse.copySync('source/', 'dist/', {
  overwrite: true,
  filter: fileEndingFilter(['.css', '.html', '.json', '.txt'])
});
//Want all the content in the pages folder
fse.copySync('source/pages/', 'dist/pages/', {
  overwrite: true,
});
fse.removeSync('dist/content_scripts/css/')

console.log("Copied source files")
